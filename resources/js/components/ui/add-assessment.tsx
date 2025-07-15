import { Assessment, Course } from "@/types";
import { Button } from "./button";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import AssessmentSetup from "@/pages/assessment/setup";
import QuestionBuilder from "@/pages/assessment/builder";
import { toast } from "react-toastify";
import { RxCross2 } from "react-icons/rx";
import { titleCase } from "@/utils/utils";

type Props = {
    courses: Course[]
    onClose: Function
    model?: Assessment
}

const tableHeaders: any[] = ['SN', 'Text', 'Type'];

const AddAssessment = ({courses, onClose, model}: Props) => {

    const [step, setStep] = useState('setup');
    const { data, setData, post, put, processing, reset } = useForm<any>({
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
        setData({...data, questions: finalQuestions});
        setStep('preview');
    };
    
    const removeQuestion = (index: number) => {
        const questions = [...data.questions];
        questions.splice(index, 1);
        handleAssessmentComplete(questions);
    }

    const submit = () => {
        post(route('assessments.store'), {
            onSuccess: () => {
                reset();
                if(onClose) onClose();
                toast('Assessment added successfully')
            },
            onError: (e: any) => {
                toast(e.message ?? 'Failed to create Assessment');
            }
        })
    }

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
                            <h4>Name: <span> {data.title}</span> </h4>
                            <h4>Type:  <span>{titleCase(data.type)}</span> </h4>
                            <h4>Passing Score: <span>{data.passing_score}</span></h4>
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
                                    {data?.questions.map((row: any, index: number) => (
                                        <tr
                                        key={index}
                                        className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100'}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {index + 1}
                                            </td>

                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {row.text}
                                            </td>

                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {row.type}
                                            </td>

                                            <td>
                                                <RxCross2 className="text-red-500" onClick={() => removeQuestion(index)} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        
                        <div className="flex justify-end gap-4">
                            <Button variant="outline" onClick={() => setStep('questions')}>
                                Back
                            </Button>
                            {/* <Button onClick={() => setStep('setup')}>Create Another</Button> */}
                            <Button disabled={processing || !data?.questions.length} onClick={submit}>Create Assessment</Button>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default AddAssessment;