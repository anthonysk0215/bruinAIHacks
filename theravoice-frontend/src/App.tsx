import React, { useState, useEffect } from 'react';
import { 
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  CircularProgress,
  AppBar,
  Toolbar,
  Typography,
  Button
} from '@mui/material';
import ResourcesPage from './components/ResourcesPage';
import { AboutPage } from './components/AboutPage';
import { AccountPage } from './components/AccountPage';
import { AuthForm } from './components/AuthForm';
import { useAuth } from './contexts/AuthContext';
import { SchedulingPage } from './components/SchedulingPage';
import { AuthProvider } from './contexts/AuthContext';
import { supabase } from './lib/supabaseClient';
import InfoIcon from '@mui/icons-material/Info';
import ArticleIcon from '@mui/icons-material/Article';

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

interface Message {
  content: string;
  isUser: boolean;
  timestamp: string;
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
      paper: '#1a1c20',
    },
  },
});

export const App: React.FC = () => {
  const { user, loading, signOut } = useAuth();
  const [showResources, setShowResources] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [currentConversation, setCurrentConversation] = useState<string[]>([]);
  const [showScheduling, setShowScheduling] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Load the ElevenLabs widget script
    const script = document.createElement('script');
    script.src = 'https://elevenlabs.io/convai-widget/index.js';
    script.async = true;
    script.type = 'text/javascript';
    document.body.appendChild(script);

    // Add event listeners for the widget
    const handleWidgetMessage = (event: any) => {
      if (event.detail?.type === 'message') {
        handleNewMessage(event.detail.text, event.detail.isUser);
      }
    };

    window.addEventListener('elevenlabs-conversation', handleWidgetMessage);

    return () => {
      document.body.removeChild(script);
      window.removeEventListener('elevenlabs-conversation', handleWidgetMessage);
    };
  }, []);

  // Handle new message
  const handleNewMessage = (text: string, isUser: boolean) => {
    setCurrentConversation(prev => [...prev, `${isUser ? 'You' : 'Therapist'}: ${text}`]);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return <AuthForm />;
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

  if (showAccount) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="relative flex flex-col min-h-screen bg-[#0a0c10]">
          <div className="h-16 border-b border-[#1e2030] flex items-center justify-between px-6">
            <button 
              onClick={() => setShowAccount(false)}
              className="text-gray-400 hover:text-white flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Chat
            </button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#3b82f6] to-[#60a5fa] bg-clip-text text-transparent">
              Account Settings
            </h1>
            <div className="w-24" />
          </div>
          <AccountPage />
        </div>
      </ThemeProvider>
    );
  }

  if (showAbout) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="relative flex flex-col min-h-screen bg-[#0a0c10]">
          <div className="h-16 border-b border-[#1e2030] flex items-center justify-between px-6">
            <button 
              onClick={() => setShowAbout(false)}
              className="text-gray-400 hover:text-white flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Chat
            </button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#3b82f6] to-[#60a5fa] bg-clip-text text-transparent">
              About TheraVoice
            </h1>
            <div className="w-24" />
          </div>
          <AboutPage />
        </div>
      </ThemeProvider>
    );
  }

  if (showScheduling) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="relative flex flex-col min-h-screen bg-[#0a0c10]">
          <div className="h-16 border-b border-[#1e2030] flex items-center justify-between px-6">
            <button 
              onClick={() => setShowScheduling(false)}
              className="text-gray-400 hover:text-white flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Chat
            </button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#3b82f6] to-[#60a5fa] bg-clip-text text-transparent">
              Schedule Session
            </h1>
            <div className="w-24" />
          </div>
          <SchedulingPage />
        </div>
      </ThemeProvider>
    );
  }

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ 
          minHeight: '100vh',
          bgcolor: '#0a0c10',
          color: 'white',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <AppBar position="static" sx={{ bgcolor: '#1e2030' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button 
                  color="inherit"
                  onClick={() => setShowAbout(true)}
                  startIcon={<InfoIcon />}
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.7)',
                    textTransform: 'none',
                    '&:hover': {
                      color: 'white'
                    }
                  }}
                >
                  About
                </Button>
                <Button 
                  color="inherit"
                  onClick={() => setShowScheduling(true)}
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.7)',
                    textTransform: 'none',
                    '&:hover': {
                      color: 'white'
                    }
                  }}
                >
                  Schedule Session
                </Button>
              </Box>

              <Typography 
                variant="h6" 
                component="div" 
                sx={{ 
                  color: '#3b82f6',
                  background: 'linear-gradient(90deg, #3b82f6 0%, #60a5fa 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 'bold',
                  fontSize: '1.5rem'
                }}
              >
                TheraVoice
              </Typography>

              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button 
                  color="inherit"
                  onClick={() => setShowResources(true)}
                  startIcon={<ArticleIcon />}
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.7)',
                    textTransform: 'none',
                    '&:hover': {
                      color: 'white'
                    }
                  }}
                >
                  Resources
                </Button>
                <Button 
                  color="inherit"
                  onClick={() => setShowAccount(true)}
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.7)',
                    textTransform: 'none',
                    '&:hover': {
                      color: 'white'
                    }
                  }}
                >
                  Account
                </Button>
              </Box>
            </Toolbar>
          </AppBar>

          {!user ? (
            <AuthForm />
          ) : showAccount ? (
            <AccountPage />
          ) : showScheduling ? (
            <SchedulingPage />
          ) : (
            <Box sx={{ flex: 1, p: 3 }}>
              {/* Main Content Area */}
              <div className="flex-1 flex flex-col items-center justify-center p-8">
                <div className="text-center mb-2">
                  <h2 className="text-4xl font-bold text-white mb-4">Speak Your Mind</h2>
                  <p className="text-gray-400 text-center max-w-md text-lg">
                    Press the "Start a call" button and start talking. TheraVoice is here to listen and support you.
                  </p>
                </div>

                {/* ElevenLabs Widget Container */}
                <div className="relative flex items-center justify-center w-full mt-0">
                  <style>{`
                    elevenlabs-convai {
                      --elevenlabs-convai-button-background: transparent;
                      --elevenlabs-convai-button-color: #3b82f6;
                      --elevenlabs-convai-button-border: 2px solid #3b82f6;
                      --elevenlabs-convai-button-hover-background: #3b82f6;
                      --elevenlabs-convai-button-hover-color: white;
                      --elevenlabs-convai-button-active-background: #2563eb;
                      --elevenlabs-convai-button-active-color: white;
                      position: relative;
                      top: 0;
                      left: 0;
                      transform: none;
                      z-index: 10;
                    }
                    elevenlabs-convai::part(widget) {
                      position: relative;
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
            </Box>
          )}
        </Box>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
