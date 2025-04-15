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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ height: '100vh', py: 4 }}>
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h4" component="h1" gutterBottom align="center" color="primary">
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
