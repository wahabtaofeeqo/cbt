import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Assessment } from "@/types";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

type Props = {
  can: any
  assessment: Assessment
}

const StartAssessment = ({ can, assessment }: Props) => {

  const [time, setTime] = useState<number>(30)
  const [answers, setAnswers] = useState<any>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleAnswer = (questionIndex: number, answer: any) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answer;
    setAnswers(newAnswers);
  };

  const calculateScore = () => {
    let score = 0;
    assessment.questions.forEach((question, index) => {
      if (question.correctAnswer === answers[index]) {
        score += question.points;
      }
    });
    return score;
  };

  const submit = () => {
    setIsSubmitted(true)
    toast("Submitted successfully");
  }

   const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return [
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      secs.toString().padStart(2, '0')
    ].join(':');
  };

  useEffect(() => {

  }, []);

  const handleTimeChange = (e: any) => {
    const value = e.target.value;
    const [hours = 0, minutes = 0, seconds = 0] = value.split(':').map(Number);
    const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
    //setTimeLeft(totalSeconds);
  };

  useEffect(() => {
    // if (time > 0) {
    //   timerRef.current = setInterval(() => {
    //     setTimeLeft(prev => {
    //       if (prev <= 1) {
    //         submit()
    //         return 0;
    //       }
    //       return prev - 1;
    //     });
    //   }, 1000);
    // }
    // else {
    //   clearInterval(timerRef.current);
    // }

    //return () => clearInterval(timerRef.current);
  }, [time]);

  return (
    <>
      <Head title={assessment.course.code + ' Assessment'} />
      <ToastContainer />
      <div className="max-w-3xl mx-auto p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
              <h2 className="text-2xl font-bold">{assessment.title}</h2>
              <p className="text-gray-600">Type: {assessment.type}</p>
          </div>

          <div>
            Remaining Time: {time}
          </div>
        </div>

        {!isSubmitted ? (
          <div className="space-y-8 shadow-sm rounded-md p-6">
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Question {currentQuestionIndex + 1} of {assessment.questions.length}</span>
                <span>{assessment.questions[currentQuestionIndex].points} point(s)</span>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <p className="text-lg font-medium mb-4">
                  {assessment.questions[currentQuestionIndex].text}
                </p>
                
                {assessment.questions[currentQuestionIndex].type === 'multiple-choice' && (
                  <div className="space-y-3">
                    {assessment.questions[currentQuestionIndex].options.map((option: any, index: number) => (
                      <div key={index} className="flex items-center gap-3">
                        <input
                          type="radio"
                          id={`option-${index}`}
                          name="answer"
                          checked={answers[currentQuestionIndex] === index}
                          onChange={() => handleAnswer(currentQuestionIndex, index)}
                        />
                        <label htmlFor={`option-${index}`} className="cursor-pointer">
                          {option.value}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
                
                {assessment.questions[currentQuestionIndex].type === 'true-false' && (
                  <div className="space-y-3">
                    {['True', 'False'].map((option: any, index: number) => (
                      <div key={index} className="flex items-center gap-3">
                        <input
                          type="radio"
                          id={`tf-${index}`}
                          name="answer"
                          checked={answers[currentQuestionIndex] === index}
                          onChange={() => handleAnswer(currentQuestionIndex, index)}
                        />
                        <label htmlFor={`tf-${index}`} className="cursor-pointer">
                          {option.value}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
                
                {assessment.questions[currentQuestionIndex].type === 'short-answer' && (
                  <Input
                    type="text"
                    value={answers[currentQuestionIndex] || ''}
                    onChange={(e) => handleAnswer(currentQuestionIndex, e.target.value)}
                    placeholder="Type your answer here"
                  />
                )}
                
                {assessment.questions[currentQuestionIndex].type === 'essay' && (
                  <textarea
                    className="w-full min-h-[150px] p-3 border rounded"
                    value={answers[currentQuestionIndex] || ''}
                    onChange={(e) => handleAnswer(currentQuestionIndex, e.target.value)}
                    placeholder="Write your essay here"
                  />
                )}
              </div>
            </div>

            <div className="flex justify-between">
              <Button
                variant="outline"
                disabled={currentQuestionIndex === 0}
                onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
              >
                Previous
              </Button>
              
              {currentQuestionIndex < assessment.questions.length - 1 ? (
                <Button onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}>
                  Next
                </Button>
              ) : (
                <Button onClick={submit}>
                  Submit Assessment
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center space-y-6">
            <div className="text-2xl font-bold">
              Assessment Submitted!
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat voluptates odit modi nulla animi sint earum ipsum, eaque maxime. Rem doloremque ad libero unde commodi assumenda obcaecati, at sapiente veritatis.
            </p>
            <Button>Logout</Button>
          </div>
        )}
    </div>
    </>
  );
}

export default StartAssessment