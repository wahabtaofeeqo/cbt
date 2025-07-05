import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';
import { ToastContainer} from 'react-toastify';

interface AppLayoutProps {
    children: ReactNode;
    roles?: string[];
    showSidebar?: boolean;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, roles, ...props }: AppLayoutProps) => (
    <AppLayoutTemplate breadcrumbs={breadcrumbs} roles={roles} showSidebar={props.showSidebar} {...props}>
        <ToastContainer />
        {children}
    </AppLayoutTemplate>
);
