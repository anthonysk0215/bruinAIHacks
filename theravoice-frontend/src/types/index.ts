export interface Message {
  content: string;
  is_user: boolean;
  created_at?: string;
}

export interface Conversation {
  messages: Message[];
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
} 