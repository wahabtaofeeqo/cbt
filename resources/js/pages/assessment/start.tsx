import AppLogo from "@/components/app-logo";
import AppLogoIcon from "@/components/app-logo-icon";
import Timer from "@/components/timer";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Assessment } from "@/types";
import { titleCase } from "@/utils/utils";
import { Head, router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

type Props = {
  can: any
  assessment: Assessment
}

interface Answer {
  questionId: string
  answer: string
}

const StartAssessment = ({ can, assessment }: Props) => {
  
  const [blurCount, setCount] = useState<number>(0)
  const [isOpen, setOpen] = useState<boolean>(false)

  const [answers, setAnswers] = useState<any>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(assessment.questions[0]);

  const toNextQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
    setCurrentQuestion(assessment.questions[index])
  }

  const handleAnswer = (questionId: string, option: string) => {
    const newAnswers = [...answers];
    let index = newAnswers.findIndex(item => item.questionId == questionId);
    if(index != -1) {
      newAnswers[index].answer = option
    }
    else {
      newAnswers.push({answer: option, questionId})
    }

    setAnswers(newAnswers);
  };

  const submit = () => {
    const data = { answers }
    router.post(route('assessments.submit', {id: assessment.id}), data, {
      onSuccess: () => {
        toast("Submitted successfully");
        setTimeout(() => {
          router.get(route('dashboard'))
        }, 3000);
      },
      onError: e => {
        toast(e.message ?? 'Failed to submit assessment');
      }
    })
  }

  const handleBlur = (e: any) => {
    setCount(prev => prev + 1);
  }

  useEffect(() => {
    window.addEventListener('blur', handleBlur)
    if(blurCount >= 10) {
      submit()
      setOpen(true);
    }
  }, [blurCount])

  const getAnswer = (questionId: string) => {
    return answers.find((item: Answer) => item.questionId == questionId)?.answer;
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(bool) => setOpen(bool)}>
          <DialogContent>
              <DialogTitle>Unallowed moves</DialogTitle>
              <DialogDescription>
                 The system has detected a continous navigation away from the Assessment screen. Your Assessment will now be automatically submitted.
              </DialogDescription>

              <DialogFooter className="gap-2">
                  <DialogClose asChild>
                      <Button variant="secondary" onClick={() => setOpen(false)}>
                          Cancel
                      </Button>
                  </DialogClose>
              </DialogFooter>
          </DialogContent>
      </Dialog>

      <Head title={assessment.course.code + ' Assessment'} />
      <ToastContainer />
      <div className="max-w-3xl mx-auto p-6">

        <div className="mt-10 mb-4 text-center flex items-center gap-3">
           <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
              <AppLogoIcon className="size-5 fill-current text-white dark:text-black" />
            </div>
          <h4 className="font-bold">Al-Hikmah University (Abeokuta) </h4>
        </div>
        <hr className="mb-10" />

        <div className="mb-6 flex items-center justify-between">
          <div>
              <h2 className="text-2xl font-bold">{assessment.title}</h2>
              <p className="text-gray-600">Type: {titleCase(assessment.type)}</p>
          </div>

          <Timer duration={assessment.duration ?? 30} onTimeUp={submit} />
        </div>

        <div className="space-y-8 shadow-sm rounded-md p-6">
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Question {currentQuestionIndex + 1} of {assessment.questions.length}</span>
              <span>{currentQuestion?.points} point(s)</span>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-lg font-medium mb-4">
                {currentQuestion.text}
              </p>
              
              {currentQuestion.type === 'multiple-choice' && (
                <div className="space-y-3">
                  {currentQuestion.options.map((option: any, index: number) => (
                    <div key={index} className="flex items-center gap-3">
                      <input
                        type="radio"
                        id={`option-${index}`}
                        name="answer"
                        checked={getAnswer(currentQuestion.id) === option.id}
                        onChange={() => handleAnswer(currentQuestion.id, option.id)}
                      />
                      <label htmlFor={`option-${index}`} className="cursor-pointer">
                        {option.value}
                      </label>
                    </div>
                  ))}
                </div>
              )}
              
              {currentQuestion.type === 'true-false' && (
                <div className="space-y-3">
                  {currentQuestion.options.map((option: any, index: number) => (
                    <div key={index} className="flex items-center gap-3">
                      <input
                        type="radio"
                        id={`tf-${index}`}
                        name="answer"
                        checked={getAnswer(currentQuestion.id) === option.id}
                        onChange={() => handleAnswer(currentQuestion.id, option.id)}
                      />
                      <label htmlFor={`tf-${index}`} className="cursor-pointer">
                        {option.value}
                      </label>
                    </div>
                  ))}
                </div>
              )}
              
              {currentQuestion.type === 'short-answer' && (
                <Input
                  type="text"
                  value={getAnswer(currentQuestion.id) || ''}
                  onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
                  placeholder="Type your answer here"
                />
              )}
              
              {currentQuestion.type === 'essay' && (
                <textarea
                  className="w-full min-h-[150px] p-3 border rounded"
                  value={getAnswer(currentQuestion.id) || ''}
                  onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
                  placeholder="Write your essay here"
                />
              )}
            </div>
          </div>

          <div className="flex justify-between">
            <Button
              variant="outline"
              disabled={currentQuestionIndex === 0}
              onClick={() => toNextQuestion(currentQuestionIndex - 1)}
            >
              Previous
            </Button>
            
            {currentQuestionIndex < assessment.questions.length - 1 ? (
              <Button onClick={() => toNextQuestion(currentQuestionIndex + 1)}>
                Next
              </Button>
            ) : (
              <Button onClick={submit}>
                Submit Assessment
              </Button>
            )}
          </div>
        </div>
    </div>
    </>
  );
}

export default StartAssessment