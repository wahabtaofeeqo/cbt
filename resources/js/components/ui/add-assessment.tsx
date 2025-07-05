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

const AddAssessment = ({courses, onClose, model}: Props) => {

    const [step, setStep] = useState('setup');
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
        setData({...data, questions: finalQuestions});
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
        setStep('confirmation');
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
                <div className={`flex items-center gap-2 ${step === 'confirmation' ? 'font-semibold text-primary' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'confirmation' ? 'bg-primary text-white' : 'bg-gray-200'}`}>3</div>
                    <span>Confirmation</span>
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
                step === 'confirmation' && (
                    <div className="space-y-6 text-center">
                        <div className="text-green-500 text-center">
                            {
                                processing
                                ? (
                                    <div role="status text-center">
                                        <svg aria-hidden="true" className="mx-auto w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                        </svg>
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                ) 
                                : (
                                   <>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>

                                        <h3 className="text-xl font-semibold mt-2">Assessment Created Successfully!</h3>
                                   </>
                                )
                            }
                        </div>

                        <div className="space-y-2">
                            <p><span className="font-semibold">Title:</span> {data.title}</p>
                            <p><span className="font-semibold">Type:</span> {data.type}</p>
                            <p><span className="font-semibold">Questions:</span> {data.questions?.length}</p>
                        </div>
                        
                        <div className="flex justify-center gap-4">
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