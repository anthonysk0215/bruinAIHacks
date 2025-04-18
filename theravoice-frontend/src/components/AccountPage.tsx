import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button, TextField, Typography, Box, Paper, Avatar, Divider, IconButton } from '@mui/material';
import { supabase } from '../lib/supabaseClient';
import { motion } from 'framer-motion';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';

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

const cardVariants = {
  hidden: { 
    opacity: 0,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  hover: {
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  }
};

export const AccountPage = () => {
  const { user, signOut } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user?.user_metadata?.full_name || '');
  const [email, setEmail] = useState(user?.email || '');

  const handleSave = async () => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: { full_name: displayName }
      });
      
      if (error) throw error;
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUpVariants}
      style={{ width: '100%' }}
    >
      <Box sx={{ 
        maxWidth: 800, 
        mx: 'auto', 
        p: 3,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <motion.div
          variants={cardVariants}
          whileHover="hover"
          style={{ width: '100%' }}
        >
          <Paper 
            elevation={3} 
            sx={{ 
              p: 4,
              background: '#0a0c10',
              border: '1px solid #1e2030',
              borderRadius: 2,
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <Box sx={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(90deg, #3b82f6 0%, #60a5fa 100%)'
            }} />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <Avatar 
                  sx={{ 
                    width: 80, 
                    height: 80, 
                    bgcolor: '#3b82f6',
                    fontSize: '2rem',
                    mr: 3
                  }}
                >
                  {displayName.charAt(0).toUpperCase()}
                </Avatar>
                <Box>
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      color: '#3b82f6',
                      fontWeight: 'bold',
                      mb: 1
                    }}
                  >
                    Account Settings
                  </Typography>
                  <Typography 
                    variant="subtitle1" 
                    sx={{ 
                      color: '#9ca3af',
                      fontSize: '1.1rem'
                    }}
                  >
                    Manage your profile information
                  </Typography>
                </Box>
              </Box>
            </motion.div>

            <Divider sx={{ 
              my: 3, 
              borderColor: '#1e2030',
              '&::before, &::after': {
                borderColor: '#1e2030'
              }
            }} />
            
            <Box sx={{ mt: 3 }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: '#3b82f6',
                    mb: 3,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <PersonIcon /> Profile Information
                </Typography>
              </motion.div>
              
              {isEditing ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <TextField
                    fullWidth
                    label="Display Name"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    margin="normal"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: 'white',
                        '& fieldset': {
                          borderColor: '#1e2030',
                        },
                        '&:hover fieldset': {
                          borderColor: '#3b82f6',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#3b82f6',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: '#9ca3af',
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    value={email}
                    disabled
                    margin="normal"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: '#9ca3af',
                        '& fieldset': {
                          borderColor: '#1e2030',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: '#9ca3af',
                      },
                    }}
                  />
                  <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                    <Button 
                      variant="contained" 
                      onClick={handleSave}
                      startIcon={<SaveIcon />}
                      sx={{ 
                        bgcolor: '#3b82f6',
                        '&:hover': {
                          bgcolor: '#2563eb',
                        }
                      }}
                    >
                      Save Changes
                    </Button>
                    <Button 
                      variant="outlined" 
                      onClick={() => setIsEditing(false)}
                      startIcon={<CancelIcon />}
                      sx={{ 
                        color: '#9ca3af',
                        borderColor: '#1e2030',
                        '&:hover': {
                          borderColor: '#3b82f6',
                          color: '#3b82f6',
                        }
                      }}
                    >
                      Cancel
                    </Button>
                  </Box>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Box sx={{ 
                    p: 3, 
                    background: '#1e2030',
                    borderRadius: 2,
                    mb: 3
                  }}>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: 'white',
                        mb: 2,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                      }}
                    >
                      <PersonIcon sx={{ color: '#3b82f6' }} />
                      <strong>Display Name:</strong> {displayName || 'Not set'}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                      }}
                    >
                      <EmailIcon sx={{ color: '#3b82f6' }} />
                      <strong>Email:</strong> {email}
                    </Typography>
                  </Box>
                  <Button
                    variant="outlined"
                    onClick={() => setIsEditing(true)}
                    startIcon={<EditIcon />}
                    sx={{ 
                      color: '#3b82f6',
                      borderColor: '#3b82f6',
                      '&:hover': {
                        borderColor: '#60a5fa',
                        color: '#60a5fa',
                      }
                    }}
                  >
                    Edit Profile
                  </Button>
                </motion.div>
              )}
            </Box>

            <Divider sx={{ 
              my: 4, 
              borderColor: '#1e2030',
              '&::before, &::after': {
                borderColor: '#1e2030'
              }
            }} />

            <Box sx={{ mt: 4 }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: '#3b82f6',
                    mb: 3,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <LogoutIcon /> Account Actions
                </Typography>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={signOut}
                  startIcon={<LogoutIcon />}
                  sx={{ 
                    color: '#ef4444',
                    borderColor: '#ef4444',
                    '&:hover': {
                      borderColor: '#dc2626',
                      color: '#dc2626',
                    }
                  }}
                >
                  Sign Out
                </Button>
              </motion.div>
            </Box>
          </Paper>
        </motion.div>
      </Box>
    </motion.div>
  );
}; 