'use client'; // Ważne: Wykresy MUI wymagają renderowania po stronie klienta

import React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { useTheme } from '@mui/material/styles';
import { Box, Typography, Paper } from '@mui/material';

// Definicja typów dla danych przekazywanych z zewnątrz
type ChartDataProps = {
  xAxisData: string[]; // Np. daty lub etykiety
  seriesData: number[]; // Wartości liczbowe
  title: string;
};

export default function DynamicChart({ xAxisData, seriesData, title }: ChartDataProps) {
  const theme = useTheme();

  return (
    <Paper 
      elevation={3} 
      sx={{ p: 3, width: '100%', height: '100%', borderRadius: 2 }}
    >
      <Typography variant="h6" gutterBottom color="primary">
        {title}
      </Typography>
      
      {/* Box do kontrolowania responsywności */}
      <Box sx={{ width: '100%', height: 400 }}>
        <LineChart
          xAxis={[{ 
            data: xAxisData, 
            scaleType: 'point', // lub 'time' dla dat
            label: 'Oś Czasu'
          }]}
          series={[
            {
              data: seriesData,
              label: 'Wykonane zadania',
              area: true, // Wypełnienie pod wykresem
              color: theme.palette.primary.main, // Użycie koloru z motywu MUI
              showMark: ({ index }) => index % 2 === 0, // Pokazuj punkty co drugi element (opcjonalne)
            },
          ]}
          // Responsywność jest domyślna, ale można wymusić parametry
          height={350} 
          grid={{ vertical: true, horizontal: true }}
        />
      </Box>
    </Paper>
  );
}