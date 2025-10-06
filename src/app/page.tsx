import type React from "react";
/**
 * LANDING PAGE - Main entry point of the application
 * This is the first page users see when they visit the site
 * It includes: Navigation, Hero section, Features, and CTA buttons
 */

import Link from "next/link";
import { Button } from '../styles/components/ui/button';
import { BookOpen, Users, Video, Shield } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* NAVIGATION BAR - Sticky header that stays at top when scrolling */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo/Brand name */}
            <Link href="/" className="text-2xl font-bold text-foreground">
              CPS Academy
            </Link>

            {/* Navigation links - hidden on mobile, shown on desktop */}
            <div className="hidden md:flex items-center gap-6">
              <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                Features
              </Link>
              <Link href="#courses" className="text-muted-foreground hover:text-foreground transition-colors">
                Courses
              </Link>
              <Link href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
            </div>

            {/* Authentication buttons */}
            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button variant="ghost" className="text-foreground">
                  Log In
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO SECTION - Main attention-grabbing area */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Announcement badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Now enrolling for 2025 courses
          </div>

          {/* Main headline - using text-balance for better line breaks */}
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            Learn, Grow, and Excel with CPS Academy
          </h1>

          {/* Subheadline - describes the value proposition */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
            Access world-class courses designed for students, developers, and professionals. Learn at your own pace with
            expert instructors and comprehensive course materials.
          </p>

          {/* Call-to-action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto">
                Get Started Free
              </Button>
            </Link>
            <Link href="#courses">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                Browse Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION - Highlights key benefits */}
      <section id="features" className="bg-secondary/30 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Choose CPS Academy?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need to succeed in your learning journey
            </p>
          </div>

          {/* Feature cards grid - responsive layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1: Course Library */}
            <FeatureCard
              icon={<BookOpen className="w-8 h-8" />}
              title="Rich Course Library"
              description="Access hundreds of courses across multiple disciplines and skill levels"
            />

            {/* Feature 2: Expert Instructors */}
            <FeatureCard
              icon={<Users className="w-8 h-8" />}
              title="Expert Instructors"
              description="Learn from industry professionals with years of real-world experience"
            />

            {/* Feature 3: Video Lessons */}
            <FeatureCard
              icon={<Video className="w-8 h-8" />}
              title="HD Video Lessons"
              description="Watch high-quality video content anytime, anywhere on any device"
            />

            {/* Feature 4: Secure Platform */}
            <FeatureCard
              icon={<Shield className="w-8 h-8" />}
              title="Secure & Private"
              description="Your data is protected with enterprise-grade security measures"
            />
          </div>
        </div>
      </section>

      {/* ROLE-BASED ACCESS SECTION - Explains different user types */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Designed for Everyone</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Different access levels tailored to your needs
          </p>
        </div>

        {/* Role cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <RoleCard
            title="Students"
            description="Full access to courses, video lessons, and learning materials"
            features={["Watch class recordings", "Access course materials", "Track progress"]}
          />
          <RoleCard
            title="Developers"
            description="Technical courses and coding resources for software development"
            features={["Code examples", "Project templates", "API documentation"]}
          />
          <RoleCard
            title="Social Media Managers"
            description="Marketing and social media strategy courses"
            features={["Marketing guides", "Analytics tools", "Content templates"]}
          />
          <RoleCard
            title="Normal Users"
            description="Browse and preview available courses"
            features={["Course catalog", "Free previews", "Community access"]}
          />
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of students already learning on CPS Academy
          </p>
          <Link href="/signup">
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
              Create Free Account
            </Button>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-secondary/30 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center text-muted-foreground">
            <p className="mb-2">© 2025 CPS Academy. All rights reserved.</p>
            <div className="flex items-center justify-center gap-6 text-sm">
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link href="/contact" className="hover:text-foreground transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/**
 * FEATURE CARD COMPONENT
 * Reusable component for displaying feature information
 * Props: icon, title, description
 */
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-card rounded-lg p-6 border border-border hover:shadow-lg transition-shadow">
      <div className="text-primary mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-card-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

/**
 * ROLE CARD COMPONENT
 * Shows different user roles and their access levels
 * Props: title, description, features (array of strings)
 */
interface RoleCardProps {
  title: string;
  description: string;
  features: string[];
}

function RoleCard({ title, description, features }: RoleCardProps) {
  return (
    <div className="bg-card rounded-lg p-6 border border-border">
      <h3 className="text-xl font-semibold text-card-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm mb-4">{description}</p>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
            <span className="text-accent mt-1">✓</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
