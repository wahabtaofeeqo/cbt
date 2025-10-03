import AppLayout from "@/layouts/app-layout"
import { BreadcrumbItem } from "@/types"
import { titleCase } from "@/utils/utils"
import { Head, Link } from "@inertiajs/react"

type Props = {
    roles: string[]
    assessments: any[]
    submissions: any[]
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

const StudentDashboard = ({ roles, assessments, submissions }: Props) => {

    return (
        <>
        <Head title="Available Assessments" />

        <AppLayout roles={roles} breadcrumbs={breadcrumbs}>
            <div className="container p-6 mx-auto">
                {
                    !assessments.length && !submissions.length
                    ? (<></>)
                    : 
                    (<>
                        {
                            assessments.length ? (
                                <>
                                <h1 className="text-2xl font-bold">Available Assessments</h1>
                                <p className="text-gray-700 mb-6">Here are the assessments available for you to take.</p>
                                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-6">
                                    {
                                        assessments.map((assessment) => (
                                            <div key={assessment.id} className="bg-white shadow-sm rounded-lg p-4 py-6 mb-4">
                                                <h2 className="text-normal font-normal">Type: {titleCase(assessment.type)}</h2>
                                                <p className="text-gray-600 mb-6">Course: {assessment.course.code}</p>
                                                <div>
                                                    <Link href={`/tests/${assessment.id}`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                                        Start Assessment
                                                    </Link>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                                </>
                            )
                            :   <div className="font-bold">
                                    <p>No Upcoming assessments at this time.</p>
                                </div>
                        }
                        
                        {
                            submissions.length ?
                            <>
                            <hr className="my-8" />
                            <div>
                                <h4 className="font-bold">Completed Assessments</h4>
                                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                                    {
                                        submissions?.map((item, index) => (
                                            <>
                                            <div key={index} className="bg-white shadow-sm rounded-lg p-4 py-6 mb-4">
                                                <h2 className=" font-normal">Type: {titleCase(item.assessment.type)}</h2>
                                                <p className="text-gray-600 mb-6">Course: {item.assessment.course.code}</p>

                                                <div>
                                                    <Link href={route('assessments.submission', {id: item.assessment_id, submissionId: item.id})} className="bg-blue-500 text-white px-4 py-1.5 text-sm rounded-sm hover:bg-blue-600">
                                                        View Submission
                                                    </Link>
                                                </div>
                                            </div>
                                            </>
                                        ))
                                    }
                                </div>
                            </div>
                            </>
                            : <div></div>
                        }
                    </>)
                }
            </div>
        </AppLayout>
        </>
    )
}

export default StudentDashboard