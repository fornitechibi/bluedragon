// Site-wide interaction layer. Every effect is progressive: without JS the page is complete.

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Copy to clipboard ---------- */
function initCopy() {
  document.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const value = btn.dataset.copy ?? '';
      const original = btn.textContent;
      try {
        await navigator.clipboard.writeText(value);
        btn.textContent = 'Copied';
      } catch {
        window.prompt('Copy this address', value);
      }
      window.setTimeout(() => {
        btn.textContent = original;
      }, 1400);
    });
  });
}

/* ---------- Reveal: adds .is-in once, used by dials, vector bars, language bars ---------- */
function initReveal() {
  const els = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (!('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
        entry.target.querySelectorAll<HTMLElement>('[data-odo]').forEach(runOdometer);
      }
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.15 },
  );
  els.forEach((el) => io.observe(el));
}

/* ---------- Odometer: each digit is a reel that spins to its value ---------- */
function buildOdometer(el: HTMLElement) {
  const value = Number(el.dataset.odo ?? '0');
  const suffix = el.dataset.suffix ?? '';
  const text = value.toLocaleString('en-US');
  el.textContent = '';
  let digitIndex = 0;
  for (const ch of text) {
    if (/\d/.test(ch)) {
      const col = document.createElement('span');
      col.className = 'odo-col';
      col.setAttribute('aria-hidden', 'true');
      const reel = document.createElement('span');
      reel.className = 'odo-reel';
      reel.style.setProperty('--i', String(digitIndex));
      // Two full turns so short numbers still spin before landing.
      for (let n = 0; n < 20; n += 1) {
        const s = document.createElement('span');
        s.textContent = String(n % 10);
        reel.appendChild(s);
      }
      reel.dataset.target = String(10 + Number(ch));
      col.appendChild(reel);
      el.appendChild(col);
      digitIndex += 1;
    } else {
      const s = document.createElement('span');
      s.setAttribute('aria-hidden', 'true');
      s.textContent = ch;
      el.appendChild(s);
    }
  }
  if (suffix) {
    const s = document.createElement('span');
    s.setAttribute('aria-hidden', 'true');
    s.textContent = suffix;
    el.appendChild(s);
  }
}

function runOdometer(el: HTMLElement) {
  el.querySelectorAll<HTMLElement>('.odo-reel').forEach((reel) => {
    reel.style.transform = `translateY(-${reel.dataset.target}em)`;
  });
}

function initOdometers() {
  document.querySelectorAll<HTMLElement>('[data-odo]').forEach((el) => {
    if (reduceMotion) return;
    buildOdometer(el);
  });
}

/* ---------- Spotlight: pointer position into --mx/--my ---------- */
function initSpotlight() {
  if (reduceMotion || window.matchMedia('(hover: none)').matches) return;
  document.addEventListener(
    'pointermove',
    (e) => {
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-spot]');
      if (!target) return;
      const r = target.getBoundingClientRect();
      target.style.setProperty('--mx', `${e.clientX - r.left}px`);
      target.style.setProperty('--my', `${e.clientY - r.top}px`);
    },
    { passive: true },
  );
}

/* ---------- Header: scrolled state + sliding indicator that tracks the visible section ---------- */
function initNav() {
  const header = document.querySelector<HTMLElement>('[data-header]');
  const nav = document.querySelector<HTMLElement>('[data-nav]');
  const indicator = document.querySelector<HTMLElement>('[data-nav-indicator]');
  if (!header || !nav || !indicator) return;

  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const links = [...nav.querySelectorAll<HTMLAnchorElement>('a')];

  const moveTo = (link: HTMLAnchorElement | null) => {
    if (!link || link.offsetParent === null) {
      indicator.style.opacity = '0';
      return;
    }
    indicator.style.opacity = '1';
    indicator.style.width = `${link.offsetWidth}px`;
    indicator.style.transform = `translateX(${link.offsetLeft}px)`;
  };

  let current = links.find((l) => l.getAttribute('aria-current') === 'true') ?? null;
  moveTo(current);

  links.forEach((l) => {
    l.addEventListener('pointerenter', () => moveTo(l));
  });
  nav.addEventListener('pointerleave', () => moveTo(current));
  window.addEventListener('resize', () => moveTo(current));

  // Scroll-spy on the homepage.
  const spyLinks = links.filter((l) => l.dataset.section);
  const sections = spyLinks
    .map((l) => document.getElementById(l.dataset.section!))
    .filter((s): s is HTMLElement => Boolean(s));
  if (sections.length === 0) return;

  // Active = the last section whose top has crossed the middle of the viewport.
  let ticking = false;
  const update = () => {
    ticking = false;
    const line = window.innerHeight * 0.5;
    let found: HTMLElement | null = null;
    for (const s of sections) {
      const r = s.getBoundingClientRect();
      if (r.top <= line && r.bottom > line) found = s;
    }
    const link = found ? spyLinks.find((l) => l.dataset.section === found!.id) ?? null : null;
    if (link === current) return;
    links.forEach((l) => l.removeAttribute('aria-current'));
    link?.setAttribute('aria-current', 'true');
    current = link;
    moveTo(current);
  };
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true },
  );
  update();
}

