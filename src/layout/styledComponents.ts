'use client'

import {
    AppBar,
    Typography,
    Button,
    Box,
    Link,
    IconButton,
    TextField,
} from '@mui/material';

// Importujemy alpha do obsługi przezroczystości (np. rgba) bazując na kolorze z theme
import { styled, alpha } from '@mui/material/styles';

// Główny kontener paska nawigacji z gradientem
export const StyledAppBar = styled(AppBar)(({ theme }) => ({
    // Pobieramy kolory tła zdefiniowane w theme (navy i darkNavy)
    background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`,
    boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
    transition: 'all 0.3s ease',
    position: 'sticky',
    top: 0,
    zIndex: 1100,
}));

// Kontener dla logo i nawigacji
export const LogoText = styled(Typography)(({ theme }) => ({
    fontWeight: 700,
    letterSpacing: '1px',
    // Gradient: Primary Color -> Text Primary (biały/jasny)
    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.text.primary})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginRight: theme.spacing(4),
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    '&:hover': {
        opacity: 0.9,
    }
}));

// Nowoczesne przyciski nawigacyjne
// shouldForwardProp zapobiega przekazywaniu niestandardowego propa 'active' do elementu DOM
export const NavButton = styled(Button, {
    shouldForwardProp: (prop) => prop !== 'active',
})(({ theme, active }) => ({
    color: active ? theme.palette.primary.main : theme.palette.text.secondary,
    fontWeight: 500,
    textTransform: 'capitalize',
    fontSize: '1rem',
    margin: theme.spacing(0, 1),
    position: 'relative',
    '&::after': {
        content: '""',
        position: 'absolute',
        width: active ? '100%' : '0%',
        height: '2px',
        bottom: 0,
        left: 0,
        backgroundColor: theme.palette.primary.main,
        transition: 'width 0.3s ease',
    },
    '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.05),
        color: theme.palette.text.primary, // hover color
        '&::after': {
            width: '100%',
        },
    },
}));

// Sekcja profilu użytkownika
export const UserSection = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    marginLeft: 'auto',
}));

// Tekst nazwy użytkownika
export const UserName = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.primary,
    fontWeight: 500,
    display: 'block',
    marginRight: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
        display: 'none',
    },
}));

// Przycisk logowania/rejestracji
// W idealnym świecie ten styl jest zbędny, jeśli Global Theme ustawił domyślne style Buttona,
// ale tutaj dostosowujemy go ręcznie używając zmiennych.
export const AuthButton = styled(Button)(({ theme, variant }) => ({
    textTransform: 'none',
    borderRadius: '8px',
    padding: '6px 20px',
    fontWeight: 600,
    ...(variant === 'outlined' ? {
        border: `1px solid ${theme.palette.primary.main}`,
        color: theme.palette.primary.main,
        '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, 0.1),
            border: `1px solid ${theme.palette.primary.main}`,
        },
    } : {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.background.default, // Kontrastowy tekst (navy)
        '&:hover': {
            // Lekkie przyciemnienie koloru głównego
            backgroundColor: alpha(theme.palette.primary.main, 0.8),
        },
    }),
}));

export const LogoWrapper = styled(Button)(({ }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '10px',
    gap: 0,
    background: 'transparent',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    '& > *': {
        margin: 0,
    },
    '&:hover': {
        opacity: 0.8,
    }
}));

export const AppTitleParagraph = styled('p')(({ theme }) => ({
    marginBottom: 'auto',
    color: theme.palette.text.primary, // Zamiast 'white'
}));

// Główny kontener stopki
export const FooterWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.background.paper, // Najciemniejszy kolor tła
    color: theme.palette.text.secondary,
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(4),
    borderTop: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
    fontSize: '0.9rem',
}));

// Nagłówki kolumn w stopce
export const FooterTitle = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.primary,
    fontWeight: 700,
    marginBottom: theme.spacing(2),
    letterSpacing: '0.5px',
    fontSize: '1.1rem',
}));

// Linki w stopce
export const StyledFooterLink = styled(Link)(({ theme }) => ({
    color: theme.palette.text.secondary,
    textDecoration: 'none',
    display: 'block',
    marginBottom: theme.spacing(1),
    transition: 'all 0.2s ease',
    fontSize: '0.95rem',
    cursor: 'pointer',
    '&:hover': {
        color: theme.palette.primary.main,
        paddingLeft: theme.spacing(0.5),
    },
}));

// Ikony społecznościowe
export const SocialIcon = styled(IconButton)(({ theme }) => ({
    color: theme.palette.text.secondary,
    transition: 'all 0.3s ease',
    '&:hover': {
        color: theme.palette.primary.main,
        transform: 'translateY(-3px)',
        backgroundColor: alpha(theme.palette.primary.main, 0.1),
    },
}));

// Input do newslettera
export const NewsletterInput = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        // Używamy alpha dla tła inputa
        backgroundColor: alpha(theme.palette.background.default, 0.5),
        color: theme.palette.text.primary,
        borderRadius: '4px 0 0 4px',
        '& fieldset': {
            borderColor: '#233554', // Można to dodać do theme jako custom, tu zostawiam lub zmieniam na divider
        },
        '&:hover fieldset': {
            borderColor: theme.palette.primary.main,
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.primary.main,
        },
    },
    '& input': {
        padding: '10px 14px',
    },
}));

// Przycisk "Zapisz się"
export const SubscribeButton = styled(Button)(({ theme }) => ({
    backgroundColor: 'transparent',
    color: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: '0 4px 4px 0',
    textTransform: 'none',
    padding: '9px 20px',
    '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.1),
    },
}));

export const CopyrightText = styled(Typography)(({ theme }) => ({
    fontSize: '0.85rem',
    color: alpha(theme.palette.text.secondary, 0.7), // Jeszcze ciemniejszy odcień secondary
    marginTop: theme.spacing(2),
}));