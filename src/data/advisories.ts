// Vendor advisories that credit Bluedragon as a finder.
// Source of truth: MSRC Security Update Guide API
//   https://api.msrc.microsoft.com/sug/v2.0/en-US/vulnerability?$filter=cveNumber eq '<CVE>'
// Copy fields verbatim from the vendor record. Do not restate impact beyond what the vendor published.

export interface AffectedProduct {
  product: string;
  platform: string | null;
  family: 'Windows' | 'Developer Tools' | 'Other';
  fixedBuild: string | null;
  article: string | null;
  articleUrl: string | null;
}

export interface AdvisoryFaq {
  q: string;
  a: string;
}

export interface Revision {
  version: string;
  date: string;
  note: string;
}

export interface Advisory {
  id: string;
  slug: string;
  vendor: 'Microsoft';
  cna: string;
  product: string;
  title: string;
  description: string;
  impact: string;
  severity: 'Critical' | 'Important' | 'Moderate' | 'Low';
  cwe: { id: string; name: string; url: string };
  cvss: { base: number; temporal: number; vector: string };
  exploitability: {
    publiclyDisclosed: boolean;
    exploited: boolean;
    assessment: string;
  };
  released: string;
  release: string;
  lastRevised: string;
  finders: number;
  creditedAs: string;
  faq: AdvisoryFaq[];
  revisions: Revision[];
  affected: AffectedProduct[];
  links: { vendor: string; cve: string; cweRef: string };
  // Path to a public writeup on this site, e.g. '/findings/microsoft/<slug>'.
  relatedWriteup?: string;
}

const windowsRows: AffectedProduct[] = [
  { product: 'Windows 11 Version 23H2 for ARM64-based Systems', platform: null, family: 'Windows', fixedBuild: '10.0.22631.7652', article: 'KB5126653', articleUrl: 'https://support.microsoft.com/help/5126653' },
  { product: 'Windows 11 Version 23H2 for x64-based Systems', platform: null, family: 'Windows', fixedBuild: '10.0.22631.7652', article: 'KB5126653', articleUrl: 'https://support.microsoft.com/help/5126653' },
  { product: 'Windows 11 Version 24H2 for ARM64-based Systems', platform: null, family: 'Windows', fixedBuild: '10.0.26100.9711', article: 'KB5127648', articleUrl: 'https://support.microsoft.com/help/5127648' },
  { product: 'Windows 11 Version 24H2 for x64-based Systems', platform: null, family: 'Windows', fixedBuild: '10.0.26100.9711', article: 'KB5127648', articleUrl: 'https://support.microsoft.com/help/5127648' },
  { product: 'Windows 11 Version 25H2 for ARM64-based Systems', platform: null, family: 'Windows', fixedBuild: '10.0.26200.9711', article: 'KB5127648', articleUrl: 'https://support.microsoft.com/help/5127648' },
  { product: 'Windows 11 Version 25H2 for x64-based Systems', platform: null, family: 'Windows', fixedBuild: '10.0.26200.9711', article: 'KB5127648', articleUrl: 'https://support.microsoft.com/help/5127648' },
  { product: 'Windows 11 Version 26H1 for ARM64-based Systems', platform: null, family: 'Windows', fixedBuild: '10.0.28000.3231', article: 'KB5127646', articleUrl: 'https://support.microsoft.com/help/5127646' },
  { product: 'Windows 11 Version 26H1 for x64-based Systems', platform: null, family: 'Windows', fixedBuild: '10.0.28000.3231', article: 'KB5127646', articleUrl: 'https://support.microsoft.com/help/5127646' },
  { product: 'Windows 11 Version 26H2 for ARM64-based Systems', platform: null, family: 'Windows', fixedBuild: '10.0.26300.9711', article: 'KB5127648', articleUrl: 'https://support.microsoft.com/help/5127648' },
  { product: 'Windows 11 Version 26H2 for x64-based Systems', platform: null, family: 'Windows', fixedBuild: '10.0.26300.9711', article: 'KB5127648', articleUrl: 'https://support.microsoft.com/help/5127648' },
  { product: 'Windows Server 2022', platform: null, family: 'Windows', fixedBuild: '10.0.20348.5761', article: 'KB5126655', articleUrl: 'https://support.microsoft.com/help/5126655' },
  { product: 'Windows Server 2022 (Server Core installation)', platform: null, family: 'Windows', fixedBuild: '10.0.20348.5761', article: 'KB5126655', articleUrl: 'https://support.microsoft.com/help/5126655' },
  { product: 'Windows Server 2025', platform: null, family: 'Windows', fixedBuild: '10.0.26100.33650', article: 'KB5126646', articleUrl: 'https://support.microsoft.com/help/5126646' },
  { product: 'Windows Server 2025 (Server Core installation)', platform: null, family: 'Windows', fixedBuild: '10.0.26100.33650', article: 'KB5126646', articleUrl: 'https://support.microsoft.com/help/5126646' },
];

