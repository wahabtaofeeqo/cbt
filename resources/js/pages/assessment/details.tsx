import AddQuestion from "@/components/ui/add-question"
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import EmptyState from "@/components/ui/empty-state"
import AppLayout from "@/layouts/app-layout"
import { Assessment, BreadcrumbItem } from "@/types"
import { Head, Link, router } from "@inertiajs/react"
import { useState } from "react"
import { BiSolidFoodMenu } from "react-icons/bi"
import { CiMenuKebab } from "react-icons/ci"
import { toast } from "react-toastify"

const tableHeaders: any[] = ['SN', 'Text', 'Type', 'Status', ''];

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Assessments',
        href: '/assessments',
    },

    {
        title: 'Assessment Details',
        href: '',
    },
];

type Props = {
    assessment: Assessment,
    submissions: any[]
}

const AssessmentDetails = ({assessment, submissions}: Props) => {
    
    const [isOpen, setOpen] = useState(false);
    const [isDelete, setDelete] = useState(false);
    const [question, setQuestion] = useState<any>(null);
    
    const goTo = () => {
        router.get(route('assessments.start', {id: assessment.id}))
    }
    
    const handleEdit = (model: any) => {
        setQuestion(model)
        setOpen(!isOpen);
    };

    const handleDelete = (model: any) => {
        // setAssessment(model);
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
          
             <Dialog open={isOpen} onOpenChange={(open) => {setOpen(open)}}>
                <DialogContent>
                    <DialogTitle>{question ? 'Update' : 'Add New'} Question</DialogTitle>
                    <div className="mt-4">
                        <AddQuestion
                            model={question}
                            assessment={assessment}
                            onClose={() => setOpen(false)} 
                          />
                    </div>
                </DialogContent>
            </Dialog>

            {/* Confirm Delete */}
            <Dialog open={isDelete} onOpenChange={(bool) => setDelete(bool)}>
                <DialogContent>
                    <DialogTitle>Delete Assessment?</DialogTitle>
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

                <h4 className="font-bold mb-2">Submissions</h4>
                {/* Submissions */}
                {
                    submissions.length == 0 ? (
                        <EmptyState 
                            title="No Submissions yet"
                            label="Take Assessment"
                            description="" />
                    ) 
                    : <div className="grid grid-1-cols lg:grid-cols-4 mb-4 gap-3">
                        {
                            submissions.map(item => {
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

                {/* Questions */}
                <h4 className="font-bold mb-2">Questions</h4>
                <div className="text-end mb-4">
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium cursor-pointer" onClick={() => setOpen(true)}>Add Question</button>
                </div>

                <div className="overflow-x-auto border rounded">
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
                            {assessment.questions.map((row: any, rowIndex: number) => (
                                <tr
                                key={rowIndex}
                                className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100'}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {rowIndex + 1}
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {row.text}
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {row.type}
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
            </div>
        </AppLayout>
    )
}

export default AssessmentDetails;