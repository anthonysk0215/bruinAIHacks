import { Conversation, Message } from '../types/index';
import { supabase } from '../lib/supabaseClient';

export const conversationService = {
  async getConversations(): Promise<Conversation[]> {
    const { data, error } = await supabase
      .from('conversations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching conversations:', error);
      return [];
    }
    return data || [];
  },

  async saveConversation(messages: Message[]): Promise<Conversation> {
    const { data, error } = await supabase
      .from('conversations')
      .insert({
        messages,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Error saving conversation:', error);
      throw new Error('Failed to save conversation');
    }
    return data;
  },

  async deleteConversation(conversationId: string): Promise<void> {
    const { error } = await supabase
      .from('conversations')
      .delete()
      .eq('created_at', conversationId);

    if (error) {
      console.error('Error deleting conversation:', error);
      throw new Error('Failed to delete conversation');
    }
  }
};
