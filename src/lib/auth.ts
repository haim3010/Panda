export function validateToken(token: string): boolean {
  const expected = process.env.AUTH_TOKEN;
  if (!expected) return false;
  return token === expected;
}
