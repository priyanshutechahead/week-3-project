import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signup, googleLogin } from '../api/authAPI'
import useAuthStore from '../store/authStore'
import { signInWithGoogle } from '../api/firebase'

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  })
  const [error, setError] = useState('')
  
  const navigate = useNavigate()
  const setAuth = useAuthStore((state) => state.setAuth)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const data = await signup(formData)
      setAuth(data.user, data.access_token)
      // Navigate to the 4-step interest onboarding flow
      navigate('/onboarding/countries')
    } catch (err) {
      setError(err.response?.data?.detail || 'Signup failed. Please try again.')
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
      setError(err?.response?.data?.detail || err.message || 'Google Sign-Up failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col font-body-lg text-body-lg">
      <div className="fixed inset-0 pointer-events-none opacity-40 z-0"></div>

      {/* Top Bar */}
      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md border-b border-outline-variant/30 px-[24px] py-4">
        <div className="max-w-[1280px] mx-auto flex justify-between items-center">
          <span className="font-display-lg text-headline-md font-bold text-primary">Discoverly</span>
          <div className="hidden md:flex gap-[24px] items-center">
            <span className="font-label-caps text-label-caps text-on-surface-variant">Step 1 of 5</span>
            <div className="w-32 h-1 bg-surface-container rounded-full overflow-hidden">
              <div className="w-1/5 h-full bg-primary"></div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center pt-[64px] pb-[64px] px-[16px] relative z-10">
        <div className="w-full max-w-[480px]">
          <div className="bg-white border border-outline-variant/50 rounded-xl p-8 md:p-10 form-card">
            <div className="mb-[24px]">
              <h1 className="font-headline-md text-headline-md text-on-surface mb-2">Create your account</h1>
              <p className="text-on-surface-variant font-body-sm text-body-sm">Start your journey with us</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-error-container text-on-error-container text-sm rounded-lg border border-error/20">
                {error}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="font-label-caps text-label-caps text-on-surface-variant" htmlFor="name">FULL NAME</label>
                <input 
                  className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg font-body-lg text-body-lg input-focus-ring transition-all placeholder:text-outline/50" 
                  id="name" 
                  name="name" 
                  placeholder="Priyanshu" 
                  required 
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <label className="font-label-caps text-label-caps text-on-surface-variant" htmlFor="email">EMAIL ADDRESS</label>
                <input 
                  className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg font-body-lg text-body-lg input-focus-ring transition-all placeholder:text-outline/50" 
                  id="email" 
                  name="email" 
                  placeholder="priyanshu@company.com" 
                  required 
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <label className="font-label-caps text-label-caps text-on-surface-variant" htmlFor="phone">PHONE NUMBER</label>
                <input 
                  className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg font-body-lg text-body-lg input-focus-ring transition-all placeholder:text-outline/50" 
                  id="phone" 
                  name="phone" 
                  placeholder="+91 1234567890" 
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <label className="font-label-caps text-label-caps text-on-surface-variant" htmlFor="password">PASSWORD</label>
                <div className="relative">
                  <input 
                    className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg font-body-lg text-body-lg input-focus-ring transition-all placeholder:text-outline/50" 
                    id="password" 
                    name="password" 
                    placeholder="••••••••" 
                    required 
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors" type="button" onClick={() => setShowPassword(!showPassword)}>
                    <span className="material-symbols-outlined text-[20px]">{showPassword ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
                <p className="text-[11px] text-outline/70 mt-1">Must be at least 8 characters long.</p>
              </div>

              <button
                className="w-full mt-[24px] py-4 bg-primary text-white font-medium rounded-lg flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all shadow-sm disabled:opacity-50"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <span className="material-symbols-outlined animate-spin">progress_activity</span>
                ) : (
                  <>
                    <span>Next</span>
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </>
                )}
              </button>
            </form>

            <div className="relative py-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-outline-variant/30"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-4 font-label-caps text-label-caps text-on-surface-variant">Or continue with</span>
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

            <div className="mt-8 pt-6 border-t border-outline-variant/30 flex justify-between items-center">
              <span className="text-body-sm text-on-surface-variant">Already have an account?</span>
              <Link className="font-label-caps text-label-caps text-primary hover:underline" to="/signin">Log In</Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
