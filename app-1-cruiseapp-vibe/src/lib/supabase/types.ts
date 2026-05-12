export type Database = {
  public: {
    Tables: {
      ships: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          image_url: string | null;
          total_decks: number;
          year_built: number | null;
          tonnage: number | null;
          max_passengers: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          image_url?: string | null;
          total_decks?: number;
          year_built?: number | null;
          tonnage?: number | null;
          max_passengers?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          image_url?: string | null;
          total_decks?: number;
          year_built?: number | null;
          tonnage?: number | null;
          max_passengers?: number | null;
          created_at?: string;
        };
      };
      decks: {
        Row: {
          id: string;
          ship_id: string;
          deck_number: number;
          name: string;
          svg_map_url: string | null;
          description: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          ship_id: string;
          deck_number: number;
          name: string;
          svg_map_url?: string | null;
          description?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          ship_id?: string;
          deck_number?: number;
          name?: string;
          svg_map_url?: string | null;
          description?: string | null;
          created_at?: string;
        };
      };
      amenities: {
        Row: {
          id: string;
          deck_id: string;
          name: string;
          category: string;
          description: string | null;
          svg_element_id: string | null;
          position_x: number | null;
          position_y: number | null;
          hours: string | null;
          image_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          deck_id: string;
          name: string;
          category: string;
          description?: string | null;
          svg_element_id?: string | null;
          position_x?: number | null;
          position_y?: number | null;
          hours?: string | null;
          image_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          deck_id?: string;
          name?: string;
          category?: string;
          description?: string | null;
          svg_element_id?: string | null;
          position_x?: number | null;
          position_y?: number | null;
          hours?: string | null;
          image_url?: string | null;
          created_at?: string;
        };
      };
      cabin_categories: {
        Row: {
          id: string;
          ship_id: string;
          name: string;
          slug: string;
          description: string | null;
          max_occupancy: number;
          base_price_cents: number;
          image_url: string | null;
          amenities_list: string[] | null;
          sq_feet: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          ship_id: string;
          name: string;
          slug: string;
          description?: string | null;
          max_occupancy?: number;
          base_price_cents: number;
          image_url?: string | null;
          amenities_list?: string[] | null;
          sq_feet?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          ship_id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          max_occupancy?: number;
          base_price_cents?: number;
          image_url?: string | null;
          amenities_list?: string[] | null;
          sq_feet?: number | null;
          created_at?: string;
        };
      };
      cabins: {
        Row: {
          id: string;
          deck_id: string;
          cabin_category_id: string;
          cabin_number: string;
          svg_element_id: string | null;
          position_x: number | null;
          position_y: number | null;
          is_accessible: boolean;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          deck_id: string;
          cabin_category_id: string;
          cabin_number: string;
          svg_element_id?: string | null;
          position_x?: number | null;
          position_y?: number | null;
          is_accessible?: boolean;
          status?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          deck_id?: string;
          cabin_category_id?: string;
          cabin_number?: string;
          svg_element_id?: string | null;
          position_x?: number | null;
          position_y?: number | null;
          is_accessible?: boolean;
          status?: string;
          created_at?: string;
        };
      };
      cruises: {
        Row: {
          id: string;
          ship_id: string;
          name: string;
          slug: string;
          description: string | null;
          departure_port: string;
          arrival_port: string;
          departure_date: string;
          arrival_date: string;
          duration_nights: number;
          image_url: string | null;
          status: string;
          departure_terminal_id: string | null;
          arrival_terminal_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          ship_id: string;
          name: string;
          slug: string;
          description?: string | null;
          departure_port: string;
          arrival_port: string;
          departure_date: string;
          arrival_date: string;
          duration_nights: number;
          image_url?: string | null;
          status?: string;
          departure_terminal_id?: string | null;
          arrival_terminal_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          ship_id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          departure_port?: string;
          arrival_port?: string;
          departure_date?: string;
          arrival_date?: string;
          duration_nights?: number;
          image_url?: string | null;
          status?: string;
          departure_terminal_id?: string | null;
          arrival_terminal_id?: string | null;
          created_at?: string;
        };
      };
      itinerary_stops: {
        Row: {
          id: string;
          cruise_id: string;
          day_number: number;
          port_name: string;
          arrival_time: string | null;
          departure_time: string | null;
          is_sea_day: boolean;
          description: string | null;
          latitude: number | null;
          longitude: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          cruise_id: string;
          day_number: number;
          port_name: string;
          arrival_time?: string | null;
          departure_time?: string | null;
          is_sea_day?: boolean;
          description?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          cruise_id?: string;
          day_number?: number;
          port_name?: string;
          arrival_time?: string | null;
          departure_time?: string | null;
          is_sea_day?: boolean;
          description?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          created_at?: string;
        };
      };
      cruise_pricing: {
        Row: {
          id: string;
          cruise_id: string;
          cabin_category_id: string;
          price_per_person_cents: number;
          taxes_fees_cents: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          cruise_id: string;
          cabin_category_id: string;
          price_per_person_cents: number;
          taxes_fees_cents?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          cruise_id?: string;
          cabin_category_id?: string;
          price_per_person_cents?: number;
          taxes_fees_cents?: number;
          created_at?: string;
        };
      };
      bookings: {
        Row: {
          id: string;
          user_id: string;
          cruise_id: string;
          cabin_id: string | null;
          cabin_category_id: string;
          booking_reference: string;
          status: string;
          total_price_cents: number;
          passenger_count: number;
          special_requests: string | null;
          booked_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          cruise_id: string;
          cabin_id?: string | null;
          cabin_category_id: string;
          booking_reference?: string;
          status?: string;
          total_price_cents: number;
          passenger_count?: number;
          special_requests?: string | null;
          booked_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          cruise_id?: string;
          cabin_id?: string | null;
          cabin_category_id?: string;
          booking_reference?: string;
          status?: string;
          total_price_cents?: number;
          passenger_count?: number;
          special_requests?: string | null;
          booked_at?: string;
          updated_at?: string;
        };
      };
      passengers: {
        Row: {
          id: string;
          booking_id: string;
          first_name: string;
          last_name: string;
          date_of_birth: string | null;
          nationality: string | null;
          passport_number: string | null;
          is_lead_passenger: boolean;
          emergency_contact_name: string | null;
          emergency_contact_phone: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          booking_id: string;
          first_name: string;
          last_name: string;
          date_of_birth?: string | null;
          nationality?: string | null;
          passport_number?: string | null;
          is_lead_passenger?: boolean;
          emergency_contact_name?: string | null;
          emergency_contact_phone?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          booking_id?: string;
          first_name?: string;
          last_name?: string;
          date_of_birth?: string | null;
          nationality?: string | null;
          passport_number?: string | null;
          is_lead_passenger?: boolean;
          emergency_contact_name?: string | null;
          emergency_contact_phone?: string | null;
          created_at?: string;
        };
      };
      events: {
        Row: {
          id: string;
          cruise_id: string;
          deck_id: string | null;
          amenity_id: string | null;
          title: string;
          description: string | null;
          category: string;
          day_number: number;
          start_time: string;
          end_time: string;
          location_name: string | null;
          image_url: string | null;
          is_free: boolean;
          capacity: number | null;
          requires_reservation: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          cruise_id: string;
          deck_id?: string | null;
          amenity_id?: string | null;
          title: string;
          description?: string | null;
          category: string;
          day_number: number;
          start_time: string;
          end_time: string;
          location_name?: string | null;
          image_url?: string | null;
          is_free?: boolean;
          capacity?: number | null;
          requires_reservation?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          cruise_id?: string;
          deck_id?: string | null;
          amenity_id?: string | null;
          title?: string;
          description?: string | null;
          category?: string;
          day_number?: number;
          start_time?: string;
          end_time?: string;
          location_name?: string | null;
          image_url?: string | null;
          is_free?: boolean;
          capacity?: number | null;
          requires_reservation?: boolean;
          created_at?: string;
        };
      };
      user_event_favorites: {
        Row: {
          id: string;
          user_id: string;
          event_id: string;
          remind_before_minutes: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          event_id: string;
          remind_before_minutes?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          event_id?: string;
          remind_before_minutes?: number | null;
          created_at?: string;
        };
      };
      timezone_schedule: {
        Row: {
          id: string;
          cruise_id: string;
          effective_from_day: number;
          effective_time: string;
          timezone_offset: string;
          timezone_name: string;
          iana_timezone: string;
          direction: string | null;
          minutes_change: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          cruise_id: string;
          effective_from_day: number;
          effective_time?: string;
          timezone_offset: string;
          timezone_name: string;
          iana_timezone: string;
          direction?: string | null;
          minutes_change?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          cruise_id?: string;
          effective_from_day?: number;
          effective_time?: string;
          timezone_offset?: string;
          timezone_name?: string;
          iana_timezone?: string;
          direction?: string | null;
          minutes_change?: number | null;
          created_at?: string;
        };
      };
      user_profiles: {
        Row: {
          id: string;
          user_id: string;
          display_name: string | null;
          home_timezone: string;
          avatar_url: string | null;
          phone: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          display_name?: string | null;
          home_timezone?: string;
          avatar_url?: string | null;
          phone?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          display_name?: string | null;
          home_timezone?: string;
          avatar_url?: string | null;
          phone?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      terminals: {
        Row: {
          id: string;
          name: string;
          city: string;
          state: string | null;
          country: string;
          address: string;
          latitude: number;
          longitude: number;
          description: string | null;
          image_url: string | null;
          parking_info: string | null;
          luggage_dropoff_info: string | null;
          check_in_hours: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          city: string;
          state?: string | null;
          country: string;
          address: string;
          latitude: number;
          longitude: number;
          description?: string | null;
          image_url?: string | null;
          parking_info?: string | null;
          luggage_dropoff_info?: string | null;
          check_in_hours?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          city?: string;
          state?: string | null;
          country?: string;
          address?: string;
          latitude?: number;
          longitude?: number;
          description?: string | null;
          image_url?: string | null;
          parking_info?: string | null;
          luggage_dropoff_info?: string | null;
          check_in_hours?: string | null;
          created_at?: string;
        };
      };
      transport_options: {
        Row: {
          id: string;
          terminal_id: string;
          type: string;
          name: string;
          description: string | null;
          estimated_cost: string | null;
          booking_url: string | null;
          phone: string | null;
          notes: string | null;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          terminal_id: string;
          type: string;
          name: string;
          description?: string | null;
          estimated_cost?: string | null;
          booking_url?: string | null;
          phone?: string | null;
          notes?: string | null;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          terminal_id?: string;
          type?: string;
          name?: string;
          description?: string | null;
          estimated_cost?: string | null;
          booking_url?: string | null;
          phone?: string | null;
          notes?: string | null;
          sort_order?: number;
          created_at?: string;
        };
      };
    };
  };
};
