import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../api/authApi';
import apiClient from '../api/axiosClient';

interface User {
    userId: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (userId: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // Initialize from localStorage
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        if (token && storedUser) {
            setUser(JSON.parse(storedUser));
            apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    }, []);

    const login = async (userId: string, role: string = 'ROLE_USER') => {
        try {
            const { accessToken } = await authApi.devLogin(userId, role);
            localStorage.setItem('token', accessToken);

            const newUser = { userId, role };
            localStorage.setItem('user', JSON.stringify(newUser));
            setUser(newUser);

            apiClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        } catch (error) {
            console.error('Login failed', error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        delete apiClient.defaults.headers.common['Authorization'];
        window.location.href = '/login';
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
