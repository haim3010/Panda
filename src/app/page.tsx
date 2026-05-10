"use client";

import { useState } from "react";
import { Settings2 } from "lucide-react";
import { ChatContainer } from "@/components/chat/chat-container";
import { ServerPanel } from "@/components/config/server-panel";

export default function HomePage() {
  const [panelOpen, setPanelOpen] = useState(false);
  const [enabledKeys, setEnabledKeys] = useState<string[]>([
    "compute",
    "storage",
    "identity",
  ]);
  const [authToken, setAuthToken] = useState("");
  const [tokenSubmitted, setTokenSubmitted] = useState(false);

  function toggleKey(key: string) {
    setEnabledKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  }

  if (!tokenSubmitted) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-gray-900 border border-gray-700 rounded-2xl p-8">
          <div className="w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center text-xl font-bold text-white mx-auto mb-6">
            O
          </div>
          <h1 className="text-white text-center text-lg font-semibold mb-2">
            OCI Infra Chat
          </h1>
          <p className="text-gray-400 text-center text-sm mb-6">
            Enter your access token to continue
          </p>
          <input
            type="password"
            value={authToken}
            onChange={(e) => setAuthToken(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && authToken) setTokenSubmitted(true);
            }}
            placeholder="Access token"
            className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 outline-none focus:border-red-500 transition-colors text-sm"
          />
          <button
            onClick={() => authToken && setTokenSubmitted(true)}
            disabled={!authToken}
            className="w-full mt-3 bg-red-600 hover:bg-red-500 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl py-2.5 text-sm font-medium transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      <header className="flex items-center justify-between px-4 py-3 border-b border-gray-800 bg-gray-900 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-sm font-bold text-white">
            O
          </div>
          <div>
            <h1 className="text-white font-semibold text-sm">OCI Infra Chat</h1>
            <p className="text-gray-400 text-xs">
              {enabledKeys.length} server{enabledKeys.length !== 1 ? "s" : ""} active
            </p>
          </div>
        </div>
        <button
          onClick={() => setPanelOpen(true)}
          className="flex items-center gap-2 text-sm text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-xl px-3 py-1.5 transition-colors"
        >
          <Settings2 size={14} />
          Servers
        </button>
      </header>

      <main className="flex-1 overflow-hidden" style={{ height: "calc(100vh - 57px)" }}>
        <ChatContainer mcpServerKeys={enabledKeys} authToken={authToken} />
      </main>

      <ServerPanel
        open={panelOpen}
        onClose={() => setPanelOpen(false)}
        enabledKeys={enabledKeys}
        onToggle={toggleKey}
      />
    </div>
  );
}
