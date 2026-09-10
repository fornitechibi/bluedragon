export const profile = {
  name: 'Shibi Kishore N',
  handle: 'Bluedragon',
  title: 'Independent Security Researcher',
  credential: 'Ex-Cantina Triager',
  email: 'shibikishore5@gmail.com',
  location: 'Remote',
  availability: 'Open for audits and AI systems work',
  nsloc: '100k+',
  findings: '60+',
  years: '2',
  triaged: '5,000+',
  summary:
    'Independent security researcher and bug bounty hunter. Two years reviewing EVM contracts and DLT internals — execution engines, BFT, and consensus. Previously a Cantina triager. For the last eight months I have been building AI harnesses, context-engineering pipelines, and production agentic systems.',
  links: {
    x: 'https://x.com/shibi_kishore',
    github: 'https://github.com/fornitechibi',
    sherlock: 'https://audits.sherlock.xyz/watson/Bluedragon',
    immunefi: 'https://immunefi.com/profile/Bluedragon/',
    reports: 'https://github.com/fornitechibi/Audit-Reports',
  },
} as const;

export const stats = {
  high: 27,
  medium: 30,
  sherlockRank: 715,
  payouts: 25,
  top10: 7,
  top25: 12,
  top50: 19,
  immunefiRank: 557,
} as const;

export const roles = [
  {
    period: '2 years',
    title: 'Security research and bug bounty',
    body: 'Independent audits and bounty hunting across EVM smart contracts, execution engines, BFT, and consensus. 100k+ nSLOC reviewed. 60+ validated security findings in contests, live programs, and open source.',
  },
  {
    period: 'Cantina',
    title: 'Ex-triager',
    body: 'Triaged 5,000+ reports, including complex DLT and smart-contract submissions. Assessed validity, severity, and duplicates under live contest load.',
  },
  {
    period: '8 months',
    title: 'AI harnesses and agentic systems',
    body: 'Building AI harnesses, context-engineering pipelines, production-grade workflows, and agentic systems — including tooling that supports security review at scale.',
  },
] as const;

export const orgs = [
  { name: 'Google', logo: '/logos/google.svg' },
  { name: 'Microsoft', logo: '/logos/microsoft.svg' },
  { name: 'Cloudflare', logo: '/logos/cloudflare.svg' },
  { name: 'Polygon', logo: '/logos/polygon.svg' },
  { name: 'Flare', logo: '/logos/flare.svg' },
  { name: 'Obyte', logo: '/logos/obyte.svg' },
  { name: 'Sei', logo: '/logos/sei.svg' },
  { name: 'Hedera', logo: '/logos/hedera.svg' },
  { name: 'Alchemix', logo: '/logos/alchemix.svg' },
  { name: 'Injective', logo: '/logos/injective.svg' },
  { name: 'Plume', logo: '/logos/plume.svg' },
] as const;

export type Platform = 'Sherlock' | 'Immunefi' | 'Code4rena' | 'Cantina' | 'CodeHawks';

export interface Notable {
  severity: 'H' | 'M' | 'L';
  title: string;
  url?: string;
}

export interface Contest {
  name: string;
  dateLabel: string;
  platform: Platform;
  rank: number;
  payout: number;
  url: string;
  high: number;
  medium: number;
  low: number;
  notables: Notable[];
  reportUrl?: string;
}

export const languages = [
  { name: 'Solidity', domain: 'Smart contracts · DeFi', group: 'EVM', depth: 95, label: 'Primary' },
  { name: 'Go', domain: 'Runtime · execution engines', group: 'Distributed systems', depth: 90, label: 'Strong' },
  { name: 'Rust', domain: 'Consensus · BFT', group: 'Distributed systems', depth: 86, label: 'Strong' },
  { name: 'C', domain: 'Systems · OSS', group: 'Systems', depth: 80, label: 'Strong' },
  { name: 'C++', domain: 'Crypto libraries · OSS', group: 'Systems', depth: 80, label: 'Strong' },
  { name: 'Python', domain: 'Tooling · analysis', group: 'Application', depth: 72, label: 'Working' },
  { name: 'TypeScript', domain: 'App layer · scripts', group: 'Application', depth: 70, label: 'Working' },
  { name: 'JavaScript', domain: 'App layer · scripts', group: 'Application', depth: 66, label: 'Working' },
  { name: 'Java', domain: 'Services', group: 'Application', depth: 66, label: 'Working' },
] as const;

