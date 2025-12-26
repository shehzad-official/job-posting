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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  FormControl,
  InputLabel,
  Breadcrumbs,
  Link,
} from '@mui/material';
import {
  ArrowBack,
  Visibility,
  Share,
  PersonAdd,
  MoreVert,
  CheckCircle,
  Schedule,
  Cancel,
} from '@mui/icons-material';
import Layout from '@/components/layout/Layout';
import { mockRecruiter, mockJobs } from '@/lib/mockData';
import { useRouter, useParams } from 'next/navigation';
import { Applicant } from '@/lib/types';

export default function JobDetailPage() {
  const router = useRouter();
  const params = useParams();
  const jobId = params.id as string;
  
  const job = mockJobs.find(j => j.id === jobId);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState('');

  if (!job) {
    return <div>Job not found</div>;
  }

  const handleLogout = () => {
    router.push('/');
  };

  const handleBack = () => {
    router.push('/recruiter');
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, applicant: Applicant) => {
    setAnchorEl(event.currentTarget);
    setSelectedApplicant(applicant);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedApplicant(null);
  };

  const handleStatusChange = () => {
    setStatusDialogOpen(true);
    handleMenuClose();
  };

  const handleStatusUpdate = () => {
    // Update applicant status logic here
    setStatusDialogOpen(false);
    setSelectedApplicant(null);
    setNewStatus('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Hired':
        return 'success';
      case 'In Review':
        return 'warning';
      case 'Interview':
        return 'info';
      case 'Applied':
        return 'default';
      case 'Rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Hired':
        return <CheckCircle sx={{ fontSize: 16 }} />;
      case 'In Review':
        return <Schedule sx={{ fontSize: 16 }} />;
      case 'Interview':
        return <Schedule sx={{ fontSize: 16 }} />;
      case 'Rejected':
        return <Cancel sx={{ fontSize: 16 }} />;
      default:
        return null;
    }
  };

  return (
    <Layout user={mockRecruiter} onLogout={handleLogout}>
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
          <Typography color="text.primary">Job Listing</Typography>
        </Breadcrumbs>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: 3, mb: 3 }}>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'between', alignItems: 'flex-start', mb: 3 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h4" fontWeight="600" sx={{ mb: 1 }}>
                    {job.title}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      📍 {job.location}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      💼 {job.type}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      📅 {job.datePosted}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      👁️ {job.views} views
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                    <Chip label={job.type} size="small" />
                    <Chip label={job.status} size="small" color={getStatusColor(job.status) as any} />
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button variant="outlined" startIcon={<Visibility />}>
                    View
                  </Button>
                  <Button variant="outlined" startIcon={<Share />}>
                    Share
                  </Button>
                  <Button variant="outlined" startIcon={<PersonAdd />}>
                    Invite
                  </Button>
                  <Button variant="contained">
                    Edit
                  </Button>
                </Box>
              </Box>

              <Typography variant="h6" fontWeight="600" sx={{ mb: 2 }}>
                Job Description
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6 }}>
                {job.description}
              </Typography>

              <Typography variant="h6" fontWeight="600" sx={{ mb: 2 }}>
                Requirements
              </Typography>
              <Box component="ul" sx={{ mb: 3, pl: 2 }}>
                {job.requirements.map((req, index) => (
                  <Typography component="li" key={index} variant="body2" sx={{ mb: 1 }}>
                    {req}
                  </Typography>
                ))}
              </Box>

              <Typography variant="h6" fontWeight="600" sx={{ mb: 2 }}>
                Benefits
              </Typography>
              <Box component="ul" sx={{ pl: 2 }}>
                {job.benefits.map((benefit, index) => (
                  <Typography component="li" key={index} variant="body2" sx={{ mb: 1 }}>
                    {benefit}
                  </Typography>
                ))}
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ borderRadius: 3 }}>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" fontWeight="600">
                  Applicants ({job.applicants.length})
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button size="small">Sort by: Matching Level</Button>
                </Box>
              </Box>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#f8fafc' }}>
                      <TableCell sx={{ fontWeight: 600 }}>Candidate</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Location</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Matching Skills</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Match Level</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {job.applicants.map((applicant) => (
                      <TableRow key={applicant.id} hover>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar src={applicant.avatar} sx={{ width: 40, height: 40 }} />
                            <Box>
                              <Typography variant="body2" fontWeight="500">
                                {applicant.name}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {applicant.experience}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {applicant.location}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                            {applicant.skills.slice(0, 3).map((skill) => (
                              <Chip key={skill} label={skill} size="small" variant="outlined" />
                            ))}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={applicant.status}
                            size="small"
                            color={getStatusColor(applicant.status) as any}
                            icon={getStatusIcon(applicant.status)}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight="500">
                            {applicant.matchLevel}%
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Button size="small" variant="text">
                            Cards View
                          </Button>
                        </TableCell>
                        <TableCell>
                          <IconButton
                            onClick={(e) => handleMenuOpen(e, applicant)}
                          >
                            <MoreVert />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 3, mb: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="600" sx={{ mb: 2 }}>
                Job Statistics
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'between', mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Total Applications
                </Typography>
                <Typography variant="body2" fontWeight="500">
                  {job.applicants.length}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'between', mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Total Views
                </Typography>
                <Typography variant="body2" fontWeight="500">
                  {job.views}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'between', mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Hired
                </Typography>
                <Typography variant="body2" fontWeight="500">
                  {job.applicants.filter(a => a.status === 'Hired').length}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'between' }}>
                <Typography variant="body2" color="text.secondary">
                  In Review
                </Typography>
                <Typography variant="body2" fontWeight="500">
                  {job.applicants.filter(a => a.status === 'In Review').length}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleStatusChange}>Change Status</MenuItem>
        <MenuItem onClick={handleMenuClose}>View Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>Send Message</MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
          Reject
        </MenuItem>
      </Menu>

      <Dialog open={statusDialogOpen} onClose={() => setStatusDialogOpen(false)}>
        <DialogTitle>Change Applicant Status</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={newStatus}
              label="Status"
              onChange={(e) => setNewStatus(e.target.value)}
            >
              <MenuItem value="Applied">Applied</MenuItem>
              <MenuItem value="In Review">In Review</MenuItem>
              <MenuItem value="Interview">Interview</MenuItem>
              <MenuItem value="Hired">Hired</MenuItem>
              <MenuItem value="Rejected">Rejected</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setStatusDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleStatusUpdate} variant="contained">
            Update Status
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
}