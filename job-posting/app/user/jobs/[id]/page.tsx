'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  Avatar,
  Breadcrumbs,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Divider,
} from '@mui/material';
import {
  ArrowBack,
  LocationOn,
  Work,
  Schedule,
  Business,
  Person,
  Bookmark,
  Share,
} from '@mui/icons-material';
import Layout from '@/components/layout/Layout';
import { mockUser, mockJobs } from '@/lib/mockData';
import { useRouter, useParams } from 'next/navigation';

export default function UserJobDetailPage() {
  const router = useRouter();
  const params = useParams();
  const jobId = params.id as string;
  
  const job = mockJobs.find(j => j.id === jobId);
  const [applyDialogOpen, setApplyDialogOpen] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  if (!job) {
    return <div>Job not found</div>;
  }

  const handleLogout = () => {
    router.push('/');
  };

  const handleBack = () => {
    router.push('/user');
  };

  const handleApply = () => {
    setApplyDialogOpen(true);
  };

  const handleConfirmApply = () => {
    setHasApplied(true);
    setApplyDialogOpen(false);
  };

  return (
    <Layout user={mockUser} onLogout={handleLogout}>
      <Box sx={{ mb: 3 }}>
        <Breadcrumbs sx={{ mb: 2 }}>
          <Link 
            color="inherit" 
            href="#" 
            onClick={handleBack}
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          >
            <ArrowBack sx={{ fontSize: 16 }} />
            Back
          </Link>
          <Typography color="text.primary">Job Details</Typography>
        </Breadcrumbs>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card sx={{ borderRadius: 3, mb: 3 }}>
            <CardContent sx={{ p: 3, textAlign: 'center' }}>
              <Avatar 
                src={mockUser.avatar} 
                sx={{ width: 80, height: 80, mx: 'auto', mb: 2 }}
              />
              <Typography variant="h6" fontWeight="600" sx={{ mb: 1 }}>
                {mockUser.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {mockUser.title}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 2 }}>
                <LocationOn sx={{ fontSize: 16, color: '#64748b' }} />
                <Typography variant="body2" color="text.secondary">
                  {mockUser.location}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center', mb: 3 }}>
                {mockUser.skills?.map((skill) => (
                  <Chip key={skill} label={skill} size="small" />
                ))}
              </Box>
              <Button variant="outlined" fullWidth>
                Edit Profile
              </Button>
            </CardContent>
          </Card>

          <Card sx={{ borderRadius: 3, mb: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="600" sx={{ mb: 2 }}>
                General Information
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  📧 {mockUser.email}
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  📍 {mockUser.location}
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  💼 {mockUser.experience}
                </Typography>
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ borderRadius: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="600" sx={{ mb: 2 }}>
                My Job Coach
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Avatar sx={{ width: 40, height: 40 }}>
                  <Person />
                </Avatar>
                <Box>
                  <Typography variant="body2" fontWeight="500">
                    Jane Coach
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    HR Recruiter
                  </Typography>
                </Box>
              </Box>
              <Button variant="outlined" size="small" fullWidth>
                View Saved Jobs
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={9}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'between', alignItems: 'flex-start', mb: 3 }}>
                <Box sx={{ display: 'flex', gap: 3, flex: 1 }}>
                  <Avatar sx={{ bgcolor: '#2563eb', width: 64, height: 64 }}>
                    <Business sx={{ fontSize: 32 }} />
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h4" fontWeight="600" sx={{ mb: 1 }}>
                      {job.title}
                    </Typography>
                    <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                      {job.company}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 3, mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <LocationOn sx={{ fontSize: 16, color: '#64748b' }} />
                        <Typography variant="body2" color="text.secondary">
                          {job.location}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Work sx={{ fontSize: 16, color: '#64748b' }} />
                        <Typography variant="body2" color="text.secondary">
                          {job.type}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Schedule sx={{ fontSize: 16, color: '#64748b' }} />
                        <Typography variant="body2" color="text.secondary">
                          Posted {job.datePosted}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                      <Chip label={job.type} size="small" />
                      {job.salary && <Chip label={job.salary} size="small" variant="outlined" />}
                      <Chip label="Remote" size="small" variant="outlined" />
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button variant="outlined" startIcon={<Bookmark />}>
                    Save
                  </Button>
                  <Button variant="outlined" startIcon={<Share />}>
                    Share
                  </Button>
                  <Button 
                    variant="contained" 
                    onClick={handleApply}
                    disabled={hasApplied}
                    sx={{ minWidth: 120 }}
                  >
                    {hasApplied ? 'Applied' : 'Apply Now'}
                  </Button>
                </Box>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" fontWeight="600" sx={{ mb: 2 }}>
                Company Overview
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6 }}>
                {job.company} is a leading technology company focused on creating innovative solutions 
                that transform how people work and collaborate. We're committed to building a diverse 
                and inclusive workplace where everyone can thrive.
              </Typography>

              <Typography variant="h6" fontWeight="600" sx={{ mb: 2 }}>
                Job Description
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6 }}>
                {job.description}
              </Typography>

              <Typography variant="h6" fontWeight="600" sx={{ mb: 2 }}>
                Job Overview
              </Typography>
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={6} sm={3}>
                  <Typography variant="body2" color="text.secondary">
                    Job Type
                  </Typography>
                  <Typography variant="body2" fontWeight="500">
                    {job.type}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography variant="body2" color="text.secondary">
                    Location
                  </Typography>
                  <Typography variant="body2" fontWeight="500">
                    {job.location}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography variant="body2" color="text.secondary">
                    Salary
                  </Typography>
                  <Typography variant="body2" fontWeight="500">
                    {job.salary || 'Competitive'}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography variant="body2" color="text.secondary">
                    Experience
                  </Typography>
                  <Typography variant="body2" fontWeight="500">
                    3+ years
                  </Typography>
                </Grid>
              </Grid>

              <Typography variant="h6" fontWeight="600" sx={{ mb: 2 }}>
                Job Responsibilities
              </Typography>
              <Box component="ul" sx={{ mb: 3, pl: 2 }}>
                {job.requirements.map((req, index) => (
                  <Typography component="li" key={index} variant="body2" sx={{ mb: 1, lineHeight: 1.6 }}>
                    {req}
                  </Typography>
                ))}
              </Box>

              <Typography variant="h6" fontWeight="600" sx={{ mb: 2 }}>
                Candidate Requirements
              </Typography>
              <Box component="ul" sx={{ mb: 3, pl: 2 }}>
                <Typography component="li" variant="body2" sx={{ mb: 1, lineHeight: 1.6 }}>
                  Bachelor's degree in relevant field or equivalent experience
                </Typography>
                <Typography component="li" variant="body2" sx={{ mb: 1, lineHeight: 1.6 }}>
                  Strong problem-solving and analytical skills
                </Typography>
                <Typography component="li" variant="body2" sx={{ mb: 1, lineHeight: 1.6 }}>
                  Excellent communication and teamwork abilities
                </Typography>
                <Typography component="li" variant="body2" sx={{ mb: 1, lineHeight: 1.6 }}>
                  Passion for learning and staying updated with industry trends
                </Typography>
              </Box>

              <Typography variant="h6" fontWeight="600" sx={{ mb: 2 }}>
                Benefits & Perks
              </Typography>
              <Box component="ul" sx={{ pl: 2 }}>
                {job.benefits.map((benefit, index) => (
                  <Typography component="li" key={index} variant="body2" sx={{ mb: 1, lineHeight: 1.6 }}>
                    {benefit}
                  </Typography>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Dialog open={applyDialogOpen} onClose={() => setApplyDialogOpen(false)}>
        <DialogTitle>Apply for {job.title}</DialogTitle>
        <DialogContent>
          <Alert severity="success" sx={{ mb: 2 }}>
            Great choice! This position matches your skills and experience.
          </Alert>
          <Typography variant="body2" sx={{ mb: 2 }}>
            By clicking "Submit Application", you confirm that you want to apply for this position at {job.company}. 
            Your profile information and resume will be sent to the hiring team.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            You will receive a confirmation email once your application is submitted.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setApplyDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleConfirmApply} variant="contained">
            Submit Application
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
}