'use client'

import Image from "next/image";


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
    LogoText,
    LogoWrapper,
    NavButton,
    StyledAppBar,
    UserName,
    UserSection
} from "@/layout/styledComponents";
import {useState} from "react";
import styles from "@/app/page.module.css";

const Header = () => {
    // Stan logowania (zgodnie z prośbą - domyślnie true)
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    // Stan menu rozwijanego (dropdown)
    const [anchorEl, setAnchorEl] = useState(null);

    // Stan aktywnej zakładki (do celów wizualnych)
    const [activeTab, setActiveTab] = useState('summary');

    // Hooki MUI do responsywności
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    // Obsługa menu profilu
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleMenuClose();
        setIsLoggedIn(false);
    };

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    return (
        <StyledAppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ minHeight: '80px' }}>
                    <LogoWrapper>
                        <Image
                            className={styles.logo}
                            src="/assets/GryphonsTimeLogo-cropped.svg"
                            alt="GryphonsTimeLogo"
                            width={50}
                            height={50}
                        />
                        <AppTitleParagraph>Gryphon&#39;s Time</AppTitleParagraph>
                    </LogoWrapper>

                    {/* 2. NAVIGATION (Ukryte na mobile, widoczne na desktop) */}
                    {!isMobile && isLoggedIn && (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <NavButton
                                startIcon={<PeopleAlt fontSize="small" />}
                                active={activeTab === 'staff' ? 1 : 0}
                                onClick={() => setActiveTab('staff')}
                            >
                                Staff
                            </NavButton>
                            <NavButton
                                startIcon={<BarChart fontSize="small" />}
                                active={activeTab === 'summary' ? 1 : 0}
                                onClick={() => setActiveTab('summary')}
                            >
                                Summary
                            </NavButton>
                        </Box>
                    )}

                    {/* 3. USER / AUTH SECTION */}
                    <UserSection>
                        {isLoggedIn ? (
                            <>
                                {/* Ikona powiadomień (opcjonalny dodatek dla nowoczesnego looku) */}
                                <IconButton sx={{ color: '#8892b0' }}>
                                    <NotificationsNone />
                                </IconButton>

                                {/* Sekcja Profilu - Klikalna */}
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
                                        alt="Jan Kowalski"
                                        src="/api/placeholder/40/40"
                                        sx={{
                                            width: 36,
                                            height: 36,
                                            border: '2px solid #64ffda',
                                            bgcolor: '#112240'
                                        }}
                                    >
                                        JK
                                    </Avatar>

                                    <Box sx={{ ml: 1.5, display: { xs: 'none', sm: 'block' } }}>
                                        <UserName variant="body2">
                                            Jan Kowalski
                                        </UserName>
                                        <Typography variant="caption" sx={{ color: '#8892b0' }}>
                                            Manager
                                        </Typography>
                                    </Box>
                                </Box>

                                {/* Dropdown Menu */}
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleMenuClose}
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
                            // Widok dla niezalogowanego użytkownika
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <AuthButton variant="text" sx={{ color: '#ccd6f6' }} onClick={handleLogin}>
                                    Login
                                </AuthButton>
                                <AuthButton variant="outlined" onClick={handleLogin}>
                                    Register
                                </AuthButton>
                            </Box>
                        )}

                        {/* Hamburger Menu na Mobile */}
                        {isMobile && isLoggedIn && (
                            <IconButton sx={{ color: '#64ffda', ml: 1 }}>
                                <MenuIcon />
                            </IconButton>
                        )}
                    </UserSection>
                </Toolbar>
            </Container>
        </StyledAppBar>
    );
};

export default Header;