/* eslint-disable @typescript-eslint/no-explicit-any */
import { Course, User, UserRole, StrapiResponse, StrapiEntity } from '@/types';
import { mockCourses, mockUsers } from './mock-data';

// Get API URL from environment variables
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337/api';
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

// =======================
//  Helper: Cookie Utils
// =======================

// 🍪 Set cookie
function setCookie(name: string, value: string, days = 7) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/; secure; samesite=strict`;
}

// 🍪 Get cookie
function getCookie(name: string): string | null {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
        const [key, value] = cookie.split('=');
        if (key === name) return value;
    }
    return null;
}

// 🍪 Remove cookie
function removeCookie(name: string) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

// =======================
//  Generic Fetch Wrapper
// =======================
async function fetchAPI(endpoint: string, options: RequestInit = {}) {
    const token = getCookie('jwt'); // 🍪 now using cookie

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
    };

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
}

// =======================
//  Authentication API
// =======================
export const authAPI = {
    // 🔹 Login user
    async login(email: string, password: string): Promise<{ user: User; jwt: string; }> {
        if (USE_MOCK) {
            const user = mockUsers.find((u) => u.email === email);
            if (!user || password !== 'password123') {
                throw new Error('Invalid credentials');
            }
            setCookie('jwt', 'mock-jwt-token-' + user.id);
            return { user, jwt: 'mock-jwt-token-' + user.id };
        }

        const data = await fetchAPI('/auth/local', {
            method: 'POST',
            body: JSON.stringify({ identifier: email, password }),
        });

        setCookie('jwt', data.jwt);
        return {
            user: {
                id: data.user.id,
                username: data.user.username,
                email: data.user.email,
                role: data.user.role,
            },
            jwt: data.jwt,
        };
    },

    // 🔹 Register new user
    async register(
        username: string,
        email: string,
        password: string,
        role: UserRole
    ): Promise<{ user: User; jwt: string; }> {
        if (USE_MOCK) {
            const newUser: User = {
                id: mockUsers.length + 1,
                username,
                email,
                role,
            };
            setCookie('jwt', 'mock-jwt-token-' + newUser.id);
            return { user: newUser, jwt: 'mock-jwt-token-' + newUser.id };
        }

        const data = await fetchAPI('/auth/local/register', {
            method: 'POST',
            body: JSON.stringify({ username, email, password, role }),
        });

        setCookie('jwt', data.jwt);
        return {
            user: {
                id: data.user.id,
                username: data.user.username,
                email: data.user.email,
                role: data.user.role,
            },
            jwt: data.jwt,
        };
    },

    // 🔹 Get current logged-in user
    async me(): Promise<User> {
        if (USE_MOCK) {
            const jwt = getCookie('jwt');
            if (!jwt) throw new Error('Not authenticated');

            const userId = parseInt(jwt.split('-').pop() || '1');
            const user = mockUsers.find((u) => u.id === userId);
            if (!user) throw new Error('User not found');
            return user;
        }

        const data = await fetchAPI('/users/me');
        return {
            id: data.id,
            username: data.username,
            email: data.email,
            role: data.role,
        };
    },

    // 🔹 Logout user
    async logout(): Promise<void> {
        removeCookie('jwt');
    },
};

// =======================
//   Courses API
// =======================
export const coursesAPI = {
    async getAll(userRole?: UserRole): Promise<Course[]> {
        if (USE_MOCK) {
            if (!userRole) return mockCourses;
            return mockCourses.filter((course) =>
                course.allowedRoles.includes(userRole)
            );
        }

        const query = userRole ? `?filters[allowedRoles][$contains]=${userRole}` : '';
        const data: StrapiResponse<StrapiEntity<any>[]> = await fetchAPI(
            `/courses${query}&populate[modules][populate][classes]=*`
        );

        return data.data.map((item) => ({
            id: item.id,
            ...item.attributes,
        }));
    },

    async getById(id: number): Promise<Course> {
        if (USE_MOCK) {
            const course = mockCourses.find((c) => c.id === id);
            if (!course) throw new Error('Course not found');
            return course;
        }

        const data: StrapiResponse<StrapiEntity<any>> = await fetchAPI(
            `/courses/${id}?populate[modules][populate][classes]=*`
        );

        return {
            id: data.data.id,
            ...data.data.attributes,
        };
    },

    hasAccess(course: Course, userRole: UserRole): boolean {
        return course.allowedRoles.includes(userRole);
    },
};
