export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      carriers: {
        Row: {
          code: string
          color: string | null
          id: string
          logo_url: string | null
          mode: string
          name_en: string
          name_ru: string
        }
        Insert: {
          code: string
          color?: string | null
          id?: string
          logo_url?: string | null
          mode: string
          name_en: string
          name_ru: string
        }
        Update: {
          code?: string
          color?: string | null
          id?: string
          logo_url?: string | null
          mode?: string
          name_en?: string
          name_ru?: string
        }
        Relationships: []
      }
      club_perks: {
        Row: {
          icon: string | null
          id: string
          perk_en: string
          perk_ru: string
          tier: string
        }
        Insert: {
          icon?: string | null
          id?: string
          perk_en: string
          perk_ru: string
          tier: string
        }
        Update: {
          icon?: string | null
          id?: string
          perk_en?: string
          perk_ru?: string
          tier?: string
        }
        Relationships: []
      }
      decks: {
        Row: {
          deck_number: number
          id: string
          name_en: string
          name_ru: string
          svg_path: string | null
          vessel_id: string
        }
        Insert: {
          deck_number: number
          id?: string
          name_en: string
          name_ru: string
          svg_path?: string | null
          vessel_id: string
        }
        Update: {
          deck_number?: number
          id?: string
          name_en?: string
          name_ru?: string
          svg_path?: string | null
          vessel_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "decks_vessel_id_fkey"
            columns: ["vessel_id"]
            isOneToOne: false
            referencedRelation: "vessels"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          category: string
          description_en: string | null
          description_ru: string | null
          end_time: string
          id: string
          image_url: string | null
          location_id: string | null
          start_time: string
          title_en: string
          title_ru: string
          venue_id: string | null
          vessel_id: string | null
        }
        Insert: {
          category: string
          description_en?: string | null
          description_ru?: string | null
          end_time: string
          id?: string
          image_url?: string | null
          location_id?: string | null
          start_time: string
          title_en: string
          title_ru: string
          venue_id?: string | null
          vessel_id?: string | null
        }
        Update: {
          category?: string
          description_en?: string | null
          description_ru?: string | null
          end_time?: string
          id?: string
          image_url?: string | null
          location_id?: string | null
          start_time?: string
          title_en?: string
          title_ru?: string
          venue_id?: string | null
          vessel_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "events_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_venue_id_fkey"
            columns: ["venue_id"]
            isOneToOne: false
            referencedRelation: "venues"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_vessel_id_fkey"
            columns: ["vessel_id"]
            isOneToOne: false
            referencedRelation: "vessels"
            referencedColumns: ["id"]
          },
        ]
      }
      locations: {
        Row: {
          city_en: string
          city_ru: string
          code: string
          country: string
          id: string
          lat: number | null
          lng: number | null
          loc_type: string
          name_en: string
          name_ru: string
          timezone: string
        }
        Insert: {
          city_en: string
          city_ru: string
          code: string
          country: string
          id?: string
          lat?: number | null
          lng?: number | null
          loc_type: string
          name_en: string
          name_ru: string
          timezone: string
        }
        Update: {
          city_en?: string
          city_ru?: string
          code?: string
          country?: string
          id?: string
          lat?: number | null
          lng?: number | null
          loc_type?: string
          name_en?: string
          name_ru?: string
          timezone?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          club_card_no: string | null
          club_points: number
          club_tier: string
          created_at: string
          display_name: string
          email: string
          home_timezone: string
          id: string
          locale: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          club_card_no?: string | null
          club_points?: number
          club_tier?: string
          created_at?: string
          display_name: string
          email: string
          home_timezone?: string
          id: string
          locale?: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          club_card_no?: string | null
          club_points?: number
          club_tier?: string
          created_at?: string
          display_name?: string
          email?: string
          home_timezone?: string
          id?: string
          locale?: string
          updated_at?: string
        }
        Relationships: []
      }
      routes: {
        Row: {
          base_price_eur: number | null
          carrier_id: string
          co2_kg: number | null
          destination_id: string
          duration_min: number
          frequency: string | null
          id: string
          mode: string
          origin_id: string
          route_code: string
          vessel_id: string | null
        }
        Insert: {
          base_price_eur?: number | null
          carrier_id: string
          co2_kg?: number | null
          destination_id: string
          duration_min: number
          frequency?: string | null
          id?: string
          mode: string
          origin_id: string
          route_code: string
          vessel_id?: string | null
        }
        Update: {
          base_price_eur?: number | null
          carrier_id?: string
          co2_kg?: number | null
          destination_id?: string
          duration_min?: number
          frequency?: string | null
          id?: string
          mode?: string
          origin_id?: string
          route_code?: string
          vessel_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "routes_carrier_id_fkey"
            columns: ["carrier_id"]
            isOneToOne: false
            referencedRelation: "carriers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "routes_destination_id_fkey"
            columns: ["destination_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "routes_origin_id_fkey"
            columns: ["origin_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "routes_vessel_id_fkey"
            columns: ["vessel_id"]
            isOneToOne: false
            referencedRelation: "vessels"
            referencedColumns: ["id"]
          },
        ]
      }
      trip_legs: {
        Row: {
          arrival_time: string
          booking_ref: string | null
          created_at: string
          departure_time: string
          id: string
          leg_order: number
          qr_data: string | null
          route_id: string
          seat_info: string | null
          status: string
          trip_id: string
        }
        Insert: {
          arrival_time: string
          booking_ref?: string | null
          created_at?: string
          departure_time: string
          id?: string
          leg_order: number
          qr_data?: string | null
          route_id: string
          seat_info?: string | null
          status?: string
          trip_id: string
        }
        Update: {
          arrival_time?: string
          booking_ref?: string | null
          created_at?: string
          departure_time?: string
          id?: string
          leg_order?: number
          qr_data?: string | null
          route_id?: string
          seat_info?: string | null
          status?: string
          trip_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "trip_legs_route_id_fkey"
            columns: ["route_id"]
            isOneToOne: false
            referencedRelation: "routes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "trip_legs_trip_id_fkey"
            columns: ["trip_id"]
            isOneToOne: false
            referencedRelation: "trips"
            referencedColumns: ["id"]
          },
        ]
      }
      trips: {
        Row: {
          created_at: string
          end_date: string
          id: string
          start_date: string
          status: string
          title_en: string
          title_ru: string
          user_id: string
        }
        Insert: {
          created_at?: string
          end_date: string
          id?: string
          start_date: string
          status?: string
          title_en: string
          title_ru: string
          user_id: string
        }
        Update: {
          created_at?: string
          end_date?: string
          id?: string
          start_date?: string
          status?: string
          title_en?: string
          title_ru?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "trips_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_events: {
        Row: {
          event_id: string
          id: string
          notify: boolean
          user_id: string
        }
        Insert: {
          event_id: string
          id?: string
          notify?: boolean
          user_id: string
        }
        Update: {
          event_id?: string
          id?: string
          notify?: boolean
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_events_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_events_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      venues: {
        Row: {
          category: string
          deck_id: string
          id: string
          name_en: string
          name_ru: string
          svg_zone_id: string | null
          x: number | null
          y: number | null
        }
        Insert: {
          category: string
          deck_id: string
          id?: string
          name_en: string
          name_ru: string
          svg_zone_id?: string | null
          x?: number | null
          y?: number | null
        }
        Update: {
          category?: string
          deck_id?: string
          id?: string
          name_en?: string
          name_ru?: string
          svg_zone_id?: string | null
          x?: number | null
          y?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "venues_deck_id_fkey"
            columns: ["deck_id"]
            isOneToOne: false
            referencedRelation: "decks"
            referencedColumns: ["id"]
          },
        ]
      }
      vessels: {
        Row: {
          carrier_id: string
          deck_count: number
          id: string
          name: string
          pax_capacity: number | null
          ship_class: string | null
        }
        Insert: {
          carrier_id: string
          deck_count?: number
          id?: string
          name: string
          pax_capacity?: number | null
          ship_class?: string | null
        }
        Update: {
          carrier_id?: string
          deck_count?: number
          id?: string
          name?: string
          pax_capacity?: number | null
          ship_class?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vessels_carrier_id_fkey"
            columns: ["carrier_id"]
            isOneToOne: false
            referencedRelation: "carriers"
            referencedColumns: ["id"]
          },
        ]
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const

