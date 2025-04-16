import { useState } from 'react';
import { ThemeProvider } from './components/theme-provider';
import { MicButton } from './components/mic-button';
import { AccountMenu } from './components/account-menu';

interface Message {
  text: string;
  isUser: boolean;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isRecording, setIsRecording] = useState<boolean>(false);

  const handleStartRecording = (): void => {
    setIsRecording(true);
  };

  const handleStopRecording = (): void => {
    setIsRecording(false);
  };

  const handleLogout = (): void => {
    // TODO: Implement logout functionality
    console.log('Logging out...');
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="theravoice-theme">
      <div className="relative flex flex-col h-screen bg-[#0a0c10]">
        {/* Top Bar with Logo and Account Menu */}
        <div className="h-16 border-b border-[#1e2030] flex items-center justify-between px-6">
          <div className="flex-1" /> {/* Spacer */}
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#3b82f6] to-[#60a5fa] bg-clip-text text-transparent">
            TheraVoice
          </h1>
          <div className="flex-1 flex justify-end">
            <AccountMenu onLogout={handleLogout} />
          </div>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="text-center mb-24">
            <h2 className="text-4xl font-bold text-white mb-4">Speak Your Mind</h2>
            <p className="text-gray-400 text-center max-w-md text-lg">
              Press the mic button and start talking. TheraVoice is here to listen and support you.
            </p>
          </div>
          <div className="relative">
            <MicButton
              isRecording={isRecording}
              onStartRecording={handleStartRecording}
              onStopRecording={handleStopRecording}
            />
          </div>
        </main>

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
