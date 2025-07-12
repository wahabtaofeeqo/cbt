import { Assessment, Course } from "@/types";
import { Button } from "./button";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import AssessmentSetup from "@/pages/assessment/setup";
import QuestionBuilder from "@/pages/assessment/builder";
import { toast } from "react-toastify";

type Props = {
    courses: Course[]
    onClose: Function
    model?: Assessment
}

const tableHeaders: any[] = ['SN', 'Text', 'Type', ''];
const dummyQuestions = [
    {
        "id": "0197d83a-b9ee-7140-8550-0f5768c4fc8d",
        "text": "What's HTML",
        "type": "multiple-choice",
        "points": 1,
        "assessment_id": "0197d83a-b9d9-71bd-9098-a6dd952d5320",
        "created_at": "2025-07-05T01:36:56.000000Z",
        "updated_at": "2025-07-07T23:37:43.000000Z",
        "status": "Active",
        "options": [
            {
                "id": "0197d83a-b9f3-70b3-900f-98c7f516ebb0",
                "value": "Hypertext",
                "is_correct": 0,
                "question_id": "0197d83a-b9ee-7140-8550-0f5768c4fc8d",
                "created_at": "2025-07-05T01:36:56.000000Z",
                "updated_at": "2025-07-08T00:00:16.000000Z"
            },
            {
                "id": "0197d83a-b9f6-7108-94d6-50cd25763bf2",
                "value": "CoderText",
                "is_correct": 1,
                "question_id": "0197d83a-b9ee-7140-8550-0f5768c4fc8d",
                "created_at": "2025-07-05T01:36:56.000000Z",
                "updated_at": "2025-07-08T00:00:16.000000Z"
            },
            {
                "id": "0197d83a-b9fa-702d-a439-b7c102960b87",
                "value": "MyText",
                "is_correct": 0,
                "question_id": "0197d83a-b9ee-7140-8550-0f5768c4fc8d",
                "created_at": "2025-07-05T01:36:56.000000Z",
                "updated_at": "2025-07-08T00:00:16.000000Z"
            }
        ]
    },
    {
        "id": "0197d83a-b9ff-713b-8560-9ab49f973dea",
        "text": "Are you Happy",
        "type": "true-false",
        "points": 1,
        "assessment_id": "0197d83a-b9d9-71bd-9098-a6dd952d5320",
        "created_at": "2025-07-05T01:36:56.000000Z",
        "updated_at": "2025-07-05T01:36:56.000000Z",
        "status": "active",
        "options": [
            {
                "id": "0197d83a-ba02-70d2-8a31-5fd4c9084d99",
                "value": "Yes",
                "is_correct": 1,
                "question_id": "0197d83a-b9ff-713b-8560-9ab49f973dea",
                "created_at": "2025-07-05T01:36:56.000000Z",
                "updated_at": "2025-07-05T01:36:56.000000Z"
            },
            {
                "id": "0197d83a-ba08-734b-abc7-538a1d9a48cf",
                "value": "No",
                "is_correct": 1,
                "question_id": "0197d83a-b9ff-713b-8560-9ab49f973dea",
                "created_at": "2025-07-05T01:36:56.000000Z",
                "updated_at": "2025-07-05T01:36:56.000000Z"
            },
            {
                "id": "0197d83a-ba0c-71b2-b69a-507b42232cb2",
                "value": "Maybe",
                "is_correct": 1,
                "question_id": "0197d83a-b9ff-713b-8560-9ab49f973dea",
                "created_at": "2025-07-05T01:36:56.000000Z",
                "updated_at": "2025-07-05T01:36:56.000000Z"
            }
        ]
    },
    {
        "id": "0197d83a-ba0f-7243-9677-977f46fa7ed7",
        "text": "Who are you",
        "type": "short-answer",
        "points": 1,
        "assessment_id": "0197d83a-b9d9-71bd-9098-a6dd952d5320",
        "created_at": "2025-07-05T01:36:56.000000Z",
        "updated_at": "2025-07-05T01:36:56.000000Z",
        "status": "active",
        "options": []
    },
    {
        "id": "0197d83a-ba12-7374-bb93-7ec30221bf3e",
        "text": "Do you lie",
        "type": "essay",
        "points": 1,
        "assessment_id": "0197d83a-b9d9-71bd-9098-a6dd952d5320",
        "created_at": "2025-07-05T01:36:56.000000Z",
        "updated_at": "2025-07-05T01:36:56.000000Z",
        "status": "active",
        "options": []
    },
    {
        "id": "0197e77d-7a90-737d-9905-147a9176c92a",
        "text": "Aren't you tired?",
        "type": "short-answer",
        "points": 1,
        "assessment_id": "0197d83a-b9d9-71bd-9098-a6dd952d5320",
        "created_at": "2025-07-08T00:44:09.000000Z",
        "updated_at": "2025-07-08T00:44:09.000000Z",
        "status": "Active",
        "options": []
    },
    {
        "id": "0197e77e-3e76-7248-b09f-267d54c60687",
        "text": "Aren't you tired?",
        "type": "short-answer",
        "points": 1,
        "assessment_id": "0197d83a-b9d9-71bd-9098-a6dd952d5320",
        "created_at": "2025-07-08T00:44:59.000000Z",
        "updated_at": "2025-07-08T00:44:59.000000Z",
        "status": "Active",
        "options": []
    },
]

