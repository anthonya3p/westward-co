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
  const languageMenus = [...document.querySelectorAll('.languageNav, .mobileLang')];
  languageMenus.forEach(languageMenu => {
    languageMenu.addEventListener('toggle', () => {
      if (languageMenu.open) languageMenus.forEach(other => {
        if (other !== languageMenu) other.removeAttribute('open');
      });
    });
  });
  document.addEventListener('click', event => {
    languageMenus.forEach(languageMenu => {
      if (!languageMenu.contains(event.target)) languageMenu.removeAttribute('open');
    });
  });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    languageMenus.forEach(languageMenu => {
      if (languageMenu.open) {
        languageMenu.removeAttribute('open');
        languageMenu.querySelector('summary')?.focus();
      }
    });
  });
  const form = document.getElementById('contact-form');
  form?.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const lang = document.documentElement.lang;
    const labels = lang === 'en' ? {name:'Name',email:'Email'} : lang === 'es' ? {name:'Nombre',email:'Correo electrónico'} : {name:'Nom',email:'Email'};
    const subject = encodeURIComponent(String(data.get('objet') || 'Contact Westward Co.'));
    const body = encodeURIComponent(`${labels.name} : ${data.get('nom') || ''}\n${labels.email} : ${data.get('email') || ''}\n\n${data.get('message') || ''}`);
    window.location.href = `mailto:anthony@westwardco.fr?subject=${subject}&body=${body}`;
  });
  const campusForm = document.getElementById('campus-form');
  campusForm?.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(campusForm);
    const lang = document.documentElement.lang;
    const labels = lang === 'en'
      ? {subject:'Study project — Westward Co. Campus',name:'Name',email:'Email',phone:'Phone',situation:'Current situation',intake:'Planned intake',project:'Project',empty:'Not provided'}
      : lang === 'es'
        ? {subject:'Proyecto de estudios — Westward Co. Campus',name:'Nombre',email:'Correo electrónico',phone:'Teléfono',situation:'Situación actual',intake:'Inicio previsto',project:'Proyecto',empty:'No indicado'}
        : {subject:'Projet d’études — Westward Co. Campus',name:'Nom',email:'E-mail',phone:'Téléphone',situation:'Situation',intake:'Rentrée envisagée',project:'Projet',empty:'Non renseigné'};
    const subject = encodeURIComponent(labels.subject);
    const body = encodeURIComponent(
      `${labels.name} : ${data.get('nom') || ''}\n` +
      `${labels.email} : ${data.get('email') || ''}\n` +
      `${labels.phone} : ${data.get('telephone') || labels.empty}\n` +
      `${labels.situation} : ${data.get('situation') || ''}\n` +
      `${labels.intake} : ${data.get('rentree') || labels.empty}\n\n` +
      `${labels.project} :\n${data.get('message') || ''}`
    );
    window.location.href = `mailto:anthony@westwardco.fr?subject=${subject}&body=${body}`;
  });
})();
