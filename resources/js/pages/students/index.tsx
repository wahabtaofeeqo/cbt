import { Head, router } from "@inertiajs/react";
import AppLayout from "../../layouts/app-layout";
import { BreadcrumbItem, Student } from "@/types";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CiMenuKebab } from "react-icons/ci";
import { toast } from 'react-toastify';
import { PlusCircle } from "lucide-react";
import AddStudent from "@/components/ui/add-student";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Students',
        href: '/students',
    },
];

type StudentProps = {
    students: Student[]
    departments: { id: string, name: string }[]
}

const tableHeaders: any[] = ['SN', 'Name', 'Department', 'Level', 'Status', ''];

export default function index({students, departments}: StudentProps) {

    const [isOpen, setOpen] = useState(false);
    const [isDelete, setDelete] = useState(false);
    const [student, setStudent] = useState<any>(null);

    const doDelete = () => {
        if(student) {
            router.delete(route('students.delete', {id: student.id}), {
                onSuccess: () => {
                    setDelete(!isDelete);
                    toast('Student deleted successfully')
                },
                onError: (e) => {
                    setDelete(!isDelete)
                    toast(e.message ?? 'Failed to delete Student');
                }
            })
        }
    };

    const toggleDialog = () => {
        setStudent(null);
        setOpen(!isOpen);
    }

    const handleDelete = (model: any) => {
        setStudent(model);
        setDelete(!isDelete);
    };

    const handleEdit = (model: any) => {
        setOpen(!isOpen);
        setStudent(model)
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>

            {/* Adding New */}
            <Dialog open={isOpen} onOpenChange={(open) => {setOpen(open)}}>
                <DialogContent>
                    <DialogTitle>{student ? 'Update' : 'Add New'} Student</DialogTitle>
                    <div className="mt-4">
                        <AddStudent
                            student={student} 
                            onClose={toggleDialog} 
                            departments={departments}/>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Delete a course */}
            <Dialog open={isDelete} onOpenChange={(bool) => setDelete(bool)}>
                <DialogContent>
                    <DialogTitle>Delete Student?</DialogTitle>
                    <DialogDescription>
                        All the related activities will also be deleted.
                    </DialogDescription>

                    <DialogFooter className="gap-2">
                        <DialogClose asChild>
                            <Button variant="secondary" onClick={() => setDelete(false)}>
                                Cancel
                            </Button>
                        </DialogClose>

                        <Button variant="destructive" asChild>
                            <button onClick={doDelete}>Delete</button>
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Head title="Dashboard" />
            <div className='p-4'>
                <div className="text-end mb-4">
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded text-sm font-medium cursor-pointer" onClick={toggleDialog}>Add Student</button>
                </div>

                {/* Students */}
                {
                    students?.length ?
                    (
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
                                    {students.map((row: any, rowIndex: number) => (
                                        <tr
                                        key={rowIndex}
                                        className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100'}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {rowIndex + 1}
                                            </td>

                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {row.user.name}
                                            </td>

                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {row.department}
                                            </td>

                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                               {row.level}
                                            </td>

                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {row.status}
                                            </td>

                                            <td align="right">
                                                {/* Three dots dropdown menu */}
                                                <div className="">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                                                            >
                                                                <CiMenuKebab />
                                                                <span className="sr-only">Actions</span>
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end" className="w-40">
                                                            <DropdownMenuItem
                                                            onClick={() => handleEdit(row)}
                                                            className="cursor-pointer"
                                                            >
                                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                            </svg>
                                                            Edit
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                            onClick={() => handleDelete(row)}
                                                            className="cursor-pointer text-red-600 focus:text-red-600 dark:text-red-400 focus:bg-red-50 dark:focus:bg-red-900/20"
                                                            >
                                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                            Delete
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )
                    : (
                        <>
                            <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                                <div className="mx-auto max-w-md">
                                    {/* Illustration */}
                                    <svg
                                        className="mx-auto h-48 w-48 text-gray-300 dark:text-gray-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1}
                                        d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
                                        />
                                    </svg>

                                    {/* Text content */}
                                    <h3 className="mt-6 text-lg font-medium text-gray-900 dark:text-white">
                                        No Students added yet
                                    </h3>
                                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                        Get started by adding Students and assign Courses.
                                    </p>

                                    {/* CTA Button */}
                                    <div className="mt-6">
                                        <button onClick={toggleDialog}
                                        className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            <PlusCircle className="-ml-0.5 mr-1.5 h-5 w-5" />
                                            Add Student
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }
            </div>
        </AppLayout>
    );
}
