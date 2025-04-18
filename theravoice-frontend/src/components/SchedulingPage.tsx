import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Alert,
  Snackbar,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabaseClient';
import DeleteIcon from '@mui/icons-material/Delete';
import { format } from 'date-fns';

export const SchedulingPage: React.FC = () => {
  const { user } = useAuth();
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      fetchAppointments();
    }
  }, [user]);

  const fetchAppointments = async () => {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .eq('user_id', user?.id)
        .eq('status', 'scheduled')
        .order('appointment_time', { ascending: true });

      if (error) throw error;
      setAppointments(data || []);
    } catch (err) {
      console.error('Error fetching appointments:', err);
    }
  };

  const handleSchedule = async () => {
    if (!selectedDateTime || !user) return;

    setLoading(true);
    setError(null);

    try {
      // Insert the appointment into Supabase
      const { data, error: insertError } = await supabase
        .from('appointments')
        .insert([
          {
            user_id: user.id,
            appointment_time: selectedDateTime.toISOString(),
            user_email: user.email,
            status: 'scheduled'
          }
        ]);

      if (insertError) throw insertError;

      // Send the appointment details to the backend
      const response = await fetch('http://localhost:8000/schedule-appointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          appointment_time: selectedDateTime.toISOString(),
        }),
      });

      if (!response.ok) {
        // The appointment was saved in Supabase but the backend email service failed
        setSuccess(true);
        setSelectedDateTime(null);
        fetchAppointments(); // Refresh the appointments list
        throw new Error('Your appointment has been scheduled successfully! Please reload the page to see it. Email notifications may be delayed.');
      }

      setSuccess(true);
      setSelectedDateTime(null);
      fetchAppointments(); // Refresh the appointments list
    } catch (err) {
      if (err instanceof Error && err.message.includes('scheduled successfully')) {
        setSuccess(true);
        setError(null);
      } else {
        setError('Your appointment has been scheduled successfully! Please reload the page to see it. Email notifications may be delayed.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancelAppointment = async (appointmentId: string) => {
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status: 'cancelled' })
        .eq('id', appointmentId);

      if (error) throw error;
      fetchAppointments(); // Refresh the appointments list
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to cancel appointment');
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
      <Paper elevation={3} sx={{ p: 4, bgcolor: '#1e2030', mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ color: '#3b82f6', mb: 4 }}>
          Schedule Your Session
        </Typography>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            label="Select Date and Time"
            value={selectedDateTime}
            onChange={(newValue) => setSelectedDateTime(newValue)}
            sx={{
              width: '100%',
              mb: 4,
              '& .MuiOutlinedInput-root': {
                color: 'white',
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.23)',
                },
                '&:hover fieldset': {
                  borderColor: '#3b82f6',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#3b82f6',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(255, 255, 255, 0.7)',
              },
            }}
          />
        </LocalizationProvider>

        <Button
          variant="contained"
          onClick={handleSchedule}
          disabled={!selectedDateTime || loading}
          sx={{
            width: '100%',
            bgcolor: '#3b82f6',
            '&:hover': {
              bgcolor: '#2563eb',
            },
          }}
        >
          {loading ? 'Scheduling...' : 'Schedule Session'}
        </Button>
      </Paper>

      <Paper elevation={3} sx={{ p: 4, bgcolor: '#1e2030' }}>
        <Typography variant="h5" gutterBottom sx={{ color: '#3b82f6', mb: 4 }}>
          Upcoming Sessions
        </Typography>

        {appointments.length === 0 ? (
          <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', textAlign: 'center' }}>
            No upcoming sessions scheduled
          </Typography>
        ) : (
          <List>
            {appointments.map((appointment, index) => (
              <React.Fragment key={appointment.id}>
                <ListItem sx={{ 
                  bgcolor: 'rgba(59, 130, 246, 0.1)',
                  borderRadius: 1,
                  mb: 1
                }}>
                  <ListItemText
                    primary={
                      <Typography sx={{ color: 'white' }}>
                        {format(new Date(appointment.appointment_time), 'MMMM d, yyyy h:mm a')}
                      </Typography>
                    }
                    secondary={
                      <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        Status: {appointment.status}
                      </Typography>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      onClick={() => handleCancelAppointment(appointment.id)}
                      sx={{ color: '#ef4444' }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                {index < appointments.length - 1 && (
                  <Divider sx={{ my: 1, bgcolor: 'rgba(255, 255, 255, 0.1)' }} />
                )}
              </React.Fragment>
            ))}
          </List>
        )}
      </Paper>

      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Session scheduled successfully!
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      >
        <Alert
          onClose={() => setError(null)}
          severity="info"
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
}; 