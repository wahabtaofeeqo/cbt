import AppLayout from "@/layouts/app-layout"
import { Head, Link } from "@inertiajs/react"

type Props = {
    assessments: any[]
}

const StudentDashboard = ({ assessments }: Props) => {
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
                                    <div key={assessment.id} className="bg-white shadow-sm rounded-lg p-4 mb-4">
                                        <h2 className="text-xl font-semibold">Type: {assessment.type}</h2>
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
               
            </div> 
        </AppLayout>
       
        </>
    )
}

export default StudentDashboard