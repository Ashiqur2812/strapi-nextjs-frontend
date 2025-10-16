// User role types - defines what type of user can access the system
export type UserRole = 'student' | 'developer' | 'social-media-manager' | 'normal-user';

// User interface - represents a logged-in user
export interface User {
    id: number;
    username: string;
    email: string;
    role: UserRole;
    jwt?: string; // JWT token for authentication
}

// Course interface - represents a course in the system
export interface Course {
    id: number;
    title: string;
    description: string;
    thumbnail: string;
    instructor: string;
    duration: string;
    level: string;
    allowedRoles: UserRole[]; // Which roles can access this course
    modules: Module[];
}

// Module interface - a section within a course
export interface Module {
    id: number;
    title: string;
    description: string;
    order: number;
    classes: Class[];
}

// Class interface - individual lesson/video within a module
export interface Class {
    id: number;
    title: string;
    description: string;
    duration: string;
    videoUrl: string;
    topics: string[];
    order: number;
}

// API Response types for Strapi
export interface StrapiResponse<T> {
    data: T;
    meta?: {
        pagination?: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}

export interface StrapiEntity<T> {
    id: number;
    attributes: T;
}