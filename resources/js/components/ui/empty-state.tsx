import { PlusCircle } from "lucide-react";
import { MouseEventHandler } from "react";

type Props = {
    title: string
    label: string
    description: string
    callback?: MouseEventHandler
}
const EmptyState = ({title, label, description, callback}: Props) => {
    return (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="mx-auto max-w-md">
                {/* Illustration */}
                <svg
                    className="mx-auto h-48 w-48 text-gray-300 dark:text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
                    />
                </svg>

                {/* Text content */}
                <h3 className="mt-6 text-lg font-medium text-gray-900 dark:text-white">
                    {title}
                </h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    {description}
                </p>

                {/* CTA Button */}
                {
                    callback && (
                        <div className="mt-6">
                            <button onClick={callback}
                            className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                            <PlusCircle className="-ml-0.5 mr-1.5 h-5 w-5" />
                                {label}
                            </button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default EmptyState;