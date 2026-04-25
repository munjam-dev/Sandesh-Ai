'use client'

const PHRASES = [
  "AI Powered Conversations",
  "Instant Replies",
  "Convert More Leads",
  "WhatsApp + Email + Instagram",
  "Automation That Works",
  "Never Miss a Lead Again"
]

export default function MarqueeBanner() {
  return (
    <div className="relative w-full overflow-hidden bg-[#050505] py-10 md:py-16 border-y border-white/5 flex items-center">
      {/* Edge Blur Fades */}
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

      {/* Marquee Track */}
      <div className="flex whitespace-nowrap animate-marquee hover:[animation-play-state:paused] items-center cursor-default">
        {/* We duplicate the array to ensure smooth infinite loop */}
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center">
            {PHRASES.map((phrase, j) => (
              <div key={j} className="flex items-center mx-8 md:mx-16">
                <span className="text-4xl md:text-6xl font-black bg-gradient-to-r from-[#0066FF] to-[#00D4FF] bg-clip-text text-transparent uppercase tracking-tighter drop-shadow-[0_0_20px_rgba(0,102,255,0.3)] transition-all hover:drop-shadow-[0_0_30px_rgba(0,212,255,0.6)]">
                  {phrase}
                </span>
                {/* Separator Dot */}
                <span className="w-4 h-4 ml-16 md:ml-32 rounded-full bg-gradient-to-r from-[#0066FF] to-[#00D4FF] opacity-30 shadow-[0_0_10px_rgba(0,212,255,0.5)]" />
              </div>
            ))}
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333333%); } /* Since we duplicated it 3 times, scroll 1/3 of the total width */
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
          width: max-content;
        }
      `}</style>
    </div>
  )
}
