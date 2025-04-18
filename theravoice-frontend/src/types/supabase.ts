export type Database = {
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
    };
  };
}; 