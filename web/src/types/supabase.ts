export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      fare_reports: {
        Row: {
          created_at: string | null
          id: string
          reported_fare: number
          route_id: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          reported_fare: number
          route_id?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          reported_fare?: number
          route_id?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fare_reports_route_id_fkey"
            columns: ["route_id"]
            isOneToOne: false
            referencedRelation: "routes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fare_reports_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          phone_number: string | null
          role: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          phone_number?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          phone_number?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      reports: {
        Row: {
          created_at: string | null
          description: string | null
          downvotes: number | null
          expires_at: string
          id: string
          location: unknown
          report_type: string | null
          upvotes: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          downvotes?: number | null
          expires_at: string
          id?: string
          location?: unknown
          report_type?: string | null
          upvotes?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          downvotes?: number | null
          expires_at?: string
          id?: string
          location?: unknown
          report_type?: string | null
          upvotes?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reports_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      route_segments: {
        Row: {
          cost_estimate_max: number | null
          cost_estimate_min: number | null
          created_at: string | null
          distance_km: number | null
          duration_min: number | null
          from_stop_id: string | null
          id: string
          instructions: string | null
          route_id: string | null
          segment_order: number
          to_stop_id: string | null
          vehicle_type_id: string | null
        }
        Insert: {
          cost_estimate_max?: number | null
          cost_estimate_min?: number | null
          created_at?: string | null
          distance_km?: number | null
          duration_min?: number | null
          from_stop_id?: string | null
          id?: string
          instructions?: string | null
          route_id?: string | null
          segment_order: number
          to_stop_id?: string | null
          vehicle_type_id?: string | null
        }
        Update: {
          cost_estimate_max?: number | null
          cost_estimate_min?: number | null
          created_at?: string | null
          distance_km?: number | null
          duration_min?: number | null
          from_stop_id?: string | null
          id?: string
          instructions?: string | null
          route_id?: string | null
          segment_order?: number
          to_stop_id?: string | null
          vehicle_type_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "route_segments_from_stop_id_fkey"
            columns: ["from_stop_id"]
            isOneToOne: false
            referencedRelation: "stops"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "route_segments_route_id_fkey"
            columns: ["route_id"]
            isOneToOne: false
            referencedRelation: "routes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "route_segments_to_stop_id_fkey"
            columns: ["to_stop_id"]
            isOneToOne: false
            referencedRelation: "stops"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "route_segments_vehicle_type_id_fkey"
            columns: ["vehicle_type_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          }
        ]
      }
      route_suggestions: {
        Row: {
          created_at: string | null
          destination_text: string
          id: string
          instructions: string | null
          origin_text: string
          status: string | null
          suggested_fare: number | null
          user_id: string | null
          vehicle_type: string | null
          votes: number | null
        }
        Insert: {
          created_at?: string | null
          destination_text: string
          id?: string
          instructions?: string | null
          origin_text: string
          status?: string | null
          suggested_fare?: number | null
          user_id?: string | null
          vehicle_type?: string | null
          votes?: number | null
        }
        Update: {
          created_at?: string | null
          destination_text?: string
          id?: string
          instructions?: string | null
          origin_text?: string
          status?: string | null
          suggested_fare?: number | null
          user_id?: string | null
          vehicle_type?: string | null
          votes?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "route_suggestions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      routes: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          end_stop_id: string | null
          estimated_duration_min: number | null
          id: string
          is_verified: boolean | null
          name: string
          popularity_score: number | null
          start_stop_id: string | null
          total_distance_km: number | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          end_stop_id?: string | null
          estimated_duration_min?: number | null
          id?: string
          is_verified?: boolean | null
          name: string
          popularity_score?: number | null
          start_stop_id?: string | null
          total_distance_km?: number | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          end_stop_id?: string | null
          estimated_duration_min?: number | null
          id?: string
          is_verified?: boolean | null
          name?: string
          popularity_score?: number | null
          start_stop_id?: string | null
          total_distance_km?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "routes_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "routes_end_stop_id_fkey"
            columns: ["end_stop_id"]
            isOneToOne: false
            referencedRelation: "stops"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "routes_start_stop_id_fkey"
            columns: ["start_stop_id"]
            isOneToOne: false
            referencedRelation: "stops"
            referencedColumns: ["id"]
          }
        ]
      }
      search_logs: {
        Row: {
          created_at: string | null
          destination_geo: unknown | null
          destination_text: string | null
          id: string
          origin_geo: unknown | null
          origin_text: string | null
          selected_route_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          destination_geo?: unknown | null
          destination_text?: string | null
          id?: string
          origin_geo?: unknown | null
          origin_text?: string | null
          selected_route_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          destination_geo?: unknown | null
          destination_text?: string | null
          id?: string
          origin_geo?: unknown | null
          origin_text?: string | null
          selected_route_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "search_logs_selected_route_id_fkey"
            columns: ["selected_route_id"]
            isOneToOne: false
            referencedRelation: "routes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "search_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      stops: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: string
          is_verified: boolean | null
          location: unknown
          name: string
          type: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_verified?: boolean | null
          location: unknown
          name: string
          type?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_verified?: boolean | null
          location?: unknown
          name?: string
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stops_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      vehicles: {
        Row: {
          base_fare: number | null
          capacity: number | null
          created_at: string | null
          description: string | null
          id: string
          icon_key: string | null
          name: string
          per_km_rate: number | null
        }
        Insert: {
          base_fare?: number | null
          capacity?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          icon_key?: string | null
          name: string
          per_km_rate?: number | null
        }
        Update: {
          base_fare?: number | null
          capacity?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          icon_key?: string | null
          name?: string
          per_km_rate?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}