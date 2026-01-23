'use server'

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function submitRouteSuggestion(formData: FormData) {
  const supabase = await createClient();

  const origin = formData.get("origin") as string;
  const destination = formData.get("destination") as string;
  const fare = parseFloat(formData.get("fare") as string);
  const vehicle = formData.get("vehicle") as string;
  const instructions = formData.get("instructions") as string;

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { error } = await supabase.from("route_suggestions").insert({
    user_id: user.id,
    origin_text: origin,
    destination_text: destination,
    suggested_fare: fare,
    vehicle_type: vehicle,
    instructions: instructions,
    status: 'pending'
  });

  if (error) {
    console.error("Error submitting suggestion:", error);
    redirect("/suggest?error=failed");
  }

  revalidatePath("/");
  redirect("/");
}

export async function submitFareReport(formData: FormData) {
  const supabase = await createClient();
  
  const routeId = formData.get("routeId") as string;
  const reportedFare = parseFloat(formData.get("reportedFare") as string);

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { error } = await supabase.from("fare_reports").insert({
    user_id: user.id,
    route_id: routeId,
    reported_fare: reportedFare,
    status: 'pending'
  });

  if (error) {
    console.error("Error submitting fare report:", error);
    redirect("/routes/" + routeId + "?error=failed");
  }

  revalidatePath("/routes/" + routeId);
  redirect("/routes/" + routeId);
}
