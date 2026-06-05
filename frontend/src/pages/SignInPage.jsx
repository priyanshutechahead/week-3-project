import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/dashboard')
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
            <form className="space-y-[24px]" onSubmit={handleSubmit}>
              {/* Email Field */}
              <div className="space-y-2">
                <label className="font-label-caps text-label-caps text-secondary block" htmlFor="email">Email Address</label>
                <div className="relative group">
                  <input
                    className="w-full h-12 bg-surface-container-low border border-outline-variant rounded-lg px-4 font-body-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-standard"
                    id="email" name="email" placeholder="name@company.com" required type="email"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="font-label-caps text-label-caps text-secondary" htmlFor="password">Password</label>
                  <a className="font-label-caps text-label-caps text-primary hover:underline transition-standard" href="#">Forgot?</a>
                </div>
                <div className="relative">
                  <input
                    className="w-full h-12 bg-surface-container-low border border-outline-variant rounded-lg px-4 font-body-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-standard"
                    id="password" name="password" placeholder="••••••••" required
                    type={showPassword ? 'text' : 'password'}
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
                  className="w-full h-12 bg-primary text-on-primary font-body-lg font-semibold rounded-lg hover:opacity-90 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
                  type="submit"
                >
                  Sign In
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
                >
                  <span className="material-symbols-outlined text-[20px]">google</span>
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
