import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import Sidebar from "../../../components/sidebar"

export const Route = createFileRoute('/_auth')({
  beforeLoad: ({ context, location }) => {

    const token = localStorage.getItem('token')
    
    if (!context.auth.isAuthenticated && !token) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
    }
  },
  component: AuthLayout,
})

function AuthLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <main className="md:pl-72 flex flex-col min-h-screen min-w-0">
        <div className="flex-1 p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  )
}
