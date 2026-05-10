import { openai } from './openai'

type UserForMatching = {
  id: string
  embedding: number[]
  hobbies: string[]
  interests: string[]
  department: string | null
  jobTitle: string | null
}

export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length === 0 || b.length === 0) return 0
  const dot = a.reduce((sum, ai, i) => sum + ai * b[i], 0)
  const magA = Math.sqrt(a.reduce((sum, ai) => sum + ai * ai, 0))
  const magB = Math.sqrt(b.reduce((sum, bi) => sum + bi * bi, 0))
  if (magA === 0 || magB === 0) return 0
  return dot / (magA * magB)
}

export function matchScore(userA: UserForMatching, userB: UserForMatching): number {
  const embeddingScore = cosineSimilarity(userA.embedding, userB.embedding)
  const sharedHobbies = userA.hobbies.filter((h) => userB.hobbies.includes(h)).length
  const hobbyScore = Math.min(sharedHobbies / 3, 1)
  const crossTeam = userA.department !== userB.department ? 1 : 0
  return embeddingScore * 0.5 + hobbyScore * 0.3 + crossTeam * 0.2
}

export async function generateEmbedding(user: {
  hobbies: string[]
  interests: string[]
  jobTitle: string | null
  department: string | null
}): Promise<number[]> {
  const text = `${user.hobbies.join(', ')}. ${user.interests.join(', ')}. ${user.jobTitle ?? ''} at ${user.department ?? ''}`
  const res = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text,
  })
  return res.data[0].embedding
}
