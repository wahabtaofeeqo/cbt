import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Assessment } from "@/types";
import { useState } from "react";

type Props = {
  assessment: Assessment,
  onQuestionsUpdate: Function
  onBack: Function
  onComplete: Function
}

const QuestionBuilder = ({ assessment, onQuestionsUpdate, onBack, onComplete }: Props) => {

  const [currentQuestion, setCurrentQuestion] = useState<any>({
    text: '',
    type: 'multiple-choice',
    options: ['', '', ''],
    correct_answer: null,
    points: 1
  });

  const addQuestion = () => {
    onQuestionsUpdate([...assessment.questions, currentQuestion]);
    setCurrentQuestion({
      text: '',
      type: 'multiple-choice',
      options: ['', '', ''],
      correct_answer: null,
      points: 1
    });
  };

  const toNext = () => {
    onComplete([...assessment.questions])
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="grid gap-2">
          <Label>Question Type</Label>
          <Select
            value={currentQuestion.type}
            onValueChange={(value) => setCurrentQuestion({...currentQuestion, type: value})}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
              <SelectItem value="true-false">True/False</SelectItem>
              <SelectItem value="short-answer">Short Answer</SelectItem>
              <SelectItem value="essay">Essay</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label>Question Text</Label>
          <Input
            value={currentQuestion.text}
            onChange={(e) => setCurrentQuestion({...currentQuestion, text: e.target.value})}
            placeholder="Enter your question"
          />
        </div>

        {['multiple-choice', 'true-false'].includes(currentQuestion.type) && (
          <div className="space-y-3">
            <Label>Options</Label>
            {currentQuestion.options.map((option: any, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...currentQuestion.options];
                    newOptions[index] = e.target.value;
                    setCurrentQuestion({...currentQuestion, options: newOptions});
                  }}
                  placeholder={`Option ${index + 1}`}
                />
                <input
                  type="radio"
                  name="correctAnswer"
                  checked={currentQuestion.correct_answer === index}
                  onChange={() => setCurrentQuestion({...currentQuestion, correct_answer: index})}
                />
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => setCurrentQuestion({
                ...currentQuestion,
                options: [...currentQuestion.options, '']
              })}
            >
              Add Option
            </Button>
          </div>
        )}

        <div className="grid gap-2">
          <Label>Points</Label>
          <Input
            type="number"
            min="1"
            value={currentQuestion.points}
            onChange={(e) => setCurrentQuestion({...currentQuestion, points: parseInt(e.target.value)})}
          />
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => onBack()}>
          Back
        </Button>
        <div className="space-x-2">
          <Button
            type="button"
            onClick={addQuestion}
            disabled={!currentQuestion.text || 
              (['multiple-choice', 'true-false'].includes(currentQuestion.type)) && 
              currentQuestion.correct_answer === null}
          >
            Add Question
          </Button>
          <Button
            type="button"
            onClick={() => toNext()}
            disabled={assessment?.questions?.length === 0}
          >
            Preview Assessment
          </Button>
        </div>
      </div>
    </div>
  );
}

export default QuestionBuilder