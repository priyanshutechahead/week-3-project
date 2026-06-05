import { Outlet } from 'react-router-dom'
import DashboardSidebar from './DashboardSidebar'
import DashboardTopbar from './DashboardTopbar'

export default function DashboardLayout() {
  return (
    <div className="min-h-screen text-on-background">
      <DashboardSidebar />
      <main className="ml-64 flex-1">
        <DashboardTopbar />
        <Outlet />
      </main>
    </div>
  )
}
