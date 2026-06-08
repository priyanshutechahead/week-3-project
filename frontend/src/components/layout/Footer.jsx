import { Link } from 'react-router-dom'

export default function Footer({ variant = 'default' }) {
  if (variant === 'dashboard') {
    return (
      <footer className="border-t border-outline-variant pt-[24px] pb-[24px]">
        <div className="flex flex-col md:flex-row justify-between items-center max-w-[1280px] mx-auto px-[24px] w-full">
          <p className="text-body-sm text-secondary">© 2026 Discoverly. Distilled Intelligence.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a className="text-label-caps text-secondary hover:text-primary transition-colors" href="#">Privacy Policy</a>
            <a className="text-label-caps text-secondary hover:text-primary transition-colors" href="#">Terms of Service</a>
            <a className="text-label-caps text-secondary hover:text-primary transition-colors" href="#">Contact</a>
          </div>
        </div>
      </footer>
    )
  }

  if (variant === 'minimal') {
    return (
      <footer className="w-full py-8 border-t border-outline-variant bg-surface-container-lowest">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-center px-6 gap-4">
          <div className="flex items-center gap-4">
            <span className="text-label-caps font-label-caps text-on-surface-variant">© 2026 Discoverly. All rights reserved.</span>
          </div>
          <div className="flex gap-6 text-body-sm">
            <a className="text-on-surface-variant hover:text-primary transition-colors" href="#">Privacy Policy</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors" href="#">Terms of Service</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1" href="#">
              API Status
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            </a>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className="w-full py-[64px] mt-[64px] bg-surface-container-lowest border-t border-outline-variant">
      <div className="max-w-[1280px] mx-auto px-[24px] flex flex-col md:flex-row justify-between items-center gap-[24px]">
        <div className="flex flex-col items-center md:items-start">
          <div className="font-headline-md text-headline-md text-on-surface font-bold">Discoverly</div>
          <p className="font-body-sm text-body-sm text-secondary mt-2">© 2026 Discoverly. Distilled Intelligence.</p>
        </div>
      </div>
    </footer>
  )
}
