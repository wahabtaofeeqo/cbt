import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "@inertiajs/react";
import InputError from "../input-error";
import { Student } from "@/types";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { DialogClose, DialogFooter } from "./dialog";

type Props = {
    student: Student,
    onClose: Function
}

const AddStudent = ({ student, onClose}: Props) => {
    const { data, setData, post, put, processing, errors, reset } = useForm<any>({
        name: "",
        email: "",
        phone: "",
        department: "",
        level: "",
        status: "Active"
    });

    const submit = (e: any) => {
        e.preventDefault();

        if(student) {
              put(route('students.update', {id: student.id}), {
                 onSuccess: () => {
                    reset();
                    if(onClose) onClose();
                    toast('Student updated successfully')
                },
                onError: (e: any) => {
                    toast(e.message ?? 'Failed to update Student');
                }
            })
        }
        else {
            post(route("students.store"), {
                onSuccess: () => {
                    reset();
                    if(onClose) onClose();
                    toast('Student added successfully')
                },
                onError: (e) => {
                    toast(e.message ?? 'Failed to create Student');
                }
            });
        }
    };

    useEffect(() => {
        if(student) {
            setData({
                ...data,
                level: student.level,
                name: student.user.name,
                email: student.user.email,
                phone: student.user.phone,
                department: student.department,
            });
        }
    }, [student])

    return (
        <form className="space-y-6" onSubmit={submit}>
            <div className="grid gap-4">
                <div className="grid gap-4">
                    {/* Basic Information */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Full Name*</Label>
                            <Input
                                id="name"
                                name="name"
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                                placeholder="John Doe"
                                autoComplete="name"
                                required
                            />
                            <InputError message={errors.name} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email*</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={(e) => setData("email", e.target.value)}
                                placeholder="john@example.com"
                                autoComplete="email"
                                required
                            />
                            <InputError message={errors.email} />
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                                id="phone"
                                name="phone"
                                value={data.phone}
                                onChange={(e) => setData("phone", e.target.value)}
                                placeholder="+1 (555) 000-0000"
                                autoComplete="tel"
                            />
                            <InputError message={errors.phone} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="department">Department*</Label>
                            <Input
                                id="department"
                                name="department"
                                value={data.department}
                                onChange={(e) => setData("department", e.target.value)}
                                placeholder="Computer Science"
                                required
                            />
                            <InputError message={errors.department} />
                        </div>
                    </div>
                </div>

                <div className="">
                    <Label htmlFor="level">Level*</Label>
                    <Select
                        value={data.level}
                        onValueChange={(value) => setData("level", value)}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="100">100 Level</SelectItem>
                            <SelectItem value="200">200 Level</SelectItem>
                            <SelectItem value="300">300 Level</SelectItem>
                            <SelectItem value="400">400 Level</SelectItem>
                        </SelectContent>
                    </Select>
                    <InputError message={errors.status} />
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
                            <SelectItem value="Suspended">Suspended</SelectItem>
                        </SelectContent>
                    </Select>
                    <InputError message={errors.status} />
                </div>

            </div>

            <DialogFooter className="gap-2">
                <DialogClose asChild>
                    <Button variant="secondary" onClick={() => onClose()} type="button">
                        Cancel
                    </Button>
                </DialogClose>

                <Button type="submit" disabled={processing}>
                    {processing ? "Please wait..." : student ? "Update" : "Add Student"}
                </Button>
            </DialogFooter>
        </form>
    );
};

export default AddStudent;
