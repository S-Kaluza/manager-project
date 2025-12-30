'use client'
import {AnimationContainer, LoginForm, LoginPageContainer} from "@/app/profile/login/StyledComponents";
import {Button} from '@mui/material'


function LoginPage() {

    return (
        <>
            <LoginPageContainer>
                <AnimationContainer>

                </AnimationContainer>
                <LoginForm>
                    <Button>Hello world</Button>
                </LoginForm>
            </LoginPageContainer>
        </>
    );
}

export default LoginPage;