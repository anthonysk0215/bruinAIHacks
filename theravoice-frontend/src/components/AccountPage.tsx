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
  Chip
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SecurityIcon from '@mui/icons-material/Security';
import LogoutIcon from '@mui/icons-material/Logout';
import ConstructionIcon from '@mui/icons-material/Construction';

export const AccountPage = () => {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" 
        className="bg-gradient-to-r from-[#3b82f6] to-[#60a5fa] bg-clip-text text-transparent"
        sx={{ mb: 4, fontWeight: 'bold', textAlign: 'center' }}
      >
        Account Settings
      </Typography>

      <Alert 
        severity="info" 
        sx={{ mb: 3 }}
        icon={<ConstructionIcon />}
      >
        Account management features are coming soon! These features are currently in development.
      </Alert>

      <Paper elevation={3} sx={{ p: 4, mb: 4, position: 'relative' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
          <AccountCircleIcon color="primary" />
          <Typography variant="h5">Update Username</Typography>
          <Chip label="Coming Soon" color="primary" size="small" />
        </Box>
        <form>
          <TextField
            fullWidth
            disabled
            label="Current Username"
            value="user123"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            disabled
            label="New Username"
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled
          >
            Update Username
          </Button>
        </form>
      </Paper>

      <Paper elevation={3} sx={{ p: 4, mb: 4, position: 'relative' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
          <SecurityIcon color="primary" />
          <Typography variant="h5">Change Password</Typography>
          <Chip label="Coming Soon" color="primary" size="small" />
        </Box>
        <form>
          <TextField
            fullWidth
            disabled
            type="password"
            label="Current Password"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            disabled
            type="password"
            label="New Password"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            disabled
            type="password"
            label="Confirm New Password"
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled
          >
            Update Password
          </Button>
        </form>
      </Paper>

      <Paper elevation={3} sx={{ p: 4, position: 'relative' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
          <LogoutIcon color="error" />
          <Typography variant="h5">Session</Typography>
          <Chip label="Coming Soon" color="primary" size="small" />
        </Box>
        <Typography variant="body1" sx={{ mb: 3 }}>
          End your current session and return to the login page.
        </Typography>
        <Button
          variant="contained"
          color="error"
          startIcon={<LogoutIcon />}
          disabled
        >
          Logout
        </Button>
      </Paper>
    </Container>
  );
}; 