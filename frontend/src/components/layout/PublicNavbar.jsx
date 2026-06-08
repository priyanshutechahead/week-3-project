import { Link } from 'react-router-dom'
import useAuthStore from '../../store/authStore'

export default function PublicNavbar() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md border-b border-outline-variant/30 shadow-sm">
      <div className="max-w-[1280px] mx-auto px-[24px] py-4 flex justify-between items-center">
        <Link to="/" className="font-[Space_Grotesk] text-headline-md font-bold text-primary">
          Discoverly
        </Link>
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <Link
              to="/dashboard"
              className="bg-primary text-white px-6 py-2 rounded-full font-semibold hover:opacity-90 active:scale-95 transition-all shadow-sm"
            >
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/signin"
                className="text-secondary hover:text-primary font-semibold transition-colors duration-200"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="bg-primary text-white px-6 py-2 rounded-full font-semibold hover:opacity-90 active:scale-95 transition-all shadow-sm"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
