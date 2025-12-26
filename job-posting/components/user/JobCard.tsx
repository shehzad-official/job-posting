'use client';

import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
  Avatar,
} from '@mui/material';
import {
  LocationOn,
  Work,
  Schedule,
  Business,
} from '@mui/icons-material';
import { Job } from '@/lib/types';

interface JobCardProps {
  job: Job;
  onApply: (jobId: string) => void;
  onViewDetails: (jobId: string) => void;
  hasApplied?: boolean;
}

const JobCard: React.FC<JobCardProps> = ({ job, onApply, onViewDetails, hasApplied = false }) => {
  return (
    <Card sx={{ borderRadius: 3, mb: 2, '&:hover': { boxShadow: 3 } }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'between', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ display: 'flex', gap: 2, flex: 1 }}>
            <Avatar sx={{ bgcolor: '#2563eb', width: 48, height: 48 }}>
              <Business />
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" fontWeight="600" sx={{ mb: 1 }}>
                {job.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {job.company}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
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
                    {job.datePosted}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <Chip label={job.type} size="small" />
                {job.salary && <Chip label={job.salary} size="small" variant="outlined" />}
              </Box>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button 
              variant="outlined" 
              size="small"
              onClick={() => onViewDetails(job.id)}
            >
              View Details
            </Button>
            <Button 
              variant="contained" 
              size="small"
              onClick={() => onApply(job.id)}
              disabled={hasApplied}
            >
              {hasApplied ? 'Applied' : 'Apply Now'}
            </Button>
          </Box>
        </Box>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {job.description.substring(0, 150)}...
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {job.requirements.slice(0, 3).map((req, index) => (
            <Chip 
              key={index} 
              label={req.split(' ')[0]} 
              size="small" 
              variant="outlined"
              sx={{ fontSize: '0.75rem' }}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default JobCard;