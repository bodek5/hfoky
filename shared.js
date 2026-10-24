(() => {
  const themeKey = 'hfoky-theme';
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
  const sunIcon = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4.2"></circle><path d="M12 2.5v2.2M12 19.3v2.2M4.93 4.93l1.56 1.56M17.51 17.51l1.56 1.56M2.5 12h2.2M19.3 12h2.2M4.93 19.07l1.56-1.56M17.51 6.49l1.56-1.56"></path></svg>';
  const moonIcon = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.2A7.8 7.8 0 0 1 9.8 4a8.1 8.1 0 1 0 10.2 10.2Z"></path></svg>';

  function applyTheme(mode) {
    const isDark = mode === 'dark';
    document.body.classList.toggle('dark-mode', isDark);
    if (themeIcon) themeIcon.innerHTML = isDark ? moonIcon : sunIcon;
    if (themeToggle) {
      themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      themeToggle.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      themeToggle.setAttribute('aria-pressed', String(isDark));
    }
  }

  function getStoredTheme() {
    try {
      const saved = localStorage.getItem(themeKey);
      if (saved === 'light' || saved === 'dark') return saved;
    } catch (error) {}
    return systemTheme.matches ? 'dark' : 'light';
  }

  applyTheme(getStoredTheme());

  themeToggle?.addEventListener('click', () => {
    const nextTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
    try { localStorage.setItem(themeKey, nextTheme); } catch (error) {}
    applyTheme(nextTheme);
  });

  systemTheme.addEventListener?.('change', (event) => {
    try {
      if (!localStorage.getItem(themeKey)) applyTheme(event.matches ? 'dark' : 'light');
    } catch (error) {}
  });

  window.addEventListener('storage', (event) => {
    if (event.key === themeKey && (event.newValue === 'light' || event.newValue === 'dark')) {
      applyTheme(event.newValue);
    }
  });
})();

if (document.getElementById('article-list')) {
  const socialLinks = [
    { label: 'Discord', href: 'https://discord.gg/mWHV4y24eX', subtitle: 'Group', image: 'discord.jpg' },
    { label: 'Telegram', href: 'https://t.me/+diqLwSX2iq4xYTg8', subtitle: 'Group chat', image: 'telegram.jpg' },
    { label: 'TikTok', href: 'https://www.tiktok.com/@bodek5_huawei', subtitle: 'My account', image: 'tiktok.jpg' }
  ];
  const articles = [
    { img: 'pliki/hfoky-app.jpg', title: 'Hfoky App', teaser: 'A concept for tracking costs and calculating profit from flipping items', page: 'hfoky-app.html' },
    { img: 'pliki/HarmonyTuto.jpg', title: 'EMUI --> HarmonyOS convert tutorial!', teaser: 'Fast tutorial with KirinTool', page: 'HarmonyOS-convert.html' },
    { img: 'pliki/newwebsite.png', title: 'New Website!', teaser: 'New Website!', page: 'New-website.html' },
    { img: 'pliki/metrolink.jpg', title: 'My old Windows Phone app - MetroLink (no longer updated)', teaser: 'My old Windows Phone app - MetroLink (no longer updated)', page: 'MetroLink.html' }
  ];

  const renderSocialLinks = () => {
    const container = document.getElementById('quick-links');
    if (!container) return;
    container.innerHTML = socialLinks.map((item) => `
      <div class="link-card">
        <a href="${item.href}" aria-label="Open ${item.label}" target="_blank" rel="noopener noreferrer">
          <span class="social-icon"><img src="pliki/${item.image}" alt="${item.label}" loading="lazy" onerror="this.style.display='none';"></span>
          <span class="link-copy"><strong>${item.label}</strong><span>${item.subtitle}</span></span>
        </a>
      </div>
    `).join('');
  };

  const renderArticles = () => {
    const list = document.getElementById('article-list');
    if (!list) return;
    list.innerHTML = articles.map((article, index) => `
      <article class="product-card article-card" data-index="${index}" tabindex="0" aria-label="Read ${article.title}">
        <div class="product-thumb"><img src="${article.img}" alt="${article.title}" loading="lazy" onerror="this.src='logo.png'"></div>
        <div class="product-info"><h3>${article.title}</h3><p class="teaser">${article.teaser}</p><p class="price">Read →</p></div>
      </article>
    `).join('');
  };

  const openArticle = (index) => {
    const article = articles[index];
    if (!article) return;
    sessionStorage.setItem('hfoky-home-scroll', String(window.scrollY));
    window.location.href = article.page;
  };

  const initHome = () => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    const savedScroll = Number(sessionStorage.getItem('hfoky-home-scroll') || 0);
    if (savedScroll > 0) requestAnimationFrame(() => window.scrollTo({ top: savedScroll, behavior: 'auto' }));
    renderSocialLinks();
    renderArticles();
    setTimeout(() => {
      document.getElementById('loadingOverlay')?.classList.add('hidden');
      document.body.classList.add('loaded');
    }, 280);

    document.getElementById('article-list')?.addEventListener('click', (event) => {
      const card = event.target.closest('.product-card');
      if (card) {
        card.classList.add('animating');
        setTimeout(() => card.classList.remove('animating'), 400);
        openArticle(Number(card.dataset.index));
      }
    });
    document.getElementById('article-list')?.addEventListener('keydown', (event) => {
      const card = event.target.closest('.product-card');
      if (card && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault();
        openArticle(Number(card.dataset.index));
      }
    });

    const bottomLinks = document.querySelectorAll('.bottom-nav-link');
    const bottomNav = document.getElementById('bottom-nav');
    let manualNavIndex = null;
    let navReleaseTimer;
    const setActive = (index) => {
      bottomNav.style.setProperty('--active-index', String(index));
      bottomLinks.forEach((link, linkIndex) => link.classList.toggle('active', linkIndex === index));
    };
    const updateActive = () => {
      const y = window.scrollY + 100;
      const readSection = document.getElementById('read');
      const linksSection = document.getElementById('links');
      if (manualNavIndex === null) setActive(linksSection && y >= linksSection.offsetTop ? 2 : readSection && y >= readSection.offsetTop ? 1 : 0);
    };
    bottomLinks.forEach((link, index) => link.addEventListener('click', (event) => {
      event.preventDefault();
      manualNavIndex = index;
      setActive(index);
      const target = document.getElementById(index === 0 ? 'top' : index === 1 ? 'read' : 'links');
      if (target) window.scrollTo({ top: Math.max(0, target.offsetTop - 52), behavior: 'smooth' });
      clearTimeout(navReleaseTimer);
      navReleaseTimer = setTimeout(() => { manualNavIndex = null; updateActive(); }, 700);
    }));
    window.addEventListener('scroll', () => {
      sessionStorage.setItem('hfoky-home-scroll', String(window.scrollY));
      if (manualNavIndex === null) updateActive();
      else {
        clearTimeout(navReleaseTimer);
        navReleaseTimer = setTimeout(() => { manualNavIndex = null; updateActive(); }, 180);
      }
    }, { passive: true });
    window.addEventListener('load', updateActive);
  };

  document.addEventListener('DOMContentLoaded', initHome);
}
