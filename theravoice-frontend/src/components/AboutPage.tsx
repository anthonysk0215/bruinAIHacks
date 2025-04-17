import {
  Container,
  Typography,
  Paper,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SupportIcon from '@mui/icons-material/Support';
import SecurityIcon from '@mui/icons-material/Security';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PsychologyIcon from '@mui/icons-material/Psychology';
import HandshakeIcon from '@mui/icons-material/Handshake';

export const AboutPage = () => {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" 
        className="bg-gradient-to-r from-[#3b82f6] to-[#60a5fa] bg-clip-text text-transparent"
        sx={{ mb: 4, fontWeight: 'bold', textAlign: 'center' }}
      >
        Your Compassionate AI Companion
      </Typography>

      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="body1" sx={{ mb: 4, fontSize: '1.1rem', lineHeight: 1.8 }}>
          TheraVoice is your supportive AI companion, designed to provide a safe, judgment-free space for emotional expression and mental wellness support. Through natural conversation, we offer comfort, understanding, and a listening ear whenever you need it, day or night.
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
            <PsychologyIcon color="primary" />
            How TheraVoice Helps
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
            Our AI companion engages in meaningful conversations, offering emotional support and practical coping strategies. Whether you're feeling anxious, stressed, or just need someone to talk to, TheraVoice is here to listen and respond with empathy and understanding.
          </Typography>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h5" sx={{ mb: 3 }}>Key Benefits</Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <AccessTimeIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="24/7 Availability" 
              secondary="Access emotional support anytime, anywhere, without scheduling or waiting."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <SecurityIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Safe Space" 
              secondary="Share your thoughts in a private, judgment-free environment with complete confidentiality."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <SupportIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Personalized Support" 
              secondary="Receive tailored responses that address your unique emotional needs and concerns."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <HandshakeIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Complementary Care" 
              secondary="Works alongside professional therapy, providing additional support between sessions."
            />
          </ListItem>
        </List>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
            <FavoriteIcon color="primary" />
            Our Commitment
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
            While TheraVoice is not a replacement for professional mental health care, we're committed to being a supportive presence in your mental wellness journey. We provide a compassionate ear, emotional support, and gentle guidance while encouraging you to seek professional help when needed.
          </Typography>
        </Box>

        <Box sx={{ mt: 6, p: 3, bgcolor: 'rgba(59, 130, 246, 0.1)', borderRadius: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
            Getting Started
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
            Simply click the "Start a chat" button on the home page and begin speaking. TheraVoice will listen and respond with understanding and support. You can share your thoughts, feelings, or concerns, and our AI companion will engage in a meaningful conversation aimed at providing comfort and emotional support.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}; 