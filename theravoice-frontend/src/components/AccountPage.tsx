import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button, TextField, Typography, Box, Paper } from '@mui/material';
import { supabase } from '../lib/supabaseClient';

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
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Account Settings
        </Typography>
        
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Profile Information
          </Typography>
          
          {isEditing ? (
            <>
              <TextField
                fullWidth
                label="Display Name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Email"
                value={email}
                disabled
                margin="normal"
              />
              <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                <Button variant="contained" onClick={handleSave}>
                  Save Changes
                </Button>
                <Button variant="outlined" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Typography variant="body1">
                <strong>Display Name:</strong> {displayName || 'Not set'}
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                <strong>Email:</strong> {email}
              </Typography>
              <Button
                variant="contained"
                onClick={() => setIsEditing(true)}
                sx={{ mt: 2 }}
              >
                Edit Profile
              </Button>
            </>
          )}
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Account Actions
          </Typography>
          <Button
            variant="outlined"
            color="error"
            onClick={signOut}
          >
            Sign Out
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}; 