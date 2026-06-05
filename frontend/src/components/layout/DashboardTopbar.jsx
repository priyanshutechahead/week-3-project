export default function DashboardTopbar() {
  return (
    <header className="w-full h-16 bg-surface border-b border-outline-variant sticky top-0 z-40">
      <div className="flex justify-between items-center w-full px-[24px] max-w-[1280px] mx-auto h-full">
        <div className="flex items-center space-x-4 flex-1">
          <div className="relative w-full max-w-md">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
            <input
              className="w-full pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded-full text-body-sm focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Search destinations, insights, or plans..."
              type="text"
            />
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <span className="material-symbols-outlined text-on-surface-variant cursor-pointer">notifications</span>
          <span className="material-symbols-outlined text-on-surface-variant cursor-pointer">settings</span>
          <div className="flex items-center space-x-3 pl-6 border-l border-outline-variant">
            <div className="text-right">
              <p className="text-label-caps font-label-caps text-on-surface">John Doe</p>
              <p className="text-[10px] text-secondary">Tech Explorer</p>
            </div>
            <img
              alt="User profile avatar"
              className="w-8 h-8 rounded-full border border-outline-variant"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDy2Irl7e6wHid8ooNGqDqLo8Dr9nrd-wiwGd8L9OyvpW-bjaU60KR6_jq3FI6pBpb2-NAY3JOeaEZWgiQ3LNkr9KuEDuNeSEHeJgUvMUDMc3pbdsxqFVqnKc3F7w0gOowe2x39CaY4j6p5o3JVCOnasoZMzlHL3fLPc_U8slq72Qc-AcUDlw_okLaHw8JP9GqNgzxjRCztHqOAZqpuy1-u1Wf8r7-xMhhV2dtZ0SoU43MMj4hU19R8QOcqqD1ceK4Ide91jgbS8dw"
            />
          </div>
        </div>
      </div>
    </header>
  )
}
