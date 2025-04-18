export interface Message {
  content: string;
  created_at: string;
  user_id: string;
}

export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface Appointment {
  id: string;
  user_id: string;
  user_email: string;
  appointment_time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      conversations: {
        Row: {
          id: string;
          created_at: string;
          messages: {
            content: string;
            is_user: boolean;
            created_at?: string;
          }[];
          user_id?: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          messages: {
            content: string;
            is_user: boolean;
            created_at?: string;
          }[];
          user_id?: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          messages?: {
            content: string;
            is_user: boolean;
            created_at?: string;
          }[];
          user_id?: string;
        };
      };
      appointments: {
        Row: {
          id: string;
          user_id: string;
          user_email: string;
          appointment_time: string;
          status: 'scheduled' | 'completed' | 'cancelled';
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          user_email: string;
          appointment_time: string;
          status?: 'scheduled' | 'completed' | 'cancelled';
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          user_email?: string;
          appointment_time?: string;
          status?: 'scheduled' | 'completed' | 'cancelled';
          created_at?: string;
        };
      };
    };
  };
} 