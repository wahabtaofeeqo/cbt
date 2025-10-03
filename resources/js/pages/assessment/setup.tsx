import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Assessment, Course } from '@/types';

type Props = {
  onComplete: Function
  model?: Assessment
  courses?: Course[]
}

const AssessmentSetup = ({model, onComplete, courses }: Props) => {

  const [assessment, setAssessment] = useState<any>({
    title: '',
    course_id: '',
    type: 'quiz',
    due_date: "",
    questions: [],
    duration: 30,
    passing_score: 70,
    attempts_allowed: 1
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onComplete(assessment);
  };

  useEffect(() => {
    if(model) {
      setAssessment(model);
    }
  }, [model])

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="title">Assessment Title*</Label>
          <Input
            id="title"
            value={assessment.title}
            onChange={(e) => setAssessment({...assessment, title: e.target.value})}
            placeholder="Midterm Exam"
            required
          />
        </div>

        <div>
          <Label>Course</Label>
            <Select
              value={assessment.course_id}
              onValueChange={(value) => setAssessment({...assessment, course_id: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Course" />
              </SelectTrigger>
              <SelectContent>
                {
                  courses?.map(course => {
                    return (
                      <SelectItem key={course.id} value={course.id}>{course.title}</SelectItem>
                    )
                  })
                }
              </SelectContent>
            </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label>Assessment Type</Label>
            <Select
              value={assessment.type}
              onValueChange={(value) => setAssessment({...assessment, type: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="quiz">Quiz</SelectItem>
                <SelectItem value="exam">Exam</SelectItem>
                <SelectItem value="assignment">Assignment</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label>Due Date</Label>
            <Input
              id="dueDate"
              type="date"
              value={assessment.due_date}
              onChange={(e) => setAssessment({...assessment, due_date: e.target.value})}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="passingScore">Passing Score (%)</Label>
            <Input
              id="passingScore"
              type="number"
              min="0"
              max="100"
              value={assessment.passing_score}
              onChange={(e: any) => setAssessment({...assessment, passing_score: e.target.value})}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="duration">Duration (minutes)</Label>
            <Input
              id="duration"
              type="number"
              min="1"
              value={assessment.duration}
              onChange={(e: any) => setAssessment({...assessment, duration: e.target.value})}
            />
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full mt-4">
        Continue to Questions
      </Button>
    </form>
  );
};

export default AssessmentSetup