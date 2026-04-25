export default function PrivacyPage() {
  return (
    <div className="pt-32 pb-24 px-6 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-4xl font-black mb-10">Privacy Policy</h1>
      <div className="prose prose-invert max-w-none text-gray-300 space-y-6">
        <p>Last updated: April 2026</p>
        
        <h2 className="text-2xl font-bold text-white mt-10 mb-4">1. Information Collection</h2>
        <p>We collect only the data necessary to provide our services. This includes authentication data, connected channel metadata, and message content required for generating AI responses.</p>
        
        <h2 className="text-2xl font-bold text-white mt-10 mb-4">2. Data Security</h2>
        <p>Your data is securely stored and never sold to third parties. We use industry-standard encryption for data at rest and in transit.</p>
        
        <h2 className="text-2xl font-bold text-white mt-10 mb-4">3. Data Deletion</h2>
        <p>You can request data deletion at any time by contacting our support team or deleting your account from the dashboard settings.</p>
      </div>
    </div>
  )
}
