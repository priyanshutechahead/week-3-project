import { Link, useLocation } from 'react-router-dom'

const navItems = [
  { icon: 'dashboard', label: 'Dashboard', path: '/dashboard' },
  { icon: 'psychology', label: 'Intelligence', path: '/intelligence' },
  { icon: 'map', label: 'Itineraries', path: '/itineraries' },
]

const bottomItems = [
  { icon: 'settings', label: 'Settings' },
  { icon: 'logout', label: 'Logout' },
]

export default function DashboardSidebar() {
  const location = useLocation()

  return (
    <aside className="h-screen w-64 fixed left-0 top-0 bg-surface border-r border-outline-variant flex flex-col py-[24px] z-50">
      <div className="px-[24px] mb-[64px]">
        <h1 className="text-headline-md font-headline-md font-bold text-primary">Discoverly</h1>
        <p className="text-label-caps font-label-caps text-secondary uppercase tracking-widest mt-1">Premium Travel Intelligence</p>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`px-[24px] py-3 flex items-center space-x-3 cursor-pointer transition-all duration-200 ${
                isActive
                  ? 'bg-primary-fixed text-primary border-l-2 border-primary'
                  : 'text-secondary hover:bg-surface-container-low'
              }`}
            >
              <span
                className="material-symbols-outlined"
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
              >
                {item.icon}
              </span>
              <span className="text-label-caps font-label-caps">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="px-[24px] mt-auto pt-[24px]">
        <div className="space-y-1">
          {bottomItems.map((item) => (
            <div
              key={item.label}
              className="text-secondary hover:bg-surface-container-low px-[24px] py-2 flex items-center space-x-3 cursor-pointer rounded-lg transition-all duration-200"
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="text-label-caps font-label-caps">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}
