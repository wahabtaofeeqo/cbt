import Table from '@/components/table';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { BookIcon, Building2, PersonStandingIcon, UsersIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

const tableHeaders: any[] = ['SN', 'Name', 'Course', 'Matric', 'Department'];
type Props = {
    roles: string[]
    courses: number
    students: number
    teachers: number
    departments: number
    submissions: any[]
}

export default function Dashboard({roles, courses, students, teachers, departments, submissions}: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs} roles={roles}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 hidden">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>

            <div className='p-4'>
                <div className="grid auto-rows-min gap-6 md:grid-cols-4 mb-6">
                    {/* Courses Card */}
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-900/10 border border-blue-200/70 dark:border-blue-800/50 p-6 flex flex-col justify-between transition-all hover:scale-[1.02] hover:shadow-lg">
                        <div className="flex justify-between items-start">
                        <h4 className='font-semibold text-blue-600 dark:text-blue-300 text-lg'>Courses</h4>
                        <div className="p-2 rounded-lg bg-blue-100/50 dark:bg-blue-900/20">
                            <BookIcon className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                        </div>
                        </div>
                        <h1 className='font-medium text-6xl text-blue-800 dark:text-blue-100 mt-4'>{courses}</h1>
                    </div>

                    {/* Students Card */}
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-900/10 border border-green-200/70 dark:border-green-800/50 p-6 flex flex-col justify-between transition-all hover:scale-[1.02] hover:shadow-lg">
                        <div className="flex justify-between items-start">
                        <h4 className='font-semibold text-green-600 dark:text-green-300 text-lg'>Students</h4>
                        <div className="p-2 rounded-lg bg-green-100/50 dark:bg-green-900/20">
                            <UsersIcon className="h-5 w-5 text-green-500 dark:text-green-400" />
                        </div>
                        </div>
                        <h1 className='font-medium text-6xl text-green-800 dark:text-green-100 mt-4'>{students}</h1>
                    </div>

                    {/* Lecturers Card */}
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-900/10 border border-purple-200/70 dark:border-purple-800/50 p-6 flex flex-col justify-between transition-all hover:scale-[1.02] hover:shadow-lg">
                        <div className="flex justify-between items-start">
                        <h4 className='font-semibold text-purple-600 dark:text-purple-300 text-lg'>Lecturers</h4>
                        <div className="p-2 rounded-lg bg-purple-100/50 dark:bg-purple-900/20">
                            <PersonStandingIcon className="h-5 w-5 text-purple-500 dark:text-purple-400" />
                        </div>
                        </div>
                        <h1 className='font-medium text-6xl text-purple-800 dark:text-purple-100 mt-4'>{teachers}</h1>
                    </div>

                     {/* Department Card */}
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-900/10 border border-purple-200/70 dark:border-purple-800/50 p-6 flex flex-col justify-between transition-all hover:scale-[1.02] hover:shadow-lg">
                        <div className="flex justify-between items-start">
                        <h4 className='font-semibold text-purple-600 dark:text-purple-300 text-lg'>Departments</h4>
                        <div className="p-2 rounded-lg bg-purple-100/50 dark:bg-purple-900/20">
                            <Building2 className="h-5 w-5 text-purple-500 dark:text-purple-400" />
                        </div>
                        </div>
                        <h1 className='font-medium text-6xl text-purple-800 dark:text-purple-100 mt-4'>{departments}</h1>
                    </div>
                </div>

                <h4 className='font-bold text-gray-800 dark:text-gray-200 text-sm mb-4'>Latest Submissions</h4>
                {
                    submissions.length 
                    ? (
                          <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 shadow-sm rounded-lg overflow-hidden">
                                <thead className="bg-gray-50">
                                <tr>
                                    {tableHeaders.map((header: any, index: number) => (
                                    <th
                                        key={index}
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        {header}
                                    </th>
                                    ))}
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {submissions.map((row: any, rowIndex: number) => (
                                        <tr
                                        key={rowIndex}
                                        className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100'}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {rowIndex + 1}
                                            </td>

                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {row.student.user.name}
                                            </td>

                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {row.assessment.course.code}
                                            </td>

                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                               {row.student.matric_number}
                                            </td>

                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {row.assessment.course.department.name}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )
                    : <div>
                        <hr />
                        <p className='mt-2'>No assessment submission has taken place yet</p>
                    </div>
                }
            </div>
        </AppLayout>
    );
}
