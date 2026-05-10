import OpenAI from 'openai'

// Fallback prevents constructor from throwing at build time when env var is absent.
// Actual API calls will fail gracefully — callers must handle errors.
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY ?? 'not-configured',
})
