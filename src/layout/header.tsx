'use client'

import Image from "next/image";
import { usePathname, useRouter } from 'next/navigation';
import {
    Toolbar,
    Typography,
    Avatar,
    Menu,
    MenuItem,
    IconButton,
    Box,
    Container,
    useMediaQuery,
    useTheme,
    Fade, // 1. Importujemy Fade z MUI
} from '@mui/material';

import {
    Menu as MenuIcon,
    NotificationsNone,
    Settings,
    Logout,
    Person,
    BarChart,
    PeopleAlt
} from '@mui/icons-material';
import {
    AppTitleParagraph,
    AuthButton,
    LogoWrapper,
    NavButton,
    StyledAppBar,
    UserName,
    UserSection
} from "@/layout/styledComponents";
import { useEffect, useState } from "react";
import styles from "@/app/page.module.css";
import { useAuth } from "@/providers/AuthProvider/AuthProvider";

const Header = () => {
    const { isAuthenticated, user, logout, isLoading } = useAuth();
    const router = useRouter();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null; // Safety check dla SSR
    const token_expiration = typeof window !== 'undefined' ? localStorage.getItem('token_expiration') : null;
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [shouldShow, setShouldShow] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const isValid = token && token_expiration && Date.parse(token_expiration) < Date.now();
        if (!isMobile && isValid) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setShouldShow(true);
        } else {
            setShouldShow(false);
        }
    }, [token, token_expiration, isMobile]);

    const handleMenuOpen = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logout();
        handleMenuClose();
        router.refresh();
    };

    return (
        <StyledAppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ minHeight: '80px' }}>
                    <LogoWrapper>
                        <Image
                            className={styles.logo}
                            src="/assets/GryphonsTimeLogo-cropped.svg" // Upewnij się, że ścieżka jest poprawna
                            alt="GryphonsTimeLogo"
                            width={50}
                            height={50}
                        />
                        <AppTitleParagraph>Gryphon&#39;s Time</AppTitleParagraph>
                    </LogoWrapper>

                    <Fade in={!isLoading} timeout={800}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {(shouldShow && pathname !== '/profile/login'  || isAuthenticated && pathname !== '/profile/login') && (
                                <>
                                    <NavButton
                                        startIcon={<PeopleAlt fontSize="small" />}
                                        active={pathname === '/dashboard' ? 1 : 0}
                                        onClick={() => router.push('/dashboard')}
                                    >
                                        Dashboard
                                    </NavButton>
                                    <NavButton
                                        startIcon={<PeopleAlt fontSize="small" />}
                                        active={pathname === '/staff' ? 1 : 0}
                                        onClick={() => router.push('/staff')}
                                    >
                                        Staff
                                    </NavButton>
                                    <NavButton
                                        startIcon={<BarChart fontSize="small" />}
                                        active={pathname === '/summary' ? 1 : 0}
                                        onClick={() => router.push('/summary')}
                                    >
                                        Summary
                                    </NavButton>
                                </>
                            )}
                        </Box>
                    </Fade>

                    {/* SEKCJA UŻYTKOWNIKA */}
                    <Fade in={!isLoading} timeout={1000}>
                        <UserSection>
                            {isAuthenticated && pathname !== '/profile/login' ? (
                                <>
                                    <IconButton sx={{ color: '#8892b0' }}>
                                        <NotificationsNone />
                                    </IconButton>

                                    <Box
                                        onClick={handleMenuOpen}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            cursor: 'pointer',
                                            padding: '4px 8px',
                                            borderRadius: '8px',
                                            transition: 'background 0.2s',
                                            '&:hover': { background: 'rgba(255,255,255,0.05)' }
                                        }}
                                    >
                                        <Avatar
                                            alt={user?.name || "User"}
                                            src="/api/placeholder/40/40"
                                            sx={{
                                                width: 36,
                                                height: 36,
                                                border: '2px solid #64ffda',
                                                bgcolor: '#112240'
                                            }}
                                        >
                                            {user?.name ? user.name.charAt(0) : <Person/>}
                                        </Avatar>

                                        <Box sx={{ ml: 1.5, display: { xs: 'none', sm: 'block' } }}>
                                            <UserName variant="body2">
                                                {user?.name} {user?.surname}
                                            </UserName>
                                            <Typography variant="caption" sx={{ color: '#8892b0' }}>
                                                Manager
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Menu
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl)}
                                        onClose={handleMenuClose}
                                        disableScrollLock={true} // <--- DODAJ TĘ LINIJKĘ
                                        PaperProps={{
                                            sx: {
                                                bgcolor: '#112240',
                                                color: '#ccd6f6',
                                                marginTop: '10px',
                                                boxShadow: '0 10px 30px -10px rgba(2,12,27,0.7)',
                                                minWidth: '180px',
                                                '& .MuiMenuItem-root': {
                                                    fontSize: '0.9rem',
                                                    '&:hover': {
                                                        bgcolor: '#233554',
                                                        color: '#64ffda'
                                                    }
                                                }
                                            }
                                        }}
                                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                    >
                                        <MenuItem onClick={handleMenuClose}>
                                            <Person sx={{ mr: 1.5, fontSize: 20 }} /> Profile
                                        </MenuItem>
                                        <MenuItem onClick={handleMenuClose}>
                                            <Settings sx={{ mr: 1.5, fontSize: 20 }} /> Settings
                                        </MenuItem>
                                        <Box sx={{ my: 1, borderTop: '1px solid #233554' }} />
                                        <MenuItem onClick={handleLogout} sx={{ color: '#ff6b6b !important' }}>
                                            <Logout sx={{ mr: 1.5, fontSize: 20 }} /> Logout
                                        </MenuItem>
                                    </Menu>
                                </>
                            ) : (
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <AuthButton variant="text" sx={{ color: '#ccd6f6' }} onClick={() => router.push('/profile/login')}>
                                        Login
                                    </AuthButton>
                                    <AuthButton variant="outlined" onClick={() => router.push('/profile/register')}>
                                        Register
                                    </AuthButton>
                                </Box>
                            )}

                            {isMobile && isAuthenticated && (
                                <IconButton sx={{ color: '#64ffda', ml: 1 }}>
                                    <MenuIcon />
                                </IconButton>
                            )}
                        </UserSection>
                    </Fade>
                </Toolbar>
            </Container>
        </StyledAppBar>
    );
};

export default Header;