/* ---------- Scroll progress (spring-smoothed scaleX) ---------- */
function initProgress() {
  const bar = document.querySelector<HTMLElement>('[data-progress]');
  if (!bar) return;
  let target = 0;
  let current = 0;
  let raf = 0;
  const read = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    target = max > 0 ? Math.min(1, window.scrollY / max) : 0;
  };
  const tick = () => {
    current += (target - current) * (reduceMotion ? 1 : 0.18);
    bar.style.transform = `scaleX(${current.toFixed(4)})`;
    if (Math.abs(target - current) > 0.0005) raf = requestAnimationFrame(tick);
    else raf = 0;
  };
  const onScroll = () => {
    read();
    if (!raf) raf = requestAnimationFrame(tick);
  };
  read();
  tick();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
}

/* ---------- Rail TOC: thumb glides to the active section ---------- */
function initRail() {
  const rail = document.querySelector<HTMLElement>('[data-rail]');
  const thumb = rail?.querySelector<HTMLElement>('[data-rail-thumb]');
  if (!rail || !thumb) return;
  const links = [...rail.querySelectorAll<HTMLAnchorElement>('[data-rail-link]')];
  const sections = links
    .map((l) => document.getElementById(l.dataset.railLink!))
    .filter((s): s is HTMLElement => Boolean(s));

  const setActive = (id: string) => {
    const link = links.find((l) => l.dataset.railLink === id);
    if (!link) return;
    links.forEach((l) => l.removeAttribute('aria-current'));
    link.setAttribute('aria-current', 'true');
    thumb.style.opacity = '1';
    thumb.style.height = `${link.offsetHeight}px`;
    thumb.style.transform = `translateY(${link.offsetTop}px)`;
  };

  // Active = the last heading that has crossed 30% of the viewport.
  let ticking = false;
  let currentId = '';
  const update = () => {
    ticking = false;
    const line = window.innerHeight * 0.3;
    let active = sections[0];
    for (const s of sections) {
      if (s.getBoundingClientRect().top <= line) active = s;
      else break;
    }
    if (active && active.id !== currentId) {
      currentId = active.id;
      setActive(active.id);
    }
  };
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true },
  );
  window.addEventListener('resize', () => {
    currentId = '';
    update();
  });
  update();
}

/* ---------- Copy buttons on report code blocks ---------- */
function initCodeCopy() {
  document.querySelectorAll<HTMLPreElement>('.report pre:not(.mermaid)').forEach((pre) => {
    if (pre.dataset.language === 'mermaid' || pre.querySelector('code.language-mermaid')) return;
    const wrap = document.createElement('div');
    wrap.className = 'code-wrap';
    pre.replaceWith(wrap);
    wrap.appendChild(pre);
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'copy-code';
    btn.textContent = 'Copy';
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(pre.innerText);
        btn.textContent = 'Copied';
      } catch {
        btn.textContent = 'Select and copy';
      }
      window.setTimeout(() => (btn.textContent = 'Copy'), 1400);
    });
    wrap.appendChild(btn);
  });
}

