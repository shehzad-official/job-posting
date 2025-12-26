'use client';

import React, { useState } from 'react';
import { Box, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';
import { User } from '@/lib/types';

interface LayoutProps {
  children: React.ReactNode;
  user: User;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, user, onLogout }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const drawerWidth = 280;

  return (
    <Box sx={{ display: 'flex' }}>
      <Header 
        onMenuClick={handleSidebarToggle} 
        user={user} 
        onLogout={onLogout}
      />
      
      {/* Desktop Sidebar */}
      {!isMobile && (
        <Sidebar 
          open={sidebarOpen} 
          onClose={handleSidebarClose}
          userRole={user.role}
          variant="permanent"
        />
      )}
      
      {/* Mobile Sidebar */}
      {isMobile && (
        <Sidebar 
          open={sidebarOpen} 
          onClose={handleSidebarClose}
          userRole={user.role}
          variant="temporary"
        />
      )}
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { 
            xs: '100%',
            md: sidebarOpen ? `calc(100% - ${drawerWidth}px)` : '100%'
          },
          ml: { 
            xs: 0,
            md: sidebarOpen ? `${drawerWidth}px` : 0
          },
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;