// AI agentic engineering: what I build and research.
export const agentTracks = [
  {
    id: 'memory',
    title: 'Persistent memory',
    body: 'Memory that outlives a context window. What the agent learned, decided, and still owes is stored so the next session starts where the last one stopped, not from zero.',
  },
  {
    id: 'systems',
    title: 'Agent systems',
    body: 'Harnesses, schedulers, and context pipelines that keep long runs on task: checkpointing, recovery after failures, and knowing when to compact instead of drifting.',
  },
  {
    id: 'tooling',
    title: 'Tooling beyond MCP',
    body: 'Typed, tested tool interfaces that fail loudly and predictably. Less protocol overhead and fewer silent errors than a typical MCP server, so the agent spends its budget on the work.',
  },
  {
    id: 'autonomy',
    title: 'Autonomy past 24 hours',
    body: 'Agents that keep working efficiently for more than a day without supervision, with bounded cost, steady output quality, and a full record of what they did and why.',
  },
] as const;
