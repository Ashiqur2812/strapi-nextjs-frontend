import Link from 'next/link';
import { BookOpen, Users, Award, ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="h-8 w-8 text-sky-600" />
              <span className="text-xl font-bold text-stone-900">CPS Academy</span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="text-stone-700 hover:text-stone-900 font-medium"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="rounded-lg bg-sky-600 px-4 py-2 text-white hover:bg-sky-700 font-medium"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-sky-50 to-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-balance text-5xl font-bold text-stone-900 sm:text-6xl">
              Learn Skills That Matter
            </h1>
            <p className="text-pretty mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-stone-600">
              Access high-quality courses designed for students, developers, and professionals.
              Learn at your own pace with expert instructors.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link
                href="/signup"
                className="flex items-center gap-2 rounded-lg bg-sky-600 px-6 py-3 text-white hover:bg-sky-700 font-medium"
              >
                Get Started
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/courses"
                className="rounded-lg border-2 border-stone-300 px-6 py-3 text-stone-700 hover:border-stone-400 font-medium"
              >
                Browse Courses
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-balance text-center text-3xl font-bold text-stone-900">
            Why Choose CPS Academy?
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="rounded-xl border border-stone-200 bg-white p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sky-100">
                <BookOpen className="h-6 w-6 text-sky-600" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-stone-900">
                Expert-Led Courses
              </h3>
              <p className="mt-2 leading-relaxed text-stone-600">
                Learn from industry professionals with years of real-world experience
              </p>
            </div>

            <div className="rounded-xl border border-stone-200 bg-white p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100">
                <Users className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-stone-900">
                Role-Based Learning
              </h3>
              <p className="mt-2 leading-relaxed text-stone-600">
                Courses tailored for students, developers, and social media managers
              </p>
            </div>

            <div className="rounded-xl border border-stone-200 bg-white p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                <Award className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-stone-900">
                Learn at Your Pace
              </h3>
              <p className="mt-2 leading-relaxed text-stone-600">
                Access course materials anytime, anywhere, on any device
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section className="bg-stone-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-balance text-center text-3xl font-bold text-stone-900">
            Who Is This For?
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-sky-600">Students</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">
                Access all courses and watch video lessons to build your skills
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-sky-600">Developers</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">
                Advanced programming courses and technical content
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-sky-600">Social Media Managers</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">
                Marketing strategies and content creation courses
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-sky-600">Normal Users</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">
                Browse courses and explore learning opportunities
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center text-stone-600">
            <p>&copy; 2025 CPS Academy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}