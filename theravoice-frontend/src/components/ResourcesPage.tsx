import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Link, List, ListItem, ListItemText } from '@mui/material';

const ResourcesPage: React.FC = () => {
  return (
    <Box sx={{ p: 3, maxWidth: 1200, margin: '0 auto' }}>
      <Typography variant="h3" gutterBottom sx={{ color: 'primary.main', mb: 4 }}>
        Therapeutic Resources
      </Typography>

      {/* Emergency Contacts */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom sx={{ color: 'error.main' }}>
            Emergency Contacts
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="National Suicide Prevention Lifeline"
                secondary={
                  <>
                    <Typography component="span" sx={{ display: 'block' }}>
                      Call: <Link href="tel:988">988</Link>
                    </Typography>
                    <Typography component="span" sx={{ display: 'block' }}>
                      Website: <Link href="https://988lifeline.org/" target="_blank">988lifeline.org</Link>
                    </Typography>
                    <Typography component="span" sx={{ display: 'block' }}>
                      24/7 free and confidential support for people in suicidal crisis or emotional distress
                    </Typography>
                  </>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Crisis Text Line"
                secondary={
                  <>
                    <Typography component="span" sx={{ display: 'block' }}>
                      Text: HOME to 741741
                    </Typography>
                    <Typography component="span" sx={{ display: 'block' }}>
                      Website: <Link href="https://www.crisistextline.org/" target="_blank">crisistextline.org</Link>
                    </Typography>
                    <Typography component="span" sx={{ display: 'block' }}>
                      24/7 text support for any type of crisis
                    </Typography>
                  </>
                }
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>

      {/* Mental Health Resources */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom sx={{ color: 'primary.main' }}>
            Mental Health Resources
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    NAMI
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Education, support, and advocacy for individuals and families affected by mental illness
                  </Typography>
                  <Link href="https://www.nami.org/" target="_blank">Visit NAMI</Link>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Mental Health America
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Resources for mental health conditions and wellness
                  </Typography>
                  <Link href="https://www.mhanational.org/" target="_blank">Visit MHA</Link>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Psychology Today
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Find licensed therapists in your area
                  </Typography>
                  <Link href="https://www.psychologytoday.com/us/therapists" target="_blank">Find a Therapist</Link>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Self-Help Tools */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom sx={{ color: 'primary.main' }}>
            Self-Help Tools
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Meditation Apps
                  </Typography>
                  <List>
                    <ListItem>
                      <Link href="https://www.headspace.com/" target="_blank">Headspace</Link>
                    </ListItem>
                    <ListItem>
                      <Link href="https://www.calm.com/" target="_blank">Calm</Link>
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Breathing Exercises
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemText primary="4-7-8 Breathing" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Box Breathing" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Diaphragmatic Breathing" />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Journaling Benefits
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemText primary="Emotional processing" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Stress reduction" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Self-reflection" />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Wellness Tips */}
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom sx={{ color: 'primary.main' }}>
            Wellness Tips
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Daily Practices
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemText primary="Regular exercise" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Healthy sleep habits" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Balanced nutrition" />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Stress Management
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemText primary="Identify stress triggers" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Practice relaxation techniques" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Set healthy boundaries" />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Self-Care
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemText primary="Prioritize rest" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Engage in hobbies" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Practice gratitude" />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ResourcesPage; 