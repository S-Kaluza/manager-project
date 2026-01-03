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
import {useFormik} from "formik";
import {ILoginCredentials} from "@/interfaces/IUser";
import {useAuth} from "@/providers/AuthProvider/AuthProvider";
import {useRouter} from "next/navigation";

function LoginPage() {
    const router = useRouter()
    const {login} = useAuth()

    const handleSubmit = (values: ILoginCredentials) => {
        login.mutate(values)
        router.push('/dashboard')
    }

    const formik = useFormik<ILoginCredentials>({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: handleSubmit,
    });
    return (
        <>
            <LoginPageContainer>
                <NetworkAnimation activeColor={'default'}/>

                <LiquidGlassCard glow maxWidth={'50%'} marginBottom={'15vh'} marginTop={'15vh'} marginLeft={'auto'} marginRight={'50px'}>
                    <Typography
                        variant="h5"
                        sx={{
                            mb: 3,
                            fontWeight: 700,
                            color: 'text.primary'
                        }}
                    >
                        Witamy ponownie
                    </Typography>

                    <Box component="form" onSubmit={formik.handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <TextField
                                fullWidth
                                placeholder="Adres e-mail"
                                variant="outlined"
                                size="small"
                                name="email"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                            />
                            <TextField
                                fullWidth
                                placeholder="Hasło"
                                type="password"
                                variant="outlined"
                                size="small"
                                name='password'
                                onChange={formik.handleChange}
                                value={formik.values.password}
                            />

                            <Box sx={{ mt: 2, width: '60%', margin: 'auto' }}>
                                <Button fullWidth variant="contained" color="primary" size="large" type={'submit'}>
                                    Zaloguj się
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
                            Nie masz konta?{' '}
                            <Link
                                underline="none"
                                sx={{
                                    fontWeight: 600,
                                }}
                                href={'/profile/register'}
                            >
                                Zarejestruj się
                            </Link>
                        </Typography>
                    </Box>
                </LiquidGlassCard>
            </LoginPageContainer>
        </>
    );
}

export default LoginPage;