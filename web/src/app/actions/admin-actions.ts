'use server'

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateUserRole(userId: string, newRole: 'admin' | 'user') {
  const supabase = await createClient();

  // Check if current user is authenticated and is an admin
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return { error: 'Unauthorized' };
  }

  // Get current user's profile to verify admin status
  const { data: currentUserProfile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (currentUserProfile?.role !== 'admin') {
    return { error: 'Only admins can change user roles' };
  }

  // Prevent admins from demoting themselves
  if (userId === user.id && newRole === 'user') {
    return { error: 'You cannot demote yourself' };
  }

  // Update the user's role
  const { error } = await supabase
    .from('profiles')
    .update({ role: newRole })
    .eq('id', userId);

  if (error) {
    return { error: error.message };
  }

  // Revalidate the admin page to show updated data
  revalidatePath('/admin');

  return { success: true };
}
