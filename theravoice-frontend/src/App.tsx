import { useEffect } from 'react';
import { 
  ThemeProvider,
  createTheme,
  CssBaseline
} from '@mui/material';

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
  useEffect(() => {
    // Load the ElevenLabs widget script
    const script = document.createElement('script');
    script.src = 'https://elevenlabs.io/convai-widget/index.js';
    script.async = true;
    script.type = 'text/javascript';
    document.body.appendChild(script);

    return () => {
      // Cleanup script on component unmount
      document.body.removeChild(script);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="relative flex flex-col min-h-screen bg-[#0a0c10]">
        {/* Top Bar with Logo */}
        <div className="h-16 border-b border-[#1e2030] flex items-center justify-between px-6">
          <div className="flex-1" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#3b82f6] to-[#60a5fa] bg-clip-text text-transparent">
            TheraVoice
          </h1>
          <div className="flex-1 flex justify-end">
            <button className="text-gray-400 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
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
