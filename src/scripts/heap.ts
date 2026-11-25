// Hero backdrop: a field of memory cells.
// Blocks get allocated (blue) and freed; now and then a freed block is touched again
// and flashes red (a use-after-free, the bug class behind CVE-2026-85790).
// The pointer acts as a probe that lights the cells near it.

type Block = { x: number; y: number; w: number; h: number; born: number; life: number };

function initHeap(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let width = 0;
  let height = 0;
  let dpr = 1;
  let gap = 22;
  let cols = 0;
  let rows = 0;
  let alloc = new Float32Array(0);
  let uaf = new Float32Array(0);
  const blocks: Block[] = [];
  const pending: Array<{ at: number; b: Block }> = [];
  const probe = { x: -9999, y: -9999, sx: -9999, sy: -9999 };
  let lastSpawn = 0;
  let running = false;
  let visible = true;
  let raf = 0;

  function resize() {
    const rect = canvas.getBoundingClientRect();
    dpr = Math.min(2, window.devicePixelRatio || 1);
    width = rect.width;
    height = rect.height;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    gap = width < 640 ? 18 : 22;
    cols = Math.ceil(width / gap) + 1;
    rows = Math.ceil(height / gap) + 1;
    alloc = new Float32Array(cols * rows);
    uaf = new Float32Array(cols * rows);
    blocks.length = 0;
    pending.length = 0;
    if (reduce) seedStatic();
  }

  function rand(min: number, max: number) {
    return min + Math.random() * (max - min);
  }

  function spawn(now: number) {
    const w = Math.round(rand(2, 7));
    const h = Math.round(rand(1, 3));
    // Bias toward the right half, away from the headline's left edge.
    const x = Math.floor(rand(cols * 0.38, cols - w));
    const y = Math.floor(rand(1, rows * 0.82 - h));
    blocks.push({ x, y, w, h, born: now, life: rand(1600, 4200) });
  }

  function seedStatic() {
    for (let i = 0; i < 14; i += 1) {
      const w = Math.round(rand(2, 7));
      const h = Math.round(rand(1, 3));
      const x = Math.floor(rand(cols * 0.38, cols - w));
      const y = Math.floor(rand(1, rows * 0.82 - h));
      for (let yy = y; yy < y + h; yy += 1) for (let xx = x; xx < x + w; xx += 1) alloc[yy * cols + xx] = 0.8;
    }
    const x = Math.floor(cols * 0.72);
    const y = Math.floor(rows * 0.3);
    for (let xx = x; xx < x + 4; xx += 1) uaf[y * cols + xx] = 0.9;
  }

  function step(now: number) {
    if (now - lastSpawn > 320) {
      spawn(now);
      lastSpawn = now;
    }

    for (let i = 0; i < alloc.length; i += 1) {
      alloc[i] *= 0.955;
      uaf[i] *= 0.93;
    }

    for (let i = blocks.length - 1; i >= 0; i -= 1) {
      const b = blocks[i];
      const age = now - b.born;
      if (age > b.life) {
        blocks.splice(i, 1);
        if (Math.random() < 0.16) pending.push({ at: now + rand(350, 1100), b });
        continue;
      }
      const level = Math.min(1, age / 260);
      for (let y = b.y; y < b.y + b.h; y += 1) {
        for (let x = b.x; x < b.x + b.w; x += 1) {
          const k = y * cols + x;
          if (alloc[k] < level) alloc[k] = level;
        }
      }
    }

    for (let i = pending.length - 1; i >= 0; i -= 1) {
      const p = pending[i];
      if (now < p.at) continue;
      pending.splice(i, 1);
      const { b } = p;
      for (let y = b.y; y < b.y + b.h; y += 1) for (let x = b.x; x < b.x + b.w; x += 1) uaf[y * cols + x] = 1;
    }

    probe.sx += (probe.x - probe.sx) * 0.14;
    probe.sy += (probe.y - probe.sy) * 0.14;
  }

  function draw(now: number) {
    ctx!.clearRect(0, 0, width, height);
    const scan = ((now * 0.05) % (height + 400)) - 200;
    const reach = width < 640 ? 110 : 160;

    for (let y = 0; y < rows; y += 1) {
      const py = y * gap + gap / 2;
      const scanBoost = Math.max(0, 1 - Math.abs(py - scan) / 90) * 0.18;
      for (let x = 0; x < cols; x += 1) {
        const px = x * gap + gap / 2;
        const k = y * cols + x;
        const dx = px - probe.sx;
        const dy = py - probe.sy;
        const d = Math.sqrt(dx * dx + dy * dy);
        const near = d < reach ? (1 - d / reach) ** 2 : 0;
        const a = alloc[k];
        const u = uaf[k];
        const size = 2 + a * 2.2 + near * 3 + u * 2.5;

        if (u > 0.04) {
          ctx!.globalAlpha = Math.min(1, 0.25 + u * 0.85);
          ctx!.fillStyle = '#ff4d6d';
        } else if (a > 0.04 || near > 0.02) {
          ctx!.globalAlpha = Math.min(1, 0.16 + a * 0.6 + near * 0.8 + scanBoost);
          ctx!.fillStyle = near > a ? '#a9cbff' : '#4d8dff';
        } else {
          ctx!.globalAlpha = 0.13 + scanBoost;
          ctx!.fillStyle = '#6f8fc4';
        }
        ctx!.fillRect(px - size / 2, py - size / 2, size, size);
      }
    }
    ctx!.globalAlpha = 1;
  }

  function frame(now: number) {
    if (!running) return;
    step(now);
    draw(now);
    raf = requestAnimationFrame(frame);
  }

  function start() {
    if (running || reduce || !visible || document.hidden) return;
    running = true;
    raf = requestAnimationFrame(frame);
  }

  function stop() {
    running = false;
    cancelAnimationFrame(raf);
  }

  resize();
  if (reduce) draw(0);
  else start();

  let resizeTimer = 0;
  window.addEventListener('resize', () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      resize();
      if (reduce) draw(0);
    }, 120);
  });

  window.addEventListener(
    'pointermove',
    (e) => {
      const rect = canvas.getBoundingClientRect();
      probe.x = e.clientX - rect.left;
      probe.y = e.clientY - rect.top;
      if (probe.sx < -999) {
        probe.sx = probe.x;
        probe.sy = probe.y;
      }
    },
    { passive: true },
  );

  document.documentElement.addEventListener('pointerleave', () => {
    probe.x = -9999;
    probe.y = -9999;
  });

  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) start();
    else stop();
  }).observe(canvas);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else start();
  });
}

const heap = document.querySelector<HTMLCanvasElement>('[data-heap]');
if (heap) initHeap(heap);
