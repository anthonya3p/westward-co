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
  const formMessages = {
    fr: {sending:'Envoi en cours…',success:'Merci, votre demande a bien été envoyée.',fallback:'L’envoi direct est temporairement indisponible. Votre messagerie va s’ouvrir avec le message préparé.',error:'L’envoi n’a pas abouti. Vous pouvez écrire à anthony@westwardco.fr.'},
    en: {sending:'Sending…',success:'Thank you, your request has been sent.',fallback:'Direct sending is temporarily unavailable. Your email application will open with a prepared message.',error:'Your request could not be sent. You can email anthony@westwardco.fr.'},
    es: {sending:'Enviando…',success:'Gracias, su solicitud ha sido enviada.',fallback:'El envío directo no está disponible temporalmente. Su aplicación de correo se abrirá con el mensaje preparado.',error:'No se ha podido enviar su solicitud. Puede escribir a anthony@westwardco.fr.'}
  };

  function mailtoFor(form, type) {
    const data = new FormData(form);
    const lang = document.documentElement.lang;
    const labels = lang === 'en'
      ? {subject:'Study project — Westward Co. Campus',name:'Name',email:'Email',phone:'Phone',situation:'Current situation',intake:'Planned intake',project:'Project',empty:'Not provided'}
      : lang === 'es'
        ? {subject:'Proyecto de estudios — Westward Co. Campus',name:'Nombre',email:'Correo electrónico',phone:'Teléfono',situation:'Situación actual',intake:'Inicio previsto',project:'Proyecto',empty:'No indicado'}
        : {subject:'Projet d’études — Westward Co. Campus',name:'Nom',email:'E-mail',phone:'Téléphone',situation:'Situation',intake:'Rentrée envisagée',project:'Projet',empty:'Non renseigné'};
    if (type === 'campus') {
      const body = `${labels.name} : ${data.get('nom') || ''}\n${labels.email} : ${data.get('email') || ''}\n${labels.phone} : ${data.get('telephone') || labels.empty}\n${labels.situation} : ${data.get('situation') || ''}\n${labels.intake} : ${data.get('rentree') || labels.empty}\n\n${labels.project} :\n${data.get('message') || ''}`;
      return `mailto:anthony@westwardco.fr?subject=${encodeURIComponent(labels.subject)}&body=${encodeURIComponent(body)}`;
    }
    const nameLabel = lang === 'es' ? 'Nombre' : lang === 'en' ? 'Name' : 'Nom';
    const emailLabel = lang === 'es' ? 'Correo electrónico' : 'Email';
    const subject = String(data.get('objet') || 'Contact Westward Co.');
    const body = `${nameLabel} : ${data.get('nom') || ''}\n${emailLabel} : ${data.get('email') || ''}\n\n${data.get('message') || ''}`;
    return `mailto:anthony@westwardco.fr?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  function enableDirectSubmission(form, type) {
    if (!form) return;
    form.addEventListener('submit', async event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const lang = ['fr','en','es'].includes(document.documentElement.lang) ? document.documentElement.lang : 'fr';
      const messages = formMessages[lang];
      const status = form.querySelector('.formStatus');
      const button = form.querySelector('button[type="submit"]');
      const originalLabel = button.textContent;
      const payload = Object.fromEntries(new FormData(form).entries());
      payload.type = type;
      status.className = 'formStatus';
      status.textContent = messages.sending;
      button.disabled = true;
      button.textContent = messages.sending;
      try {
        const response = await fetch('/api/contact', { method:'POST', headers:{'content-type':'application/json'}, body:JSON.stringify(payload) });
        const result = await response.json().catch(() => ({}));
        if (!response.ok) {
          if (result.code === 'email_not_configured' || response.status >= 500) {
            status.classList.add('isError');
            status.textContent = messages.fallback;
            window.location.href = mailtoFor(form, type);
            return;
          }
          throw new Error('invalid-request');
        }
        form.reset();
        status.classList.add('isSuccess');
        status.textContent = messages.success;
      } catch {
        status.classList.add('isError');
        status.textContent = messages.error;
      } finally {
        button.disabled = false;
        button.textContent = originalLabel;
      }
    });
  }

  enableDirectSubmission(document.getElementById('contact-form'), 'contact');
  enableDirectSubmission(document.getElementById('campus-form'), 'campus');
})();
