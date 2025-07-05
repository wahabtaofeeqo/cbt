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
    url?: string | null,
    student?: Student,
    onClose: Function
    departments: { id: string, name: string }[]
}

const AddStudent = ({ student, onClose, url, departments }: Props) => {
    const { data, setData, post, put, processing, errors, reset } = useForm<any>({
        name: "",
        email: "",
        phone: "",
        matric_number: "",
        department_id: "",
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
            post(route(url ? url : "students.store"), {
                onSuccess: () => {
                    reset();
                    if(onClose) onClose();
                    toast('Created successfully')
                },
                onError: (e) => {
                    console.log('Error', e);
                    
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
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
                    <div className="">
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

                        {/* <div className="grid gap-2">
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
                        </div> */}
                    </div>
                </div>

                <div>
                    <Label htmlFor="department">Department*</Label>
                    <Select
                        value={data.department_id}
                        onValueChange={(value) => setData("department_id", value)}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>

                        <SelectContent>
                            {
                                departments.map((department) => (
                                    <SelectItem key={department.id} value={department.id}>
                                        {department.name}
                                    </SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                    <InputError message={errors.status} />
                </div>

                 <div className="">
                    <Label htmlFor="matric">Matric Number</Label>
                    <Input
                        id="matric"
                        name="matric"
                        value={data.matric_number}
                        onChange={(e) => setData("matric_number", e.target.value)}
                        placeholder="Matric Number"
                        autoComplete="matric"
                    />
                    <InputError message={errors.matric} />
                </div>

                <div className="">
                    <Label htmlFor="level">Level*</Label>
                    <Select
                        value={data.level}
                        onValueChange={(value) => setData("level", value)}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Level" />
                        </SelectTrigger>

                       <SelectContent>
                            {
                                ["100", "200", "300", "400"].map((level) => (
                                    <SelectItem key={level} value={level}>
                                        {level} Level
                                    </SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                    <InputError message={errors.status} />
                </div>

                {
                    student ? ( 
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
                    ) : null
                } 
            </div>

            <DialogFooter className="gap-2">
                <DialogClose asChild>
                    <Button variant="secondary" onClick={() => onClose()} type="button">
                        Cancel
                    </Button>
                </DialogClose>

                <Button type="submit" disabled={processing}>
                    {processing ? "Please wait..." : student ? "Update" : "Create"}
                </Button>
            </DialogFooter>
        </form>
    );
};

export default AddStudent;
