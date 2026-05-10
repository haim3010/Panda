'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'
import { UserAvatar } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

type Message = { id: string; from: 'me' | 'them'; text: string; time: string }

const CONVERSATIONS = [
  {
    id: '1', name: 'Sarah Chen', jobTitle: 'Product Designer', lastMessage: 'Are you joining the tennis tournament?', time: '2m ago', unread: 2,
    messages: [
      { id: '1', from: 'them' as const, text: 'Hey! Saw you also like Yoga 🧘', time: '10:30' },
      { id: '2', from: 'me' as const, text: 'Yes! I go every Thursday morning', time: '10:32' },
      { id: '3', from: 'them' as const, text: 'Maybe we can join the office session together?', time: '10:33' },
      { id: '4', from: 'me' as const, text: "That sounds great! I'll RSVP now 🙌", time: '10:35' },
      { id: '5', from: 'them' as const, text: 'Are you joining the tennis tournament?', time: '11:01' },
    ],
  },
  {
    id: '2', name: 'James Wilson', jobTitle: 'Backend Engineer', lastMessage: 'Board games night this Friday 🎲', time: '1h ago', unread: 0,
    messages: [
      { id: '1', from: 'them' as const, text: "Hey, I heard you're into board games too!", time: '09:10' },
      { id: '2', from: 'me' as const, text: 'Yeah! Big fan of Catan and Codenames', time: '09:15' },
      { id: '3', from: 'them' as const, text: 'Board games night this Friday 🎲', time: '09:16' },
    ],
  },
  {
    id: '3', name: 'Yael Cohen', jobTitle: 'UX Researcher', lastMessage: 'Coffee chat tomorrow?', time: '3h ago', unread: 1,
    messages: [
      { id: '1', from: 'them' as const, text: 'Hi! We matched — both love hiking 🥾', time: '08:00' },
      { id: '2', from: 'them' as const, text: 'Coffee chat tomorrow?', time: '08:01' },
    ],
  },
]

export default function ChatPage() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Record<string, Message[]>>(
    Object.fromEntries(CONVERSATIONS.map((c) => [c.id, c.messages]))
  )

  const activeConvo = CONVERSATIONS.find((c) => c.id === activeId)

  function sendMessage() {
    if (!input.trim() || !activeId) return
    const newMsg: Message = { id: Date.now().toString(), from: 'me', text: input.trim(), time: 'now' }
    setMessages((prev) => ({ ...prev, [activeId]: [...(prev[activeId] ?? []), newMsg] }))
    setInput('')
  }

  return (
    <div className="flex h-[calc(100vh-64px)] bg-white overflow-hidden">
      {/* Sidebar */}
      <div className={cn('w-full md:w-72 border-r flex-shrink-0 flex flex-col', activeId && 'hidden md:flex')}>
        <div className="p-4 border-b">
          <h1 className="text-lg font-bold text-gray-900">Messages</h1>
        </div>
        <div className="overflow-y-auto flex-1">
          {CONVERSATIONS.map((convo) => (
            <button key={convo.id} onClick={() => setActiveId(convo.id)}
              className={cn('w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left border-b transition-colors', activeId === convo.id && 'bg-orange-50')}>
              <div className="relative">
                <UserAvatar src={null} name={convo.name} className="h-11 w-11" />
                {convo.unread > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-orange-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {convo.unread}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <p className="font-semibold text-sm text-gray-900 truncate">{convo.name}</p>
                  <p className="text-xs text-gray-400 ml-2 flex-shrink-0">{convo.time}</p>
                </div>
                <p className="text-xs text-gray-500 truncate">{convo.lastMessage}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat area */}
      {activeConvo ? (
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex items-center gap-3 px-4 py-3 border-b bg-white">
            <button onClick={() => setActiveId(null)} className="md:hidden text-gray-500 mr-1 text-lg">←</button>
            <UserAvatar src={null} name={activeConvo.name} className="h-9 w-9" />
            <div>
              <p className="font-semibold text-sm text-gray-900">{activeConvo.name}</p>
              <p className="text-xs text-gray-500">{activeConvo.jobTitle}</p>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50">
            {(messages[activeConvo.id] ?? []).map((msg) => (
              <div key={msg.id} className={cn('flex', msg.from === 'me' ? 'justify-end' : 'justify-start')}>
                <div className={cn('max-w-xs px-4 py-2.5 rounded-2xl text-sm',
                  msg.from === 'me' ? 'bg-orange-500 text-white rounded-br-sm' : 'bg-white border text-gray-800 rounded-bl-sm shadow-sm')}>
                  <p>{msg.text}</p>
                  <p className={cn('text-xs mt-1', msg.from === 'me' ? 'text-orange-200' : 'text-gray-400')}>{msg.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="px-4 py-3 border-t bg-white flex gap-2">
            <input value={input} onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-orange-300" />
            <button onClick={sendMessage} disabled={!input.trim()}
              className="p-2.5 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-200 text-white rounded-xl transition-colors">
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="hidden md:flex flex-1 items-center justify-center text-center bg-gray-50">
          <div>
            <div className="text-5xl mb-3">💬</div>
            <p className="font-semibold text-gray-700">Select a conversation</p>
            <p className="text-sm text-gray-500 mt-1">Choose from your matches on the left</p>
          </div>
        </div>
      )}
    </div>
  )
}
