import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: false,
  securityLevel: 'strict',
  theme: 'base',
  fontFamily: 'IBM Plex Sans, IBM Plex Sans Variable, sans-serif',
  themeVariables: {
    darkMode: true,
    background: '#1b2230',
    primaryColor: '#121722',
    primaryTextColor: '#f3ede0',
    primaryBorderColor: '#3ee0ff',
    secondaryColor: '#07090f',
    secondaryTextColor: '#f3ede0',
    secondaryBorderColor: '#8a93a8',
    tertiaryColor: '#1b2230',
    tertiaryTextColor: '#f3ede0',
    tertiaryBorderColor: '#8a93a8',
    lineColor: '#8a93a8',
    textColor: '#f3ede0',
    mainBkg: '#121722',
    nodeBorder: '#3ee0ff',
    clusterBkg: '#07090f',
    clusterBorder: '#f3ede0',
    titleColor: '#f3ede0',
    edgeLabelBackground: '#121722',
    actorBkg: '#121722',
    actorBorder: '#3ee0ff',
    actorTextColor: '#f3ede0',
    actorLineColor: '#8a93a8',
    signalColor: '#3ee0ff',
    signalTextColor: '#f3ede0',
    labelBoxBkgColor: '#121722',
    labelBoxBorderColor: '#3ee0ff',
    labelTextColor: '#f3ede0',
    loopTextColor: '#f3ede0',
    noteBkgColor: '#1b2230',
    noteTextColor: '#f3ede0',
    noteBorderColor: '#d4f542',
    activationBkgColor: '#1b2230',
    sequenceNumberColor: '#07090f',
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
