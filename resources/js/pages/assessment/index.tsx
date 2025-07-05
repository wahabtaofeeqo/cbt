import { Button } from "@/components/ui/button";
import QuestionBuilder from "./builder";
import AssessmentSetup from "./setup";
import { useState } from "react";
import { Assessment, BreadcrumbItem, Course } from "@/types";
import AppLayout from "@/layouts/app-layout";
import { BiSolidFoodMenu } from "react-icons/bi";
import EmptyState from "@/components/ui/empty-state";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import AddAssessment from "@/components/ui/add-assessment";
import { Head, Link, router } from "@inertiajs/react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CiMenuKebab } from "react-icons/ci";
import { toast } from "react-toastify";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Assessments',
        href: '/assessments',
    },
];

type Props = {
    can: any
    courses: Course[]
    assessments: Assessment[]
}

const AssessmentIndex = ({courses, assessments, can}: Props) => {

    const [isOpen, setOpen] = useState(false);
    const [isDelete, setDelete] = useState(false);
    const [assessment, setAssessment] = useState<any>();

    const toggleDialog = () => {
        setOpen(!isOpen)
    }
    
    const handleEdit = (model: any) => {
        setAssessment(model)
        setOpen(!isOpen);
    };

    const handleDelete = (model: any) => {
        setAssessment(model);
        setDelete(!isDelete);
    };

    const doDelete = () => {
        if(assessment) {
            router.delete(route('assessments.delete', {id: assessment.id}), {
                onSuccess: () => {
                    setDelete(!isDelete);
                    toast('Assessment deleted successfully')
                },
                onError: (e) => {
                    setDelete(!isDelete)
                    toast(e.message ?? 'Failed to delete Assessment');
                }
            })
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>

            <Head title="Assessments" />

            {/* Adding New */}
            <Dialog open={isOpen} onOpenChange={(open) => {setOpen(open)}}>
                <DialogContent>
                    <DialogTitle>Add Assessment</DialogTitle>
                    <AddAssessment
                        courses={courses}
                        model={assessment}
                        onClose={toggleDialog} />
                </DialogContent>
            </Dialog>

            {/* Confirm Delete */}
            <Dialog open={isDelete} onOpenChange={(bool) => setDelete(bool)}>
                <DialogContent>
                    <DialogTitle>Delete ?</DialogTitle>
                    <DialogDescription>
                        All the submissions related to this Assessment will also be deleted.
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

            <div className="p-4">
                {
                    can?.create_assessment && (
                        <div className="text-end mb-4">
                            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium cursor-pointer" onClick={toggleDialog}>Add Assessment</button>
                        </div>
                    )
                }

                {
                    assessments.length == 0 ? (
                        <EmptyState 
                            callback={toggleDialog}
                            title="No Assessments created yet"
                            label="Create Assessment"
                            description="Get started by creating assessment for courses assigned to you." />
                    ) 
                    : <div className="grid grid-1-cols lg:grid-cols-4 mb-4 gap-3">
                        {
                            assessments.map(item => {
                                return (
                                    <>
                                        <div className="rounded-md border p-4 relative" key={item.id}>
                                            {/* Three dots dropdown menu */}
                                            <div className="absolute top-3 right-3">
                                                <DropdownMenu>
                                                   <DropdownMenuTrigger asChild>
                                                        <Button
                                                        variant="ghost" size="icon"
                                                        className="h-8 w-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                                                        >
                                                        <CiMenuKebab />
                                                        <span className="sr-only">Actions</span>
                                                        </Button>
                                                    </DropdownMenuTrigger>

                                                    <DropdownMenuContent align="end" className="w-40">
                                                        <DropdownMenuItem
                                                        onClick={() => handleEdit(item)}
                                                        className="cursor-pointer"
                                                        >
                                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                        Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                        onClick={() => handleDelete(item)}
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
                                            <BiSolidFoodMenu className="text-3xl" />
                                            <h4 className="font-bold mb-2">{item.course.code}</h4>
                                            <p className="text-slate-500 mb-6 text-sm">{item.submissions ?? 0} submissions</p>
                                            <Link href={route('assessments.show', {id: item.id})} type="button" className="rounded w-full block p-1 text-center bg-black text-white w-full text-sm h-8 hover:bg-gray-500">View </Link>
                                        </div>
                                    </>
                                )
                            })
                        }
                    </div>
                }
            </div>
        </AppLayout>
    );
}

export default AssessmentIndex;