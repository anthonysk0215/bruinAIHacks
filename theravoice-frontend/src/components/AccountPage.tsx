import { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Alert,
  IconButton,
  InputAdornment,
  Chip,
  Card,
  CardContent
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SecurityIcon from '@mui/icons-material/Security';
import LogoutIcon from '@mui/icons-material/Logout';
import ConstructionIcon from '@mui/icons-material/Construction';

export const AccountPage = () => {
  return (
    <Box sx={{ 
      p: 6, 
      maxWidth: 1400, 
      margin: '0 auto',
      background: '#0a0c10',
      minHeight: '100vh'
    }}>
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
        Account Settings
      </Typography>

      <Box sx={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: 6, 
        justifyContent: 'center' 
      }}>
        <Box sx={{ 
          flex: '1 1 500px', 
          maxWidth: '600px' 
        }}>
          <Paper elevation={3} sx={{ 
            height: '100%',
            minHeight: '600px',
            background: '#0a0c10',
            border: '1px solid #1e2030',
            borderRadius: 2,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <CardContent sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <Alert 
                severity="info" 
                sx={{ 
                  mb: 3,
                  background: '#1e2030',
                  color: '#9ca3af',
                  '& .MuiAlert-icon': { color: '#3b82f6' }
                }}
                icon={<ConstructionIcon sx={{ color: '#3b82f6' }} />}
              >
                Account management features are coming soon! These features are currently in development.
              </Alert>

              <Box sx={{ p: 3, background: '#1e2030', borderRadius: 2, '&:hover': { background: '#2a2d40' }, mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
                  <AccountCircleIcon sx={{ color: '#3b82f6' }} />
                  <Typography variant="h5" sx={{ color: 'white' }}>Update Username</Typography>
                  <Chip label="Coming Soon" sx={{ background: '#3b82f6', color: 'white' }} size="small" />
                </Box>
                <form>
                  <TextField
                    fullWidth
                    disabled
                    label="Current Username"
                    value="user123"
                    sx={{ 
                      mb: 2,
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: '#1e2030' },
                        '&:hover fieldset': { borderColor: '#2a2d40' },
                        background: '#0a0c10',
                        color: '#9ca3af'
                      },
                      '& .MuiInputLabel-root': { color: '#9ca3af' }
                    }}
                  />
                  <TextField
                    fullWidth
                    disabled
                    label="New Username"
                    sx={{ 
                      mb: 2,
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: '#1e2030' },
                        '&:hover fieldset': { borderColor: '#2a2d40' },
                        background: '#0a0c10',
                        color: '#9ca3af'
                      },
                      '& .MuiInputLabel-root': { color: '#9ca3af' }
                    }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    disabled
                    sx={{ 
                      background: '#3b82f6',
                      '&:hover': { background: '#2563eb' }
                    }}
                  >
                    Update Username
                  </Button>
                </form>
              </Box>

              <Box sx={{ p: 3, background: '#1e2030', borderRadius: 2, '&:hover': { background: '#2a2d40' }, mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
                  <SecurityIcon sx={{ color: '#3b82f6' }} />
                  <Typography variant="h5" sx={{ color: 'white' }}>Change Password</Typography>
                  <Chip label="Coming Soon" sx={{ background: '#3b82f6', color: 'white' }} size="small" />
                </Box>
                <form>
                  <TextField
                    fullWidth
                    disabled
                    type="password"
                    label="Current Password"
                    sx={{ 
                      mb: 2,
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: '#1e2030' },
                        '&:hover fieldset': { borderColor: '#2a2d40' },
                        background: '#0a0c10',
                        color: '#9ca3af'
                      },
                      '& .MuiInputLabel-root': { color: '#9ca3af' }
                    }}
                  />
                  <TextField
                    fullWidth
                    disabled
                    type="password"
                    label="New Password"
                    sx={{ 
                      mb: 2,
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: '#1e2030' },
                        '&:hover fieldset': { borderColor: '#2a2d40' },
                        background: '#0a0c10',
                        color: '#9ca3af'
                      },
                      '& .MuiInputLabel-root': { color: '#9ca3af' }
                    }}
                  />
                  <TextField
                    fullWidth
                    disabled
                    type="password"
                    label="Confirm New Password"
                    sx={{ 
                      mb: 2,
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: '#1e2030' },
                        '&:hover fieldset': { borderColor: '#2a2d40' },
                        background: '#0a0c10',
                        color: '#9ca3af'
                      },
                      '& .MuiInputLabel-root': { color: '#9ca3af' }
                    }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    disabled
                    sx={{ 
                      background: '#3b82f6',
                      '&:hover': { background: '#2563eb' }
                    }}
                  >
                    Update Password
                  </Button>
                </form>
              </Box>

              <Box sx={{ p: 3, background: '#1e2030', borderRadius: 2, '&:hover': { background: '#2a2d40' } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
                  <LogoutIcon sx={{ color: '#3b82f6' }} />
                  <Typography variant="h5" sx={{ color: 'white' }}>Session</Typography>
                  <Chip label="Coming Soon" sx={{ background: '#3b82f6', color: 'white' }} size="small" />
                </Box>
                <Typography variant="body1" sx={{ color: '#9ca3af', mb: 3 }}>
                  End your current session and return to the login page.
                </Typography>
                <Button
                  variant="contained"
                  disabled
                  startIcon={<LogoutIcon />}
                  sx={{ 
                    background: '#3b82f6',
                    '&:hover': { background: '#2563eb' }
                  }}
                >
                  Logout
                </Button>
              </Box>
            </CardContent>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}; 