export const contests: Contest[] = [
  {
    name: 'DRE App — dreUSD',
    dateLabel: 'Jun 2026',
    platform: 'Sherlock',
    rank: 223,
    payout: 0.03,
    url: 'https://audits.sherlock.xyz/contests/1259',
    high: 0,
    medium: 0,
    low: 0,
    notables: [],
  },
  {
    name: 'stNXM by EaseDeFi',
    dateLabel: 'Nov 2025',
    platform: 'Sherlock',
    rank: 46,
    payout: 1.01,
    url: 'https://audits.sherlock.xyz/contests/1203',
    high: 0,
    medium: 1,
    low: 0,
    notables: [
      {
        severity: 'M',
        title: 'Price manipulation during liquidity initialization allows token draining',
        url: 'https://audits.sherlock.xyz/contests/1203/voting/240',
      },
    ],
  },
  {
    name: 'Reflector V3',
    dateLabel: 'Oct 2025',
    platform: 'Code4rena',
    rank: 6,
    payout: 227.37,
    url: 'https://code4rena.com/audits/2025-10-reflector-v3',
    high: 0,
    medium: 0,
    low: 0,
    notables: [],
  },
  {
    name: 'Alchemix V3',
    dateLabel: 'Oct 2025',
    platform: 'Immunefi',
    rank: 67,
    payout: 96,
    url: 'https://immunefi.com/audit-competition/alchemix-v3-audit-competition',
    high: 0,
    medium: 2,
    low: 0,
    notables: [{ severity: 'M', title: 'Finding held by platform' }, { severity: 'M', title: 'Finding held by platform' }],
  },
  {
    name: 'USG — Tangent',
    dateLabel: 'Aug 2025',
    platform: 'Sherlock',
    rank: 45,
    payout: 106.59,
    url: 'https://audits.sherlock.xyz/contests/1073',
    high: 0,
    medium: 2,
    low: 0,
    notables: [
      {
        severity: 'M',
        title: 'Incorrect SY-to-underlying valuation in OraclePendlePT overestimates collateral',
        url: 'https://audits.sherlock.xyz/contests/1073/voting/755',
      },
      {
        severity: 'M',
        title: 'OraclePendlePT does not support some Pendle markets, breaking price calculation',
        url: 'https://audits.sherlock.xyz/contests/1073/voting/803',
      },
    ],
  },
  {
    name: 'Plume Network Attackathon',
    dateLabel: 'Jul 2025',
    platform: 'Immunefi',
    rank: 110,
    payout: 13,
    url: 'https://immunefi.com/audit-competition/plume-network-attackathon',
    high: 0,
    medium: 1,
    low: 0,
    notables: [{ severity: 'M', title: 'Finding held by platform' }],
  },
  {
    name: 'Notional Exponent',
    dateLabel: 'Jul 2025',
    platform: 'Sherlock',
    rank: 9,
    payout: 684.47,
    url: 'https://audits.sherlock.xyz/contests/1001',
    high: 2,
    medium: 1,
    low: 0,
    notables: [
      {
        severity: 'H',
        title: 'Insufficient input validation in claimAccountRewards() allows permanent reward loss',
        url: 'https://audits.sherlock.xyz/contests/1001/voting/268',
      },
      {
        severity: 'H',
        title: 'Missing slippage protection in expired PT redemption causes user fund loss',
        url: 'https://audits.sherlock.xyz/contests/1001/voting/874',
      },
      {
        severity: 'M',
        title: 'Missing reward claiming for Curve gauges on L2 causes permanent reward loss',
        url: 'https://audits.sherlock.xyz/contests/1001/voting/270',
      },
    ],
  },
  {
    name: 'Flare FAssets',
    dateLabel: 'May 2025',
    platform: 'Immunefi',
    rank: 9,
    payout: 5143,
    url: 'https://immunefi.com/audit-competition/audit-comp-flare-fassets',
    high: 1,
    medium: 2,
    low: 3,
    notables: [
      { severity: 'H', title: 'Finding held by platform' },
      { severity: 'M', title: 'Finding held by platform' },
      { severity: 'M', title: 'Finding held by platform' },
    ],
  },
  {
    name: 'Alchemix V3',
    dateLabel: 'May 2025',
    platform: 'Cantina',
    rank: 41,
    payout: 156.91,
    url: 'https://cantina.xyz/competitions/e68909e6-3491-4a94-a707-ecf0c89cf72a',
    high: 4,
    medium: 0,
    low: 0,
    notables: [
      { severity: 'H', title: 'Finding held by platform' },
      { severity: 'H', title: 'Finding held by platform' },
      { severity: 'H', title: 'Finding held by platform' },
      { severity: 'H', title: 'Finding held by platform' },
    ],
  },
  {
    name: 'Mezo monorepo',
    dateLabel: 'Apr 2025',
    platform: 'Cantina',
    rank: 42,
    payout: 42.39,
    url: 'https://cantina.xyz/competitions/e757364c-1f68-4ec5-94f6-c6b3c2e80c6d',
    high: 0,
    medium: 2,
    low: 0,
    notables: [{ severity: 'M', title: 'Finding held by platform' }, { severity: 'M', title: 'Finding held by platform' }],
  },
  {
    name: 'BitVault',
    dateLabel: 'Apr 2025',
    platform: 'Code4rena',
    rank: 5,
    payout: 650.53,
    url: 'https://code4rena.com/audits/2025-04-bitvault',
    high: 0,
    medium: 1,
    low: 0,
    notables: [
      {
        severity: 'M',
        title: 'Implementation is incompatible with WBTC as collateral',
        url: 'https://code4rena.com/audits/2025-04-bitvault/submissions/S-67',
      },
    ],
    reportUrl: 'https://github.com/fornitechibi/Audit-Reports/blob/main/Code4Rena/BitVault.md',
  },
  {
    name: 'PinLink RWA Marketplace',
    dateLabel: 'Mar 2025',
    platform: 'Sherlock',
    rank: 44,
    payout: 13.2,
    url: 'https://audits.sherlock.xyz/contests/852',
    high: 0,
    medium: 0,
    low: 0,
    notables: [],
  },
  {
    name: 'Yeet',
    dateLabel: 'Mar 2025',
    platform: 'Immunefi',
    rank: 22,
    payout: 94,
    url: 'https://immunefi.com/audit-competition/audit-comp-yeet',
    high: 1,
    medium: 0,
    low: 1,
    notables: [{ severity: 'H', title: 'Finding held by platform' }],
  },
  {
    name: 'Symmio Staking and Vesting',
    dateLabel: 'Mar 2025',
    platform: 'Sherlock',
    rank: 10,
    payout: 68.35,
    url: 'https://audits.sherlock.xyz/contests/838',
    high: 1,
    medium: 1,
    low: 0,
    notables: [
      {
        severity: 'H',
        title: 'Frequent reward updates for low-decimal tokens starve stakers',
        url: 'https://github.com/sherlock-audit/2025-03-symm-io-stacking-judging/issues/153',
      },
      {
        severity: 'M',
        title: 'StakingRewards reward rate can be dragged out and diluted',
        url: 'https://github.com/sherlock-audit/2025-03-symm-io-stacking-judging/issues/295',
      },
    ],
    reportUrl: 'https://github.com/fornitechibi/Audit-Reports/blob/main/Sherlock/Symmio.md',
  },
  {
    name: 'RAAC Core Contracts',
    dateLabel: 'Feb 2025',
    platform: 'CodeHawks',
    rank: 18,
    payout: 1086.03,
    url: 'https://codehawks.cyfrin.io/contests/cm5vbyum90000ffs0xblmb4gj',
    high: 10,
    medium: 13,
    low: 14,
    notables: [
      {
        severity: 'H',
        title: 'BaseGauge users can claim rewards without staking',
        url: 'https://codehawks.cyfrin.io/finding/cmbvzxrys0013kz04k3o97th2',
      },
      {
        severity: 'H',
        title: 'Users can overwrite existing locks in veRAACToken, permanently losing funds',
        url: 'https://codehawks.cyfrin.io/finding/cmbvzxs140017kz0412yd74qr',
      },
      {
        severity: 'H',
        title: 'Users can borrow more assets than deposited as collateral',
        url: 'https://codehawks.cyfrin.io/finding/cmbvzxstf0029kz0412jvk6og',
      },
    ],
  },
  {
    name: 'Liquid Ron',
    dateLabel: 'Jan 2025',
    platform: 'Code4rena',
    rank: 11,
    payout: 0,
    url: 'https://code4rena.com/audits/2025-01-liquid-ron',
    high: 0,
    medium: 1,
    low: 0,
    notables: [
      {
        severity: 'M',
        title: 'onlyOperator modifier logic DoS for authorized operators',
        url: 'https://code4rena.com/audits/2025-01-liquid-ron/submissions/S-614',
      },
    ],
    reportUrl: 'https://github.com/fornitechibi/Audit-Reports/blob/main/Code4Rena/LiquidRon.md',
  },
  {
    name: 'daao-contracts',
    dateLabel: 'Jan 2025',
    platform: 'Cantina',
    rank: 122,
    payout: 0.23,
    url: 'https://cantina.xyz/competitions/bd43bdd1-bc7f-473b-96c0-d35d37f3db33',
    high: 0,
    medium: 1,
    low: 0,
    notables: [{ severity: 'M', title: 'Finding held by platform' }],
  },
  {
    name: 'Aave DIVA Wrapper',
    dateLabel: 'Jan 2025',
    platform: 'CodeHawks',
    rank: 9,
    payout: 0.04,
    url: 'https://codehawks.cyfrin.io/contests/cm5w96e2f000012k5n46wdw43',
    high: 0,
    medium: 0,
    low: 1,
    notables: [
      {
        severity: 'L',
        title: 'Incorrect sequence of AaveDIVAWrapper constructor parameters',
        url: 'https://codehawks.cyfrin.io/finding/cm7gkeozz000291hbsul4hno1',
      },
    ],
  },
  {
    name: 'InterPol',
    dateLabel: 'Dec 2024',
    platform: 'Cantina',
    rank: 10,
    payout: 156.87,
    url: 'https://cantina.xyz/competitions/55023131-27df-44e4-af46-bec298d0fa8e',
    high: 1,
    medium: 0,
    low: 0,
    notables: [{ severity: 'H', title: 'Finding held by platform' }],
    reportUrl: 'https://github.com/fornitechibi/Audit-Reports/blob/main/Cantina/InterPol.md',
  },
  {
    name: 'One World Project',
    dateLabel: 'Nov 2024',
    platform: 'CodeHawks',
    rank: 12,
    payout: 98.19,
    url: 'https://codehawks.cyfrin.io/contests/cm2mxcaoo000112pvkwt2nb8u',
    high: 0,
    medium: 1,
    low: 0,
    notables: [
      {
        severity: 'M',
        title: 'Failed executeMetaTransaction() txs are open to replay',
        url: 'https://codehawks.cyfrin.io/finding/cm46z7boi009c2t0xnc694vkp',
      },
    ],
    reportUrl: 'https://github.com/fornitechibi/Audit-Reports/blob/main/CodeHawks/One-Project.md',
  },
  {
    name: 'Winnables Raffles',
    dateLabel: 'Aug 2024',
    platform: 'Sherlock',
    rank: 35,
    payout: 3.36,
    url: 'https://audits.sherlock.xyz/contests/516',
    high: 1,
    medium: 0,
    low: 0,
    notables: [
      {
        severity: 'H',
        title: 'Missing access control on raffle cancellation lets anyone disrupt raffle creation',
        url: 'https://github.com/sherlock-audit/2024-08-winnables-raffles-judging/issues/282',
      },
    ],
    reportUrl: 'https://github.com/fornitechibi/Audit-Reports/blob/main/Sherlock/Winnables.md',
  },
  {
    name: 'Tadle',
    dateLabel: 'Aug 2024',
    platform: 'CodeHawks',
    rank: 121,
    payout: 4.17,
    url: 'https://codehawks.cyfrin.io/contests/clzcnh4o1000p11vucwtzgoro',
    high: 4,
    medium: 0,
    low: 0,
    notables: [
      {
        severity: 'H',
        title: 'TokenManager unlimited withdraw',
        url: 'https://codehawks.cyfrin.io/finding/cm3d67nwu000asjegy8hur568',
      },
      {
        severity: 'H',
        title: 'Malicious user can drain protocol by bypassing ASK abortion validation in Turbo mode',
        url: 'https://codehawks.cyfrin.io/finding/cm3d67o7x000qsjeg03a41r2a',
      },
    ],
    reportUrl: 'https://github.com/fornitechibi/Audit-Reports/blob/main/CodeHawks/Tadle.md',
  },
  {
    name: 'Zaros Part 1',
    dateLabel: 'Jul 2024',
    platform: 'CodeHawks',
    rank: 66,
    payout: 32.97,
    url: 'https://codehawks.cyfrin.io/contests/clyg8slke0001bvhpwszwjr7z',
    high: 0,
    medium: 1,
    low: 0,
    notables: [
      {
        severity: 'M',
        title: 'Uninitialized variable in MarketConfiguration::update reverts getIndexPrice',
        url: 'https://codehawks.cyfrin.io/finding/cm3d632oj00109bqxflkqtjfc',
      },
    ],
    reportUrl: 'https://github.com/fornitechibi/Audit-Reports/blob/main/CodeHawks/Zaros-Part1.md',
  },
  {
    name: 'TempleGold',
    dateLabel: 'Jul 2024',
    platform: 'CodeHawks',
    rank: 31,
    payout: 50.91,
    url: 'https://codehawks.cyfrin.io/contests/clxyjvjkg0007isl3p290etog',
    high: 1,
    medium: 0,
    low: 1,
    notables: [
      {
        severity: 'H',
        title: 'TempleGold::send incompatible with multisig wallets',
        url: 'https://codehawks.cyfrin.io/finding/cm3d1qjan000kvmqs44loknxz',
      },
    ],
    reportUrl: 'https://github.com/fornitechibi/Audit-Reports/blob/main/CodeHawks/TempleGold.md',
  },
  {
    name: 'THORChain',
    dateLabel: 'Jun 2024',
    platform: 'Code4rena',
    rank: 12,
    payout: 458.56,
    url: 'https://code4rena.com/audits/2024-06-thorchain',
    high: 1,
    medium: 0,
    low: 0,
    notables: [
      {
        severity: 'H',
        title: 'Incorrect event emissions misreport unsuccessful ETH transfers to THORChain',
        url: 'https://github.com/code-423n4/2024-06-thorchain-findings/issues/17',
      },
    ],
    reportUrl: 'https://github.com/fornitechibi/Audit-Reports/blob/main/Code4Rena/ThorChain.md',
  },
];

