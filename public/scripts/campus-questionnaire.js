/* Preserve the original questionnaire as a separate, unchanged module. */
(() => {
  'use strict';
  const mount = document.getElementById('campus-questionnaire');
  if (!mount) return;
  const language = document.documentElement.lang;
  const failure = language === 'en' ? 'The questionnaire could not finish loading. Please reload or email anthony@westwardco.fr.' : language === 'es' ? 'El cuestionario no pudo cargarse. Recargue la página o escriba a anthony@westwardco.fr.' : 'Le questionnaire n’a pas pu terminer son chargement. Actualisez la page ou écrivez à anthony@westwardco.fr.';
  // Fail closed: never allow native GET submission to leak form data into a URL.
  document.addEventListener('submit', event => {
    if (event.target.id === 'campus-form' && document.body.dataset.campusReady !== 'true') {
      event.preventDefault(); event.stopImmediatePropagation();
      const status = event.target.querySelector('.formStatus');
      if (status) status.textContent = failure;
    }
  }, { capture: true });
  const loadScript = source => new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = source; script.async = false; script.onload = resolve; script.onerror = reject;
    document.head.append(script);
  });
  const style = document.createElement('link');
  style.rel = 'stylesheet'; style.href = '/styles/campus-navigation.css?v=20261012-1';
  document.head.append(style);
  loadScript('/scripts/campus-questionnaire-core.js?v=20260929-2')
    .then(() => loadScript('/scripts/campus-navigation.js?v=20261012-1'))
    .then(() => {
      if (document.body.dataset.campusReady !== 'true') throw new Error('Campus initialization incomplete');
      installCampusWhatsApp();
    })
    .catch(() => {
      const notice = document.createElement('p'); notice.setAttribute('role', 'alert'); notice.textContent = failure; mount.prepend(notice);
    });

  // A user-initiated contact link only: no tracking SDK, automatic message,
  // document upload or questionnaire answer is sent to WhatsApp by this code.
  function installCampusWhatsApp() {
    if (!document.body.classList.contains('campusSite')) return;
    const number = '33760512465';
    const displayNumber = '+33 7 60 51 24 65';
    const labels = {
      fr: {
        label: 'Échanger sur WhatsApp',
        message: 'Bonjour, je souhaite des informations sur l’accompagnement Westward Campus pour étudier aux États-Unis.',
        external: 'Ouvre WhatsApp dans un nouvel onglet'
      },
      en: {
        label: 'Chat on WhatsApp',
        message: 'Hello, I would like information about Westward Campus support for studying in the United States.',
        external: 'Opens WhatsApp in a new tab'
      },
      es: {
        label: 'Escribir por WhatsApp',
        message: 'Hola, quisiera información sobre el acompañamiento de Westward Campus para estudiar en Estados Unidos.',
        external: 'Abre WhatsApp en una pestaña nueva'
      }
    };
    const text = labels[language] || labels.fr;
    const href = `https://wa.me/${number}?text=${encodeURIComponent(text.message)}`;
    if (!document.getElementById('campus-whatsapp-style')) {
      const css = document.createElement('style');
      css.id = 'campus-whatsapp-style';
      css.textContent = `
        body.campusSite .welcomeLinks > a.campusWhatsApp,
        body.campusSite .requestIntro > a.campusWhatsApp,
        body.campusSite .dashboardAside > a.campusWhatsApp,
        body.campusSite .footerLinks > a.campusWhatsApp {
          display: flex; flex-direction: column; align-items: flex-start;
          gap: 4px; min-height: 48px; max-width: 100%; margin: 16px 0 0;
          padding: 14px 18px; border: 1px solid #A7AA91;
          background: #283129; color: #F4EFE6;
          text-decoration: none; text-transform: none; letter-spacing: 0;
          font: 500 13px/1.5 Inter, Arial, sans-serif;
        }
        body.campusSite a.campusWhatsApp > strong { font: inherit; font-weight: 600; }
        body.campusSite a.campusWhatsApp > span { font: inherit; font-size: 12px; color: #E9DFCF; }
        body.campusSite .footerLinks > a.campusWhatsApp { margin-top: 0; }
        body.campusSite a.campusWhatsApp:hover { background: #414E40; }
        body.campusSite a.campusWhatsApp:focus-visible { outline: 3px solid #A7AA91; outline-offset: 4px; }
      `;
      document.head.append(css);
    }
    const containers = document.querySelectorAll('.welcomeLinks, .requestIntro, .dashboardAside, .campusFooter .footerLinks');
    containers.forEach(container => {
      if (container.querySelector('a[data-campus-whatsapp]')) return;
      const link = document.createElement('a');
      link.className = container.classList.contains('welcomeLinks') ? 'campusWhatsApp campusGuide' : 'campusWhatsApp';
      link.dataset.campusWhatsapp = 'true';
      link.href = href;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.setAttribute('aria-label', `WhatsApp. ${text.external}.`);
const label = document.createElement('strong');
label.textContent = 'WhatsApp';
link.append(label);
link.style.alignItems = 'center';
      container.append(link);
    });
    const contactOption = document.querySelector('#campus-form input[name="format_contact"]');
    if (contactOption && !document.querySelector('#campus-form input[name="format_contact"][value="WhatsApp"]')) {
      const options = contactOption.closest('.choiceGrid');
      if (options) {
        const label = document.createElement('label');
        const radio = document.createElement('input');
        radio.type = 'radio'; radio.name = 'format_contact'; radio.value = 'WhatsApp'; radio.required = true;
        const caption = document.createElement('span'); caption.textContent = 'WhatsApp';
        label.append(radio, caption); options.append(label);
      }
    }
  }
  // Keep the contact available even if the questionnaire fails to load.
  installCampusWhatsApp();
})();
