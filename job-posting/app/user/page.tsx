'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Button,
  Avatar,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from '@mui/material';
import {
  Search,
  LocationOn,
  Work,
  Person,
} from '@mui/icons-material';
import Layout from '@/components/layout/Layout';
import JobCard from '@/components/user/JobCard';
import { mockUser, mockJobs } from '@/lib/mockData';
import { useRouter } from 'next/navigation';

export default function UserDashboard() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);
  const [applyDialogOpen, setApplyDialogOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  const handleLogout = () => {
    router.push('/');
  };

  const handleApply = (jobId: string) => {
    setSelectedJobId(jobId);
    setApplyDialogOpen(true);
  };

  const handleConfirmApply = () => {
    if (selectedJobId) {
      setAppliedJobs([...appliedJobs, selectedJobId]);
    }
    setApplyDialogOpen(false);
    setSelectedJobId(null);
  };

  const handleViewDetails = (jobId: string) => {
    router.push(`/user/jobs/${jobId}`);
  };

  const filteredJobs = mockJobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout user={mockUser} onLogout={handleLogout}>
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
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" fontWeight="600" sx={{ mb: 1 }}>
              Trending Job Postings
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Find a job that matches your interests and skills.
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <TextField
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                sx={{ flex: 1 }}
              />
              <Button variant="outlined">
                Company
              </Button>
              <Button variant="outlined">
                Sort by
              </Button>
              <Button variant="outlined">
                Filter Match
              </Button>
              <Button variant="outlined">
                Full Time
              </Button>
              <Button variant="outlined">
                Internship
              </Button>
              <Button variant="outlined">
                Recently Posted
              </Button>
            </Box>
          </Box>

          <Box>
            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onApply={handleApply}
                onViewDetails={handleViewDetails}
                hasApplied={appliedJobs.includes(job.id)}
              />
            ))}
          </Box>
        </Grid>
      </Grid>

      <Dialog open={applyDialogOpen} onClose={() => setApplyDialogOpen(false)}>
        <DialogTitle>Apply for Job</DialogTitle>
        <DialogContent>
          <Alert severity="info" sx={{ mb: 2 }}>
            Are you sure you want to apply for this position? Your profile information will be sent to the recruiter.
          </Alert>
          <Typography variant="body2">
            By clicking "Apply", you confirm that you want to submit your application for this job position.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setApplyDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleConfirmApply} variant="contained">
            Apply Now
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
}