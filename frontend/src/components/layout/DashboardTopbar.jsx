import { Link, useLocation, useNavigate } from 'react-router-dom'
import useAuthStore from '../../store/authStore'

const navItems = [
  { icon: 'dashboard', label: 'Dashboard', path: '/dashboard' },
]

export default function DashboardTopbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const logout = useAuthStore((state) => state.logout)
  const user = useAuthStore((state) => state.user)

  const handleLogout = () => {
    logout()
    navigate('/signin')
  }

  return (
    <header className="w-full h-20 bg-surface border-b border-outline-variant sticky top-0 z-50 shadow-sm">
      <div className="max-w-[1280px] mx-auto h-full px-6 flex justify-between items-center">
        {/* Branding */}
        <div className="flex flex-col">
          <h1 className="text-headline-md font-bold text-primary leading-tight">Discoverly</h1>
          <p className="text-[10px] text-secondary uppercase tracking-[0.2em] font-semibold">Premium Travel Intelligence</p>
        </div>

        {/* Navigation
        <nav className="flex items-center gap-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 flex items-center gap-2 rounded-full transition-all duration-200 ${
                  isActive
                    ? 'bg-primary-fixed text-primary'
                    : 'text-secondary hover:bg-surface-container-low'
                }`}
              >
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
                >
                  {item.icon}
                </span>
                <span className="text-label-caps font-bold">{item.label}</span>
              </Link>
            )
          })}
        </nav> */}

        {/* Profile & Actions */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 pl-6 border-l border-outline-variant">
            <div className="text-right hidden sm:block">
              <p className="text-label-caps font-bold text-on-surface leading-tight">{user?.name?.split(' ')[0] || 'Explorer'}</p>
              <p className="text-[10px] text-secondary">{user?.persona || 'Premium User'}</p>
            </div>
            <button 
              onClick={handleLogout}
              className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-secondary hover:text-error hover:border-error transition-all"
              title="Logout"
            >
              <span className="material-symbols-outlined">logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
