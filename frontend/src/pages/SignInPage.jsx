import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login, googleLogin } from '../api/authAPI'
import useAuthStore from '../store/authStore'
import { signInWithGoogle } from '../api/firebase'

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const navigate = useNavigate()
  const setAuth = useAuthStore((state) => state.setAuth)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const data = await login({ email, password })
      setAuth(data.user, data.access_token)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    setError('')
    try {
      const idToken = await signInWithGoogle()
      const data = await googleLogin(idToken)
      setAuth(data.user, data.access_token)
      if (data.is_new_user) {
        navigate('/onboarding/countries')
      } else {
        navigate('/dashboard')
      }
    } catch (err) {
      console.error(err)
      setError(err?.response?.data?.detail || err.message || 'Google Sign-In failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-background text-on-background font-body-lg min-h-screen flex flex-col antialiased">
      <div className="fixed inset-0 z-[-1] overflow-hidden">
        <div className="bg-noise absolute inset-0"></div>
      </div>

      <main className="flex-grow flex items-center justify-center px-[16px] md:px-[24px] py-[64px]">
        <div className="w-full max-w-[440px]">
          {/* Brand Anchor */}
          <div className="text-center mb-[24px]">
            <div className="inline-flex items-center justify-center mb-[8px]">
              <span className="material-symbols-outlined text-primary text-[40px]" style={{ fontVariationSettings: "'wght' 600" }}>language</span>
            </div>
            <h1 className="font-display-lg text-[32px] md:text-display-lg font-bold text-on-surface tracking-tight">
              Discoverly
            </h1>
            <p className="font-body-sm text-secondary mt-2">Sign in to access</p>
          </div>

          {/* Login Card */}
          <div className="bg-surface-container-lowest depth-level-2 rounded-lg p-[24px] md:p-10 transition-standard">
            {error && (
              <div className="mb-6 p-4 bg-error-container text-on-error-container text-sm rounded-lg border border-error/20">
                {error}
              </div>
            )}
            <form className="space-y-[24px]" onSubmit={handleSubmit}>
              {/* Email Field */}
              <div className="space-y-2">
                <label className="font-label-caps text-label-caps text-secondary block" htmlFor="email">Email Address</label>
                <div className="relative group">
                  <input
                    className="w-full h-12 bg-surface-container-low border border-outline-variant rounded-lg px-4 font-body-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-standard"
                    id="email" 
                    name="email" 
                    placeholder="messi@example.com" 
                    required 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="font-label-caps text-label-caps text-secondary block mb-[8px]" htmlFor="password">Password</label>
                <div className="relative">
                  <input
                    className="w-full h-12 bg-surface-container-low border border-outline-variant rounded-lg px-4 font-body-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-standard"
                    id="password" 
                    name="password" 
                    placeholder="••••••••" 
                    required
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-on-surface transition-colors"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <span className="material-symbols-outlined text-[20px]">{showPassword ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
              </div>

              {/* CTA */}
              <div className="pt-2">
                <button
                  className="w-full h-12 bg-primary text-on-primary font-body-lg font-semibold rounded-lg hover:opacity-90 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>

              {/* Social Login */}
              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-outline-variant/30"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-surface-container-lowest px-4 font-label-caps text-label-caps text-secondary">Or continue with</span>
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  className="flex items-center justify-center gap-2 h-12 w-full border border-outline-variant rounded-lg hover:bg-surface-container-low transition-standard font-body-sm font-medium text-on-surface"
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.16v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.16C1.43 8.55 1 10.22 1 12s.43 3.45 1.16 4.93l2.45-1.89.12-.05z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.16 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.18-4.53z" fill="#EA4335"/>
                  </svg>
                  Google
                </button>
              </div>
            </form>

            {/* Footer Link */}
            <div className="mt-[24px] text-center">
              <p className="font-body-sm text-secondary">
                Don&apos;t have an account?{' '}
                <Link className="text-primary font-semibold hover:underline" to="/signup">Create an account</Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