const AddAssessment = ({courses, onClose, model}: Props) => {

    const [step, setStep] = useState('preview');
    const { data, setData, post, put, processing, errors, reset } = useForm<any>({
        title: '',
        type: 'quiz',
        due_date: "",
        questions: [],
        passing_score: 70,
        attempts_allowed: 1
    });

    const handleSetupComplete = (setup: any) => {
        setData(setup);
        setStep('questions');
    };

    const handleQuestionsUpdate = (questions: any) => {
        setData({...data, questions});
    };

    const handleAssessmentComplete = (finalQuestions: any) => {
        // setData({...data, questions: finalQuestions});
        // post(route('assessments.store'), {
        //     onSuccess: () => {
        //         reset();
        //         if(onClose) onClose();
        //         toast('Assessment added successfully')
        //     },
        //     onError: (e: any) => {
        //         toast(e.message ?? 'Failed to create Assessment');
        //     }
        // })
        setStep('preview');
    };

    useEffect(() => {
        if(model) {
            setData(model)
        }
    }, [model])
    
    return (
        <>
            {/* Steps */}
            <div className="flex gap-5 mt-4 mb-4 justify-center">
                <div className={`flex items-center gap-2 ${step === 'setup' ? 'font-semibold text-primary' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'setup' ? 'bg-primary text-white' : 'bg-gray-200'}`}>1</div>
                    <span>Setup</span>
                </div>
                <div className={`flex items-center gap-2 ${step === 'questions' ? 'font-semibold text-primary' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'questions' ? 'bg-primary text-white' : step === 'confirmation' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>2</div>
                    <span>Questions</span>
                </div>
                <div className={`flex items-center gap-2 ${step === 'preview' ? 'font-semibold text-primary' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'confirmation' ? 'bg-primary text-white' : 'bg-gray-200'}`}>3</div>
                    <span>Preview</span>
                </div>
            </div>

            {
                step === 'setup' && (
                    <AssessmentSetup
                        model={data}
                        courses={courses}
                        onComplete={handleSetupComplete} 
                    />
                )
            }

            {
                step === 'questions' && (
                    <QuestionBuilder
                        assessment={data}
                        onQuestionsUpdate={handleQuestionsUpdate}
                        onBack={() => setStep('setup')}
                        onComplete={handleAssessmentComplete}
                    />
                )
            }

            {
                step === 'preview' && (
                    <div className="space-y-6">
                        <h4 className="font-bold mb-2">Details</h4>
                        <div className="border mb-4 p-3 rounded">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui vitae modi voluptates! Enim, nobis minus eius recusandae iusto obcaecati doloribus laudantium accusamus perspiciatis quidem quisquam natus quas sed consequuntur voluptatum?
                        </div>

                        <h4 className="font-bold mb-2">Questions</h4>
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
                                    {dummyQuestions.map((row: any, rowIndex: number) => (
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

                                            <td>
                                             X
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        
                        <div className="flex justify-end gap-4">
                            <Button onClick={() => setStep('setup')}>Create Another</Button>
                            <Button variant="outline">View Assessment</Button>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default AddAssessment;