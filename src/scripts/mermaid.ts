import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: false,
  securityLevel: 'strict',
  theme: 'base',
  fontFamily: 'Mona Sans Variable, Mona Sans, sans-serif',
  themeVariables: {
    darkMode: true,
    background: '#101c30',
    primaryColor: '#0a1322',
    primaryTextColor: '#e6eef9',
    primaryBorderColor: '#4d8dff',
    secondaryColor: '#040812',
    secondaryTextColor: '#e6eef9',
    secondaryBorderColor: '#8393ad',
    tertiaryColor: '#101c30',
    tertiaryTextColor: '#e6eef9',
    tertiaryBorderColor: '#8393ad',
    lineColor: '#8393ad',
    textColor: '#e6eef9',
    mainBkg: '#0a1322',
    nodeBorder: '#4d8dff',
    clusterBkg: '#040812',
    clusterBorder: '#e6eef9',
    titleColor: '#e6eef9',
    edgeLabelBackground: '#0a1322',
    actorBkg: '#0a1322',
    actorBorder: '#4d8dff',
    actorTextColor: '#e6eef9',
    actorLineColor: '#8393ad',
    signalColor: '#4d8dff',
    signalTextColor: '#e6eef9',
    labelBoxBkgColor: '#0a1322',
    labelBoxBorderColor: '#4d8dff',
    labelTextColor: '#e6eef9',
    loopTextColor: '#e6eef9',
    noteBkgColor: '#101c30',
    noteTextColor: '#e6eef9',
    noteBorderColor: '#a9cbff',
    activationBkgColor: '#101c30',
    sequenceNumberColor: '#040812',
  },
  flowchart: {
    htmlLabels: true,
    curve: 'basis',
    padding: 12,
  },
  sequence: {
    actorMargin: 28,
    messageMargin: 36,
  },
});

function sourceFrom(block: HTMLElement) {
  const lines = block.querySelectorAll('.line');
  if (lines.length > 0) {
    return [...lines].map((line) => line.textContent ?? '').join('\n');
  }
  return block.textContent ?? '';
}

function collectBlocks() {
  const blocks = new Set<HTMLElement>();
  document.querySelectorAll<HTMLElement>('pre.mermaid, pre[data-language="mermaid"]').forEach((el) => {
    blocks.add(el);
  });
  document.querySelectorAll('code.language-mermaid').forEach((el) => {
    blocks.add((el.closest('pre') as HTMLElement | null) ?? (el as HTMLElement));
  });
  return [...blocks];
}

async function renderDiagrams() {
  const blocks = collectBlocks();
  if (blocks.length === 0) return;

  const targets: HTMLElement[] = [];
  for (const block of blocks) {
    const source = sourceFrom(block).trim();
    if (!source) continue;
    const figure = document.createElement('figure');
    figure.className = 'diagram';
    figure.setAttribute('role', 'img');
    const pre = document.createElement('pre');
    pre.className = 'mermaid';
    pre.textContent = source;
    figure.appendChild(pre);
    block.replaceWith(figure);
    targets.push(pre);
  }

  if (targets.length > 0) {
    await mermaid.run({ nodes: targets });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    void renderDiagrams();
  });
} else {
  void renderDiagrams();
}