/* ---------- Contest filters with a springy pill ---------- */
function initFilters() {
  const group = document.querySelector<HTMLElement>('[data-filters]');
  const list = document.querySelector<HTMLElement>('[data-contests]');
  if (!group || !list) return;
  const pill = group.querySelector<HTMLElement>('[data-pill]');
  const buttons = [...group.querySelectorAll<HTMLButtonElement>('[data-filter]')];
  const rows = [...list.querySelectorAll<HTMLElement>('[data-platform]')];

  const place = (btn: HTMLButtonElement) => {
    if (!pill) return;
    pill.style.width = `${btn.offsetWidth}px`;
    pill.style.transform = `translate(${btn.offsetLeft}px, ${btn.offsetTop - 4.8}px)`;
  };

  const apply = (btn: HTMLButtonElement) => {
    const value = btn.dataset.filter;
    buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
    place(btn);
    let i = 0;
    rows.forEach((row) => {
      const show = value === 'All' || row.dataset.platform === value;
      const wasHidden = row.classList.contains('is-hidden');
      row.classList.toggle('is-hidden', !show);
      if (show && !reduceMotion) {
        row.classList.add('is-entering');
        row.style.transitionDelay = `${Math.min(i, 12) * 25}ms`;
        requestAnimationFrame(() => requestAnimationFrame(() => row.classList.remove('is-entering')));
        i += 1;
      }
      void wasHidden;
    });
  };

  buttons.forEach((b) => b.addEventListener('click', () => apply(b)));
  const initial = buttons.find((b) => b.getAttribute('aria-pressed') === 'true') ?? buttons[0];
  if (initial) {
    requestAnimationFrame(() => place(initial));
    window.addEventListener('resize', () => {
      const active = buttons.find((b) => b.getAttribute('aria-pressed') === 'true');
      if (active) place(active);
    });
  }
}

/* ---------- Command palette (⌘K / Ctrl K / "/") ---------- */
function initPalette() {
  const root = document.querySelector<HTMLElement>('[data-cmdk]');
  const input = root?.querySelector<HTMLInputElement>('[data-cmdk-input]');
  const empty = root?.querySelector<HTMLElement>('[data-cmdk-empty]');
  if (!root || !input) return;
  const items = [...root.querySelectorAll<HTMLElement>('[data-cmdk-item]')];
  const groups = [...root.querySelectorAll<HTMLElement>('[data-cmdk-group]')];
  let active = 0;
  let lastFocus: Element | null = null;

  const isMac = /Mac|iPhone|iPad/.test(navigator.platform);
  document.querySelectorAll<HTMLElement>('[data-kbd]').forEach((k) => (k.textContent = isMac ? '⌘K' : 'Ctrl K'));

  const visibleItems = () => items.filter((i) => !i.hidden);

  const highlight = (index: number) => {
    const vis = visibleItems();
    if (vis.length === 0) return;
    active = (index + vis.length) % vis.length;
    vis.forEach((el, i) => el.querySelector('a')?.setAttribute('aria-selected', String(i === active)));
    vis[active].scrollIntoView({ block: 'nearest' });
  };

  const filter = () => {
    const q = input.value.trim().toLowerCase();
    const terms = q.split(/\s+/).filter(Boolean);
    items.forEach((i) => {
      const text = i.dataset.text ?? '';
      i.hidden = terms.length > 0 && !terms.every((t) => text.includes(t));
    });
    groups.forEach((g) => {
      g.hidden = !items.some((i) => i.dataset.group === g.dataset.cmdkGroup && !i.hidden);
    });
    empty?.classList.toggle('hidden', visibleItems().length > 0);
    highlight(0);
  };

  const open = () => {
    lastFocus = document.activeElement;
    root.dataset.open = 'true';
    root.setAttribute('aria-hidden', 'false');
    input.value = '';
    filter();
    input.focus({ preventScroll: true });
  };
  const close = () => {
    root.dataset.open = 'false';
    root.setAttribute('aria-hidden', 'true');
    (lastFocus as HTMLElement | null)?.focus?.();
  };

  document.querySelectorAll('[data-cmdk-open]').forEach((b) => b.addEventListener('click', open));
  root.addEventListener('click', (e) => {
    if (e.target === root) close();
  });
  input.addEventListener('input', filter);
  root.querySelectorAll('a').forEach((a) => a.addEventListener('click', close));
  items.forEach((item) =>
    item.addEventListener('pointermove', () => {
      const idx = visibleItems().indexOf(item);
      if (idx >= 0 && idx !== active) highlight(idx);
    }),
  );

  document.addEventListener('keydown', (e) => {
    const isOpen = root.dataset.open === 'true';
    if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !isOpen && !(e.target as HTMLElement).closest('input, textarea'))) {
      e.preventDefault();
      if (isOpen) close();
      else open();
      return;
    }
    if (!isOpen) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      close();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      highlight(active + 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      highlight(active - 1);
    } else if (e.key === 'Enter') {
      const link = visibleItems()[active]?.querySelector('a');
      if (link) {
        e.preventDefault();
        link.click();
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
    }
  });
}

initCopy();
initOdometers();
initReveal();
initSpotlight();
initNav();
initProgress();
initRail();
initCodeCopy();
initFilters();
initPalette();
