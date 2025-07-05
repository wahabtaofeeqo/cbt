import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';

export default function AppSidebarLayout({ children, breadcrumbs = [], roles = [], showSidebar = true}: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[], roles?: string[], showSidebar?: boolean }>) {
    return (
        <AppShell variant="sidebar">
            {showSidebar && <AppSidebar roles={roles} />}
            <AppContent variant="sidebar">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                {children}
            </AppContent>
        </AppShell>
    );
}
