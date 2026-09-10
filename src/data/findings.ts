export const seriesOrder = ['microsoft', 'obyte', 'gvisor', 'audit'] as const;

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
      'Sandbox and kernel-emulation research against gVisor. Public writeups for this series are being prepared.',
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
