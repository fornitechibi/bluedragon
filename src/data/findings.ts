export const seriesOrder = ['microsoft', 'cloudflare', 'obyte', 'gvisor', 'tink', 'polygon', 'audit'] as const;

export type SeriesId = (typeof seriesOrder)[number];
export type Severity = 'Critical' | 'High' | 'Medium' | 'Low';

export const severityRank: Record<Severity, number> = {
  Critical: 0,
  High: 1,
  Medium: 2,
  Low: 3,
};

export const seriesMeta: Record<
  SeriesId,
  {
    id: SeriesId;
    label: string;
    product: string;
    logo?: string;
    blurb: string;
  }
> = {
  microsoft: {
    id: 'microsoft',
    label: 'Microsoft',
    product: 'MsQuic',
    logo: '/logos/microsoft.svg',
    blurb:
      'Protocol, FFI, and memory-safety work against Microsoft MsQuic — the open-source QUIC stack used across Windows and Azure surfaces.',
  },
  cloudflare: {
    id: 'cloudflare',
    label: 'Cloudflare',
    product: 'cloudflared',
    logo: '/logos/cloudflare.svg',
    blurb:
      'Client and tunnel work against cloudflared — Access token handling, origin SNI, and connection reuse.',
  },
  obyte: {
    id: 'obyte',
    label: 'Obyte',
    product: 'Obyte / ocore',
    logo: '/logos/obyte.svg',
    blurb:
      'Consensus and state-integrity work against the Obyte full node — catchup, hash-tree validation, and Main Chain finality.',
  },
  gvisor: {
    id: 'gvisor',
    label: 'Google',
    product: 'gVisor',
    logo: '/logos/google.svg',
    blurb:
      'Sandbox boundary work against gVisor — Sentry device proxies, GPU nvproxy, and guest-to-host isolation.',
  },
  tink: {
    id: 'tink',
    label: 'Google',
    product: 'Tink C++',
    logo: '/logos/google.svg',
    blurb:
      'Cryptographic library work against Tink C++ — keyset import, material-type validation, and AEAD dispatch.',
  },
  polygon: {
    id: 'polygon',
    label: 'Polygon',
    product: 'Bor',
    logo: '/logos/polygon.svg',
    blurb:
      'JSON-RPC and execution-client work against Polygon Bor — unauthenticated RPC amplification and node availability.',
  },
  audit: {
    id: 'audit',
    label: 'Audits',
    product: 'Contests and reviews',
    blurb:
      'Selected contest and private-review writeups. Contest records stay on Sherlock and Immunefi; long-form reports land here as they are cleared to publish.',
  },
};

export function severityClass(severity: Severity) {
  if (severity === 'Critical') return 'stamp-crit';
  if (severity === 'High') return 'stamp-high';
  if (severity === 'Medium') return 'stamp-med';
  return 'stamp-low';
}

export function findingHref(series: string, id: string) {
  const slug = id.includes('/') ? id.split('/').slice(1).join('/') : id;
  return `/findings/${series}/${slug}`;
}
