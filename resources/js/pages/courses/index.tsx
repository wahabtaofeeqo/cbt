import { Head, Link, router, useForm } from "@inertiajs/react";
import AppLayout from "../../layouts/app-layout";
import { BreadcrumbItem, Course } from "@/types";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CiMenuKebab } from "react-icons/ci";
import { toast } from 'react-toastify';
import { PlusCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Courses',
        href: '/courses',
    },
];

type CourseProps = {
    can: any
    courses: Course[]
    departments: any[]
}

export default function index({can, courses, departments}: CourseProps) {

    const [isOpen, setOpen] = useState(false);
    const [isDelete, setDelete] = useState(false);
    const [course, setCourse] = useState<any>(null);
    const { data, setData, post, put, processing, reset, errors } = useForm<any>({ 
        title: '', 
        description: '', 
        code: '', 
        status: 'Active',
        level: '100',
        department_id: ''
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if(course) {
            put(route('courses.update', {id: course.id}), {
                 onSuccess: () => {
                    reset();
                    toggleDialog()
                },
            })
        }
        else {
            post(route("courses.store"), {
            onSuccess: () => {
                reset();
                toggleDialog()
            },
        });
        }
    };

    const doDelete = () => {
        if(course) {
            router.delete(route('courses.delete', {id: course.id}), {
                onSuccess: () => {
                    setDelete(!isDelete);
                    toast('Course deleted successfully')
                },
                onError: (e) => {
                    setDelete(!isDelete)
                    toast(e.message ?? 'Failed to delete course');
                }
            })
        }
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'active':
                return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
            case 'inactive':
                return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
        }
    };

    const toggleDialog = () => {
        setCourse(null);
        setOpen(!isOpen);
    }

    const handleEdit = (course: any) => {
        setData(course);
        setOpen(!isOpen);
        setCourse(course)
    };

    const handleDelete = (course: any) => {
        setCourse(course);
        setDelete(!isDelete);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>

            {/* Adding New courses */}
            <Dialog open={isOpen} onOpenChange={(open) => {setOpen(open)}}>
                <DialogContent>
                    <DialogTitle>Add New Course</DialogTitle>
                    <form className="space-y-6" onSubmit={submit}>
                       <div className="grid gap-4">
                            {/* Course Title */}
                            <div className="grid gap-2">
                                <Label htmlFor="title">Course Title</Label>
                                <Input
                                    id="title"
                                    name="title"
                                    value={data.title}
                                    onChange={(e) => setData("title", e.target.value)}
                                    placeholder="Introduction to Computer Science"
                                    autoComplete="off"
                                />
                                <InputError message={errors.title} />
                            </div>

                            {/* Course Code */}
                            <div className="grid gap-2">
                                <Label htmlFor="title">Course Code</Label>
                                <Input
                                    id="code"
                                    name="code"
                                    value={data.code}
                                    onChange={(e) => setData("code", e.target.value)}
                                    placeholder="CPM 101"
                                    autoComplete="off"
                                />
                                <InputError message={errors.code} />
                            </div>

                            {/* Description */}
                            <div className="grid gap-2">
                                <Label htmlFor="description">Description</Label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={3}
                                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                    value={data.description}
                                    onChange={(e) => setData("description", e.target.value)}
                                    placeholder="Brief description of the course content..."
                                />
                                <InputError message={errors.description} />
                            </div>

                            <div className="">
                                <Label htmlFor="department">Department*</Label>
                                <Select
                                    value={data.department_id}
                                    onValueChange={(value) => setData("department_id", value)}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
        
                                    <SelectContent>
                                        {
                                            departments.map((department) => (
                                                <SelectItem key={department.id} value={department.id}>
                                                    {department.name}
                                                </SelectItem>
                                            ))
                                        }
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.status} />
                            </div>

                            <div className="">
                                <Label htmlFor="level">Level*</Label>
                                <Select
                                    value={data.level}
                                    onValueChange={(value) => setData("level", value)}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Level" />
                                    </SelectTrigger>
        
                                    <SelectContent>
                                        {
                                            ["100", "200", "300", "400"].map((level) => (
                                                <SelectItem key={level} value={level}>
                                                    {level} Level
                                                </SelectItem>
                                            ))
                                        }
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.level} />
                            </div>
                       </div>

                       <DialogFooter className="gap-2">
                         <DialogClose asChild>
                           <Button variant="secondary" onClick={toggleDialog} type="button">
                                Cancel
                           </Button>
                         </DialogClose>

                         <Button type="submit" disabled={processing}>
                            {processing ? "Adding..." : "Add Course"}
                         </Button>
                       </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete a course */}
            <Dialog open={isDelete} onOpenChange={(bool) => setDelete(bool)}>
                <DialogContent>
                    <DialogTitle>Delete Course?</DialogTitle>
                    <DialogDescription>
                        All the assessments related to this Course will also be deleted.
                    </DialogDescription>

                    <DialogFooter className="gap-2">
                        <DialogClose asChild>
                            <Button variant="secondary" onClick={() => setDelete(false)}>
                                Cancel
                            </Button>
                        </DialogClose>

                        <Button variant="destructive" disabled={processing} asChild>
                            <button onClick={doDelete}>Delete</button>
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Head title="Dashboard" />
            <div className='p-4'>
                {
                    can?.create_course && (
                        <div className="text-end mb-4">
                            <button className="bg-indigo-600 text-white px-4 py-2 rounded text-sm font-medium cursor-pointer" onClick={toggleDialog}>Add Course</button>
                        </div>
                    )
                }

                {/* Courses Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
                    {courses.map((course: any, index: number) => (
                        <>
                        <div key={course.id} className="relative group rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 flex flex-col">

                        {/* Three dots dropdown menu */}
                        <div className="absolute top-3 right-3">
                            <DropdownMenu>
                                {
                                    can?.create_course && (
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                                            >
                                            <CiMenuKebab />
                                            {/* <CircleDotDashedIcon className="h-4 w-4" /> */}
                                            <span className="sr-only">Actions</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                    )
                                }
                                <DropdownMenuContent align="end" className="w-40">
                                    <DropdownMenuItem
                                    onClick={() => handleEdit(course)}
                                    className="cursor-pointer"
                                    >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                    onClick={() => handleDelete(course)}
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

                        <div className={(can?.create_course ? 'pt-10' : '') + " p-5 flex-1"}>
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="font-bold text-lg text-gray-900 dark:text-white line-clamp-1">
                                    {course.title}
                                </h3>
                                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(course.status)}`}>
                                    {course.status}
                                </span>
                            </div>

                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                                {course.description}
                            </p>
                        </div>

                        <div className="px-5 py-3 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-100 dark:border-gray-700 flex justify-end">
                            <button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
                                View Details →
                            </button>
                        </div>
                        </div>

                        <div key={course.id} className="relative group rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 flex flex-col">

                        {/* Three dots dropdown menu */}
                        <div className="absolute top-3 right-3">
                            <DropdownMenu>
                                {
                                    can?.create_course && (
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                                            >
                                            <CiMenuKebab />
                                            {/* <CircleDotDashedIcon className="h-4 w-4" /> */}
                                            <span className="sr-only">Actions</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                    )
                                }
                                <DropdownMenuContent align="end" className="w-40">
                                    <DropdownMenuItem
                                    onClick={() => handleEdit(course)}
                                    className="cursor-pointer"
                                    >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                    onClick={() => handleDelete(course)}
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

                        <div className={(can?.create_course ? 'pt-10' : '') + " p-5 flex-1"}>
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="font-bold text-lg text-gray-900 dark:text-white line-clamp-1">
                                    {course.title}
                                </h3>
                                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(course.status)}`}>
                                    {course.status}
                                </span>
                            </div>

                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                                {course.description}
                            </p>
                        </div>

                        <div className="px-5 py-3 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-100 dark:border-gray-700 flex justify-end">
                            <button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
                                View Details →
                            </button>
                        </div>
                        </div>

                        <div key={course.id} className="relative group rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 flex flex-col">

                        {/* Three dots dropdown menu */}
                        <div className="absolute top-3 right-3">
                            <DropdownMenu>
                                {
                                    can?.create_course && (
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                                            >
                                            <CiMenuKebab />
                                            {/* <CircleDotDashedIcon className="h-4 w-4" /> */}
                                            <span className="sr-only">Actions</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                    )
                                }
                                <DropdownMenuContent align="end" className="w-40">
                                    <DropdownMenuItem
                                    onClick={() => handleEdit(course)}
                                    className="cursor-pointer"
                                    >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                    onClick={() => handleDelete(course)}
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

                        <div className={(can?.create_course ? 'pt-10' : '') + " p-5 flex-1"}>
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="font-bold text-lg text-gray-900 dark:text-white line-clamp-1">
                                    {course.title}
                                </h3>
                                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(course.status)}`}>
                                    {course.status}
                                </span>
                            </div>

                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                                {course.description}
                            </p>
                        </div>

                        <div className="px-5 py-3 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-100 dark:border-gray-700 flex justify-end">
                            <button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
                                View Details →
                            </button>
                        </div>
                        </div>

                        <div key={course.id} className="relative group rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 flex flex-col">

                        {/* Three dots dropdown menu */}
                        <div className="absolute top-3 right-3">
                            <DropdownMenu>
                                {
                                    can?.create_course && (
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                                            >
                                            <CiMenuKebab />
                                            {/* <CircleDotDashedIcon className="h-4 w-4" /> */}
                                            <span className="sr-only">Actions</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                    )
                                }
                                <DropdownMenuContent align="end" className="w-40">
                                    <DropdownMenuItem
                                    onClick={() => handleEdit(course)}
                                    className="cursor-pointer"
                                    >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                    onClick={() => handleDelete(course)}
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

                        <div className={(can?.create_course ? 'pt-10' : '') + " p-5 flex-1"}>
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="font-bold text-lg text-gray-900 dark:text-white line-clamp-1">
                                    {course.title}
                                </h3>
                                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(course.status)}`}>
                                    {course.status}
                                </span>
                            </div>

                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                                {course.description}
                            </p>
                        </div>

                        <div className="px-5 py-3 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-100 dark:border-gray-700 flex justify-end">
                            <button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
                                View Details →
                            </button>
                        </div>
                        </div>
                        </>
                    ))}
                </div>

                {
                    courses.length == 0 && (
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
                                        No courses added yet
                                    </h3>
                                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                        Get started by creating your first course. Add course materials, set durations, and manage everything in one place.
                                    </p>

                                    {/* CTA Button */}
                                    <div className="mt-6">
                                        <button onClick={toggleDialog}
                                        className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                        <PlusCircle className="-ml-0.5 mr-1.5 h-5 w-5" />
                                        Add New Course
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
