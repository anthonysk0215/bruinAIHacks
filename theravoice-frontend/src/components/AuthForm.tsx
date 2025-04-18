import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
  useTheme,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

export const AuthForm = () => {
  const { signIn, signUp } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) throw error;
      } else {
        const { error } = await signUp(email, password, fullName);
        if (error) throw error;
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during authentication');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#0a0c10',
        p: 3,
        background: 'radial-gradient(circle at 50% 50%, #1a1c20 0%, #0a0c10 100%)',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          opacity: 0.1,
        },
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: '100%',
            maxWidth: 400,
            bgcolor: 'rgba(26, 28, 32, 0.95)',
            borderRadius: 3,
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(59, 130, 246, 0.1)',
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography
              variant="h2"
              component="h1"
              sx={{
                background: 'linear-gradient(45deg, #3b82f6 30%, #60a5fa 90%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                fontWeight: 'bold',
                mb: 1,
                letterSpacing: '-0.5px',
              }}
            >
              TheraVoice
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                color: '#94a3b8',
                mb: 3,
              }}
            >
              Your AI Mental Health Companion
            </Typography>
          </Box>

          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 3,
                bgcolor: 'rgba(239, 68, 68, 0.1)',
                color: '#ef4444',
                '& .MuiAlert-icon': {
                  color: '#ef4444'
                }
              }}
            >
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <TextField
                fullWidth
                label="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                margin="normal"
                required
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    color: '#e2e8f0',
                    '& fieldset': {
                      borderColor: '#2d3748',
                    },
                    '&:hover fieldset': {
                      borderColor: '#3b82f6',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#3b82f6',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#94a3b8',
                    '&.Mui-focused': {
                      color: '#3b82f6',
                    },
                  },
                }}
              />
            )}
            
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  color: '#e2e8f0',
                  '& fieldset': {
                    borderColor: '#2d3748',
                  },
                  '&:hover fieldset': {
                    borderColor: '#3b82f6',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#3b82f6',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#94a3b8',
                  '&.Mui-focused': {
                    color: '#3b82f6',
                  },
                },
              }}
            />

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: '#94a3b8' }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  color: '#e2e8f0',
                  '& fieldset': {
                    borderColor: '#2d3748',
                  },
                  '&:hover fieldset': {
                    borderColor: '#3b82f6',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#3b82f6',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#94a3b8',
                  '&.Mui-focused': {
                    color: '#3b82f6',
                  },
                },
              }}
            />

            <Button
              fullWidth
              type="submit"
              disabled={loading}
              sx={{
                py: 1.5,
                bgcolor: '#3b82f6',
                color: 'white',
                borderRadius: 2,
                fontSize: '1rem',
                fontWeight: 600,
                textTransform: 'none',
                '&:hover': {
                  bgcolor: '#2563eb',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                },
                '&:disabled': {
                  bgcolor: '#60a5fa',
                  color: 'rgba(255, 255, 255, 0.7)',
                },
                transition: 'all 0.2s ease-in-out',
              }}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: 'white' }} />
              ) : (
                isLogin ? 'Sign In' : 'Sign Up'
              )}
            </Button>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Button
                onClick={() => setIsLogin(!isLogin)}
                sx={{
                  color: '#3b82f6',
                  textTransform: 'none',
                  fontSize: '0.9rem',
                  '&:hover': {
                    bgcolor: 'rgba(59, 130, 246, 0.1)',
                  },
                }}
              >
                {isLogin
                  ? "Don't have an account? Sign Up"
                  : 'Already have an account? Sign In'}
              </Button>
            </Box>
          </form>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default AuthForm; 