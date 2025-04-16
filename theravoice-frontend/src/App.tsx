import { useState } from 'react';
import { 
  Box, 
  Container, 
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
    mode: 'light',
    primary: {
      main: '#4a90e2',
    },
    secondary: {
      main: '#f50057',
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

  const handleStartRecording = () => {
    setIsRecording(true);
    // TODO: Implement speech recognition
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    // TODO: Stop speech recognition
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="theravoice-theme">
      <div className="relative flex flex-col h-screen bg-[#0a0c10]">
        {/* Top Bar with Logo and Account Menu */}
        <div className="h-16 border-b border-[#1e2030] flex items-center justify-between px-6">
          <div className="flex-1" /> {/* Spacer */}
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#3b82f6] to-[#60a5fa] bg-clip-text text-transparent">
            TheraVoice
          </Typography>
          
          <Paper 
            elevation={3} 
            sx={{ 
              flex: 1, 
              p: 2, 
              mb: 2, 
              overflow: 'auto',
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
                  bgcolor: message.isUser ? 'primary.main' : 'grey.100',
                  color: message.isUser ? 'white' : 'text.primary',
                }}
              >
                <Typography>{message.text}</Typography>
              </Box>
            ))}
          </Paper>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <IconButton
              color={isRecording ? 'secondary' : 'primary'}
              onClick={isRecording ? handleStopRecording : handleStartRecording}
              sx={{ 
                width: 64, 
                height: 64,
                bgcolor: isRecording ? 'secondary.light' : 'primary.light',
                '&:hover': {
                  bgcolor: isRecording ? 'secondary.main' : 'primary.main',
                }
              }}
            >
              {isRecording ? <StopIcon /> : <MicIcon />}
            </IconButton>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
