'use client';

import { createTheme } from '@mui/material/styles';

// Definicja palety kolorów wyciągnięta z Twoich stylów
export const colors = {
    navy: '#0A192F',
    darkNavy: '#020C1B',
    lightNavy: '#112240',
    lightestNavy: '#233554',
    slate: '#8892b0',
    lightSlate: '#a8b2d1',
    lightestSlate: '#e6f1ff',
    green: '#64ffda', // Twój główny akcent
    greenTint: 'rgba(100, 255, 218, 0.1)',
};

declare module '@mui/material/styles' {
    interface Palette {
        custom: typeof colors;
    }
    interface PaletteOptions {
        custom?: typeof colors;
    }
}

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: colors.green,
            contrastText: colors.navy, // Tekst na przycisku primary powinien być ciemny
        },
        background: {
            default: colors.navy,
            paper: colors.darkNavy, // Używane np. w Footerze
        },
        text: {
            primary: colors.lightestSlate, // #e6f1ff
            secondary: colors.slate,       // #8892b0
        },
        custom: colors
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: { fontWeight: 700, color: colors.lightestSlate },
        h2: { fontWeight: 700, color: colors.lightestSlate },
        h3: { fontWeight: 700, color: colors.lightestSlate },
        body1: {
            color: colors.slate,
        },
        button: {
            textTransform: 'none', // Wyłączamy wielkie litery w przyciskach (zgodnie z AuthButton)
            fontWeight: 600,
        },
    },
    components: {
        // 1. AppBar (StyledAppBar)
        MuiAppBar: {
            styleOverrides: {
                root: {
                    background: `linear-gradient(135deg, ${colors.navy} 0%, ${colors.darkNavy} 100%)`,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                    transition: 'all 0.3s ease',
                },
            },
        },
        // 2. Button (AuthButton, SubscribeButton, NavButton)
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                },
                // Styl dla wariantu "contained" (np. główny przycisk Auth)
                containedPrimary: {
                    backgroundColor: colors.green,
                    color: colors.navy,
                    '&:hover': {
                        backgroundColor: '#4cd6b3', // Lekko ciemniejszy turkus
                    },
                },
                // Styl dla wariantu "outlined" (np. secondary Auth, Subscribe)
                outlinedPrimary: {
                    borderColor: colors.green,
                    color: colors.green,
                    borderWidth: '1px',
                    '&:hover': {
                        backgroundColor: colors.greenTint,
                        borderColor: colors.green,
                        borderWidth: '1px',
                    },
                },
                // Styl dla wariantu "text" (np. NavButton)
                textPrimary: {
                    color: colors.slate,
                    '&:hover': {
                        color: colors.green,
                        backgroundColor: 'rgba(100, 255, 218, 0.05)',
                    },
                },
            },
        },
        // 3. TextField / Input (NewsletterInput)
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgba(10, 25, 47, 0.5)',
                    color: colors.lightestSlate,
                    borderRadius: '4px',
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: colors.lightestNavy, // #233554
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: colors.green,
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: colors.green,
                    },
                },
                input: {
                    padding: '10px 14px',
                },
            },
        },
        // 4. Link (StyledFooterLink)
        MuiLink: {
            styleOverrides: {
                root: {
                    color: colors.slate,
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                    '&:hover': {
                        color: colors.green,
                    },
                },
            },
        },
        // 5. IconButton (SocialIcon)
        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: colors.slate,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        color: colors.green,
                        transform: 'translateY(-3px)',
                        backgroundColor: colors.greenTint,
                    },
                },
            },
        },
    },
});

export default darkTheme;