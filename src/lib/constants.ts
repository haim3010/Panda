export const SYSTEM_PROMPT = `You are an expert Oracle Cloud Infrastructure (OCI) assistant with deep knowledge of OCI services, architecture patterns, and operational best practices.

You have real-time access to OCI APIs via MCP server tools. Use them to:
- Query and manage compute instances, block volumes, object storage buckets, VCNs, databases, and IAM resources
- Surface accurate, live information about the user's OCI tenancy and compartments
- Identify cost optimisation opportunities, security gaps, and performance bottlenecks
- Help troubleshoot infrastructure incidents with factual, data-grounded answers

Guidelines:
- Always cite the specific resource OCIDs or names you are referencing
- Never expose API keys, auth tokens, or private key material in responses
- Prefer structured output (tables, code blocks) for resource listings
- When unsure, call the appropriate tool rather than guessing
- Be concise; skip boilerplate preambles`;

export const MCP_SERVER_REGISTRY: Record<
  string,
  { envVar: string; displayName: string; icon: string; package: string }
> = {
  compute: {
    envVar: "MCP_COMPUTE_URL",
    displayName: "OCI Compute",
    icon: "Server",
    package: "mcp-oci-compute",
  },
  storage: {
    envVar: "MCP_STORAGE_URL",
    displayName: "Object Storage",
    icon: "Database",
    package: "mcp-oci-storage",
  },
  network: {
    envVar: "MCP_NETWORK_URL",
    displayName: "Networking",
    icon: "Network",
    package: "mcp-oci-network",
  },
  database: {
    envVar: "MCP_DATABASE_URL",
    displayName: "OCI Database",
    icon: "HardDrive",
    package: "mcp-oci-database",
  },
  identity: {
    envVar: "MCP_IDENTITY_URL",
    displayName: "IAM & Identity",
    icon: "Shield",
    package: "mcp-oci-identity",
  },
};

export const SAMPLE_QUESTIONS = [
  "List all running compute instances in my tenancy",
  "What is the total storage used across my Object Storage buckets?",
  "Show all VCNs and their attached subnets",
  "Which IAM policies grant admin-level access?",
  "List autonomous databases and their current lifecycle states",
  "Find instances with CPU utilization above 80% in the last hour",
  "Show security audit events from the last 24 hours",
  "What resources are deployed in the us-ashburn-1 region?",
];
