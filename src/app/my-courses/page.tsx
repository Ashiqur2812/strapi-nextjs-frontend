'use client';

import { useEffect, useState } from 'react';
import { Course } from '@/types';
import Link from 'next/link';
import { BookOpen, LogOut } from 'lucide-react';
import { useAuth } from '@/styles/lib/auth-context';
import { coursesAPI } from '@/styles/lib/api';
import { CourseCard } from '@/styles/components/course-card';
import { ProtectedRoute } from '@/styles/components/protected-route';

function MyCoursesContent() {
    const { user, logout } = useAuth();
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await coursesAPI.getAll(user?.role);
                setCourses(data);
            } catch (error) {
                console.error('Failed to fetch courses:', error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchCourses();
        }
    }, [user]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto"></div>
                    <p className="mt-4 text-stone-600">Loading your courses...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-stone-50">
            {/* Navigation */}
            <nav className="border-b border-stone-200 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <Link href="/dashboard" className="flex items-center gap-2">
                            <BookOpen className="h-8 w-8 text-sky-600" />
                            <span className="text-xl font-bold text-stone-900">CPS Academy</span>
                        </Link>
                        <div className="flex items-center gap-4">
                            <Link
                                href="/dashboard"
                                className="text-stone-700 hover:text-stone-900 font-medium"
                            >
                                Dashboard
                            </Link>
                            <Link
                                href="/courses"
                                className="text-stone-700 hover:text-stone-900 font-medium"
                            >
                                All Courses
                            </Link>
                            <button
                                onClick={logout}
                                className="flex items-center gap-2 text-stone-700 hover:text-stone-900 font-medium cursor-pointer"
                            >
                                <LogOut className="h-4 w-4" />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* My Courses Content */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-stone-900">My Courses</h1>
                    <p className="mt-2 text-stone-600">
                        Continue learning from where you left off
                    </p>
                </div>

                {courses.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-stone-600">You have not enrolled in any courses yet.</p>
                        <Link
                            href="/courses"
                            className="mt-4 inline-block text-sky-600 hover:text-sky-700 font-medium"
                        >
                            Browse available courses
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {courses.map((course) => (
                            <CourseCard key={course.id} course={course} userRole={user?.role} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default function MyCoursesPage() {
    return (
        <ProtectedRoute>
            <MyCoursesContent />
        </ProtectedRoute>
    );
}