const dotnetNotes = 'https://github.com/dotnet/announcements/issues/470';

const msquicPackageRows: AffectedProduct[] = ['8.0', '9.0', '10.0', '11.0'].map((v) => ({
  product: 'Microsoft.Native.Quic.MsQuic.Schannel',
  platform: `.NET ${v} runtime installed on Windows`,
  family: 'Other',
  fixedBuild: '2.6.2',
  article: 'Release notes',
  articleUrl: dotnetNotes,
}));

const visualStudioRows: AffectedProduct[] = [
  { product: 'Microsoft Visual Studio 2022 version 17.14', platform: null, family: 'Developer Tools', fixedBuild: '17.14.42', article: 'Release notes', articleUrl: 'https://learn.microsoft.com/en-us/visualstudio/releases/2022/release-notes' },
  { product: 'Microsoft Visual Studio 2026 version 18.10', platform: null, family: 'Developer Tools', fixedBuild: '18.10.4', article: 'Release notes', articleUrl: 'https://learn.microsoft.com/en-us/visualstudio/releases/2026/release-notes' },
];

const acHighFaq: AdvisoryFaq = {
  q: 'According to the CVSS metric, the attack complexity is high (AC:H). What does that mean for this vulnerability?',
  a: 'Successful exploitation of this vulnerability requires an attacker to have a deep understanding of the system. Successful exploitation is not guaranteed and depends on a combination of factors that might include the environment, system configuration, and the presence of additional security measures.',
};

export const advisories: Advisory[] = [
  {
    id: 'CVE-2026-103577',
    slug: 'cve-2026-103577',
    vendor: 'Microsoft',
    cna: 'Microsoft',
    product: 'Microsoft QUIC',
    title: 'Microsoft QUIC Security Feature Bypass Vulnerability',
    description:
      'Insecure default variable initialization in Microsoft QUIC allows an unauthorized attacker to bypass a security feature over a network.',
    impact: 'Security Feature Bypass',
    severity: 'Important',
    cwe: {
      id: 'CWE-453',
      name: 'Insecure Default Variable Initialization',
      url: 'https://cwe.mitre.org/data/definitions/453.html',
    },
    cvss: {
      base: 7.5,
      temporal: 6.5,
      vector: 'CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:C/C:N/I:L/A:H/E:U/RL:O/RC:C',
    },
    exploitability: { publiclyDisclosed: false, exploited: false, assessment: 'Exploitation Less Likely' },
    released: '2026-10-13',
    release: 'October 2026 security updates',
    lastRevised: '2026-10-13',
    finders: 9,
    creditedAs: 'Shibi Kishore N',
    faq: [
      {
        q: 'According to the CVSS metric, the attack vector is network (AV:N), privilege required is none (PR:N), and user interaction is none (UI:N). What is the target used in the context of the security feature bypass?',
        a: 'An attacker without existing privileges can remotely bypass authentication and obtain a successful login without additional user interaction.',
      },
      acHighFaq,
    ],
    revisions: [{ version: '1.0', date: '2026-10-13', note: 'Information published.' }],
    affected: windowsRows,
    links: {
      vendor: 'https://msrc.microsoft.com/update-guide/vulnerability/CVE-2026-103577',
      cve: 'https://www.cve.org/CVERecord?id=CVE-2026-103577',
      cweRef: 'https://cwe.mitre.org/data/definitions/453.html',
    },
  },
  {
    id: 'CVE-2026-85790',
    slug: 'cve-2026-85790',
    vendor: 'Microsoft',
    cna: 'Microsoft',
    product: 'Microsoft QUIC',
    title: 'Microsoft QUIC Information Disclosure Vulnerability',
    description:
      'Use after free in Microsoft QUIC allows an unauthorized attacker to disclose information over a network.',
    impact: 'Information Disclosure',
    severity: 'Important',
    cwe: {
      id: 'CWE-416',
      name: 'Use After Free',
      url: 'https://cwe.mitre.org/data/definitions/416.html',
    },
    cvss: {
      base: 5.9,
      temporal: 5.2,
      vector: 'CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:N/A:N/E:U/RL:O/RC:C',
    },
    exploitability: { publiclyDisclosed: false, exploited: false, assessment: 'Exploitation Less Likely' },
    released: '2026-10-13',
    release: 'October 2026 security updates',
    lastRevised: '2026-10-16',
    finders: 5,
    creditedAs: 'Shibi Kishore',
    faq: [
      acHighFaq,
      {
        q: 'What type of information could be disclosed by this vulnerability?',
        a: 'An attacker who successfully exploited this vulnerability could view heap memory from a privileged process running on the server.',
      },
    ],
    revisions: [
      { version: '1.0', date: '2026-10-13', note: 'Information published.' },
      {
        version: '1.1',
        date: '2026-10-15',
        note: 'Updated the Security Updates table to add KB article links for .NET 11.0. This is an informational change only; the fixed builds are unchanged.',
      },
      {
        version: '1.2',
        date: '2026-10-16',
        note: 'Updated the Security Updates table to add download and KB article links for Microsoft Visual Studio. This is an informational change only; the fixed builds are unchanged.',
      },
    ],
    affected: [...windowsRows, ...msquicPackageRows, ...visualStudioRows],
    links: {
      vendor: 'https://msrc.microsoft.com/update-guide/vulnerability/CVE-2026-85790',
      cve: 'https://www.cve.org/CVERecord?id=CVE-2026-85790',
      cweRef: 'https://cwe.mitre.org/data/definitions/416.html',
    },
  },
];

