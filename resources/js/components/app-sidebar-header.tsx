import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Button } from './ui/button';
import { Appearance, useAppearance } from '@/hooks/use-appearance';
import { LucideIcon, Monitor, Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AppSidebarHeader({ breadcrumbs = [] }: { breadcrumbs?: BreadcrumbItemType[] }) {
    const { appearance, updateAppearance } = useAppearance();
    const tabs: { value: Appearance; icon: LucideIcon; label: string }[] = [
        { value: 'light', icon: Sun, label: 'Light' },
        { value: 'dark', icon: Moon, label: 'Dark' },
        { value: 'system', icon: Monitor, label: 'System' },
    ];

    const Icon = tabs.find(item => item.value == appearance)?.icon

    return (
        <header className="border-sidebar-border/50 flex h-16 shrink-0 items-center gap-2 border-b px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            <div className="flex items-center justify-between w-full">
                <div className='flex items-center gap-2'>
                    <SidebarTrigger className="-ml-1" />
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                </div>
                
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost" size="icon"
                            className="h-8 w-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                            {
                                Icon ? <Icon /> : null
                            }
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="inline-flex gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800">
                        {
                            tabs.map(({value, icon: Icon, label}) => {
                                return (
                                    <DropdownMenuItem
                                        onClick={() => updateAppearance(value)}
                                        className={cn("cursor-pointer", appearance === value ? 'bg-white shadow-xs dark:bg-neutral-700 dark:text-neutral-100' : '')} >
                                        <Icon className="-ml-1 h-4 w-4" />
                                        <span className="ml-1.5 text-sm">{label}</span>
                                    </DropdownMenuItem>
                                )
                            })
                        }
                    </DropdownMenuContent>
                </DropdownMenu>   
            </div>
        </header>
    );
}
