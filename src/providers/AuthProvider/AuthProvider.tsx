'use client'

import {createContext, useContext} from "react";
import {useQuery, useMutation, useQueryClient, UseMutationResult} from '@tanstack/react-query'
import { getUser, loginUser, registerUser } from './api';
import IUser, {IAuthenticateResults, ILoginCredentials, IRegisterCredentials} from "@/interfaces/IUser";
import {useRouter} from "next/navigation";

interface IAuthProviderValue {
    user: IUser | null, // Zmieniłem na IUser | null, bo na początku usera nie ma
    isAuthenticated: boolean,
    isLoading: boolean,
    login: UseMutationResult<IAuthenticateResults, Error, ILoginCredentials, unknown>
    register: UseMutationResult<IAuthenticateResults, Error, IRegisterCredentials, unknown>
    logout: () => void,
    isLoggingIn: boolean,
    isError: boolean,
}

const AuthContext = createContext<IAuthProviderValue>({} as IAuthProviderValue);

const AuthProvider = ({children}) => {
    const queryClient = useQueryClient();
    const router = useRouter();

    const {data: user, isLoading, isError } = useQuery({
        queryKey: ['user'],
        queryFn: getUser,
        retry: false,
        staleTime: 1000 * 5 * 60,
    })

    const loginMutation = useMutation({
        mutationFn: loginUser,
        onSuccess: async (data: IAuthenticateResults) => {
            router.push('/dashboard');
            if (data?.token) {
                localStorage.setItem('token', data.token);
                if (data.expires) {
                    localStorage.setItem('token_expiration', data.expires);
                }
            }
            await queryClient.invalidateQueries({ queryKey: ['user'] });
        },
    })

    const registerMutation = useMutation({
        mutationFn: registerUser,
        onSuccess: async (data: IAuthenticateResults) => {
            if (data?.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('token_expiration', data.expires);
                await queryClient.invalidateQueries({ queryKey: ['user'] });
            }
        }
    })

    const logoutUser = () => {
        localStorage.removeItem('token');
        queryClient.clear()
    }

    const value: IAuthProviderValue = {
        user: user || null,
        isAuthenticated: !!user,
        isLoading,
        login: loginMutation,
        register: registerMutation,
        logout: logoutUser,
        isLoggingIn: loginMutation.isPending,
        isError: isError,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthProvider;