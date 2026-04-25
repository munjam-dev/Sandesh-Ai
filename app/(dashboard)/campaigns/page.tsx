'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mail, Sparkles, Send, Clock, Users, Loader2 } from 'lucide-react'

interface Campaign {
  id: string
  name: string
  subject: string
  status: string
  audience: string
  created_at: string
  campaign_logs: { count: number }[]
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)
  
  // New Campaign Form State
  const [isCreating, setIsCreating] = useState(false)
  const [name, setName] = useState('')
  const [audience, setAudience] = useState('ALL')
  const [offer, setOffer] = useState('')
  
  const [subject, setSubject] = useState('')
  const [content, setContent] = useState('')
  const [generating, setGenerating] = useState(false)
  const [sending, setSending] = useState(false)

  const fetchCampaigns = async () => {
    const res = await fetch('/api/campaigns')
    if (res.ok) {
      const data = await res.json()
      setCampaigns(data.campaigns || [])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchCampaigns()
  }, [])

  const handleGenerate = async () => {
    if (!offer) return alert('Please enter an offer or context.')
    setGenerating(true)
    try {
      const res = await fetch('/api/ai/generate-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ offer, audience }),
      })
      const data = await res.json()
      if (res.ok) {
        setSubject(data.subject)
        setContent(data.content)
      } else {
        alert(data.error)
      }
    } catch (err) {
      alert('Failed to generate email')
    }
    setGenerating(false)
  }

  const handleSend = async (schedule: boolean = false) => {
    if (!name || !subject || !content) return alert('Please complete the campaign setup.')
    setSending(true)

    try {
      // 1. Create campaign in DB
      const createRes = await fetch('/api/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, subject, content, audience, status: schedule ? 'scheduled' : 'draft',
          scheduled_at: schedule ? new Date(Date.now() + 24*60*60*1000).toISOString() : null // Schedule for tomorrow demo
        })
      })
      const createData = await createRes.json()

      if (!createData.success) throw new Error(createData.error)

      // 2. Send immediately if not scheduled
      if (!schedule) {
        const sendRes = await fetch('/api/campaigns/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ campaign_id: createData.campaign_id })
        })
        const sendData = await sendRes.json()
        if (!sendData.success) throw new Error(sendData.error)
        alert(`Campaign sent successfully to ${sendData.sent} recipients!`)
      } else {
        alert('Campaign scheduled successfully!')
      }

      setIsCreating(false)
      fetchCampaigns()
      // Reset form
      setName(''); setOffer(''); setSubject(''); setContent('');
    } catch (err: any) {
      alert(err.message || 'Failed to dispatch campaign.')
    }
    setSending(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Loader2 className="animate-spin text-[#0066FF]" size={32} />
      </div>
    )
  }

  return (
    <div className="p-6 max-w-6xl mx-auto w-full fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Email Campaigns</h1>
          <p className="text-gray-400">Create, automate, and track AI-powered email campaigns.</p>
        </div>
        <button 
          onClick={() => setIsCreating(!isCreating)}
          className="bg-[#0066FF] hover:bg-[#0052cc] text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(0,102,255,0.3)] transition-all"
        >
          <Mail size={18} />
          {isCreating ? 'Cancel Campaign' : 'New Campaign'}
        </button>
      </div>

      {isCreating ? (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid lg:grid-cols-2 gap-6 mb-10">
          
          {/* Setup Column */}
          <div className="bg-[#111827] border border-white/10 rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><Sparkles className="text-[#00D4FF]"/> Campaign Setup</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Campaign Name</label>
                <input 
                  type="text" 
                  value={name} onChange={(e) => setName(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#0066FF] outline-none transition-colors"
                  placeholder="e.g. Summer Discount for HOT leads"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Target Audience</label>
                <div className="flex gap-2">
                  {['HOT', 'WARM', 'ALL'].map(aud => (
                    <button 
                      key={aud} onClick={() => setAudience(aud)}
                      className={`flex-1 py-3 rounded-xl border font-bold text-sm transition-all ${audience === aud ? 'bg-[#0066FF]/20 border-[#0066FF] text-[#00D4FF]' : 'bg-black/50 border-white/10 text-gray-400 hover:border-white/30'}`}
                    >
                      {aud} Leads
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Offer / Context</label>
                <textarea 
                  value={offer} onChange={(e) => setOffer(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#0066FF] outline-none transition-colors min-h-[100px]"
                  placeholder="Briefly describe what this email is about. AI will write the rest."
                />
              </div>

              <button 
                onClick={handleGenerate} disabled={generating}
                className="w-full bg-white/5 border border-white/10 hover:bg-white/10 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all mt-4"
              >
                {generating ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
                {generating ? 'Generating AI Email...' : 'Generate with AI'}
              </button>
            </div>
          </div>

          {/* Preview & Edit Column */}
          <div className="bg-[#111827] border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col">
            <h2 className="text-xl font-bold mb-6">Preview & Edit</h2>
            
            <div className="space-y-4 flex-1">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Subject Line</label>
                <input 
                  type="text" 
                  value={subject} onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none"
                  placeholder="Subject line will appear here"
                />
              </div>

              <div className="flex-1 flex flex-col h-full">
                <label className="block text-sm font-medium text-gray-400 mb-2">Email HTML Content</label>
                <textarea 
                  value={content} onChange={(e) => setContent(e.target.value)}
                  className="w-full flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none font-mono text-sm min-h-[200px]"
                  placeholder="Email body will appear here"
                />
              </div>
            </div>

            <div className="flex gap-4 mt-6 pt-6 border-t border-white/10">
              <button 
                onClick={() => handleSend(true)} disabled={sending}
                className="flex-1 bg-white/5 border border-white/10 hover:bg-white/10 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
              >
                <Clock size={18} /> Schedule
              </button>
              <button 
                onClick={() => handleSend(false)} disabled={sending}
                className="flex-1 bg-gradient-to-r from-[#0066FF] to-[#00D4FF] hover:scale-[1.02] text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg"
              >
                {sending ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
                Send Now
              </button>
            </div>
          </div>

        </motion.div>
      ) : null}

      {/* Campaign List */}
      <div className="bg-[#111827] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
          <h3 className="font-bold text-lg">Past Campaigns</h3>
          <span className="text-sm text-gray-400 bg-white/5 px-3 py-1 rounded-full">{campaigns.length} total</span>
        </div>
        
        {campaigns.length === 0 ? (
          <div className="p-12 text-center text-gray-500 flex flex-col items-center">
            <Mail size={48} className="mb-4 opacity-20" />
            <p>No campaigns yet. Create one to get started!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-gray-400 text-sm border-b border-white/10 bg-black/20">
                  <th className="p-4 font-medium">Name</th>
                  <th className="p-4 font-medium">Audience</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Sent Emails</th>
                  <th className="p-4 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((c) => (
                  <tr key={c.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-medium text-white">{c.name}</td>
                    <td className="p-4">
                      <span className="bg-white/10 text-white text-xs px-2 py-1 rounded border border-white/10">
                        <Users size={12} className="inline mr-1"/>{c.audience}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`text-xs px-2 py-1 rounded font-bold uppercase tracking-wide
                        ${c.status === 'sent' ? 'bg-green-500/20 text-green-400' : 
                          c.status === 'scheduled' ? 'bg-orange-500/20 text-orange-400' : 
                          'bg-gray-500/20 text-gray-400'}`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-400 font-mono text-sm">
                      {c.campaign_logs?.[0]?.count || 0}
                    </td>
                    <td className="p-4 text-gray-500 text-sm">
                      {new Date(c.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
