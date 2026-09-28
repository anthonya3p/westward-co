(() => {
  const header = document.getElementById('site-header');
  const menu = document.getElementById('mobile-menu');
  const button = header?.querySelector('.menuButton');
  if (header && menu && button) {
    button.addEventListener('click', () => {
      const open = button.getAttribute('aria-expanded') !== 'true';
      button.setAttribute('aria-expanded', String(open));
      button.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
      menu.hidden = !open;
    });
    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      menu.hidden = true;
      button.setAttribute('aria-expanded', 'false');
      button.setAttribute('aria-label', 'Ouvrir le menu');
    }));
    let lastY = window.scrollY;
    window.addEventListener('scroll', () => {
      const nextY = window.scrollY;
      header.classList.toggle('headerHidden', nextY > lastY && nextY > 120);
      lastY = nextY;
    }, { passive: true });
  }
  const form = document.getElementById('contact-form');
  form?.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const subject = encodeURIComponent(String(data.get('objet') || 'Contact Westward Co.'));
    const body = encodeURIComponent(`Nom : ${data.get('nom') || ''}\nEmail : ${data.get('email') || ''}\n\n${data.get('message') || ''}`);
    window.location.href = `mailto:anthony@westwardco.fr?subject=${subject}&body=${body}`;
  });
})();
