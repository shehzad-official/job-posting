'use client';

import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import {
  Assignment,
  Visibility,
  PersonAdd,
  PersonOff,
} from '@mui/icons-material';
import Layout from '@/components/layout/Layout';
import StatsCard from '@/components/recruiter/StatsCard';
import JobsTable from '@/components/recruiter/JobsTable';
import { mockRecruiter, mockJobs, mockDashboardStats } from '@/lib/mockData';
import { useRouter } from 'next/navigation';

export default function RecruiterDashboard() {
  const router = useRouter();

  const handleLogout = () => {
    router.push('/');
  };

  return (
    <Layout user={mockRecruiter} onLogout={handleLogout}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight="600" sx={{ mb: 1 }}>
          Overview
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Applications"
            value={mockDashboardStats.applications}
            change="+2.5%"
            icon={<Assignment />}
            color="#fbbf24"
            isPositive={true}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Views"
            value={mockDashboardStats.views}
            change="-1.2%"
            icon={<Visibility />}
            color="#10b981"
            isPositive={false}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Hired"
            value={mockDashboardStats.hired}
            change="+11%"
            icon={<PersonAdd />}
            color="#8b5cf6"
            isPositive={true}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Rejected"
            value={mockDashboardStats.rejected}
            change="+5.2%"
            icon={<PersonOff />}
            color="#f472b6"
            isPositive={true}
          />
        </Grid>
      </Grid>

      <JobsTable jobs={mockJobs} />
    </Layout>
  );
}