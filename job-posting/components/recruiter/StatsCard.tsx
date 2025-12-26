'use client';

import React from 'react';
import { Card, CardContent, Typography, Box, Avatar } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';

interface StatsCardProps {
  title: string;
  value: number;
  change: string;
  icon: React.ReactNode;
  color: string;
  isPositive?: boolean;
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  change, 
  icon, 
  color,
  isPositive = true 
}) => {
  return (
    <Card sx={{ 
      height: '100%', 
      borderRadius: 3,
      minHeight: 160,
      display: 'flex',
      flexDirection: 'column'
    }}>
      <CardContent sx={{ 
        p: 3, 
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Avatar sx={{ bgcolor: color, width: 48, height: 48 }}>
            {icon}
          </Avatar>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {isPositive ? (
              <TrendingUp sx={{ color: '#10B981', fontSize: 16 }} />
            ) : (
              <TrendingDown sx={{ color: '#EF4444', fontSize: 16 }} />
            )}
            <Typography 
              variant="body2" 
              sx={{ 
                color: isPositive ? '#10B981' : '#EF4444',
                fontWeight: 500 
              }}
            >
              {change}
            </Typography>
          </Box>
        </Box>
        
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {title}
          </Typography>
          
          <Typography variant="h4" fontWeight="bold" color="text.primary">
            {value.toLocaleString()}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatsCard;