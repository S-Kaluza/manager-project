'use client'
import { LoginPageContainer } from "@/app/profile/StyledComponents";
import {
    Box,
    Typography,
    Button,
    TextField,
    Link
} from '@mui/material';

import GoogleIcon from '@mui/icons-material/Google';

import LiquidGlassCard from "@/components/glass/glassBox/liquidGlasscard";
import NetworkAnimation from "@/components/animations/networkAnimation/networkAnimation";

function RegisterPage() {

    return (
        <>
            <LoginPageContainer>
                <NetworkAnimation activeColor={'green'}/>

                <LiquidGlassCard glow maxWidth={'50%'} marginBottom={'15vh'} marginTop={'15vh'} marginLeft={'auto'} marginRight={'50px'}>
                    <Typography
                        variant="h5"
                        sx={{
                            mb: 3,
                            fontWeight: 700,
                            color: 'text.primary'
                        }}
                    >
                        Nie masz konta? Zarejestruj się!
                    </Typography>

                    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            fullWidth
                            placeholder="Adres e-mail"
                            variant="outlined"
                            size="small"
                        />

                        <TextField
                            fullWidth
                            placeholder="Imię"
                            variant="outlined"
                            size="small"
                        />

                        <TextField
                            fullWidth
                            placeholder="Nazwisko"
                            variant="outlined"
                            size="small"
                        />
                        <TextField
                            fullWidth
                            placeholder="Hasło"
                            type="password"
                            variant="outlined"
                            size="small"
                        />

                        <TextField
                            fullWidth
                            placeholder="Powtórz hasło"
                            type="password"
                            variant="outlined"
                            size="small"
                        />

                        <Box sx={{ mt: 2, width: '60%', margin: 'auto' }}>
                            <Button fullWidth variant="contained" color="primary" size="large">
                                Zarejestruj się
                            </Button>
                        </Box>
                        <Box sx={{ mt: 2, width: '60%', margin: 'auto' }}>
                            <Button fullWidth variant="contained" color="primary" size="large">
                                <GoogleIcon sx={{marginRight: '10px'}} /> Continue with google
                            </Button>
                        </Box>

                        <Typography
                            variant="body2"
                            align="center"
                            sx={{
                                mt: 2,
                                color: 'text.secondary'
                            }}
                        >
                            Masz konto?{' '}
                            <Link
                                underline="none"
                                sx={{
                                    fontWeight: 600,
                                }}
                                href={`/profile/login`}
                            >
                                Zaloguj się
                            </Link>
                        </Typography>
                    </Box>
                </LiquidGlassCard>
            </LoginPageContainer>
        </>
    );
}

export default RegisterPage;