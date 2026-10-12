/* Westward Co. homepage only. Native details remain usable without JavaScript. */
(() => {
  'use strict';
  const root = document.querySelector('.westwardPortal .categoryChooser');
  if (!root) return;
  const copy = {
    fr: { switcher: 'Choisir un univers', back: 'Retour aux univers', openMenu: 'Ouvrir le menu', closeMenu: 'Fermer le menu' },
    en: { switcher: 'Choose a world', back: 'Back to the worlds', openMenu: 'Open menu', closeMenu: 'Close menu' },
    es: { switcher: 'Elegir un universo', back: 'Volver a los universos', openMenu: 'Abrir el men\u00fa', closeMenu: 'Cerrar el men\u00fa' }
  };
  const text = copy[document.documentElement.lang] || copy.fr;
  const groups = Array.from(root.querySelectorAll(':scope > details.categoryPortal'));
  if (groups.length !== 2) return;
  const records = groups.map(group => {
    const summary = group.querySelector('summary');
    const content = group.querySelector('.categoryDetails');
    const heading = content?.querySelector('h3');
    const title = summary?.querySelector('.categoryTitle')?.cloneNode(true);
    if (!summary || !content || !heading || !title || !group.id) return null;
    title.querySelectorAll('br').forEach(br => br.replaceWith(' '));
    return { group, summary, content, heading, title: title.textContent.trim() };
  });
  if (records.some(record => !record)) return;
  const section = document.getElementById('projets');
  const sectionHeading = section.querySelector('h2');
  const controls = [];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const scrollTo = node => node.scrollIntoView({ behavior: reducedMotion.matches ? 'auto' : 'smooth', block: 'start' });
  const focusOn = node => {
    node.setAttribute('tabindex', '-1');
    node.focus({ preventScroll: true });
  };
  function updateControls() {
    controls.forEach(({ button, record }) => button.setAttribute('aria-pressed', String(record.group.open)));
  }
  function setHash(id) {
    const hash = `#${id}`;
    if (location.hash !== hash) history.pushState(null, '', hash);
  }
  function openRecord(record, { navigate = false, scroll = false, focus = false } = {}) {
    records.forEach(other => { other.group.open = other === record; });
    updateControls();
    if (navigate) setHash(record.group.id);
    if (focus) focusOn(record.heading);
    if (scroll) scrollTo(record.content);
  }
  function goBack() {
    records.forEach(record => { record.group.open = false; });
    updateControls();
    setHash('projets');
    focusOn(sectionHeading);
    scrollTo(section);
  }
  records.forEach(record => {
    record.content.id = `${record.group.id}-activites`;
    const toolbar = document.createElement('nav');
    toolbar.className = 'portalToolbar';
    toolbar.setAttribute('aria-label', text.switcher);
    records.forEach(target => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'portalSwitch';
      button.textContent = target.title;
      button.setAttribute('aria-controls', `${target.group.id}-activites`);
      button.addEventListener('click', () => openRecord(target, { navigate: true, scroll: true, focus: true }));
      toolbar.append(button);
      controls.push({ button, record: target });
    });
    const back = document.createElement('button');
    back.type = 'button';
    back.className = 'portalBack';
    back.textContent = text.back;
    back.addEventListener('click', goBack);
    toolbar.append(back);
    record.content.prepend(toolbar);
    const bottomBack = back.cloneNode(true);
    bottomBack.classList.add('portalBackBottom');
    bottomBack.addEventListener('click', goBack);
    record.content.append(bottomBack);
    record.summary.addEventListener('click', event => {
      event.preventDefault();
      if (record.group.open) {
        record.group.open = false;
        updateControls();
        setHash('projets');
        record.summary.focus({ preventScroll: true });
        record.summary.scrollIntoView({ behavior: reducedMotion.matches ? 'auto' : 'smooth', block: 'nearest' });
      } else {
        // Keyboard disclosure keeps focus on the native summary.
        openRecord(record, { navigate: true, scroll: event.detail > 0 });
      }
    });
    record.group.addEventListener('toggle', () => {
      if (record.group.open) records.forEach(other => {
        if (other !== record) other.group.open = false;
      });
      updateControls();
    });
  });
  function readHash() {
    const record = records.find(item => `#${item.group.id}` === location.hash);
    if (record) openRecord(record, { scroll: true });
    else if (location.hash === '#projets' || !location.hash) {
      records.forEach(item => { item.group.open = false; });
      updateControls();
    }
  }
  window.addEventListener('hashchange', readHash);
  readHash();
  updateControls();

  // Scope these fixes to the portal; the shared site script is unchanged.
  const header = document.getElementById('site-header');
  const menu = document.getElementById('mobile-menu');
  const menuButton = header?.querySelector('.menuButton');
  if (header && menu && menuButton) {
    const syncMenu = () => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-label', isOpen ? text.closeMenu : text.openMenu);
      header.classList.toggle('portalMenuOpen', isOpen);
    };
    new MutationObserver(syncMenu).observe(menuButton, { attributes: true, attributeFilter: ['aria-expanded'] });
    syncMenu();
    const closeMenu = () => {
      if (menuButton.getAttribute('aria-expanded') === 'true') menuButton.click();
    };
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
        closeMenu();
        menuButton.focus();
      }
    });
    document.addEventListener('click', event => {
      if (!header.contains(event.target)) closeMenu();
    });
    window.matchMedia('(max-width: 900px)').addEventListener('change', event => {
      if (!event.matches) closeMenu();
    });
  }
})();
