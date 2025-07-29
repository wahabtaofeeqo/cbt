import AddStudent from '@/components/ui/add-student';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { FaChalkboardTeacher, FaChartLine, FaClock, FaMobileAlt, FaShieldAlt, FaUserGraduate } from "react-icons/fa";
import { ToastContainer } from 'react-toastify';

type Props = {
    departments: {id: string, name: string}[]
}

export default function Welcome({departments}: Props) {

    const [isOpen, setOpen] = useState(false);
    const { auth } = usePage<SharedData>().props;

    // Data
    const features = [
    {
        icon: <FaChalkboardTeacher />,
        title: "Teacher Dashboard",
        description: "Comprehensive interface for creating, managing, and grading exams with ease."
    },
    {
        icon: <FaUserGraduate />,
        title: "Student Portal",
        description: "Intuitive interface for students to take tests with real-time feedback."
    },
    {
        icon: <FaChartLine />,
        description: "Detailed analytics and reporting to track student performance and progress."
    },
    {
        icon: <FaShieldAlt />,
        title: "Secure Platform",
        description: "Advanced security measures to prevent cheating and ensure exam integrity."
    },
    {
        icon: <FaMobileAlt />,
        title: "Responsive Design",
        description: "Works seamlessly on all devices including desktops, tablets, and mobile."
    },
    {
        icon: <FaClock />,
        title: "Timed Exams",
        description: "Flexible time controls with automatic submission when time elapses."
    }
    ];

    return (
        <>
        <ToastContainer />
        <Dialog open={isOpen} onOpenChange={(open) => {setOpen(open)}}>
            <DialogContent>
                <DialogTitle>Student</DialogTitle>
                <AddStudent 
                    url={'student.create'} 
                    onClose={() => setOpen(false)}
                    departments={departments} />
            </DialogContent>
        </Dialog>

         <Head title="Welcome">
            <link rel="preconnect" href="https://fonts.bunny.net" />
            <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
        </Head>

        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Navigation */}
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 flex items-center">
                                <span className="text-2xl font-bold text-indigo-600">CBT</span>
                            </div>
                        </div>
                    
                        <div>
                            {
                            auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition duration-300"
                                >
                                    Dashboard
                                </Link>
                                ) : (
                                    <>
                                    <Link href='/login' className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
                                        Login 
                                    </Link>
                                    <button onClick={() => setOpen(true)} className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition duration-300">
                                        Get Started
                                    </button>
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                            Modern Computer-Based Testing <span className="text-indigo-600">for Schools</span>
                        </h1>
                        <p className="text-lg text-gray-600 mb-8">
                            Revolutionize your examination process with our secure, scalable, and user-friendly CBT platform designed specifically for educational institutions.
                        </p>
                        
                        <div className="flex space-x-4">

                            {auth.user 
                            ? <div></div> 
                            : (
                                <>
                                <button onClick={() => setOpen(true)} className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition duration-300">
                                    Get Started
                                </button>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="relative">
                        <div className="bg-white p-6 rounded-xl shadow-xl border border-gray-100">
                            <img 
                                src="https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                                alt="CBT Interface" 
                                className="rounded-lg w-full h-auto"
                            />
                            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-md border border-gray-200">
                                <FaChartLine className="text-indigo-600 text-2xl" />
                                <p className="text-xs font-medium mt-1">Real-time Analytics</p>
                            </div>
                            <div className="absolute -top-6 -right-6 bg-white p-4 rounded-lg shadow-md border border-gray-200">
                                <FaShieldAlt className="text-indigo-600 text-2xl" />
                                <p className="text-xs font-medium mt-1">Secure Platform</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div id="features" className="bg-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Powerful Features</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Everything you need to conduct seamless computer-based examinations
                    </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                    <div key={index} className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition duration-300">
                        <div className="text-indigo-600 text-3xl mb-4">
                        {feature.icon}
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                    </div>
                    ))}
                </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-800 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="py-3 text-center text-gray-400">
                        <p>&copy; {new Date().getFullYear()}. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
        </>
    );
}
