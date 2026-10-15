// Too Many Bios: one bio at a time, as big as the window allows, in a new face and colours each time
// (the badvice and lists lists looks). Tap, click, space or → (or swipe left) for the next bio; ← (or swipe
// right) goes back. Every bio shows once before any repeats, and the round carries on across visits (kept
// in this browser only). Each bio has its own address, /23/; old Tumblr links, /post/<id>/23, find theirs.
// ?font=Name forces a face for the first bio.
(() => {
  "use strict";
  const BIOS = JSON.parse(document.getElementById("bios").textContent);
  if (!BIOS.length) return;
  const main = document.getElementById("bio");
  const numLabel = document.getElementById("num");
  const fontLabel = document.getElementById("font");
  const pick = a => a[Math.floor(Math.random() * a.length)];
  const rand = (lo, hi) => lo + Math.random() * (hi - lo);
  const params = new URLSearchParams(location.search);
  const numOf = loc => +((loc.pathname.match(/^\/(?:post\/\d+\/)?(\d+)(?:\/[^/]*)?\/?$/) ||
                          loc.hash.match(/^#(\d+)$/) || [])[1] || 0);
  const indexOf = n => BIOS.findIndex(b => b.n === n);

  // The round: bios already shown since every bio last came up, kept so a return visit carries on.
  const KEY = "toomanybios-round";
  function loadRound() {
    try { return new Set(JSON.parse(localStorage.getItem(KEY) || "[]")); } catch (e) { return new Set(); }
  }
  function saveRound() {
    try { localStorage.setItem(KEY, JSON.stringify([...round])); } catch (e) { /* private mode: this visit only */ }
  }
  let round = loadRound();
  function draw(avoid) {
    let left = BIOS.map((b, i) => i).filter(i => !round.has(BIOS[i].n));
    if (!left.length) {                      // everything shown: new round, never the same bio twice in a row
      round = new Set();
      left = BIOS.map((b, i) => i).filter(i => i !== avoid);
    }
    return pick(left);
  }
  function mark(i) { round.add(BIOS[i].n); saveRound(); }

  const shown = [];          // this visit's history, for ←
  let at = -1;

  let font = null, paper = null;
  const loaded = {};
  function loadFont(f) {
    if (!loaded[f]) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=" + encodeURIComponent(f).replace(/%20/g, "+") +
        ":ital@0;1&display=block";
      document.head.appendChild(link);
      loaded[f] = new Promise(res => { link.onload = res; link.onerror = res; })
        .then(() => document.fonts.load(`400 48px "${f}"`)).catch(() => {});
    }
    return Promise.race([loaded[f], new Promise(res => setTimeout(res, 3000))]);
  }

  // largest size at which the bio fits the window without any word poking out the side
  function fit() {
    const p = main.querySelector("p");
    const cs = getComputedStyle(main);
    const h = main.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
    let lo = 10, hi = 400;
    for (let i = 0; i < 20; i++) {
      const s = (lo + hi) / 2;
      p.style.fontSize = s + "px";
      p.style.overflowWrap = "normal";
      if (p.scrollHeight <= h && p.scrollWidth <= p.clientWidth + 1) lo = s; else hi = s;
    }
    p.style.fontSize = Math.floor(lo) + "px";
    // only a single word too long for the window even at the smallest size may break
    p.style.overflowWrap = p.scrollWidth > p.clientWidth + 1 ? "anywhere" : "normal";
  }

  async function show(i, push) {
    const p = main.querySelector("p");
    p.classList.add("out");
    font = (font === null && params.get("font")) || pick(FONTS.filter(f => f !== font));
    paper = pick(PAPERS.filter(x => x !== paper));
    await Promise.all([loadFont(font), new Promise(r => setTimeout(r, 150))]);
    document.body.style.background = paper[0];
    document.body.style.color = paper[1];
    document.body.style.fontFamily = `"${font}", Georgia, serif`;
    p.textContent = BIOS[i].text;            // casing and wording exactly as written
    p.style.fontStyle = Math.random() < .15 ? "italic" : "normal";
    p.style.letterSpacing = rand(-.02, .03).toFixed(3) + "em";
    p.style.lineHeight = rand(1.1, 1.35).toFixed(2);
    p.style.textAlign = "left";   // always left, like badvice and lists lists
    numLabel.textContent = "#" + BIOS[i].n;
    fontLabel.textContent = font;
    document.title = "#" + BIOS[i].n + " · Too Many Bios for Simon Goetz";
    fit();
    p.classList.remove("out");
    // a face that finishes loading after the first fit has different widths: fit again once it's in
    const f = font;
    document.fonts.ready.then(() => { if (f === font) fit(); });
    setTimeout(() => { if (f === font) fit(); }, 600);
    const path = "/" + BIOS[i].n + "/";
    if (location.pathname !== path || location.hash) history[push ? "pushState" : "replaceState"](null, "", path + location.search);
  }

  function next() {
    if (at < shown.length - 1) { at++; return show(shown[at], true); }
    const i = draw(shown[at]);
    mark(i);
    shown.push(i); at = shown.length - 1;
    return show(i, true);
  }
  function back() {
    if (at > 0) { at--; show(shown[at], true); }
  }

  // start on the linked bio, else the next one in this browser's round
  const linked = indexOf(numOf(location));
  const first = linked >= 0 ? linked : draw();
  mark(first);
  shown.push(first); at = 0;
  show(first, false);

  // swipes: left = next, right = back; a swipe never also counts as a tap
  let x0 = null, y0 = 0, swiped = 0;
  document.addEventListener("touchstart", e => { const t = e.touches[0]; x0 = t.clientX; y0 = t.clientY; }, { passive: true });
  document.addEventListener("touchend", e => {
    if (x0 === null) return;
    const t = e.changedTouches[0], dx = t.clientX - x0, dy = t.clientY - y0;
    x0 = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      swiped = Date.now();
      dx < 0 ? next() : back();
    }
  }, { passive: true });
  document.addEventListener("click", e => {
    if (e.target.closest("a") || Date.now() - swiped < 500) return;   // the site link just opens
    next();
  });
  document.addEventListener("keydown", e => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key === " " || e.key === "ArrowRight" || e.key === "Enter") { e.preventDefault(); next(); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); back(); }
  });
  window.addEventListener("popstate", () => {
    const i = indexOf(numOf(location));
    if (i >= 0) show(i, false);
  });
  let rt;
  window.addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(fit, 120); });
})();
