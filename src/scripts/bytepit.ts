// Contact-section toy: click to drop byte glyphs that tumble, bounce, and pile up.
// Circle physics with positional correction; pauses when off screen.

type Glyph = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  a: number;
  va: number;
  r: number;
  label: string;
  hot: boolean;
  born: number;
  dying: number;
};

const BYTES = ['0x41', '0x00', '0xFF', '0xDE', '0xAD', '0xBE', '0xEF', '0x90', '0x7F', '0x0A', '0x2F', '0x5C'];
const MAX = 70;

function initPit(root: HTMLElement) {
  const canvas = root.querySelector('canvas');
  const hint = root.querySelector<HTMLElement>('[data-pit-hint]');
  const ctx = canvas?.getContext('2d');
  if (!canvas || !ctx) return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const glyphs: Glyph[] = [];
  let w = 0;
  let h = 0;
  let dpr = 1;
  let running = false;
  let visible = false;
  let seeded = false;
  let last = 0;
  let lastAdd = 0;
  let pouring = 0;
  let pourAt = { x: 0, y: 0 };

  function resize() {
    const rect = root.getBoundingClientRect();
    dpr = Math.min(2, window.devicePixelRatio || 1);
    w = rect.width;
    h = rect.height;
    canvas!.width = Math.round(w * dpr);
    canvas!.height = Math.round(h * dpr);
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (reduce) draw(performance.now());
  }

  function add(x: number, y: number, now: number, user = true) {
    lastAdd = now;
    const r = 15 + Math.random() * 4;
    glyphs.push({
      x: Math.min(w - r, Math.max(r, x + (Math.random() - 0.5) * 8)),
      y,
      vx: (Math.random() - 0.5) * 120,
      vy: 0,
      a: (Math.random() - 0.5) * 0.8,
      va: (Math.random() - 0.5) * 8,
      r,
      label: BYTES[Math.floor(Math.random() * BYTES.length)],
      hot: Math.random() < 0.12,
      born: now,
      dying: 0,
    });
    const alive = glyphs.filter((g) => !g.dying);
    if (alive.length > MAX) alive[0].dying = now;
    if (user && hint) hint.style.opacity = '0';
    start();
  }

  function settleInstantly() {
    // Reduced motion: run the simulation off screen until it rests.
    for (let i = 0; i < 240; i += 1) physics(1 / 60);
  }

  function physics(dt: number) {
    const g = 1900;
    for (const p of glyphs) {
      p.vy += g * dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.a += p.va * dt;

      if (p.y + p.r > h) {
        p.y = h - p.r;
        p.vy *= -0.32;
        p.vx *= 0.86;
        p.va *= 0.7;
      }
      if (p.x - p.r < 0) {
        p.x = p.r;
        p.vx *= -0.5;
      } else if (p.x + p.r > w) {
        p.x = w - p.r;
        p.vx *= -0.5;
      }
    }

    for (let iter = 0; iter < 3; iter += 1) {
      for (let i = 0; i < glyphs.length; i += 1) {
        const a = glyphs[i];
        for (let j = i + 1; j < glyphs.length; j += 1) {
          const b = glyphs[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const min = a.r + b.r;
          const d2 = dx * dx + dy * dy;
          if (d2 >= min * min || d2 === 0) continue;
          const d = Math.sqrt(d2);
          const nx = dx / d;
          const ny = dy / d;
          const overlap = (min - d) / 2;
          a.x -= nx * overlap;
          a.y -= ny * overlap;
          b.x += nx * overlap;
          b.y += ny * overlap;
          const rvx = b.vx - a.vx;
          const rvy = b.vy - a.vy;
          const vn = rvx * nx + rvy * ny;
          if (vn < 0) {
            const imp = -(1 + 0.2) * vn * 0.5;
            a.vx -= imp * nx;
            a.vy -= imp * ny;
            b.vx += imp * nx;
            b.vy += imp * ny;
            a.va += (rvx * ny - rvy * nx) * 0.004;
            b.va -= (rvx * ny - rvy * nx) * 0.004;
          }
        }
      }
    }

    for (const p of glyphs) {
      p.vx *= 0.995;
      p.va *= 0.96;
    }
  }

  function roundRect(x: number, y: number, ww: number, hh: number, r: number) {
    ctx!.beginPath();
    ctx!.moveTo(x + r, y);
    ctx!.arcTo(x + ww, y, x + ww, y + hh, r);
    ctx!.arcTo(x + ww, y + hh, x, y + hh, r);
    ctx!.arcTo(x, y + hh, x, y, r);
    ctx!.arcTo(x, y, x + ww, y, r);
    ctx!.closePath();
  }

  function draw(now: number) {
    ctx!.clearRect(0, 0, w, h);
    ctx!.textAlign = 'center';
    ctx!.textBaseline = 'middle';
    for (let i = glyphs.length - 1; i >= 0; i -= 1) {
      const p = glyphs[i];
      if (p.dying && now - p.dying > 500) glyphs.splice(i, 1);
    }
    for (const p of glyphs) {
      const alpha = p.dying ? Math.max(0, 1 - (now - p.dying) / 500) : Math.min(1, (now - p.born) / 120);
      ctx!.save();
      ctx!.globalAlpha = alpha;
      ctx!.translate(p.x, p.y);
      ctx!.rotate(p.a);
      const s = p.r * 2 - 2;
      roundRect(-s / 2 - 4, -s / 2 + 4, s + 8, s - 8, 8);
      ctx!.fillStyle = p.hot ? 'rgba(255,77,109,0.16)' : 'rgba(77,141,255,0.14)';
      ctx!.fill();
      ctx!.lineWidth = 1;
      ctx!.strokeStyle = p.hot ? 'rgba(255,77,109,0.6)' : 'rgba(169,203,255,0.45)';
      ctx!.stroke();
      ctx!.fillStyle = p.hot ? '#ff8da1' : '#cfe0ff';
      ctx!.font = `500 ${Math.round(p.r * 0.72)}px "IBM Plex Mono", ui-monospace, monospace`;
      ctx!.fillText(p.label, 0, 1);
      ctx!.restore();
    }
  }

  function frame(now: number) {
    if (!running) return;
    const dt = Math.max(0.001, Math.min(0.033, (now - last) / 1000));
    last = now;
    if (pouring && now - pouring > 70) {
      add(pourAt.x, pourAt.y, now);
      pouring = now;
    }
    physics(dt);
    draw(now);
    const resting = glyphs.every((p) => Math.abs(p.vy) < 6 && Math.abs(p.vx) < 6 && !p.dying);
    if (resting && !pouring && now - lastAdd > 1500) {
      running = false;
      return;
    }
    requestAnimationFrame(frame);
  }

  function start() {
    if (reduce) {
      settleInstantly();
      draw(performance.now() + 1000);
      return;
    }
    if (running || !visible) return;
    running = true;
    last = performance.now();
    requestAnimationFrame(frame);
  }

  function point(e: PointerEvent) {
    const rect = root.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: Math.min(e.clientY - rect.top, 40) };
  }

  root.addEventListener('pointerdown', (e) => {
    const p = point(e);
    pourAt = p;
    add(p.x, p.y, performance.now());
    window.setTimeout(() => {
      if (pourAt === p) pouring = performance.now();
    }, 260);
  });
  root.addEventListener('pointermove', (e) => {
    if (pouring) pourAt = point(e);
  });
  const stopPour = () => {
    pouring = 0;
    pourAt = { x: -1, y: -1 };
  };
  root.addEventListener('pointerup', stopPour);
  root.addEventListener('pointerleave', stopPour);
  root.addEventListener('pointercancel', stopPour);

  resize();
  new ResizeObserver(() => resize()).observe(root);
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible && !seeded) {
      seeded = true;
      for (let i = 0; i < 9; i += 1) {
        window.setTimeout(() => add(w * (0.2 + Math.random() * 0.6), -20 - i * 6, performance.now(), false), reduce ? 0 : i * 90);
      }
    }
    if (visible) start();
    else running = false;
  }).observe(root);
}

document.querySelectorAll<HTMLElement>('[data-pit]').forEach(initPit);
