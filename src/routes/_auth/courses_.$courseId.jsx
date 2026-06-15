import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useEffect } from "react"
import { getCourse } from "../../api/courses"

export const Route = createFileRoute('/_auth/courses_/$courseId')({
  component: CourseDetailPage,
})

function CourseDetailPage() {
  const { courseId } = Route.useParams()
  const [course, setCourse] = useState(null)

  useEffect(() => {
    getCourse(courseId)
      .then(res => {
        console.log(res)
        setCourse(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <div className="p-8 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Back navigation */}
      <div className="mb-8">
        <Link
          to="/courses"
          className="group inline-flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors"
        >
          <svg className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Courses
        </Link>
      </div>

      {/* Main Content Card */}
      <div className="bg-white/60 backdrop-blur-xl border border-gray-200 rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 pb-8 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                Active
              </span>
              <span className="text-sm text-gray-500 font-mono">ID: {courseId}</span>
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Course Details
            </h1>
          </div>
          <div className="flex gap-3">
            <button className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-600 active:scale-95 transition-all">
              Edit Course
            </button>
            <button className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 active:scale-95 transition-all">
              Manage Modules
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                This is a placeholder description for course {courseId}. In a real application, you would fetch the course data from your backend using this ID and populate the details here. The layout is designed to be clean and modern.
              </p>
            </div>

            <div className="bg-gray-50/50 rounded-2xl p-6 border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Curriculum Preview</h3>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-600 text-sm">
                  <svg className="w-5 h-5 mr-3 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Module 1: Getting Started
                </li>
                <li className="flex items-center text-gray-600 text-sm">
                  <svg className="w-5 h-5 mr-3 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Module 2: Core Concepts
                </li>
                <li className="flex items-center text-gray-600 text-sm">
                  <svg className="w-5 h-5 mr-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Module 3: Advanced Topics (Locked)
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50/50 rounded-2xl p-6 border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Course Info</h3>
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Duration</dt>
                  <dd className="mt-1 text-sm font-semibold text-gray-900">4 weeks</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Credits</dt>
                  <dd className="mt-1 text-sm font-semibold text-gray-900">3 Credits</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Instructor</dt>
                  <dd className="mt-1 text-sm font-semibold text-gray-900">John Doe</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
