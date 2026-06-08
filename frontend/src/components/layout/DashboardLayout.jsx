import { Outlet } from 'react-router-dom'
import DashboardTopbar from './DashboardTopbar'

export default function DashboardLayout() {
  return (
    <div className="min-h-screen text-on-background bg-surface">
      <DashboardTopbar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}
