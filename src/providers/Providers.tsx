// app/providers.tsx
'use client'

import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AuthProvider from "@/providers/AuthProvider/AuthProvider";
import { ThemeProvider, CssBaseline } from '@mui/material';
import darkTheme from "@/globalTheme/darkTheme";
import StyledComponentsRegistry from "@/app/registry";

export default function Providers({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000,
            },
        },
    }));

    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <ThemeProvider theme={darkTheme}>
                    <CssBaseline />
                    <StyledComponentsRegistry>
                        {children}
                    </StyledComponentsRegistry>
                </ThemeProvider>
            </AuthProvider>
        </QueryClientProvider>
    )
}