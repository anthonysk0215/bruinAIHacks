import React from 'react';

interface Message {
  text: string;
  isUser: boolean;
  timestamp: string;
}

interface Conversation {
  id: string;
  timestamp: string;
  messages: Message[];
}

interface ChatHistoryProps {
  onBack: () => void;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ onBack }) => {
  const [conversations, setConversations] = React.useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = React.useState<string | null>(null);

  React.useEffect(() => {
    // Load conversations from localStorage
    const savedConversations = localStorage.getItem('conversations');
    if (savedConversations) {
      setConversations(JSON.parse(savedConversations));
    }
  }, []);

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const deleteConversation = (id: string) => {
    const updatedConversations = conversations.filter(conv => conv.id !== id);
    setConversations(updatedConversations);
    localStorage.setItem('conversations', JSON.stringify(updatedConversations));
    if (selectedConversation === id) {
      setSelectedConversation(null);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#0a0c10]">
      {/* Header */}
      <div className="h-16 border-b border-[#1e2030] flex items-center justify-between px-6">
        <button 
          onClick={onBack}
          className="text-gray-400 hover:text-white flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-[#3b82f6] to-[#60a5fa] bg-clip-text text-transparent">
          Chat History
        </h1>
        <div className="w-20" /> {/* Spacer */}
      </div>

      {/* Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Conversation List */}
        <div className="w-1/3 border-r border-[#1e2030] overflow-y-auto p-4 space-y-4">
          {conversations.length === 0 ? (
            <div className="text-gray-400 text-center mt-8">
              No conversations yet
            </div>
          ) : (
            conversations.map((conv) => (
              <div
                key={conv.id}
                className={`p-4 rounded-lg cursor-pointer transition-colors ${
                  selectedConversation === conv.id
                    ? 'bg-[#3b82f6] bg-opacity-20'
                    : 'bg-[#1e2030] hover:bg-[#2a2d3d]'
                }`}
                onClick={() => setSelectedConversation(conv.id)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="text-sm text-gray-400">
                    {formatDate(conv.timestamp)}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteConversation(conv.id);
                    }}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                <div className="text-white truncate">
                  {conv.messages[0]?.text || 'Empty conversation'}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Message View */}
        <div className="flex-1 overflow-y-auto p-6">
          {selectedConversation ? (
            <div className="space-y-4">
              {conversations
                .find(conv => conv.id === selectedConversation)
                ?.messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-4 ${
                        message.isUser
                          ? 'bg-[#3b82f6] text-white'
                          : 'bg-[#1e2030] text-gray-200'
                      }`}
                    >
                      <div className="text-sm text-opacity-80 mb-1">
                        {message.isUser ? 'You' : 'Therapist'} • {formatDate(message.timestamp)}
                      </div>
                      {message.text}
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-gray-400 text-center mt-8">
              Select a conversation to view messages
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatHistory; 