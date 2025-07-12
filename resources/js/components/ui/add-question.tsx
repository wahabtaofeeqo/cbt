import { useEffect } from "react";
import InputError from "../input-error";
import { Input } from "./input";
import { Label } from "./label";
import { useForm } from "@inertiajs/react";
import { toast } from "react-toastify";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { DialogClose, DialogFooter } from "./dialog";
import { Button } from "./button";
import { Assessment } from "@/types";

type Props = {
    model: any
    onClose: Function
    assessment?: Assessment
}

const AddQuestion = ({model, onClose, assessment}: Props) => {

    const { data, setData, post, put, processing, errors, reset } = useForm<any>({
        text: '',
        type: 'multiple-choice',
        options: [
            {id: null, value: ''},
            {id: null, value: ''},
            {id: null, value: ''}
        ],
        correct_answer: null,
        points: 1,
        status: "Active",
        assessment_id: ''
    });
    
    const submit = (e: any) => {
        e.preventDefault();
        if(model) {
                put(route('questions.update', {id: model.id}), {
                    onSuccess: () => {
                    reset();
                    if(onClose) onClose();
                    toast('Question updated successfully')
                },
                onError: (e: any) => {
                    toast(e.message ?? 'Failed to update Question');
                }
            })
        }
        else {
            post(route("questions.store"), {
                onSuccess: () => {
                    reset();
                    if(onClose) onClose();
                    toast('Created successfully')
                },
                onError: (e) => {
                    toast(e.message ?? 'Failed to create Question');
                }
            });
        }
    };
    
    useEffect(() => {
        if(model) {
            setData({
                ...data,
                ...model,
                correct_answer: model.options.findIndex((item: any) => item.is_correct)
            });
        }

        if(assessment) {
            setData('assessment_id', assessment?.id,)
        }
    }, [model, assessment])

    return (
        <>
            <form className="space-y-6" onSubmit={submit}>
                <div className="space-y-4">
                    <div className="grid gap-2">
                        <Label>Question Type</Label>
                        <Select
                            value={data.type}
                            onValueChange={(value) => setData({...data, type: value})}
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
                            value={data.text}
                            onChange={(e) => setData({...data, text: e.target.value})}
                            placeholder="Enter your question"
                        />
                    </div>

                    {['multiple-choice', 'true-false'].includes(data.type) && (
                        <div className="space-y-3">
                            <Label>Options</Label>
                            {
                                data.options.map((option: any, index: number) => (
                                <div key={index} className="flex items-center gap-2">
                                    <Input
                                        value={option.value}
                                        onChange={(e) => {
                                            const newOptions = [...data.options];
                                            newOptions[index].value = e.target.value;
                                            setData({...data, options: newOptions});
                                        }}
                                        placeholder={`Option ${index + 1}`}
                                    />
                                    
                                    <input
                                        type="radio"
                                        name="correctAnswer"
                                        checked={data.correct_answer === index}
                                        onChange={() => setData({...data, correct_answer: index})}
                                    />
                                </div>
                                ))
                            }

                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setData({
                                    ...data,
                                    options: [...data.options, {id: '', value: ''}]
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
                            value={data.points}
                            onChange={(e) => setData({...data, points: parseInt(e.target.value)})}
                        />
                    </div>
                </div>

                <div className="">
                    <Label htmlFor="status">Status*</Label>
                    <Select
                        value={data.status}
                        onValueChange={(value) => setData("status", value)}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Draft">Draft</SelectItem>
                        </SelectContent>
                    </Select>
                    <InputError message={errors.status} />
                </div>

                <DialogFooter className="gap-2">
                    <DialogClose asChild>
                        <Button variant="secondary" onClick={() => onClose()} type="button">
                            Cancel
                        </Button>
                    </DialogClose>

                    <Button type="submit" disabled={processing}>
                        {processing ? "Please wait..." : model ? "Update" : "Create"}
                    </Button>
                </DialogFooter>
            </form>
        </>
    );
};

export default AddQuestion;