/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from '@/types'; 
import { authAPI } from './api'; 


interface AuthContextType {
    user: User | null; 
    loading: boolean;  
    login: (email: string, password: string) => Promise<void>; 
    register: (username: string, email: string, password: string, role: string) => Promise<void>
    logout: () => Promise<void>; 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode; }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    /**
     * 🧠 Check the server logged in or not
     * User data will be fetched from server cookie
     */
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const userData = await authAPI.me(); 
                setUser(userData);
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    /**
     * 🔑 Login Function
     */
    const login = async (email: string, password: string) => {
        try {
            await authAPI.login(email, password); 
            const userData = await authAPI.me(); 
            setUser(userData);
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    /**
     * 🚪 Register Function
     */

    const register = async (
        username: string,
        email: string,
        password: string,
        role: string
    ) => {
        try {
            const { user: userData, jwt } = await authAPI.register(
                username,
                email,
                password,
                role as any
            );
            localStorage.setItem('jwt', jwt);
            setUser(userData);
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        }
    }


    /**
     * 🚪 Logout Function
     * 
     */
    const logout = async () => {
        try {
            await authAPI.logout();
            setUser(null);
        } catch (error) {
            console.error('LogOut Failed:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}


export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
