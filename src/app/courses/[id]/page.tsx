/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Course } from '@/types';
import Link from 'next/link';
import { BookOpen, LogOut, Clock, BarChart, PlayCircle, Lock } from 'lucide-react';
import { useAuth } from '@/styles/lib/auth-context';
import { coursesAPI } from '@/styles/lib/api';
import { ProtectedRoute } from '@/styles/components/protected-route';

function CourseDetailContent() {
    const params = useParams();
    const router = useRouter();
    const { user, logout } = useAuth();
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);

    const courseId = parseInt(params.id as string);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const data = await coursesAPI.getById(courseId);
                setCourse(data);
            } catch (error) {
                console.error('Failed to fetch course:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, [courseId]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto"></div>
                    <p className="mt-4 text-stone-600">Loading course...</p>
                </div>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-stone-600">Course not found</p>
                    <Link href="/courses" className="mt-4 text-sky-600 hover:text-sky-700">
                        Back to courses
                    </Link>
                </div>
            </div>
        );
    }

    const hasAccess = user ? coursesAPI.hasAccess(course, user.role) : false;
    const isStudent = user?.role === 'student';

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
                                href="/courses"
                                className="text-stone-700 hover:text-stone-900 font-medium"
                            >
                                Courses
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

            {/* Course Content */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                {/* Course Header */}
                <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-8 mb-8">
                    <div className="flex items-start gap-6">
                        <img
                            src={course.thumbnail || "/placeholder.svg"}
                            alt={course.title}
                            className="w-48 h-32 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold text-stone-900">{course.title}</h1>
                            <p className="mt-2 text-stone-600">{course.description}</p>

                            <div className="mt-4 flex items-center gap-6 text-sm text-stone-500">
                                <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    <span>{course.duration}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <BarChart className="h-4 w-4" />
                                    <span>{course.level}</span>
                                </div>
                                <span>By {course.instructor}</span>
                            </div>

                            {!hasAccess && (
                                <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                                    <p className="text-sm text-amber-800">
                                        You do not have access to this course. This course is available for:{' '}
                                        {course.allowedRoles.join(', ')}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Course Modules */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-stone-900">Course Content</h2>

                    {course.modules.map((module) => (
                        <div key={module.id} className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
                            <div className="bg-stone-50 px-6 py-4 border-b border-stone-200">
                                <h3 className="text-lg font-semibold text-stone-900">{module.title}</h3>
                                <p className="text-sm text-stone-600 mt-1">{module.description}</p>
                            </div>

                            <div className="divide-y divide-stone-200">
                                {module.classes.map((classItem) => (
                                    <div key={classItem.id} className="px-6 py-4 flex items-center justify-between">
                                        <div className="flex items-start gap-3 flex-1">
                                            {hasAccess && isStudent ? (
                                                <PlayCircle className="h-5 w-5 text-sky-600 flex-shrink-0 mt-0.5" />
                                            ) : (
                                                <Lock className="h-5 w-5 text-stone-400 flex-shrink-0 mt-0.5" />
                                            )}
                                            <div className="flex-1">
                                                <h4 className="font-medium text-stone-900">{classItem.title}</h4>
                                                <p className="text-sm text-stone-600 mt-1">{classItem.description}</p>
                                                <div className="mt-2 flex flex-wrap gap-2">
                                                    {classItem.topics.map((topic, index) => (
                                                        <span
                                                            key={index}
                                                            className="text-xs bg-sky-50 text-sky-700 px-2 py-1 rounded"
                                                        >
                                                            {topic}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 ml-4">
                                            <span className="text-sm text-stone-500">{classItem.duration}</span>
                                            {hasAccess && isStudent && (
                                                <Link
                                                    href={`/courses/${course.id}/class/${classItem.id}`}
                                                    className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 text-sm font-medium"
                                                >
                                                    Watch
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function CourseDetailPage() {
    return (
        <ProtectedRoute>
            <CourseDetailContent />
        </ProtectedRoute>
    );
}