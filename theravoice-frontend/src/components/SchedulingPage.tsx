import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Alert,
  Snackbar,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  CardContent,
  ListItemIcon,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabaseClient';
import DeleteIcon from '@mui/icons-material/Delete';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { format } from 'date-fns';
import { motion, useScroll, useTransform } from 'framer-motion';

export const SchedulingPage: React.FC = () => {
  const { user } = useAuth();
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [appointments, setAppointments] = useState<any[]>([]);

  const { scrollYProgress } = useScroll();
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
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
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
            Schedule Your Session
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
              background: '#0a0c10',
              border: '1px solid #1e2030',
              borderRadius: 2,
              overflow: 'hidden',
            }}>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                  <motion.div variants={iconVariants}>
                    <CalendarMonthIcon sx={{ fontSize: 40, color: '#3b82f6', mr: 2 }} />
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
                    New Session
                  </Typography>
                </Box>

                <Box sx={{ p: 3, background: '#1e2030', borderRadius: 2, mb: 4, '&:hover': { background: '#2a2d40' } }}>
                  <Typography variant="body1" sx={{ color: '#9ca3af', mb: 4, fontSize: '1.1rem', lineHeight: 1.8 }}>
                    Choose your preferred date and time for your therapy session. Our AI therapist is available 24/7 to provide support and guidance.
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
                      py: 1.5,
                      fontSize: '1.1rem',
                      '&:hover': {
                        bgcolor: '#2563eb',
                      },
                    }}
                  >
                    {loading ? 'Scheduling...' : 'Schedule Session'}
                  </Button>
                </Box>

                <Divider sx={{ my: 4, borderColor: '#1e2030' }} />

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                  <motion.div variants={iconVariants}>
                    <EventAvailableIcon sx={{ fontSize: 40, color: '#3b82f6', mr: 2 }} />
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
                    Upcoming Sessions
                  </Typography>
                </Box>

                {appointments.length === 0 ? (
                  <Box sx={{ p: 3, background: '#1e2030', borderRadius: 2, '&:hover': { background: '#2a2d40' } }}>
                    <Typography sx={{ color: '#9ca3af', textAlign: 'center', fontSize: '1.1rem' }}>
                      No upcoming sessions scheduled
                    </Typography>
                  </Box>
                ) : (
                  <List>
                    {appointments.map((appointment, index) => (
                      <motion.div
                        key={appointment.id}
                        variants={itemVariants}
                        whileHover="hover"
                      >
                        <ListItem sx={{ 
                          background: '#1e2030',
                          mb: 2,
                          borderRadius: 2,
                          '&:hover': { background: '#2a2d40' }
                        }}>
                          <ListItemIcon>
                            <AccessTimeIcon sx={{ color: '#3b82f6' }} />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography sx={{ color: 'white', fontWeight: 'bold' }}>
                                {format(new Date(appointment.appointment_time), 'MMMM d, yyyy')}
                              </Typography>
                            }
                            secondary={
                              <Typography sx={{ color: '#9ca3af' }}>
                                {format(new Date(appointment.appointment_time), 'h:mm a')}
                              </Typography>
                            }
                          />
                          <ListItemSecondaryAction>
                            <IconButton
                              edge="end"
                              onClick={() => handleCancelAppointment(appointment.id)}
                              sx={{ 
                                color: '#ef4444',
                                '&:hover': {
                                  color: '#dc2626',
                                  bgcolor: 'rgba(239, 68, 68, 0.1)'
                                }
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      </motion.div>
                    ))}
                  </List>
                )}
              </CardContent>
            </Paper>
          </motion.div>
        </Box>
      </Box>

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
    </motion.div>
  );
}; 