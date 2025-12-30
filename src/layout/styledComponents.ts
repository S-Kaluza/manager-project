'use client'

import React, { useState } from 'react';
import {
    AppBar,
    Typography,
    Button,
    Box,
    Link,
    IconButton,
    TextField,
} from '@mui/material';

import { styled } from '@mui/material/styles';

// Główny kontener paska nawigacji z gradientem
export const StyledAppBar = styled(AppBar)(({ theme }) => ({
    // Gradient od granatowego do prawie czarnego
    background: 'linear-gradient(135deg, #0A192F 0%, #020C1B 100%)',
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
    background: 'linear-gradient(45deg, #64ffda, #ffffff)', // Akcent kolorystyczny (turkus/biel)
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
export const NavButton = styled(Button)(({ theme, active }) => ({
    color: active ? '#64ffda' : '#8892b0', // Aktywny vs nieaktywny kolor tekstu
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
        backgroundColor: '#64ffda',
        transition: 'width 0.3s ease',
    },
    '&:hover': {
        backgroundColor: 'rgba(100, 255, 218, 0.05)',
        color: '#ccd6f6',
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
    color: '#e6f1ff',
    fontWeight: 500,
    display: 'block',
    marginRight: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
        display: 'none', // Ukryj imię na bardzo małych ekranach
    },
}));

// Przycisk logowania/rejestracji
export const AuthButton = styled(Button)(({ theme, variant }) => ({
    textTransform: 'none',
    borderRadius: '8px',
    padding: '6px 20px',
    fontWeight: 600,
    ...(variant === 'outlined' ? {
        border: '1px solid #64ffda',
        color: '#64ffda',
        '&:hover': {
            backgroundColor: 'rgba(100, 255, 218, 0.1)',
            border: '1px solid #64ffda',
        },
    } : {
        backgroundColor: '#64ffda',
        color: '#0A192F',
        '&:hover': {
            backgroundColor: '#4cd6b3',
        },
    }),
}));

export const LogoWrapper = styled(Button)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px;
    gap: 0;

    /* RESET STYLÓW PRZYCISKU */
    background: transparent; /* Usuwa szare tło */
    border: none;            /* Usuwa ramkę */
    padding: 0;              /* Usuwa domyślny padding */
    cursor: pointer;         /* Kursor łapki */

    /* Opcjonalnie: usuń styl outline przy kliknięciu, jeśli przeszkadza, 
       ale pamiętaj o dostępności (accessibility) */
    /* outline: none; */

    /* Rozwiązanie: Usuń marginesy ze wszystkich bezpośrednich dzieci */
    & > * {
        margin: 0;
    }

    /* Efekt hover (opcjonalny, np. zmiana jasności) */
    &:hover {
        opacity: 0.8;
    }
`;

export const AppTitleParagraph = styled('p')`
    margin-bottom: auto;
    color: white;
`

// Główny kontener stopki
export const FooterWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#020C1B', // Najciemniejszy kolor z gradientu Headera
    color: '#8892b0',           // Ten sam kolor co nieaktywne przyciski w Headerze
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(4),
    borderTop: '1px solid rgba(100, 255, 218, 0.1)', // Subtelna linia oddzielająca w kolorze akcentu
    fontSize: '0.9rem',
}));

// Nagłówki kolumn w stopce
export const FooterTitle = styled(Typography)(({ theme }) => ({
    color: '#e6f1ff', // Jasny kolor tekstu (jak UserName w Headerze)
    fontWeight: 700,
    marginBottom: theme.spacing(2),
    letterSpacing: '0.5px',
    fontSize: '1.1rem',
}));

// Linki w stopce
export const StyledFooterLink = styled(Link)(({ theme }) => ({
    color: '#8892b0',
    textDecoration: 'none',
    display: 'block',
    marginBottom: theme.spacing(1),
    transition: 'all 0.2s ease',
    fontSize: '0.95rem',
    cursor: 'pointer',
    '&:hover': {
        color: '#64ffda', // Akcent turkusowy przy najeździe
        paddingLeft: theme.spacing(0.5), // Lekkie przesunięcie w prawo przy hover
    },
}));

// Ikony społecznościowe
export const SocialIcon = styled(IconButton)(({ theme }) => ({
    color: '#8892b0',
    transition: 'all 0.3s ease',
    '&:hover': {
        color: '#64ffda',
        transform: 'translateY(-3px)',
        backgroundColor: 'rgba(100, 255, 218, 0.1)',
    },
}));

// Input do newslettera (dopasowany do dark mode)
export const NewsletterInput = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        backgroundColor: 'rgba(10, 25, 47, 0.5)',
        color: '#e6f1ff',
        borderRadius: '4px 0 0 4px',
        '& fieldset': {
            borderColor: '#233554',
        },
        '&:hover fieldset': {
            borderColor: '#64ffda',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#64ffda',
        },
    },
    '& input': {
        padding: '10px 14px',
    },
}));

// Przycisk "Zapisz się"
export const SubscribeButton = styled(Button)(({ theme }) => ({
    backgroundColor: 'transparent',
    color: '#64ffda',
    border: '1px solid #64ffda',
    borderRadius: '0 4px 4px 0',
    textTransform: 'none',
    padding: '9px 20px',
    '&:hover': {
        backgroundColor: 'rgba(100, 255, 218, 0.1)',
    },
}));

export const CopyrightText = styled(Typography)(({ theme }) => ({
    fontSize: '0.85rem',
    color: '#556080', // Ciemniejszy odcień dla mniej ważnych informacji
    marginTop: theme.spacing(2),
}));