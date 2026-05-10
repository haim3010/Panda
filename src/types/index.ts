export interface ToolUse {
  id: string;
  name: string;
  input: Record<string, unknown>;
  result?: string;
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  toolUses?: ToolUse[];
  timestamp: Date;
}

export interface McpServer {
  key: string;
  envVar: string;
  displayName: string;
  icon: string;
  enabled: boolean;
  url?: string;
}

export interface ChatRequest {
  messages: { role: "user" | "assistant"; content: string }[];
  mcpServerKeys: string[];
  authToken: string;
}

export interface ChatResponse {
  message: string;
  toolUses?: ToolUse[];
  error?: string;
}

export interface ServerHealth {
  key: string;
  healthy: boolean;
  checking: boolean;
}
