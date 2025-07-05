import { Button } from "@/components/ui/button";
import QuestionBuilder from "./builder";
import AssessmentSetup from "./setup";
import { useState } from "react";

const AssessmentFlow = ({ courseId }) => {
  const [step, setStep] = useState('setup');
  const [assessment, setAssessment] = useState(null);

  const handleSetupComplete = (setupData) => {
    setAssessment(setupData);
    setStep('questions');
  };

  const handleQuestionsUpdate = (questions) => {
    setAssessment({...assessment, questions});
  };

  const handleAssessmentComplete = (finalQuestions) => {
    // Submit to backend
    console.log('Final assessment:', {...assessment, questions: finalQuestions});
    setStep('confirmation');
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Create Assessment</h2>
        <div className="flex gap-4 mt-4">
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
      </div>

      {step === 'setup' && (
        <AssessmentSetup
          courseId={courseId} 
          onComplete={handleSetupComplete} 
        />
      )}

      {step === 'questions' && (
        <QuestionBuilder
          assessment={assessment}
          onQuestionsUpdate={handleQuestionsUpdate}
          onBack={() => setStep('setup')}
          onComplete={handleAssessmentComplete}
        />
      )}

      {step === 'confirmation' && (
        <div className="space-y-6 text-center">
          <div className="text-green-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <h3 className="text-xl font-semibold mt-2">Assessment Created Successfully!</h3>
          </div>
          <div className="space-y-2">
            <p><span className="font-semibold">Title:</span> {assessment.title}</p>
            <p><span className="font-semibold">Type:</span> {assessment.type}</p>
            <p><span className="font-semibold">Questions:</span> {assessment.questions.length}</p>
          </div>
          <div className="flex justify-center gap-4">
            <Button onClick={() => setStep('setup')}>Create Another</Button>
            <Button variant="outline">View Assessment</Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AssessmentFlow