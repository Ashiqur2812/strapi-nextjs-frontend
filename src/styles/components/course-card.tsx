/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { Course, UserRole } from '@/types';
import { Clock, BarChart, Lock } from 'lucide-react';
import { coursesAPI } from '../lib/api';

interface CourseCardProps {
    course: Course;
    userRole?: UserRole;
}

export function CourseCard({ course, userRole }: CourseCardProps) {
    const hasAccess = userRole ? coursesAPI.hasAccess(course, userRole) : false;

    return (
        <Link
            href={hasAccess ? `/courses/${course.id}` : '#'}
            className={`block rounded-xl border border-stone-200 bg-white overflow-hidden hover:shadow-lg transition-all ${!hasAccess ? 'opacity-60 cursor-not-allowed' : ''
                }`}
        >
            <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center relative">
                <img
                    src={course.thumbnail || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full h-full object-cover"
                />
                {!hasAccess && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Lock className="h-12 w-12 text-white" />
                    </div>
                )}
            </div>

            <div className="p-6">
                <h3 className="text-lg font-semibold text-stone-900 line-clamp-2">
                    {course.title}
                </h3>
                <p className="mt-2 text-sm text-stone-600 line-clamp-2">
                    {course.description}
                </p>

                <div className="mt-4 flex items-center gap-4 text-sm text-stone-500">
                    <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <BarChart className="h-4 w-4" />
                        <span>{course.level}</span>
                    </div>
                </div>

                <div className="mt-4 pt-4 border-t border-stone-200">
                    <p className="text-sm text-stone-600">By {course.instructor}</p>
                </div>

                {!hasAccess && (
                    <div className="mt-4 p-3 bg-amber-50 rounded-lg">
                        <p className="text-xs text-amber-800">
                            This course is not available for your role
                        </p>
                    </div>
                )}
            </div>
        </Link>
    );
}