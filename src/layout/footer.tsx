import {
    CopyrightText,
    FooterTitle,
    FooterWrapper,
    NewsletterInput,
    SocialIcon,
    StyledFooterLink,
    SubscribeButton
} from "@/layout/styledComponents";

import {
    Box,
    Container,
    Grid,
    Typography,
    Divider,
    Stack
} from '@mui/material';

import {
    LinkedIn,
    Twitter,
    GitHub,
    Email,
    Language
} from '@mui/icons-material';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <FooterWrapper component="footer">
            {/* ZMIANA: maxWidth={false} usuwa ograniczenie szerokości.
                Dodałem też sx z paddingiem (px), aby treść nie "przyklejała" się do krawędzi na wielkich ekranach */}
            <Container maxWidth={false} sx={{ px: { xs: 3, md: 8 } }}>
                <Grid container spacing={5}>

                    {/* KOLUMNA 1: O Aplikacji / Brand */}
                    <Grid item xs={12} md={4}>
                        <Box mb={2}>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 700,
                                    color: '#e6f1ff',
                                    background: 'linear-gradient(45deg, #64ffda, #ffffff)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    display: 'inline-block',
                                    mb: 2
                                }}
                            >
                                Gryphon&#39;s Time
                            </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ lineHeight: 1.8, mb: 3, maxWidth: '300px' }}>
                            Kompleksowe narzędzie dla nowoczesnych managerów.
                            Optymalizuj grafiki, zarządzaj czasem pracy i analizuj wydajność zespołu w jednym miejscu.
                        </Typography>

                        <Stack direction="row" spacing={1}>
                            <SocialIcon aria-label="LinkedIn" size="small"><LinkedIn /></SocialIcon>
                            <SocialIcon aria-label="Twitter" size="small"><Twitter /></SocialIcon>
                            <SocialIcon aria-label="GitHub" size="small"><GitHub /></SocialIcon>
                        </Stack>
                    </Grid>

                    {/* KOLUMNA 2: Produkt */}
                    <Grid item xs={6} sm={4} md={2}>
                        <FooterTitle variant="subtitle1">Produkt</FooterTitle>
                        <StyledFooterLink href="#">Funkcje</StyledFooterLink>
                        <StyledFooterLink href="#">Cennik</StyledFooterLink>
                        <StyledFooterLink href="#">Integracje</StyledFooterLink>
                        <StyledFooterLink href="#">Dla Enterprise</StyledFooterLink>
                        <StyledFooterLink href="#">Changelog</StyledFooterLink>
                    </Grid>

                    {/* KOLUMNA 3: Zasoby i Wsparcie */}
                    <Grid item xs={6} sm={4} md={2}>
                        <FooterTitle variant="subtitle1">Wsparcie</FooterTitle>
                        <StyledFooterLink href="#">Dokumentacja</StyledFooterLink>
                        <StyledFooterLink href="#">Centrum Pomocy</StyledFooterLink>
                        <StyledFooterLink href="#">API Status</StyledFooterLink>
                        <StyledFooterLink href="#">Społeczność</StyledFooterLink>
                        <StyledFooterLink href="#">Kontakt</StyledFooterLink>
                    </Grid>

                    {/* KOLUMNA 4: Newsletter & Legal */}
                    <Grid item xs={12} sm={4} md={4} sx={{marginLeft: 'auto'}}>
                        <FooterTitle variant="subtitle1">Bądź na bieżąco</FooterTitle>
                        <Typography variant="body2" sx={{ mb: 2 }}>
                            Otrzymuj najnowsze aktualizacje funkcji i porady dotyczące zarządzania zespołem.
                        </Typography>

                        <Box component="form" noValidate autoComplete="off" sx={{ display: 'flex', mb: 4 }}>
                            <NewsletterInput
                                placeholder="Twój adres email"
                                fullWidth
                                size="small"
                                variant="outlined"
                            />
                            <SubscribeButton disableElevation>
                                <Email fontSize="small" />
                            </SubscribeButton>
                        </Box>

                        <FooterTitle variant="subtitle1" sx={{ fontSize: '1rem', mb: 1 }}>Kontakt</FooterTitle>
                        <StyledFooterLink href="mailto:hello@workforce.com" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Email fontSize="small" sx={{ fontSize: '1rem' }}/> hello@workforce.com
                        </StyledFooterLink>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 4, borderColor: '#233554' }} />

                {/* DOLNA BELKA */}
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center' }}>
                    <CopyrightText>
                        &copy; {currentYear} Gryphon's Time. Wszelkie prawa zastrzeżone.
                    </CopyrightText>

                    <Stack direction="row" spacing={3} sx={{ mt: { xs: 2, md: 0 } }}>
                        <StyledFooterLink href="#" sx={{ fontSize: '0.85rem', mb: 0 }}>Polityka Prywatności</StyledFooterLink>
                        <StyledFooterLink href="#" sx={{ fontSize: '0.85rem', mb: 0 }}>Regulamin</StyledFooterLink>
                        <StyledFooterLink href="#" sx={{ fontSize: '0.85rem', mb: 0 }}>RODO / GDPR</StyledFooterLink>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#8892b0', fontSize: '0.85rem', cursor: 'pointer', '&:hover': { color: '#64ffda' } }}>
                            <Language fontSize="small" sx={{ fontSize: '1rem' }} /> PL
                        </Box>
                    </Stack>
                </Box>
            </Container>
        </FooterWrapper>
    );
};

export default Footer;