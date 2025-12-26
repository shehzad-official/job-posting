'use client';

import React, { useState } from 'react';
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Button,
  TextField,
  InputAdornment,
  Select,
  FormControl,
  InputLabel,
  Pagination,
  Paper,
} from '@mui/material';
import {
  MoreVert,
  Search,
  KeyboardArrowDown,
} from '@mui/icons-material';
import { Job } from '@/lib/types';
import { useRouter } from 'next/navigation';

interface JobsTableProps {
  jobs: Job[];
}

const JobsTable: React.FC<JobsTableProps> = ({ jobs }) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, job: Job) => {
    setAnchorEl(event.currentTarget);
    setSelectedJob(job);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedJob(null);
  };

  const handleJobClick = (jobId: string) => {
    router.push(`/recruiter/jobs/${jobId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open':
        return 'success';
      case 'Closed':
        return 'default';
      case 'Draft':
        return 'warning';
      default:
        return 'default';
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || job.status === statusFilter;
    const matchesType = !typeFilter || job.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const paginatedJobs = filteredJobs.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <Card sx={{ borderRadius: 3, width: '100%', overflow: 'hidden' }}>
      <Box sx={{ p: 3, borderBottom: '1px solid #E2E8F0' }}>
        <Typography variant="h6" fontWeight="600" sx={{ mb: 3 }}>
          Job Listings
        </Typography>
        
        <Box sx={{ 
          display: 'flex', 
          gap: 2, 
          mb: 3, 
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Job Status</InputLabel>
            <Select
              value={statusFilter}
              label="Job Status"
              onChange={(e) => setStatusFilter(e.target.value)}
              endAdornment={<KeyboardArrowDown />}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Open">Open</MenuItem>
              <MenuItem value="Closed">Closed</MenuItem>
              <MenuItem value="Draft">Draft</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Job Type</InputLabel>
            <Select
              value={typeFilter}
              label="Job Type"
              onChange={(e) => setTypeFilter(e.target.value)}
              endAdornment={<KeyboardArrowDown />}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Full-time">Full-time</MenuItem>
              <MenuItem value="Part-time">Part-time</MenuItem>
              <MenuItem value="Contract">Contract</MenuItem>
              <MenuItem value="Freelance">Freelance</MenuItem>
            </Select>
          </FormControl>

          <TextField
            size="small"
            placeholder="Search candidates"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: '#64748B' }} />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 200, flex: 1, maxWidth: 300 }}
          />
        </Box>
      </Box>

      <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#F8FAFC' }}>
              <TableCell sx={{ fontWeight: 600, color: '#475569', minWidth: 200 }}>
                Job Title
                <KeyboardArrowDown sx={{ ml: 1, fontSize: 16 }} />
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#475569', minWidth: 120 }}>Job Type</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#475569', minWidth: 120 }}>Date Posted</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#475569', minWidth: 100 }}>Applicants</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#475569', minWidth: 80 }}>Views</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#475569', minWidth: 300 }}>Actions</TableCell>
              <TableCell sx={{ minWidth: 50 }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedJobs.map((job) => (
              <TableRow 
                key={job.id}
                hover
                sx={{ 
                  cursor: 'pointer',
                  '&:hover': { backgroundColor: '#F8FAFC' }
                }}
                onClick={() => handleJobClick(job.id)}
              >
                <TableCell>
                  <Typography variant="body2" fontWeight="500">
                    {job.title}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {job.type}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {job.datePosted}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {job.applicants.length}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {job.views}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Button size="small" variant="text" color="primary">
                      Open
                    </Button>
                    <Button size="small" variant="text" color="primary">
                      Duplicate
                    </Button>
                    <Button size="small" variant="text" color="primary">
                      View Stats
                    </Button>
                    <Button size="small" variant="text" color="error">
                      Delete
                    </Button>
                    <Chip 
                      label={job.status} 
                      size="small" 
                      color={getStatusColor(job.status) as any}
                      variant="outlined"
                    />
                  </Box>
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMenuOpen(e, job);
                    }}
                  >
                    <MoreVert />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
        <Pagination
          count={Math.ceil(filteredJobs.length / rowsPerPage)}
          page={page}
          onChange={(_, newPage) => setPage(newPage)}
          color="primary"
        />
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Edit</MenuItem>
        <MenuItem onClick={handleMenuClose}>Duplicate</MenuItem>
        <MenuItem onClick={handleMenuClose}>View Stats</MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
          Delete
        </MenuItem>
      </Menu>
    </Card>
  );
};

export default JobsTable;