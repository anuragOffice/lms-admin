import { createFileRoute, Link } from '@tanstack/react-router'
import Sidebar from "../../components/sidebar"

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-purple-500/10 to-pink-500/10"></div>
      <div className="relative z-10 max-w-3xl text-center space-y-10">


        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900">
          Manage your learning with <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">LMS Admin</span>
        </h1>

        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          The all-in-one platform to manage your courses, students, and revenue. Built with modern tools for a seamless experience.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            to="/login"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gray-900 text-white font-semibold shadow-lg shadow-gray-900/20 hover:scale-105 transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
          >
            Sign In to Portal
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </Link>

        </div>
      </div>
    </div>
  )
}
