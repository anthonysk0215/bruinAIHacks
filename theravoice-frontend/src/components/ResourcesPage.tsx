import React from 'react';
import { Box, Typography, Card, CardContent, Link, List, ListItem, ListItemText, Paper, ListItemIcon, Grid } from '@mui/material';
import PsychologyIcon from '@mui/icons-material/Psychology';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PhoneIcon from '@mui/icons-material/Phone';
import MessageIcon from '@mui/icons-material/Message';
import SpaIcon from '@mui/icons-material/Spa';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { motion, useScroll, useTransform } from 'framer-motion';

const ResourcesPage: React.FC = () => {
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
        minHeight: '100vh'
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
            Therapeutic Resources
          </Typography>
        </motion.div>

        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={6}>
            <motion.div 
              variants={itemVariants}
              whileHover="hover"
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
                      <LocalHospitalIcon sx={{ fontSize: 40, color: '#3b82f6', mr: 2 }} />
                    </motion.div>
                    <Typography 
                      variant="h4" 
                      sx={{ 
                        color: '#3b82f6',
                        borderBottom: '2px solid #1a2238',
                        pb: 2,
                        fontWeight: 'bold'
                      }}
                    >
                      Emergency Contacts
                    </Typography>
                  </Box>
                  <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <List>
                      <ListItem sx={{ 
                        mb: 3,
                        background: '#1a2238',
                        borderRadius: 2,
                        '&:hover': { background: '#232b42' },
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        p: 3
                      }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <PhoneIcon sx={{ fontSize: 30, color: 'white', mr: 1 }} />
                          <ListItemText
                            primary={
                              <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold' }}>
                                National Suicide Prevention Lifeline
                              </Typography>
                            }
                          />
                        </Box>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography component="span" sx={{ display: 'block', color: '#3b82f6', mb: 1 }}>
                            <strong>Call:</strong> <Link href="tel:988" sx={{ color: '#3b82f6', textDecoration: 'none' }}>988</Link>
                          </Typography>
                          <Typography component="span" sx={{ display: 'block', color: '#3b82f6', mb: 1 }}>
                            <strong>Website:</strong> <Link href="https://988lifeline.org/" target="_blank" sx={{ color: '#3b82f6', textDecoration: 'none' }}>988lifeline.org</Link>
                          </Typography>
                          <Typography component="span" sx={{ display: 'block', color: '#9ca3af', mt: 2, lineHeight: 1.6 }}>
                            Available 24/7 for free and confidential support. Our trained counselors provide immediate assistance to individuals in suicidal crisis or emotional distress, offering compassionate listening and connecting callers to local resources when needed.
                          </Typography>
                        </Box>
                      </ListItem>
                      <ListItem sx={{ 
                        background: '#1a2238',
                        borderRadius: 2,
                        '&:hover': { background: '#232b42' },
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        p: 3
                      }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <MessageIcon sx={{ fontSize: 30, color: 'white', mr: 1 }} />
                          <ListItemText
                            primary={
                              <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold' }}>
                                Crisis Text Line
                              </Typography>
                            }
                          />
                        </Box>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography component="span" sx={{ display: 'block', color: '#3b82f6', mb: 1 }}>
                            <strong>Text:</strong> HOME to 741741
                          </Typography>
                          <Typography component="span" sx={{ display: 'block', color: '#3b82f6', mb: 1 }}>
                            <strong>Website:</strong> <Link href="https://www.crisistextline.org/" target="_blank" sx={{ color: '#3b82f6', textDecoration: 'none' }}>crisistextline.org</Link>
                          </Typography>
                          <Typography component="span" sx={{ display: 'block', color: '#9ca3af', mt: 2, lineHeight: 1.6 }}>
                            Free 24/7 text support for any type of crisis. Our trained crisis counselors provide immediate support and resources through text messaging, offering a safe space to discuss mental health concerns, relationship issues, and other challenges.
                          </Typography>
                        </Box>
                      </ListItem>
                    </List>
                  </Box>
                </CardContent>
              </Paper>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div 
              variants={itemVariants}
              whileHover="hover"
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
                        borderBottom: '2px solid #1a2238',
                        pb: 2,
                        fontWeight: 'bold'
                      }}
                    >
                      Mental Health Resources
                    </Typography>
                  </Box>
                  <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Box sx={{ 
                      display: 'flex', 
                      flexWrap: 'wrap', 
                      gap: 3, 
                      justifyContent: 'center' 
                    }}>
                      <Box sx={{ 
                        flex: '1 1 300px', 
                        maxWidth: '400px' 
                      }}>
                        <Card variant="outlined" sx={{ 
                          height: '100%',
                          minHeight: '300px',
                          background: '#1a2238',
                          border: '1px solid #1a2238',
                          '&:hover': { background: '#232b42' },
                          borderRadius: 2,
                          display: 'flex',
                          flexDirection: 'column'
                        }}>
                          <CardContent sx={{ p: 3, textAlign: 'center', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <Typography variant="h5" gutterBottom sx={{ color: 'white', fontWeight: 'bold', mb: 2 }}>
                              NAMI
                            </Typography>
                            <Typography variant="body1" paragraph sx={{ color: '#9ca3af', lineHeight: 1.6 }}>
                              The National Alliance on Mental Illness (NAMI) provides comprehensive education, support, and advocacy for individuals and families affected by mental health conditions. Their programs include support groups, educational courses, and advocacy initiatives to improve mental health care and reduce stigma.
                            </Typography>
                            <Link href="https://www.nami.org/" target="_blank" sx={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 'bold' }}>
                              Visit NAMI
                            </Link>
                          </CardContent>
                        </Card>
                      </Box>
                      <Box sx={{ 
                        flex: '1 1 300px', 
                        maxWidth: '400px' 
                      }}>
                        <Card variant="outlined" sx={{ 
                          height: '100%',
                          minHeight: '300px',
                          background: '#1a2238',
                          border: '1px solid #1a2238',
                          '&:hover': { background: '#232b42' },
                          borderRadius: 2,
                          display: 'flex',
                          flexDirection: 'column'
                        }}>
                          <CardContent sx={{ p: 3, textAlign: 'center', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <Typography variant="h5" gutterBottom sx={{ color: 'white', fontWeight: 'bold', mb: 2 }}>
                              Mental Health America
                            </Typography>
                            <Typography variant="body1" paragraph sx={{ color: '#9ca3af', lineHeight: 1.6 }}>
                              Mental Health America (MHA) is a leading community-based nonprofit dedicated to addressing the needs of those living with mental illness and promoting overall mental health. They offer screening tools, educational resources, and advocacy programs to support mental wellness and early intervention.
                            </Typography>
                            <Link href="https://www.mhanational.org/" target="_blank" sx={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 'bold' }}>
                              Visit MHA
                            </Link>
                          </CardContent>
                        </Card>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Paper>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div 
              variants={itemVariants}
              whileHover="hover"
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
                      <SelfImprovementIcon sx={{ fontSize: 40, color: '#3b82f6', mr: 2 }} />
                    </motion.div>
                    <Typography 
                      variant="h4" 
                      sx={{ 
                        color: '#3b82f6',
                        borderBottom: '2px solid #1a2238',
                        pb: 2,
                        fontWeight: 'bold'
                      }}
                    >
                      Self-Help Tools
                    </Typography>
                  </Box>
                  <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Box sx={{ 
                      display: 'flex', 
                      flexWrap: 'wrap', 
                      gap: 3, 
                      justifyContent: 'center' 
                    }}>
                      <Box sx={{ 
                        flex: '1 1 300px', 
                        maxWidth: '400px' 
                      }}>
                        <Card variant="outlined" sx={{ 
                          height: '100%',
                          minHeight: '300px',
                          background: '#1a2238',
                          border: '1px solid #1a2238',
                          '&:hover': { background: '#232b42' },
                          borderRadius: 2,
                          display: 'flex',
                          flexDirection: 'column'
                        }}>
                          <CardContent sx={{ p: 3, textAlign: 'center', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                              <SpaIcon sx={{ fontSize: 30, color: '#3b82f6', mr: 1 }} />
                              <Typography variant="h5" gutterBottom sx={{ color: 'white', fontWeight: 'bold', mb: 2 }}>
                                Meditation
                              </Typography>
                            </Box>
                            <Typography variant="body1" paragraph sx={{ color: '#9ca3af', lineHeight: 1.6 }}>
                              Regular meditation practice can help reduce stress, improve focus, and promote emotional well-being. Start with just 5-10 minutes daily and gradually increase as you become more comfortable with the practice.
                            </Typography>
                            <Link href="https://www.headspace.com/" target="_blank" sx={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 'bold' }}>
                              Try Headspace
                            </Link>
                          </CardContent>
                        </Card>
                      </Box>
                      <Box sx={{ 
                        flex: '1 1 300px', 
                        maxWidth: '400px' 
                      }}>
                        <Card variant="outlined" sx={{ 
                          height: '100%',
                          minHeight: '300px',
                          background: '#1a2238',
                          border: '1px solid #1a2238',
                          '&:hover': { background: '#232b42' },
                          borderRadius: 2,
                          display: 'flex',
                          flexDirection: 'column'
                        }}>
                          <CardContent sx={{ p: 3, textAlign: 'center', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                              <FavoriteIcon sx={{ fontSize: 30, color: '#3b82f6', mr: 1 }} />
                              <Typography variant="h5" gutterBottom sx={{ color: 'white', fontWeight: 'bold', mb: 2 }}>
                                Breathing Exercises
                              </Typography>
                            </Box>
                            <Typography variant="body1" paragraph sx={{ color: '#9ca3af', lineHeight: 1.6 }}>
                              Simple breathing techniques can help calm your mind and body during moments of stress or anxiety. Practice deep, slow breathing to activate your body's relaxation response.
                            </Typography>
                            <Link href="https://www.calm.com/" target="_blank" sx={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 'bold' }}>
                              Try Calm
                            </Link>
                          </CardContent>
                        </Card>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Paper>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div 
              variants={itemVariants}
              whileHover="hover"
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
                      <EmojiEventsIcon sx={{ fontSize: 40, color: '#3b82f6', mr: 2 }} />
                    </motion.div>
                    <Typography 
                      variant="h4" 
                      sx={{ 
                        color: '#3b82f6',
                        borderBottom: '2px solid #1a2238',
                        pb: 2,
                        fontWeight: 'bold'
                      }}
                    >
                      Wellness Tips
                    </Typography>
                  </Box>
                  <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Box sx={{ 
                      display: 'flex', 
                      flexWrap: 'wrap', 
                      gap: 3, 
                      justifyContent: 'center' 
                    }}>
                      <Box sx={{ 
                        flex: '1 1 300px', 
                        maxWidth: '400px' 
                      }}>
                        <Card variant="outlined" sx={{ 
                          height: '100%',
                          minHeight: '300px',
                          background: '#1a2238',
                          border: '1px solid #1a2238',
                          '&:hover': { background: '#232b42' },
                          borderRadius: 2,
                          display: 'flex',
                          flexDirection: 'column'
                        }}>
                          <CardContent sx={{ p: 3, textAlign: 'center', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                              <FitnessCenterIcon sx={{ fontSize: 30, color: '#3b82f6', mr: 1 }} />
                              <Typography variant="h5" gutterBottom sx={{ color: 'white', fontWeight: 'bold', mb: 2 }}>
                                Daily Practices
                              </Typography>
                            </Box>
                            <Typography variant="body1" paragraph sx={{ color: '#9ca3af', lineHeight: 1.6 }}>
                              Establish a daily routine that includes time for self-care, exercise, and relaxation. Consistency in these practices can significantly improve your overall well-being and mental health.
                            </Typography>
                          </CardContent>
                        </Card>
                      </Box>
                      <Box sx={{ 
                        flex: '1 1 300px', 
                        maxWidth: '400px' 
                      }}>
                        <Card variant="outlined" sx={{ 
                          height: '100%',
                          minHeight: '300px',
                          background: '#1a2238',
                          border: '1px solid #1a2238',
                          '&:hover': { background: '#232b42' },
                          borderRadius: 2,
                          display: 'flex',
                          flexDirection: 'column'
                        }}>
                          <CardContent sx={{ p: 3, textAlign: 'center', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                              <RestaurantIcon sx={{ fontSize: 30, color: '#3b82f6', mr: 1 }} />
                              <Typography variant="h5" gutterBottom sx={{ color: 'white', fontWeight: 'bold', mb: 2 }}>
                                Stress Management
                              </Typography>
                            </Box>
                            <Typography variant="body1" paragraph sx={{ color: '#9ca3af', lineHeight: 1.6 }}>
                              Learn effective stress management techniques such as time management, setting boundaries, and practicing mindfulness to maintain a healthy balance in your life.
                            </Typography>
                          </CardContent>
                        </Card>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Box>
    </motion.div>
  );
};

export default ResourcesPage; 