// ---- CVSS v3.1 vector decoding -------------------------------------------------

const metricNames: Record<string, { name: string; values: Record<string, string> }> = {
  AV: { name: 'Attack vector', values: { N: 'Network', A: 'Adjacent', L: 'Local', P: 'Physical' } },
  AC: { name: 'Attack complexity', values: { L: 'Low', H: 'High' } },
  PR: { name: 'Privileges required', values: { N: 'None', L: 'Low', H: 'High' } },
  UI: { name: 'User interaction', values: { N: 'None', R: 'Required' } },
  S: { name: 'Scope', values: { U: 'Unchanged', C: 'Changed' } },
  C: { name: 'Confidentiality', values: { N: 'None', L: 'Low', H: 'High' } },
  I: { name: 'Integrity', values: { N: 'None', L: 'Low', H: 'High' } },
  A: { name: 'Availability', values: { N: 'None', L: 'Low', H: 'High' } },
  E: { name: 'Exploit code maturity', values: { X: 'Not defined', U: 'Unproven', P: 'Proof of concept', F: 'Functional', H: 'High' } },
  RL: { name: 'Remediation level', values: { X: 'Not defined', O: 'Official fix', T: 'Temporary fix', W: 'Workaround', U: 'Unavailable' } },
  RC: { name: 'Report confidence', values: { X: 'Not defined', U: 'Unknown', R: 'Reasonable', C: 'Confirmed' } },
};

export const baseMetricKeys = ['AV', 'AC', 'PR', 'UI', 'S', 'C', 'I', 'A'] as const;
export const temporalMetricKeys = ['E', 'RL', 'RC'] as const;

export interface DecodedMetric {
  key: string;
  code: string;
  name: string;
  value: string;
  // How much this metric value raises the score, 0..1 (used for the bar visual).
  weight: number;
}

const weights: Record<string, Record<string, number>> = {
  AV: { N: 1, A: 0.7, L: 0.6, P: 0.25 },
  AC: { L: 1, H: 0.55 },
  PR: { N: 1, L: 0.7, H: 0.3 },
  UI: { N: 1, R: 0.7 },
  S: { U: 0.6, C: 1 },
  C: { N: 0, L: 0.4, H: 1 },
  I: { N: 0, L: 0.4, H: 1 },
  A: { N: 0, L: 0.4, H: 1 },
  E: { X: 1, U: 0.4, P: 0.6, F: 0.8, H: 1 },
  RL: { X: 1, O: 0.4, T: 0.6, W: 0.8, U: 1 },
  RC: { X: 1, U: 0.4, R: 0.7, C: 1 },
};

export function decodeVector(vector: string): Record<string, DecodedMetric> {
  const out: Record<string, DecodedMetric> = {};
  for (const part of vector.split('/').slice(1)) {
    const [key, code] = part.split(':');
    const meta = metricNames[key];
    if (!meta) continue;
    out[key] = {
      key,
      code,
      name: meta.name,
      value: meta.values[code] ?? code,
      weight: weights[key]?.[code] ?? 0.5,
    };
  }
  return out;
}

export function cvssRating(score: number) {
  if (score >= 9) return 'Critical';
  if (score >= 7) return 'High';
  if (score >= 4) return 'Medium';
  if (score > 0) return 'Low';
  return 'None';
}

export function advisoryHref(a: Advisory) {
  return `/advisories/${a.slug}`;
}

export function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
