import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { createCourse } from '../../api/courses'
import { getInstructors } from '../../api/instructors'

export const Route = createFileRoute('/_auth/createCourse')({
  component: CreateCoursePage,
})

function CreateCoursePage() {
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [duration, setDuration] = useState('')
  const [credits, setCredits] = useState('')
  const [instructorId, setInstructorId] = useState('')

  const [instructors, setInstructors] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)


  useEffect(() => {
    getInstructors()
      .then(res => {
        if (res.data && Array.isArray(res.data)) {
          setInstructors(res.data)
        } else {
          setInstructors([])
        }
      })
      .catch(err => console.log('Failed to fetch instructors:', err))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await createCourse({
        title,
        description,
        duration,
        credits: credits ? Number(credits) : 0,
        instructor_id: instructorId ? Number(instructorId) : null
      })
      navigate({ to: '/courses' })
    } catch (err) {
      setError(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-8 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <Link
            to="/courses"
            className="group inline-flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors mb-4"
          >
            <svg className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Courses
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Create New Course</h1>
          <p className="mt-2 text-sm text-gray-500">
            Fill in the details below to add a new course to the catalog.
          </p>
        </div>
      </div>

      <div className="bg-white/60 backdrop-blur-xl border border-gray-200 rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">

            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Course Title</label>
              <input
                id="title"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Introduction to Computer Science"
                className="mt-1 block w-full rounded-xl border border-gray-200 bg-white/50 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Course Description</label>
              <textarea
                id="description"
                rows={4}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide a detailed description of the course..."
                className="mt-1 block w-full rounded-xl border border-gray-200 bg-white/50 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Duration */}
              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration (e.g., 8 weeks)</label>
                <input
                  id="duration"
                  type="text"
                  required
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="8 weeks"
                  className="mt-1 block w-full rounded-xl border border-gray-200 bg-white/50 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                />
              </div>

              {/* Credits */}
              <div>
                <label htmlFor="credits" className="block text-sm font-medium text-gray-700">Credits</label>
                <input
                  id="credits"
                  type="number"
                  required
                  min="0"
                  value={credits}
                  onChange={(e) => setCredits(e.target.value)}
                  placeholder="e.g., 3"
                  className="mt-1 block w-full rounded-xl border border-gray-200 bg-white/50 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                />
              </div>
            </div>

            {/* Instructor Assignment */}
            <div>
              <label htmlFor="instructor" className="block text-sm font-medium text-gray-700">Assign Instructor</label>
              <select
                id="instructor"
                required
                value={instructorId}
                onChange={(e) => setInstructorId(e.target.value)}
                className="mt-1 block w-full rounded-xl border border-gray-200 bg-white/50 px-4 py-3 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
              >
                <option value="" disabled>Select an instructor</option>
                {instructors.map(instructor => (
                  <option key={instructor.id} value={instructor.id}>
                    {instructor.name}
                  </option>
                ))}
              </select>
              {instructors.length === 0 && (
                <p className="mt-1 text-xs text-amber-600">
                  No instructors found. Make sure you have created some first!
                </p>
              )}
            </div>

          </div>

          <div className="pt-6 flex justify-end gap-3 border-t border-gray-100">
            <Link
              to="/courses"
              className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-600 active:scale-95 transition-all"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 hover:bg-indigo-500 hover:shadow-indigo-500/40 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 active:scale-95 disabled:opacity-70 transition-all"
            >
              {isLoading ? 'Creating...' : 'Create Course'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
