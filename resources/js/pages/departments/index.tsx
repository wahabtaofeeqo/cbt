import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import EmptyState from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AppLayout from "@/layouts/app-layout";
import { Head, router, useForm } from "@inertiajs/react";
import { useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { toast } from "react-toastify";

type DeptProps = {
    can: any;
    departments: any[];
}

const tableHeaders: any[] = ['SN', 'Name', 'Status', ''];

const DepartmentIndex = ({can, departments}: DeptProps) => {

    const [isOpen, setOpen] = useState(false);
    const [isDelete, setDelete] = useState(false);
    const [department, setDepartment] = useState<any>(null);

    const { data, setData, post, processing, errors, reset } = useForm<any>({
        name: "",
        status: "active",
    });

    const doDelete = () => {
        if(department) {
            router.delete(route('departments.delete', {id: department.id}), {
                onSuccess: () => {
                    setDelete(!isDelete);
                    toast('Department deleted successfully')
                },
                onError: (e) => {
                    setDelete(!isDelete)
                    toast(e.message ?? 'Failed to delete Department');
                }
            })
        }
    };
    
    const toggleDialog = () => {
        setDepartment(null);
        setOpen(!isOpen);
    }

    const handleDelete = (model: any) => {
        setDepartment(model);
        setDelete(!isDelete);
    };

    const handleEdit = (model: any) => {
        setOpen(!isOpen);
        setDepartment(model)
    };
    
    const submit = (e: any) => {
        e.preventDefault();
        post(route("departments.store"), {
            onSuccess: () => {
                reset();
                setOpen(false)
                toast('Department added successfully')
            },
            onError: (e) => {
                toast(e.message ?? 'Failed to create Department');
            }
        });
    };

    return (
        <>
        <Head title="Departments" />
        <AppLayout>
            
            {/* Adding New */}
            <Dialog open={isOpen} onOpenChange={(open) => {setOpen(open)}}>
                <DialogContent>
                    <DialogTitle>{department ? 'Update' : 'Add New'} Department</DialogTitle>
                    <form className="space-y-6 mt-4" onSubmit={submit}>
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name*</Label>
                            <Input
                                id="name"
                                name="name"
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                                placeholder="Computer Science"
                                autoComplete="name"
                                required
                            />
                            <InputError message={errors.name} />
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
                                    <SelectItem value="Inactive">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                            <InputError message={errors.status} />
                        </div>

                        <DialogFooter className="gap-2">
                            <DialogClose asChild>
                                <Button variant="secondary" onClick={() => setOpen(false)} type="button">
                                    Cancel
                                </Button>
                            </DialogClose>

                            <Button type="submit" disabled={processing}>
                                {processing ? "Please wait..." : department ? "Update" : "Create"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete a course */}
            <Dialog open={isDelete} onOpenChange={(bool) => setDelete(bool)}>
                <DialogContent>
                    <DialogTitle>Delete Department?</DialogTitle>
                    <p className="text-sm text-gray-500 mt-2">
                        Are you sure you want to delete this department? This action cannot be undone.
                    </p>
                    <DialogFooter className="gap-2">
                        <DialogClose asChild>
                            <Button variant="secondary" onClick={() => setDelete(false)}>
                                Cancel
                            </Button>
                        </DialogClose>

                        <Button variant="destructive" asChild>
                            <button onClick={doDelete}>Delete</button>
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <div className="p-6">
                 <div className="text-end mb-4">
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded text-sm font-medium cursor-pointer" onClick={toggleDialog}>Add Department</button>
                </div>

                {
                departments?.length ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 shadow-sm rounded-lg overflow-hidden">
                            <thead className="bg-gray-50">
                            <tr>
                                {tableHeaders.map((header: any, index: number) => (
                                <th
                                    key={index}
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    {header}
                                </th>
                                ))}
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {departments.map((row: any, rowIndex: number) => (
                                    <tr
                                    key={rowIndex}
                                    className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100'}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {rowIndex + 1}
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {row.name}
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {row.status}
                                        </td>

                                        <td align="right">
                                            {/* Three dots dropdown menu */}
                                            <div className="">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                                                        >
                                                            <CiMenuKebab />
                                                            <span className="sr-only">Actions</span>
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="w-40">
                                                        <DropdownMenuItem
                                                        onClick={() => handleEdit(row)}
                                                        className="cursor-pointer"
                                                        >
                                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                        Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                        onClick={() => handleDelete(row)}
                                                        className="cursor-pointer text-red-600 focus:text-red-600 dark:text-red-400 focus:bg-red-50 dark:focus:bg-red-900/20"
                                                        >
                                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                        Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )
                : <EmptyState 
                    title="No departments found"
                    callback={() => {}}
                    label="Create department"
                    description="Create a new department to get started."
                />
                }
            </div>
           
        </AppLayout>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas praesentium nobis, cumque est et tempore porro explicabo asperiores non ut voluptas ex nam maxime expedita dicta, laudantium quam ducimus natus.
        </>
    )
}

export default DepartmentIndex;