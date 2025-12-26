'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import Layout from '@/components/layout/Layout';
import JobsTable from '@/components/recruiter/JobsTable';
import { mockRecruiter, mockJobs } from '@/lib/mockData';
import { useRouter } from 'next/navigation';

export default function RecruiterJobsPage() {
  const router = useRouter();

  const handleLogout = () => {
    router.push('/');
  };

  return (
    <Layout user={mockRecruiter} onLogout={handleLogout}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight="600" sx={{ mb: 1 }}>
          Job Listings
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Manage your job postings and track applications
        </Typography>
      </Box>

      <JobsTable jobs={mockJobs} />
    </Layout>
  );
}