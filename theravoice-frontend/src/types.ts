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