import {ILoginCredentials, IRegisterCredentials} from "@/interfaces/IUser";

export const getUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token found');
    }
    const res = await fetch(`/api/auth/profile`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    if (!res.ok) throw new Error('Not authenticated');
    const response = await res.json();
    return response;
};

export const loginUser = async (credentials: ILoginCredentials) => {
    const res = await fetch(`/api/auth/login`, {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: new Headers({
            'Content-Type': 'application/json',
        })
    });
    if (!res.ok) throw new Error('Login failed');
    return res.json();
};

export const logoutUser = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
};

export const registerUser = async (credentials: IRegisterCredentials) => {
    const res = await fetch(`/api/auth/register`, {
        method: 'POST',
        body: JSON.stringify(credentials),
    })
    if (!res.ok) throw new Error('Register failed');
    return res.json();
}