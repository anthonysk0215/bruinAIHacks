import { useState, useRef } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  IconButton,
  ThemeProvider,
  createTheme,
  CssBaseline
} from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';

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

interface Message {
  text: string;
  isUser: boolean;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [transcribedText, setTranscribedText] = useState('');
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const startSpeechRecognition = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Your browser does not support speech recognition. Please try Chrome or Edge.');
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsRecording(true);
      setTranscribedText('');
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join('');
      setTranscribedText(transcript);
    };

    recognition.onerror = (event: SpeechRecognitionError) => {
      console.error('Speech recognition error:', event.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
      if (transcribedText) {
        setMessages(prev => [...prev, { text: transcribedText, isUser: true }]);
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopSpeechRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsRecording(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="relative flex flex-col h-screen bg-[#0a0c10]">
        {/* Top Bar with Logo */}
        <div className="h-16 border-b border-[#1e2030] flex items-center justify-between px-6">
          <div className="flex-1" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#3b82f6] to-[#60a5fa] bg-clip-text text-transparent">
            TheraVoice
          </h1>
          <div className="flex-1" />
        </div>

        {/* Chat Container */}
        <div className="flex-1 overflow-auto p-4">
          <Paper 
            elevation={3} 
            sx={{ 
              height: '100%',
              p: 2,
              bgcolor: 'background.paper',
              display: 'flex',
              flexDirection: 'column',
              gap: 2
            }}
          >
            {messages.map((message, index) => (
              <Box
                key={index}
                sx={{
                  alignSelf: message.isUser ? 'flex-end' : 'flex-start',
                  maxWidth: '70%',
                  p: 2,
                  borderRadius: 2,
                  bgcolor: message.isUser ? 'primary.main' : 'grey.800',
                  color: message.isUser ? 'white' : 'text.primary',
                }}
              >
                <Typography>{message.text}</Typography>
              </Box>
            ))}
            {isRecording && transcribedText && (
              <Box
                sx={{
                  alignSelf: 'flex-end',
                  maxWidth: '70%',
                  p: 2,
                  borderRadius: 2,
                  bgcolor: 'primary.dark',
                  color: 'text.primary',
                }}
              >
                <Typography>{transcribedText}</Typography>
              </Box>
            )}
          </Paper>
        </div>

        {/* Microphone Button */}
        <div className="h-16 border-t border-[#1e2030] flex items-center justify-center">
          <IconButton
            color={isRecording ? 'secondary' : 'primary'}
            onClick={isRecording ? stopSpeechRecognition : startSpeechRecognition}
            sx={{ 
              width: 64, 
              height: 64,
              bgcolor: isRecording ? 'secondary.main' : 'primary.main',
              '&:hover': {
                bgcolor: isRecording ? 'secondary.dark' : 'primary.dark',
              }
            }}
          >
            {isRecording ? <StopIcon /> : <MicIcon />}
          </IconButton>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
