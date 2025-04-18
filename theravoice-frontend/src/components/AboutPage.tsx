import {
  Typography,
  Paper,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  CardContent,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SupportIcon from '@mui/icons-material/Support';
import SecurityIcon from '@mui/icons-material/Security';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PsychologyIcon from '@mui/icons-material/Psychology';
import HandshakeIcon from '@mui/icons-material/Handshake';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { motion, useScroll, useTransform } from 'framer-motion';

export const AboutPage = () => {
  const { scrollYProgress } = useScroll();
  
  // Scroll-based animations
  const titleScale = useTransform(scrollYProgress, [0, 0.1], [1, 1.1]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.8]);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { 
      y: 50,
      opacity: 0,
      scale: 0.8
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const fadeUpVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const iconVariants = {
    hidden: { rotate: -180, opacity: 0 },
    visible: {
      rotate: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    },
    hover: {
      rotate: 360,
      transition: {
        duration: 1,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={{ width: '100%' }}
    >
      <Box sx={{ 
        p: 6, 
        maxWidth: 1400, 
        margin: '0 auto',
        background: '#0a0c10',
        minHeight: '100vh',
      }}>
        <motion.div
          style={{
            scale: titleScale,
            opacity: titleOpacity
          }}
          variants={fadeUpVariants}
        >
          <Typography 
            variant="h2" 
            gutterBottom 
            sx={{ 
              color: '#3b82f6',
              mb: 8,
              textAlign: 'center',
              fontWeight: 'bold',
              textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
              fontSize: { xs: '2rem', md: '2.5rem' }
            }}
          >
            About TheraVoice
          </Typography>
        </motion.div>

        <Box sx={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: 6, 
          justifyContent: 'center' 
        }}>
          <motion.div 
            variants={itemVariants}
            whileHover="hover"
            style={{ flex: '1 1 500px', maxWidth: '600px' }}
          >
            <Paper elevation={3} sx={{ 
              height: '100%',
              minHeight: '600px',
              background: '#0a0c10',
              border: '1px solid #1e2030',
              borderRadius: 2,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              cursor: 'pointer'
            }}>
              <CardContent sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <motion.div variants={iconVariants}>
                    <PsychologyIcon sx={{ fontSize: 40, color: '#3b82f6', mr: 2 }} />
                  </motion.div>
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      color: '#3b82f6',
                      borderBottom: '2px solid #1e2030',
                      pb: 2,
                      fontWeight: 'bold'
                    }}
                  >
                    Our Mission
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ color: '#9ca3af', mb: 4, fontSize: '1.1rem', lineHeight: 1.8 }}>
                  TheraVoice is your supportive AI companion, designed to provide a safe, judgment-free space for emotional expression and mental wellness support. Through natural conversation, we offer comfort, understanding, and a listening ear whenever you need it, day or night.
                </Typography>

                <Box sx={{ mb: 4 }}>
                  <Box sx={{ p: 3, background: '#1e2030', borderRadius: 2, '&:hover': { background: '#2a2d40' } }}>
                    <Typography variant="h5" sx={{ color: 'white', mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                      <PsychologyIcon sx={{ color: '#3b82f6' }} />
                      How TheraVoice Helps
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#9ca3af', mb: 2, lineHeight: 1.8 }}>
                      Our AI companion engages in meaningful conversations, offering emotional support and practical coping strategies. Whether you're feeling anxious, stressed, or just need someone to talk to, TheraVoice is here to listen and respond with empathy and understanding.
                    </Typography>
                  </Box>
                </Box>

                <Divider sx={{ my: 4, borderColor: '#1e2030' }} />

                <Typography variant="h5" sx={{ color: 'white', mb: 3 }}>Key Benefits</Typography>
                <List>
                  <ListItem sx={{ background: '#1e2030', mb: 2, borderRadius: 2, '&:hover': { background: '#2a2d40' } }}>
                    <ListItemIcon>
                      <AccessTimeIcon sx={{ color: '#3b82f6' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={<Typography sx={{ color: 'white', fontWeight: 'bold' }}>24/7 Availability</Typography>}
                      secondary={<Typography sx={{ color: '#9ca3af' }}>Access emotional support anytime, anywhere, without scheduling or waiting.</Typography>}
                    />
                  </ListItem>
                  <ListItem sx={{ background: '#1e2030', mb: 2, borderRadius: 2, '&:hover': { background: '#2a2d40' } }}>
                    <ListItemIcon>
                      <SecurityIcon sx={{ color: '#3b82f6' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={<Typography sx={{ color: 'white', fontWeight: 'bold' }}>Safe Space</Typography>}
                      secondary={<Typography sx={{ color: '#9ca3af' }}>Share your thoughts in a private, judgment-free environment with complete confidentiality.</Typography>}
                    />
                  </ListItem>
                  <ListItem sx={{ background: '#1e2030', mb: 2, borderRadius: 2, '&:hover': { background: '#2a2d40' } }}>
                    <ListItemIcon>
                      <SupportIcon sx={{ color: '#3b82f6' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={<Typography sx={{ color: 'white', fontWeight: 'bold' }}>Personalized Support</Typography>}
                      secondary={<Typography sx={{ color: '#9ca3af' }}>Receive tailored responses that address your unique emotional needs and concerns.</Typography>}
                    />
                  </ListItem>
                  <ListItem sx={{ background: '#1e2030', mb: 2, borderRadius: 2, '&:hover': { background: '#2a2d40' } }}>
                    <ListItemIcon>
                      <HandshakeIcon sx={{ color: '#3b82f6' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={<Typography sx={{ color: 'white', fontWeight: 'bold' }}>Complementary Care</Typography>}
                      secondary={<Typography sx={{ color: '#9ca3af' }}>Works alongside professional therapy, providing additional support between sessions.</Typography>}
                    />
                  </ListItem>
                </List>

                <Divider sx={{ my: 4, borderColor: '#1e2030' }} />

                <Box sx={{ mb: 4 }}>
                  <Box sx={{ p: 3, background: '#1e2030', borderRadius: 2, '&:hover': { background: '#2a2d40' } }}>
                    <Typography variant="h5" sx={{ color: 'white', mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                      <FavoriteIcon sx={{ color: '#3b82f6' }} />
                      Our Commitment
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#9ca3af', lineHeight: 1.8 }}>
                      While TheraVoice is not a replacement for professional mental health care, we're committed to being a supportive presence in your mental wellness journey. We provide a compassionate ear, emotional support, and gentle guidance while encouraging you to seek professional help when needed.
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ mt: 6, p: 3, background: '#1e2030', borderRadius: 2, '&:hover': { background: '#2a2d40' } }}>
                  <Typography variant="h6" sx={{ mb: 2, color: 'white', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 2 }}>
                    <PlayCircleIcon sx={{ color: '#3b82f6' }} />
                    Getting Started
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#9ca3af', lineHeight: 1.8 }}>
                    Simply click the "Start a chat" button on the home page and begin speaking. TheraVoice will listen and respond with understanding and support. You can share your thoughts, feelings, or concerns, and our AI companion will engage in a meaningful conversation aimed at providing comfort and emotional support.
                  </Typography>
                </Box>
              </CardContent>
            </Paper>
          </motion.div>
        </Box>
      </Box>
    </motion.div>
  );
}; 