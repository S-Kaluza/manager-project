'use client';

import { styled } from '@mui/material/styles';

export const DashboardTeamsWrapper = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    gap: '2%',
    justifyContent: 'space-between',
}));

export const DashboardAppsWrapper = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    gap: '2%',
    justifyContent: 'space-between',
}));