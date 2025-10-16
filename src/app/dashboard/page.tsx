'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BookOpen, LogOut, GraduationCap, Code, Share2, User } from 'lucide-react';
import { useAuth } from '@/styles/lib/auth-context';
import { ProtectedRoute } from '@/styles/components/protected-route';

function DashboardContent() {
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    const getRoleIcon = () => {
        switch (user?.role) {
            case 'student':
                return <GraduationCap className="h-8 w-8 text-sky-600" />;
            case 'developer':
                return <Code className="h-8 w-8 text-sky-600" />;
            case 'social-media-manager':
                return <Share2 className="h-8 w-8 text-sky-600" />;
            default:
                return <User className="h-8 w-8 text-sky-600" />;
        }
    };

    const getRoleDescription = () => {
        switch (user?.role) {
            case 'student':
                return 'You have full access to all courses and can watch video lessons';
            case 'developer':
                return 'Access programming and development courses';
            case 'social-media-manager':
                return 'Access marketing and social media courses';
            default:
                return 'Browse available courses and explore learning opportunities';
        }
    };

    return (
        <div className="min-h-screen bg-stone-50">
            {/* Navigation */}
            <nav className="border-b border-stone-200 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <Link href="/" className="flex items-center gap-2">
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
                            {user?.role === 'student' && (
                                <Link
                                    href="/my-courses"
                                    className="text-stone-700 hover:text-stone-900 font-medium"
                                >
                                    My Courses
                                </Link>
                            )}
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 text-stone-700 hover:text-stone-900 font-medium cursor-pointer"
                            >
                                <LogOut className="h-4 w-4" />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Dashboard Content */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                {/* Welcome Section */}
                <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-8 mb-8">
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">{getRoleIcon()}</div>
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold text-stone-900">
                                Welcome back, {user?.username}!
                            </h1>
                            <p className="mt-2 text-stone-600">{getRoleDescription()}</p>
                            <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-sky-50 px-3 py-1 text-sm font-medium text-sky-700">
                                Role: {user?.role?.replace('-', ' ').toUpperCase()}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <Link
                        href="/courses"
                        className="block rounded-xl border border-stone-200 bg-white p-6 hover:border-sky-300 hover:shadow-md transition-all"
                    >
                        <BookOpen className="h-8 w-8 text-sky-600 mb-3" />
                        <h3 className="text-lg font-semibold text-stone-900">Browse Courses</h3>
                        <p className="mt-2 text-sm text-stone-600">
                            Explore courses available for your role
                        </p>
                    </Link>

                    {user?.role === 'student' && (
                        <Link
                            href="/my-courses"
                            className="block rounded-xl border border-stone-200 bg-white p-6 hover:border-sky-300 hover:shadow-md transition-all"
                        >
                            <GraduationCap className="h-8 w-8 text-sky-600 mb-3" />
                            <h3 className="text-lg font-semibold text-stone-900">My Courses</h3>
                            <p className="mt-2 text-sm text-stone-600">
                                Continue learning from where you left off
                            </p>
                        </Link>
                    )}

                    <div className="rounded-xl border border-stone-200 bg-white p-6">
                        <User className="h-8 w-8 text-sky-600 mb-3" />
                        <h3 className="text-lg font-semibold text-stone-900">Profile</h3>
                        <p className="mt-2 text-sm text-stone-600">
                            Email: {user?.email}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function DashboardPage() {
    return (
        <ProtectedRoute>
            <DashboardContent />
        </ProtectedRoute>
    );
}
