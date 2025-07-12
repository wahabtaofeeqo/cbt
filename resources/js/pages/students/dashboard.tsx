import AppLayout from "@/layouts/app-layout"
import { titleCase } from "@/utils/utils"
import { Head, Link } from "@inertiajs/react"

type Props = {
    assessments: any[]
    submissions: any[]
}

const StudentDashboard = ({ assessments, submissions }: Props) => {
    return (
        <>
        <Head title="Available Assessments" />

        <AppLayout showSidebar={false}>
            <div className="container p-6 mx-auto">
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
                    :   <div className="text-center font-bold">
                            <p>No assessments available at this time.</p>
                        </div>
                }
               
                <h4 className="mt-8">Completed Assessments</h4>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    {
                        submissions?.map((item, index) => (
                            <>
                            <div key={index} className="bg-white shadow-sm rounded-lg p-4 mb-4">
                                <h2 className=" font-normal">Type: Assignment</h2>
                                <p className="text-gray-600 mb-6">Course: CMP 201</p>

                                <div>
                                    <Link href={`/tests/1`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                        View Assessment
                                    </Link>
                                </div>
                            </div>
                            </>
                        ))
                    }
                </div>
            </div>
        </AppLayout>
        </>
    )
}

export default StudentDashboard