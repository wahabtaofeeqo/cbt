import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    phone: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Course {
    id: string
    code: string
    title: string
    description: string
    status: string
}

export interface Teacher {
    id: string
    user: User
    status: string
    courses: Course[]
    department: string
}

export interface Student {
    id: string
    user: User
    level: string
    department: string
}

export interface Assessment {
    id?: string
    questions: any[]
    attempts_allowed: number
    due_date: string
    passing_score: number
    title: string
    type: string
    course: Course
    submissions: number
    [key: string]: unknown
}
