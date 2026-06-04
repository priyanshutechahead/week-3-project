import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      navigate('/onboarding/countries')
    }, 1000)
  }

  return (
    <div className="min-h-screen flex flex-col font-body-lg text-body-lg">
      <div className="fixed inset-0 pointer-events-none opacity-40 z-0"></div>

      {/* Top Bar */}
      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md border-b border-outline-variant/30 px-[24px] py-4">
        <div className="max-w-[1280px] mx-auto flex justify-between items-center">
          <span className="font-display-lg text-headline-md font-bold text-primary">Discoverly</span>
          <div className="hidden md:flex gap-[24px] items-center">
            <span className="font-label-caps text-label-caps text-on-surface-variant">Step 1 of 3</span>
            <div className="w-32 h-1 bg-surface-container rounded-full overflow-hidden">
              <div className="w-1/3 h-full bg-primary"></div>
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

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="font-label-caps text-label-caps text-on-surface-variant" htmlFor="name">FULL NAME</label>
                <input className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg font-body-lg text-body-lg input-focus-ring transition-all placeholder:text-outline/50" id="name" name="name" placeholder="Priyanshu" required type="text" />
              </div>

              <div className="space-y-2">
                <label className="font-label-caps text-label-caps text-on-surface-variant" htmlFor="email">EMAIL ADDRESS</label>
                <input className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg font-body-lg text-body-lg input-focus-ring transition-all placeholder:text-outline/50" id="email" name="email" placeholder="priyanshu@company.com" required type="email" />
              </div>

              <div className="space-y-2">
                <label className="font-label-caps text-label-caps text-on-surface-variant" htmlFor="phone">PHONE NUMBER</label>
                <input className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg font-body-lg text-body-lg input-focus-ring transition-all placeholder:text-outline/50" id="phone" name="phone" placeholder="+91 1234567890" type="tel" />
              </div>

              <div className="space-y-2">
                <label className="font-label-caps text-label-caps text-on-surface-variant" htmlFor="password">PASSWORD</label>
                <div className="relative">
                  <input className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg font-body-lg text-body-lg input-focus-ring transition-all placeholder:text-outline/50" id="password" name="password" placeholder="••••••••" required type={showPassword ? 'text' : 'password'} />
                  <button className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors" type="button" onClick={() => setShowPassword(!showPassword)}>
                    <span className="material-symbols-outlined text-[20px]">{showPassword ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
                <p className="text-[11px] text-outline/70 mt-1">Must be at least 8 characters long.</p>
              </div>

              <button
                className="w-full mt-[24px] py-4 bg-primary text-white font-medium rounded-lg flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all shadow-sm"
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
