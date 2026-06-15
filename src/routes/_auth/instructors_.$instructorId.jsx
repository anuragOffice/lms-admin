import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useEffect } from "react"
import { getInstructor } from "../../api/instructors"

export const Route = createFileRoute('/_auth/instructors_/$instructorId')({
  component: InstructorDetailPage,
})

function InstructorDetailPage() {
  const { instructorId } = Route.useParams()
  const [instructor, setInstructor] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getInstructor(instructorId)
      .then(res => {
        setInstructor(res.data)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [instructorId])

  return (
    <div className="p-8 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Back navigation */}
      <div className="mb-8">
        <Link
          to="/instructors"
          className="group inline-flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors"
        >
          <svg className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Instructors
        </Link>
      </div>

      {/* Main Content Card */}
      <div className="bg-white/60 backdrop-blur-xl border border-gray-200 rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 pb-8 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                Instructor
              </span>
              <span className="text-sm text-gray-500 font-mono">ID: {instructorId}</span>
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              {instructor?.name || 'Instructor Details'}
            </h1>
          </div>
        </div>

        {isLoading ? (
          <div className="py-12 text-center text-sm text-gray-500">Loading details...</div>
        ) : !instructor ? (
          <div className="py-12 text-center text-sm text-gray-500">Instructor not found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-gray-50/50 rounded-2xl p-6 border border-gray-100">
                <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Contact Info</h3>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Email Address</dt>
                    <dd className="mt-1 text-sm font-semibold text-gray-900">{instructor.email}</dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50/50 rounded-2xl p-6 border border-gray-100">
                <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">System Info</h3>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Date Added</dt>
                    <dd className="mt-1 text-sm font-semibold text-gray-900">
                      {instructor.created_at ? new Date(instructor.created_at).toLocaleString() : 'N/A'}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                    <dd className="mt-1 text-sm font-semibold text-gray-900">
                      {instructor.updated_at ? new Date(instructor.updated_at).toLocaleString() : 'N/A'}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
