/* eslint-disable @next/next/no-assign-module-variable */
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Course, Class } from '@/types';
import Link from 'next/link';
import { BookOpen, LogOut, ChevronRight, PlayCircle } from 'lucide-react';
import { useAuth } from '@/styles/lib/auth-context';
import { coursesAPI } from '@/styles/lib/api';
import { ProtectedRoute } from '@/styles/components/protected-route';
import { VideoPlayer } from '@/styles/components/video-player';

function ClassViewerContent() {
    const params = useParams();
    const router = useRouter();
    const { user, logout } = useAuth();
    const [course, setCourse] = useState<Course | null>(null);
    const [currentClass, setCurrentClass] = useState<Class | null>(null);
    const [loading, setLoading] = useState(true);

    const courseId = parseInt(params.id as string);
    const classId = parseInt(params.classId as string);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const courseData = await coursesAPI.getById(courseId);
                setCourse(courseData);

                // Find the current class
                for (const module of courseData.modules) {
                    const foundClass = module.classes.find((c) => c.id === classId);
                    if (foundClass) {
                        setCurrentClass(foundClass);
                        break;
                    }
                }
            } catch (error) {
                console.error('Failed to fetch data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [courseId, classId]);

    const getNextClass = () => {
        if (!course || !currentClass) return null;

        let foundCurrent = false;
        for (const module of course.modules) {
            for (const classItem of module.classes) {
                if (foundCurrent) return classItem;
                if (classItem.id === currentClass.id) foundCurrent = true;
            }
        }
        return null;
    };

    const handleNextClass = () => {
        const nextClass = getNextClass();
        if (nextClass) {
            router.push(`/courses/${courseId}/class/${nextClass.id}`);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto"></div>
                    <p className="mt-4 text-stone-600">Loading class...</p>
                </div>
            </div>
        );
    }

    if (!course || !currentClass) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-stone-600">Class not found</p>
                    <Link href="/courses" className="mt-4 text-sky-600 hover:text-sky-700">
                        Back to courses
                    </Link>
                </div>
            </div>
        );
    }

    const hasAccess = user ? coursesAPI.hasAccess(course, user.role) : false;
    const isStudent = user?.role === 'student';

    if (!hasAccess || !isStudent) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-stone-600">You do not have access to this class</p>
                    <Link href="/courses" className="mt-4 text-sky-600 hover:text-sky-700">
                        Back to courses
                    </Link>
                </div>
            </div>
        );
    }

    const nextClass = getNextClass();

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
                                href={`/courses/${courseId}`}
                                className="text-stone-700 hover:text-stone-900 font-medium"
                            >
                                Back to Course
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

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Video Player Section */}
                    <div className="lg:col-span-2">
                        <VideoPlayer videoUrl={currentClass.videoUrl} title={currentClass.title} />

                        {/* Class Info */}
                        <div className="mt-6 bg-white rounded-xl shadow-sm border border-stone-200 p-6">
                            <h1 className="text-2xl font-bold text-stone-900">{currentClass.title}</h1>
                            <p className="mt-2 text-stone-600">{currentClass.description}</p>

                            <div className="mt-4">
                                <h3 className="font-semibold text-stone-900 mb-2">Topics Covered:</h3>
                                <div className="flex flex-wrap gap-2">
                                    {currentClass.topics.map((topic, index) => (
                                        <span
                                            key={index}
                                            className="bg-sky-50 text-sky-700 px-3 py-1 rounded-lg text-sm"
                                        >
                                            {topic}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {nextClass && (
                                <button
                                    onClick={handleNextClass}
                                    className="mt-6 flex items-center gap-2 bg-sky-600 text-white px-6 py-3 rounded-lg hover:bg-sky-700 font-medium cursor-pointer"
                                >
                                    Next Class
                                    <ChevronRight className="h-5 w-5" />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Course Navigation Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6 sticky top-8">
                            <h2 className="font-bold text-stone-900 mb-4">{course.title}</h2>

                            <div className="space-y-4 max-h-[600px] overflow-y-auto">
                                {course.modules.map((module) => (
                                    <div key={module.id}>
                                        <h3 className="text-sm font-semibold text-stone-700 mb-2">
                                            {module.title}
                                        </h3>
                                        <div className="space-y-1">
                                            {module.classes.map((classItem) => (
                                                <Link
                                                    key={classItem.id}
                                                    href={`/courses/${courseId}/class/${classItem.id}`}
                                                    className={`block px-3 py-2 rounded-lg text-sm ${classItem.id === currentClass.id
                                                            ? 'bg-sky-50 text-sky-700 font-medium'
                                                            : 'text-stone-600 hover:bg-stone-50'
                                                        }`}
                                                >
                                                    <div className="flex items-start gap-2">
                                                        <PlayCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                                                        <div className="flex-1">
                                                            <div>{classItem.title}</div>
                                                            <div className="text-xs opacity-75">{classItem.duration}</div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ClassViewerPage() {
    return (
        <ProtectedRoute>
            <ClassViewerContent />
        </ProtectedRoute>
    );
}