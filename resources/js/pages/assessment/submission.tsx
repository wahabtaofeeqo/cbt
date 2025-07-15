import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AppLayout from "@/layouts/app-layout";
import { Assessment, BreadcrumbItem } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";
import { FaCheck, FaMinus } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";

type Props = {
    can: any
    roles: string[]
    assessment: Assessment,
    submission: any
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Assessments',
        href: '/assessments',
    },

    {
        title: 'Submission',
        href: '',
    },
];

const tableHeaders: any[] = ['SN', 'Question', 'Answer', 'Status'];

const AssessmentSubmission = ({can, assessment, submission, roles}: Props) => {

    const [isOpen, setOpen] = useState(false);
    const { data, setData, post, processing } = useForm<any>({ 
        score: submission.score ?? 0,
    });
    
    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("assessments.score", {id: submission.id}), {
            onSuccess: () => {
                setOpen(false)
                toast('Score updated successfully')
            },
        })
    };
        
    const isOptiobQuestion = (row: any) => {
        return ['multiple-choice', 'true-false'].includes(row.question.type);
    }

    const getAnswer = (row: any) => {
        if(isOptiobQuestion(row)) {
            return row.question.options.find((item: any) => item.id == row.response)?.value
        }
        return row.response;
    }

    const isCorrect = (row: any) => {
        if(isOptiobQuestion(row)) {
            const correctOption = row.question.options.find((item: any) => item.is_correct);
            if(correctOption.id == row.response)
                return <FaCheck className="text-green-500" />
            return <RxCross2 className="text-red-500" />
        }
        return <FaMinus />
    }

    return (
        <>
        <Head title="Submission" />

        <Dialog open={isOpen} onOpenChange={(open) => {setOpen(open)}}>
            <DialogContent>
                <DialogTitle>Assessment Score</DialogTitle>
                
                <form onSubmit={submit}>
                    <div className="mb-6">
                        <Label>Score</Label>
                        <Input
                            type="number"
                            value={data.score}
                            onChange={(e) => setData({...data, score: e.target.value})}
                            placeholder="Enter Score"
                        />
                    </div>

                    <DialogFooter className="gap-2">
                        <DialogClose asChild>
                            <Button variant="secondary" onClick={() => setOpen(false)} type="button">
                                Cancel
                            </Button>
                        </DialogClose>

                        <Button type="submit" disabled={processing}>
                            Proceed
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>

        <AppLayout breadcrumbs={breadcrumbs} roles={roles}>
            <div className="p-4">
                <div className="mb-6">
                    <h4 className="font-bold mb-2">Student</h4>
                    <p>Name: {submission.student.user.name}</p>
                    <p>Matric Number: {submission.student.matric_number}</p>
                </div>

                <div className="mb-6">
                    <h4 className="font-bold mb-2">Course</h4>
                    <p>Code: {assessment.course.code}</p>
                    <p>Name: {assessment.course.title}</p>
                    {
                        submission.is_score_visible ? (
                            <p>Score: {submission.score}</p>
                        ): <div></div>
                    }
                </div>

               {
                 can.update_score && (
                    <>
                        <div className="mb-6 flex items-center justify-between">
                            <p className="text-xl font-bold">Calculated Score: {submission.score ?? 0}</p>
                            <button onClick={() => setOpen(true)} className="bg-indigo-600 text-white px-10 py-2 rounded-md text-sm font-medium cursor-pointer">Set Score</button>
                        </div>
                    </>
                 )
               }

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
                            {submission.answers.map((row: any, rowIndex: number) => (
                                <tr
                                key={rowIndex}
                                className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100'}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {rowIndex + 1}
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {row.question.text}
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {getAnswer(row)}
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {isCorrect(row)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
        </>
    )
}

export default AssessmentSubmission;