export const platforms: Array<'All' | Platform> = [
  'All',
  'Sherlock',
  'Immunefi',
  'Code4rena',
  'Cantina',
  'CodeHawks',
];

export type Severity = 'High' | 'Medium' | 'Low';

export interface FindingRow {
  severity: Severity | null;
  title: string;
  confidential: boolean;
  url?: string;
}

const severityMap = { H: 'High', M: 'Medium', L: 'Low' } as const;

function isConfidentialTitle(title: string) {
  return !title || title === 'Finding held by platform';
}

export function findingRows(contest: Contest): FindingRow[] {
  const rows: FindingRow[] = [];
  const used: Record<Severity, number> = { High: 0, Medium: 0, Low: 0 };

  for (const notable of contest.notables) {
    const severity = severityMap[notable.severity];
    const confidential = isConfidentialTitle(notable.title);
    rows.push({
      severity,
      title: confidential ? 'Confidential' : notable.title,
      confidential,
      url: confidential ? undefined : notable.url,
    });
    used[severity] += 1;
  }

  const remaining: Severity[] = [
    ...Array<Severity>(Math.max(0, contest.high - used.High)).fill('High'),
    ...Array<Severity>(Math.max(0, contest.medium - used.Medium)).fill('Medium'),
    ...Array<Severity>(Math.max(0, contest.low - used.Low)).fill('Low'),
  ];

  for (const severity of remaining) {
    rows.push({ severity, title: 'Confidential', confidential: true });
  }

  if (rows.length === 0) {
    return [{ severity: null, title: 'Confidential', confidential: true }];
  }

  return rows;
}

export function countBySeverity(rows: FindingRow[]) {
  return {
    high: rows.filter((row) => row.severity === 'High').length,
    medium: rows.filter((row) => row.severity === 'Medium').length,
    low: rows.filter((row) => row.severity === 'Low').length,
  };
}
