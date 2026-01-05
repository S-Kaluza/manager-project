'use client';

import { styled } from '@mui/material/styles';

export const GlobalChildWrapper = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  minHeight: '85vh', 
  maxWidth: '80vw',
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
}));