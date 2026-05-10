import { MCP_SERVER_REGISTRY } from "./constants";

export function getEnabledServers(
  keys: string[]
): { type: "url"; url: string; name: string }[] {
  return keys
    .filter((key) => key in MCP_SERVER_REGISTRY)
    .flatMap((key) => {
      const { envVar, displayName } = MCP_SERVER_REGISTRY[key];
      const url = process.env[envVar];
      if (!url) return [];
      return [{ type: "url" as const, url, name: displayName }];
    });
}

export async function checkServerHealth(url: string): Promise<boolean> {
  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 3000);
    const res = await fetch(`${url}/health`, {
      method: "GET",
      signal: controller.signal,
    });
    clearTimeout(id);
    return res.ok;
  } catch {
    return false;
  }
}
