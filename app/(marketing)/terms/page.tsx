export default function TermsPage() {
  return (
    <div className="pt-32 pb-24 px-6 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-4xl font-black mb-10">Terms of Service</h1>
      <div className="prose prose-invert max-w-none text-gray-300 space-y-6">
        <p>Last updated: April 2026</p>
        
        <p>By using Sandesh AI, you agree to these terms. Please read them carefully.</p>
        
        <h2 className="text-2xl font-bold text-white mt-10 mb-4">1. Acceptable Use</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Use the platform responsibly and ethically.</li>
          <li>Comply with all applicable laws and regulations regarding electronic communication.</li>
          <li>Avoid misuse, abuse, or spamming using our services.</li>
        </ul>
        
        <h2 className="text-2xl font-bold text-white mt-10 mb-4">2. Account Restrictions</h2>
        <p>We reserve the right to suspend or terminate accounts that violate our terms or the terms of connected third-party platforms (like Meta or Google).</p>
        
        <h2 className="text-2xl font-bold text-white mt-10 mb-4">3. Liability</h2>
        <p>Sandesh AI is not liable for business losses caused by AI-generated messages. You are responsible for configuring your AI persona and reviewing its outputs.</p>
      </div>
    </div>
  )
}
