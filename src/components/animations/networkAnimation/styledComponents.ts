import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';


export const AnimationContainer = styled(Box)(({ theme }) => ({
    position: 'relative',
    width: '100%',
    height: '500px', // Dopasowana wysokość do elipsy
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.custom.navy,
    overflow: 'hidden',
    // Tutaj definiujemy zmienną CSS, która będzie sterowana przez React
    transition: 'all 0.5s ease',
}));

