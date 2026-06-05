import { useState } from 'react'

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button
        className="w-14 h-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="material-symbols-outlined">smart_toy</span>
      </button>

      <div
        className={`absolute bottom-20 right-0 w-80 bg-surface border border-outline-variant rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${
          isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 pointer-events-none translate-y-4'
        }`}
      >
        <div className="bg-primary p-4 flex justify-between items-center text-white">
          <div className="flex items-center space-x-2">
            <span className="material-symbols-outlined">robot_2</span>
            <p className="font-bold">Discoverly Assistant</p>
          </div>
          <span
            className="material-symbols-outlined cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            close
          </span>
        </div>
        <div className="p-4 h-64 overflow-y-auto bg-surface-container-low text-body-sm space-y-4">
          <div className="bg-white p-3 rounded-xl rounded-tl-none border border-outline-variant max-w-[80%]">
            Hello John! Ready to dive into the intelligence feed for Japan? I&apos;ve spotted some interesting tech trends in Kyoto today.
          </div>
        </div>
        <div className="p-4 bg-surface border-t border-outline-variant flex items-center space-x-2">
          <input
            className="flex-1 bg-surface-container-low border-none rounded-lg px-3 py-2 text-body-sm focus:ring-1 focus:ring-primary"
            placeholder="Ask anything..."
            type="text"
          />
          <span className="material-symbols-outlined text-primary cursor-pointer">send</span>
        </div>
      </div>
    </div>
  )
}
