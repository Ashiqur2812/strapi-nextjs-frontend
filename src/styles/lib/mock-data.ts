/* eslint-disable @typescript-eslint/no-unused-vars */
import { Course, User, UserRole } from '@/types';

// Mock users for testing - use these credentials to login
export const mockUsers: User[] = [
    {
        id: 1,
        username: 'student1',
        email: 'student@example.com',
        role: 'student',
    },
    {
        id: 2,
        username: 'developer1',
        email: 'developer@example.com',
        role: 'developer',
    },
    {
        id: 3,
        username: 'social1',
        email: 'social@example.com',
        role: 'social-media-manager',
    },
    {
        id: 4,
        username: 'user1',
        email: 'user@example.com',
        role: 'normal-user',
    },
];

// Mock courses with role-based access
export const mockCourses: Course[] = [
    {
        id: 1,
        title: 'Complete Web Development Bootcamp',
        description: 'Learn HTML, CSS, JavaScript, React, Node.js and more',
        thumbnail: '/web-development-coding.png',
        instructor: 'Harry',
        duration: '40 hours',
        level: 'Beginner to Advanced',
        allowedRoles: ['student', 'developer'],
        modules: [
            {
                id: 1,
                title: 'Introduction to Web Development',
                description: 'Learn the basics of web development',
                order: 1,
                classes: [
                    {
                        id: 1,
                        title: 'What is Web Development?',
                        description: 'Introduction to web development concepts',
                        duration: '15 min',
                        videoUrl: 'https://youtu.be/X8BYu3dMKf0',
                        topics: ['Web basics', 'Frontend vs Backend', 'Career paths'],
                        order: 1,
                    },
                    {
                        id: 2,
                        title: 'Setting Up Your Development Environment',
                        description: 'Install necessary tools and software',
                        duration: '20 min',
                        videoUrl: 'https://youtu.be/MIJt9H69QVc',
                        topics: ['VS Code', 'Node.js'],
                        order: 2,
                    },
                ],
            },
            {
                id: 2,
                title: 'HTML & CSS Fundamentals',
                description: 'Master the building blocks of web pages',
                order: 2,
                classes: [
                    {
                        id: 3,
                        title: 'HTML Basics',
                        description: 'Learn HTML tags and structure',
                        duration: '30 min',
                        videoUrl: 'https://youtu.be/k2DSi1zGEc8',
                        topics: ['HTML tags', 'Semantic HTML', 'Forms'],
                        order: 1,
                    },
                    {
                        id: 4,
                        title: 'CSS Styling',
                        description: 'Style your web pages with CSS',
                        duration: '35 min',
                        videoUrl: 'https://youtu.be/ESnrn1kAD4E',
                        topics: ['Selectors', 'Box model', 'Flexbox'],
                        order: 2,
                    },
                ],
            },
        ],
    },
    {
        id: 2,
        title: 'Social Media Marketing Mastery',
        description: 'Learn to create engaging content and grow your audience',
        thumbnail: '/social-media-marketing.png',
        instructor: 'Jane Smith',
        duration: '25 hours',
        level: 'Intermediate',
        allowedRoles: ['student', 'social-media-manager'],
        modules: [
            {
                id: 3,
                title: 'Social Media Strategy',
                description: 'Plan your social media presence',
                order: 1,
                classes: [
                    {
                        id: 5,
                        title: 'Understanding Your Audience',
                        description: 'Learn to identify and target your audience',
                        duration: '25 min',
                        videoUrl: 'https://youtu.be/mZm8hksRaIA',
                        topics: ['Demographics', 'Psychographics', 'Personas'],
                        order: 1,
                    },
                ],
            },
        ],
    },
    {
        id: 3,
        title: 'Advanced Programming Concepts',
        description: 'Deep dive into algorithms, data structures, and design patterns',
        thumbnail: '/programming-code-abstract.png',
        instructor: 'Mike Johnson',
        duration: '50 hours',
        level: 'Advanced',
        allowedRoles: ['developer'],
        modules: [
            {
                id: 4,
                title: 'Data Structures',
                description: 'Master essential data structures',
                order: 1,
                classes: [
                    {
                        id: 6,
                        title: 'Arrays and Linked Lists',
                        description: 'Understanding linear data structures',
                        duration: '40 min',
                        videoUrl: 'https://youtu.be/1lqoJ-NSmDE',
                        topics: ['Arrays', 'Linked Lists', 'Time Complexity'],
                        order: 1,
                    },
                ],
            },
        ],
    },
];