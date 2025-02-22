export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          age: number | null
          sex: string | null
          email: string | null
          phone_number: string
          preferred_contact: 'email' | 'phone'
          preferred_language: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          age?: number | null
          sex?: string | null
          email?: string | null
          phone_number: string
          preferred_contact?: 'email' | 'phone'
          preferred_language?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          age?: number | null
          sex?: string | null
          email?: string | null
          phone_number?: string
          preferred_contact?: 'email' | 'phone'
          preferred_language?: string
          created_at?: string
          updated_at?: string
        }
      }
      // Add other tables as needed
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      contact_preference: 'email' | 'phone'
      booking_status: 'pending' | 'confirmed' | 'cancelled'
      payment_status: 'pending' | 'partial' | 'completed'
      ceremony_type: 'ayahuasca' | 'san_pedro' | 'other'
      session_type: 'virtual'
      user_status: 'active' | 'inactive'
    }
  }
}
