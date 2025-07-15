import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogFooter, DialogClose } from "@/components/ui/dialog";
import { useForm } from "@inertiajs/react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from "lucide-react";
import InputError from "../input-error";
import { Course, Teacher } from "@/types";
import { useEffect } from "react";
import { toast } from "react-toastify";

type Props = {
    courses: Course[]
    teacher: Teacher,
    departments: any[]
    onClose: Function
}

const AddTeacher = ({ courses, teacher, onClose, departments}: Props) => {
    const { data, setData, post, processing, errors, reset } = useForm<any>({
        name: "",
        email: "",
        phone: "",
        department_id: "",
        qualifications: "",
        status: "Active",
        courses: [],
        selectedCourse: "" // For the select input
    });

    const submit = (e: any) => {
        e.preventDefault();
        post(route("teachers.store"), {
            onSuccess: () => {
                reset();
                if(onClose) onClose();
                toast('Teacher added successfully')
            },
            onError: (e) => {
                toast(e.message ?? 'Failed to create Teacher');
            }
        });
    };

    const handleAddCourse = () => {
        if (data.selectedCourse && !data.courses.includes(data.selectedCourse)) {
            setData("courses", [...data.courses, data.selectedCourse]);
            setData("selectedCourse", "");
        }
    };

    const handleRemoveCourse = (courseId: any) => {
        setData("courses", data.courses.filter((id: any) => id !== courseId));
    };

    useEffect(() => {
        if(teacher) {
            setData({
                ...data,
                name: teacher.user.name,
                email: teacher.user.email,
                phone: teacher.user.phone,
                department_id: teacher.department_id,
                // courses: teacher.courses ?? []
            });

            let ids = teacher.courses.map((c: any) => c.id);
            setData("courses", ids);
        }
    }, [teacher])

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
                            <Select
                                value={data.department_id}
                                onValueChange={(value) => setData("department_id", value)}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select" />
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
                            <InputError message={errors.department_id} />
                        </div>
                    </div>

                    {/* Qualifications */}
                    <div className="grid gap-2">
                        <Label htmlFor="qualifications">Qualifications*</Label>
                        <textarea
                        id="qualifications"
                        name="qualifications"
                        rows={2}
                        className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        value={data.qualifications}
                        onChange={(e) => setData("qualifications", e.target.value)}
                        placeholder="PhD in Computer Science, M.Sc in Data Science"
                        required
                        />
                        <InputError message={errors.qualifications} />
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
                            <SelectItem value="On Leave">On Leave</SelectItem>
                            <SelectItem value="Inactive">Inactive</SelectItem>
                            </SelectContent>
                        </Select>
                        <InputError message={errors.status} />
                    </div>

                    {/* Course Selection */}
                    <div className="grid gap-2">
                        <Label>Assigned Courses</Label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto p-2 border rounded-md">
                        {courses.length > 0 ? (
                            <>
                            {/* Selected Courses Display */}
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {data.courses.map((courseId: string) => {
                                    const course = courses.find((c: any) => c.id === courseId);
                                    return course ? (
                                        <div
                                        key={courseId}
                                        className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-full bg-gray-100 dark:bg-gray-700"
                                        >
                                        <span>{course.title}</span>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveCourse(courseId)}
                                            className="text-gray-500 hover:text-red-500"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                        </div>
                                    ) : null;
                                    })}
                                </div>

                                {/* Course Selector */}
                                <div className="flex gap-2">
                                    <Select
                                    value={data.selectedCourse}
                                    onValueChange={(value) => setData("selectedCourse", value)}
                                    >
                                    <SelectTrigger className="flex-1">
                                        <SelectValue placeholder="Select a course" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {
                                        courses.filter((course: any) => !data.courses.includes(course.id))
                                        .map((course: any) => (
                                            <SelectItem key={course.id} value={course.id}>
                                            {course.title}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                    </Select>
                                    <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={handleAddCourse}
                                    disabled={!data.selectedCourse}
                                    >
                                    Add
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <p className="text-sm text-muted-foreground col-span-2 p-2">
                            No courses available. Create courses first.
                            </p>
                        )}
                        </div>
                        <InputError message={errors.courses} />
                    </div>
                    </div>
            </div>

            <DialogFooter className="gap-2">
                <DialogClose asChild>
                    <Button variant="secondary" onClick={() => onClose()} type="button">
                        Cancel
                    </Button>
                </DialogClose>

                <Button type="submit" disabled={processing}>
                    {processing ? "Please wait..." : teacher ? "Update" : "Add Teacher"}
                </Button>
            </DialogFooter>
        </form>
    );
};

export default AddTeacher;
