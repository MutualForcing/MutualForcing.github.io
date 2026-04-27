/* =============================================
   MUTUAL FORCING — Demo Page Scripts
   ============================================= */

/* ---- 1. Sticky top nav (shows after hero) ---- */
(function initTopNav() {
  const nav = document.createElement('nav');
  nav.className = 'topnav';
  nav.innerHTML = `
    <span class="topnav-title">Mutual Forcing</span>
    <ul class="topnav-links">
      <li><a href="#abstract">Abstract</a></li>
      <li><a href="#method">Method</a></li>
      <li><a href="#singing">Singing</a></li>
      <li><a href="#bgm">BGM</a></li>
      <li><a href="#speaking">Speaking</a></li>
      <li><a href="#animal">Animal</a></li>
      <li><a href="#longvideo">Long Video</a></li>
      <li><a href="#citation">Citation</a></li>
    </ul>
  `;
  document.body.prepend(nav);

  const heroEl = document.querySelector('.hero');

  const observer = new IntersectionObserver(
    ([entry]) => {
      nav.classList.toggle('show', !entry.isIntersecting);
    },
    { threshold: 0.1 }
  );

  if (heroEl) observer.observe(heroEl);
})();


/* ---- 2. Scroll fade-in for .fade-in elements ---- */
(function initFadeIn() {
  const targets = document.querySelectorAll('.fade-in, .method-card');

  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach(el => observer.observe(el));
})();


/* ---- 3. Copy BibTeX ---- */
function copyBibtex() {
  const pre = document.getElementById('bibtex-content');
  const btn = document.querySelector('.copy-btn');

  if (!pre || !btn) return;

  navigator.clipboard.writeText(pre.textContent.trim()).then(() => {
    btn.textContent = '✅ Copied!';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = '📋 Copy';
      btn.classList.remove('copied');
    }, 2200);
  }).catch(() => {
    /* fallback for older browsers */
    const range = document.createRange();
    range.selectNode(pre);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    btn.textContent = '✅ Copied!';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = '📋 Copy';
      btn.classList.remove('copied');
    }, 2200);
  });
}


/* ---- 4. Lazy-load videos on scroll ---- */
(function initLazyVideo() {
  const videos = document.querySelectorAll('video[preload="none"]');

  if (!videos.length || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const video = entry.target;
          video.preload = 'metadata';
          observer.unobserve(video);
        }
      });
    },
    { rootMargin: '200px 0px' }
  );

  videos.forEach(v => observer.observe(v));
})();


/* ---- 5. Pause all other videos when one plays ---- */
(function initVideoExclusive() {
  document.addEventListener('play', (e) => {
    if (e.target.tagName !== 'VIDEO') return;
    document.querySelectorAll('video').forEach(v => {
      if (v !== e.target && !v.paused) v.pause();
    });
  }, true);
})();


/* ---- 6. Smooth anchor scroll offset (compensate sticky nav) ---- */
(function initAnchorOffset() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 64; // topnav height + padding
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();
