'use client';

import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider,
  Badge,
} from '@mui/material';
import {
  Dashboard,
  Work,
  People,
  Business,
  Assignment,
  Analytics,
  CalendarToday,
  Payment,
  Message,
  Notifications,
  ContactSupport,
  Explore,
} from '@mui/icons-material';
import { useRouter, usePathname } from 'next/navigation';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  userRole: 'recruiter' | 'user';
  variant?: 'permanent' | 'temporary';
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose, userRole, variant = 'permanent' }) => {
  const router = useRouter();
  const pathname = usePathname();

  const recruiterMenuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/recruiter' },
    { text: 'Explore', icon: <Explore />, path: '/recruiter/explore' },
    { 
      text: 'Job Listings', 
      icon: <Work />, 
      path: '/recruiter/jobs',
    },
    { text: 'Participants', icon: <People />, path: '/recruiter/participants' },
    { text: 'Companies', icon: <Business />, path: '/recruiter/companies' },
    { text: 'Orders', icon: <Assignment />, path: '/recruiter/orders' },
    { text: 'WorkMatch Tasks', icon: <Assignment />, path: '/recruiter/tasks' },
    { text: 'Analytics', icon: <Analytics />, path: '/recruiter/analytics' },
    { text: 'Calendar', icon: <CalendarToday />, path: '/recruiter/calendar' },
    { text: 'Payments', icon: <Payment />, path: '/recruiter/payments' },
    { text: 'Messages', icon: <Message />, path: '/recruiter/messages', badge: true },
    { text: 'Notifications', icon: <Notifications />, path: '/recruiter/notifications', badge: true },
    { text: 'Contact Us', icon: <ContactSupport />, path: '/recruiter/contact' },
  ];

  const userMenuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/user' },
    { text: 'Explore', icon: <Explore />, path: '/user/explore' },
    { text: 'Job Listings', icon: <Work />, path: '/user/jobs' },
    { text: 'My Applications', icon: <Assignment />, path: '/user/applications' },
    { text: 'Messages', icon: <Message />, path: '/user/messages' },
    { text: 'Profile', icon: <People />, path: '/user/profile' },
  ];

  const menuItems = userRole === 'recruiter' ? recruiterMenuItems : userMenuItems;

  const handleNavigation = (path: string) => {
    router.push(path);
    if (variant === 'temporary') {
      onClose();
    }
  };

  const drawerWidth = 280;

  return (
    <Drawer
      variant={variant}
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          borderRight: '1px solid #E2E8F0',
          backgroundColor: '#FFFFFF',
          zIndex: (theme) => theme.zIndex.appBar - 1,
        },
      }}
    >
      <Box sx={{ p: 3, mt: 8 }}>
        <Typography variant="h5" fontWeight="bold" color="primary">
          WSM
        </Typography>
      </Box>
      
      <Divider />
      
      <List sx={{ px: 2, py: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              onClick={() => handleNavigation(item.path)}
              selected={pathname === item.path}
              sx={{
                borderRadius: 2,
                '&.Mui-selected': {
                  backgroundColor: '#E3F2FD',
                  color: '#1976D2',
                  '& .MuiListItemIcon-root': {
                    color: '#1976D2',
                  },
                },
                '&:hover': {
                  backgroundColor: '#F5F5F5',
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: '#64748B' }}>
                {item.badge ? (
                  <Badge color="error" variant="dot">
                    {item.icon}
                  </Badge>
                ) : (
                  item.icon
                )}
              </ListItemIcon>
              <ListItemText 
                primary={item.text}
                primaryTypographyProps={{
                  fontSize: '0.875rem',
                  fontWeight: pathname === item.path ? 600 : 400,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;