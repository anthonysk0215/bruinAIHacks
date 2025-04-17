import { useEffect, useState } from 'react';
import { 
  ThemeProvider,
  createTheme,
  CssBaseline
} from '@mui/material';
import ResourcesPage from './components/ResourcesPage';
import ChatHistory from './components/ChatHistory';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'elevenlabs-convai': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { 'agent-id': string }, HTMLElement>;
    }
  }
}

interface Conversation {
  id: string;
  timestamp: string;
  messages: string[];
}

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3b82f6',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#0a0c10',
      paper: '#1e2030',
    },
  },
});

function App() {
  const [showResources, setShowResources] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<string[]>([]);

  useEffect(() => {
    // Load the ElevenLabs widget script
    const script = document.createElement('script');
    script.src = 'https://elevenlabs.io/convai-widget/index.js';
    script.async = true;
    script.type = 'text/javascript';
    document.body.appendChild(script);

    // Load saved conversations from localStorage
    const savedConversations = localStorage.getItem('conversations');
    if (savedConversations) {
      setConversations(JSON.parse(savedConversations));
    }

    // Add event listeners for the widget
    const handleWidgetMessage = (event: any) => {
      if (event.detail?.type === 'message') {
        handleNewMessage(event.detail.text, event.detail.isUser);
      } else if (event.detail?.type === 'end') {
        handleConversationEnd();
      }
    };

    window.addEventListener('elevenlabs-conversation', handleWidgetMessage);

    return () => {
      document.body.removeChild(script);
      window.removeEventListener('elevenlabs-conversation', handleWidgetMessage);
    };
  }, []);

  // Save conversation when it ends
  const handleConversationEnd = () => {
    if (currentConversation.length > 0) {
      const newConversation: Conversation = {
        id: Date.now().toString(),
        timestamp: new Date().toLocaleString(),
        messages: currentConversation
      };
      
      const updatedConversations = [...conversations, newConversation];
      setConversations(updatedConversations);
      localStorage.setItem('conversations', JSON.stringify(updatedConversations));
      setCurrentConversation([]);
    }
  };

  // Handle new message
  const handleNewMessage = (text: string, isUser: boolean) => {
    setCurrentConversation(prev => [...prev, `${isUser ? 'You' : 'Therapist'}: ${text}`]);
  };

  if (showHistory) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ChatHistory onBack={() => setShowHistory(false)} />
      </ThemeProvider>
    );
  }

  if (showResources) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="relative flex flex-col min-h-screen bg-[#0a0c10]">
          {/* Top Bar with Logo and Back Button */}
          <div className="h-16 border-b border-[#1e2030] flex items-center justify-between px-6">
            <button 
              onClick={() => setShowResources(false)}
              className="text-gray-400 hover:text-white flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Chat
            </button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#3b82f6] to-[#60a5fa] bg-clip-text text-transparent">
              Therapeutic Resources
            </h1>
            <div className="w-24" /> {/* Spacer for balance */}
          </div>
          <ResourcesPage />
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="relative flex flex-col min-h-screen bg-[#0a0c10]">
        {/* Top Bar with Logo */}
        <div className="h-16 border-b border-[#1e2030] flex items-center justify-between px-6">
          <button 
            onClick={() => setShowHistory(true)}
            className="text-gray-400 hover:text-white flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            History
          </button>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#3b82f6] to-[#60a5fa] bg-clip-text text-transparent">
            TheraVoice
          </h1>
          <button 
            onClick={() => setShowResources(true)}
            className="text-gray-400 hover:text-white flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Resources
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="text-center mb-24">
            <h2 className="text-4xl font-bold text-white mb-4">Speak Your Mind</h2>
            <p className="text-gray-400 text-center max-w-md text-lg">
              Press the "Start a call" button and start talking. TheraVoice is here to listen and support you.
            </p>
          </div>

          {/* ElevenLabs Widget Container */}
          <div className="relative flex items-center justify-center w-full">
            <style>{`
              elevenlabs-convai {
                --elevenlabs-convai-button-background: transparent;
                --elevenlabs-convai-button-color: #3b82f6;
                --elevenlabs-convai-button-border: 2px solid #3b82f6;
                --elevenlabs-convai-button-hover-background: #3b82f6;
                --elevenlabs-convai-button-hover-color: white;
                --elevenlabs-convai-button-active-background: #2563eb;
                --elevenlabs-convai-button-active-color: white;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: 10;
              }
              elevenlabs-convai::part(widget) {
                position: fixed;
                bottom: unset !important;
                right: unset !important;
                transform: none !important;
              }
              elevenlabs-convai::part(start-button) {
                font-size: 0;
                width: 120px !important;
                height: 120px !important;
                border-radius: 60px !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                background: rgba(59, 130, 246, 0.1) !important;
                transition: all 0.3s ease !important;
              }
              elevenlabs-convai::part(start-button)::after {
                content: 'Start a chat';
                font-size: 1rem;
                position: absolute;
                width: max-content;
                text-align: center;
                bottom: -2rem;
                left: 50%;
                transform: translateX(-50%);
                color: #3b82f6;
              }
              elevenlabs-convai::part(start-button):hover {
                background: rgba(59, 130, 246, 0.2) !important;
                transform: scale(1.05);
              }
              elevenlabs-convai::part(microphone-icon) {
                width: 48px !important;
                height: 48px !important;
                color: #3b82f6 !important;
              }
            `}</style>
            <elevenlabs-convai agent-id="psygj8PjwBuyucio3N5d"></elevenlabs-convai>
          </div>
        </div>

        {/* Scheduled Sessions - Bottom Left */}
        <div className="absolute bottom-6 left-6">
          <div className="flex items-center text-blue-400 space-x-2 bg-[#1e2030] p-4 rounded-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <div>
              <div className="text-sm font-medium">Scheduled Sessions</div>
              <div className="text-xs text-gray-400">Next session: Tomorrow, 10:00 AM</div>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
