/* Campus-only navigation and form enhancement. No customer account is simulated. */
(() => {
  'use strict';
  const body = document.body;
  const mount = document.getElementById('campus-questionnaire');
  const form = document.getElementById('campus-form');
  const main = document.querySelector('.campusSite > main');
  if (!body.classList.contains('campusSite') || !mount || !form || !main) return;
  const lang = ['fr', 'en', 'es'].includes(document.documentElement.lang) ? document.documentElement.lang : 'fr';
  const copy = {
    fr: {
      nav: ['Pourquoi ?', 'Choisir mon école', 'Tableau de bord', 'Mon accompagnement'],
      descriptions: ['Une expérience de père, un engagement pour les familles.', 'Faire le point sur mon profil, mes envies et mon budget.', 'Organiser ma préparation avec une checklist personnelle.', 'Comprendre la méthode, les formules et les prochaines étapes.'],
      point: 'Votre projet, étape par étape', guide: 'Télécharger le guide gratuit', back: 'Retour à l’accueil', start: 'Préparer mon projet',
      whyTitle: 'Une expérience vécue. Un projet à construire.', whyLead: 'Comprendre les choix, préparer les démarches et avancer en famille, sans promesse irréaliste.',
      story: 'Westward Campus est né de mon expérience de père : accompagner mon fils Enzo dans ses études et son installation aux États-Unis. Les questions que nous avons rencontrées sont devenues le point de départ de cet accompagnement.',
      choiceTitle: 'Une école qui correspond à votre projet.', choiceLead: 'Votre profil, vos objectifs, votre budget et vos préférences : ce questionnaire prépare une recherche personnalisée. Il ne constitue ni une candidature universitaire ni une promesse d’admission.',
      supportTitle: 'Une méthode claire, du premier choix au départ.', supportLead: 'Réseau partenaire ou accompagnement sur mesure : les conditions et la rémunération sont expliquées avant tout engagement.', method: 'Notre méthode',
      boardTitle: 'Ma préparation, étape par étape.', boardLead: 'Une checklist personnelle pour organiser votre projet. Les cases sont renseignées par vous : elles ne représentent pas une validation par Westward Campus ou par une université.',
      tasks: ['Définir mes objectifs et ma rentrée souhaitée', 'Préparer mes résultats scolaires et mes bulletins', 'Évaluer mon anglais et mon budget annuel', 'Compléter le questionnaire de mon projet', 'Échanger avec mon conseiller sur les établissements', 'Confirmer les prochaines démarches avec les interlocuteurs concernés'],
      progress: 'étapes cochées', save: 'Conserver uniquement mes cases cochées dans ce navigateur', storage: 'Sans cette option, la checklist est effacée en quittant la page. Aucun nom, aucune réponse au questionnaire et aucun document ne sont enregistrés ici. Pas de synchronisation entre appareils.', storageError: 'Ce navigateur ne permet pas l’enregistrement. Votre checklist reste disponible pendant cette visite.', reset: 'Réinitialiser ma checklist', resetConfirm: 'Effacer toutes les cases cochées de cette checklist ?',
      secureTitle: 'Espace client et documents', secure: 'L’espace client connecté et le dépôt sécurisé des bulletins ne sont pas encore activés. Cette checklist ne transmet rien au conseiller. Contactez-nous pour convenir de la prochaine étape.', contact: 'Écrire à mon conseiller',
      formHelp: 'Les réponses marquées * sont obligatoires. Indiquez « Aucun » ou « À définir » lorsque c’est pertinent. Les questions complémentaires s’adaptent à vos réponses.', parent: 'Coordonnées du parent ou du représentant requises dans cette situation.', currency: 'Devise du budget annuel', tests: ['Pas encore passé', 'Duolingo English Test', 'TOEFL', 'IELTS', 'Autre'],
      documents: 'Préparez vos bulletins pour l’étude de votre dossier. Ne joignez ici aucun document scolaire, bancaire ou d’identité : le dépôt sécurisé n’est pas encore activé.',
      privacy: 'Vos réponses restent dans cette page jusqu’à votre action d’envoi. Aucune sauvegarde automatique du questionnaire n’est effectuée. Relisez le récapitulatif avant de choisir un mode d’envoi.', review: 'Vérifier ma demande', reviewTitle: 'Relisez votre demande avant l’envoi.', reviewHelp: 'Rien n’a encore été envoyé. Vous pouvez corriger les réponses, puis choisir l’envoi direct ou votre messagerie.', send: 'Envoyer ma demande', email: 'Ouvrir ma messagerie', download: 'Enregistrer mon récapitulatif', sending: 'Envoi en cours…', sent: 'Votre demande a bien été envoyée. Cela ne constitue pas une candidature universitaire.', failed: 'Aucune confirmation d’envoi reçue. Utilisez votre messagerie ou enregistrez le récapitulatif pour le transmettre à anthony@westwardco.fr.', tooLong: 'Le récapitulatif est trop long. Raccourcissez vos réponses avant de continuer.', subject: 'Projet d’études - Westward Campus',
      openMenu: 'Ouvrir le menu', closeMenu: 'Fermer le menu'
    },
    en: {
      nav: ['Why Campus?', 'Choose my school', 'Dashboard', 'My support'], descriptions: ['A father’s experience, a commitment to families.', 'Review my profile, goals and budget.', 'Organise my preparation with a personal checklist.', 'Understand the method, options and next steps.'], point: 'Your project, step by step', guide: 'Download the free guide', back: 'Back to home', start: 'Prepare my project',
      whyTitle: 'Real experience. A project to build.', whyLead: 'Understand your options, prepare each step and move forward as a family, without unrealistic promises.', story: 'Westward Campus grew from my experience as a father, helping my son Enzo prepare for his studies and settle in the United States. The questions we faced became the starting point for this support.',
      choiceTitle: 'A school that fits your project.', choiceLead: 'Your background, goals, budget and preferences: this questionnaire prepares a personalised search. It is not a university application or a promise of admission.', supportTitle: 'A clear method, from the first choice to departure.', supportLead: 'Partner network or tailored support: terms and compensation are explained before any commitment.', method: 'Our method',
      boardTitle: 'My preparation, step by step.', boardLead: 'A personal checklist to organise your project. You check these boxes yourself: they do not represent approval by Westward Campus or a university.', tasks: ['Define my goals and preferred intake', 'Prepare my grades and school reports', 'Assess my English and annual budget', 'Complete my project questionnaire', 'Discuss institutions with my adviser', 'Confirm the next steps with the relevant contacts'], progress: 'steps checked', save: 'Keep only my checked boxes in this browser', storage: 'Without this option, the checklist is cleared when you leave. No names, questionnaire answers or documents are saved here. There is no cross-device synchronisation.', storageError: 'This browser cannot save the checklist. It remains available for this visit.', reset: 'Reset my checklist', resetConfirm: 'Clear all checked boxes in this checklist?', secureTitle: 'Client area and documents', secure: 'The signed-in client area and secure school-report upload are not active yet. This checklist sends nothing to your adviser. Contact us to agree on the next step.', contact: 'Email my adviser',
      formHelp: 'Fields marked * are required. Enter “None” or “To be decided” where appropriate. Follow-up questions adapt to your answers.', parent: 'Parent or guardian contact details are required in this situation.', currency: 'Annual budget currency', tests: ['Not taken yet', 'Duolingo English Test', 'TOEFL', 'IELTS', 'Other'], documents: 'Prepare your school reports for the review of your project. Do not attach school, financial or identity documents here: secure upload is not active yet.', privacy: 'Your answers remain on this page until you choose to send them. The questionnaire is not saved automatically. Review the summary before choosing how to send it.', review: 'Review my request', reviewTitle: 'Review your request before sending.', reviewHelp: 'Nothing has been sent yet. You can edit your answers, then choose direct sending or your email app.', send: 'Send my request', email: 'Open my email app', download: 'Save my summary', sending: 'Sending…', sent: 'Your request has been sent. This is not a university application.', failed: 'No delivery confirmation received. Use your email app or save the summary and send it to anthony@westwardco.fr.', tooLong: 'The summary is too long. Shorten your answers before continuing.', subject: 'Study project - Westward Campus', openMenu: 'Open menu', closeMenu: 'Close menu'
    },
    es: {
      nav: ['¿Por qué Campus?', 'Elegir mi centro', 'Panel personal', 'Mi acompañamiento'], descriptions: ['La experiencia de un padre, un compromiso con las familias.', 'Revisar mi perfil, mis objetivos y mi presupuesto.', 'Organizar mi preparación con una lista personal.', 'Comprender el método, las opciones y las etapas.'], point: 'Su proyecto, paso a paso', guide: 'Descargar la guía gratuita', back: 'Volver al inicio', start: 'Preparar mi proyecto',
      whyTitle: 'Una experiencia real. Un proyecto por construir.', whyLead: 'Comprender las opciones, preparar cada etapa y avanzar en familia, sin promesas irreales.', story: 'Westward Campus nació de mi experiencia como padre, acompañando a mi hijo Enzo en sus estudios y su instalación en Estados Unidos. Las preguntas que encontramos dieron origen a este acompañamiento.',
      choiceTitle: 'Un centro que encaje con su proyecto.', choiceLead: 'Su perfil, sus objetivos, su presupuesto y sus preferencias: este cuestionario prepara una búsqueda personalizada. No es una solicitud universitaria ni una promesa de admisión.', supportTitle: 'Un método claro, desde la elección hasta la salida.', supportLead: 'Red de centros asociados o servicio personalizado: las condiciones y la remuneración se explican antes de cualquier compromiso.', method: 'Nuestro método',
      boardTitle: 'Mi preparación, paso a paso.', boardLead: 'Una lista personal para organizar su proyecto. Usted marca las casillas: no representan una validación de Westward Campus ni de una universidad.', tasks: ['Definir mis objetivos y la fecha de inicio', 'Preparar mis resultados y boletines escolares', 'Evaluar mi inglés y mi presupuesto anual', 'Completar el cuestionario de mi proyecto', 'Hablar con mi asesor sobre los centros', 'Confirmar las siguientes etapas con los contactos adecuados'], progress: 'etapas marcadas', save: 'Conservar solo mis casillas marcadas en este navegador', storage: 'Sin esta opción, la lista se borra al salir. No se guardan nombres, respuestas ni documentos. No hay sincronización entre dispositivos.', storageError: 'Este navegador no permite guardar la lista. Seguirá disponible durante esta visita.', reset: 'Reiniciar mi lista', resetConfirm: '¿Borrar todas las casillas marcadas?', secureTitle: 'Área de cliente y documentos', secure: 'El área de cliente con inicio de sesión y la carga segura de boletines todavía no están activas. Esta lista no transmite nada al asesor. Contacte con nosotros para acordar la siguiente etapa.', contact: 'Escribir a mi asesor',
      formHelp: 'Las respuestas marcadas con * son obligatorias. Indique «Ninguno» o «Por definir» cuando corresponda. Las preguntas complementarias se adaptan a sus respuestas.', parent: 'Se requieren los datos del padre, madre o tutor en esta situación.', currency: 'Moneda del presupuesto anual', tests: ['Todavía no realizada', 'Duolingo English Test', 'TOEFL', 'IELTS', 'Otra'], documents: 'Prepare sus boletines para la revisión del proyecto. No adjunte documentos escolares, financieros ni de identidad aquí: la carga segura todavía no está activa.', privacy: 'Sus respuestas permanecen en esta página hasta que decida enviarlas. El cuestionario no se guarda automáticamente. Revise el resumen antes de elegir el modo de envío.', review: 'Revisar mi solicitud', reviewTitle: 'Revise su solicitud antes del envío.', reviewHelp: 'Todavía no se ha enviado nada. Puede corregir sus respuestas y elegir entre el envío directo y su correo.', send: 'Enviar mi solicitud', email: 'Abrir mi correo', download: 'Guardar mi resumen', sending: 'Enviando…', sent: 'Su solicitud ha sido enviada. No es una solicitud universitaria.', failed: 'No se ha recibido confirmación de envío. Utilice su correo o guarde el resumen para enviarlo a anthony@westwardco.fr.', tooLong: 'El resumen es demasiado largo. Acorte las respuestas antes de continuar.', subject: 'Proyecto de estudios - Westward Campus', openMenu: 'Abrir el menú', closeMenu: 'Cerrar el menú'
    }
  };
  const t = copy[lang];
  const whatsappAfterReview = {
    fr: {
      label: 'Continuer sur WhatsApp',
      message: 'Bonjour, je viens de terminer le questionnaire Westward Campus et je souhaite poursuivre mon projet avec vous.'
    },
    en: {
      label: 'Continue on WhatsApp',
      message: 'Hello, I have completed the Westward Campus questionnaire and would like to continue my project with you.'
    },
    es: {
      label: 'Continuar por WhatsApp',
      message: 'Hola, he terminado el cuestionario de Westward Campus y quisiera continuar mi proyecto con ustedes.'
    }
  }[lang];
  const ids = ['pourquoi', 'choisir-ecole', 'tableau-de-bord', 'mon-accompagnement'];
  const navHTML = ids.map((id, i) => `<a href="#${id}">${t.nav[i]}</a>`).join('');
  const welcome = document.querySelector('.campusWelcome');
  const links = welcome.querySelector('.welcomeLinks');
  const guide = Array.from(links.querySelectorAll('a')).find(a => a.href.includes('drive.google.com'));
  document.querySelector('.campusNav').innerHTML = navHTML;
  const mobile = document.getElementById('mobile-menu');
  const mobileLanguages = mobile.querySelector('.mobileLanguages');
  mobile.replaceChildren();
  mobile.insertAdjacentHTML('beforeend', navHTML);
  if (mobileLanguages) mobile.append(mobileLanguages);
  links.innerHTML = `<p class="welcomePanelLabel">${t.point}</p>` + ids.map((id, i) => `<a href="#${id}" class="${i === 1 ? 'welcomePrimary' : ''}"><span class="welcomeNumber">0${i + 1}</span><span>${t.nav[i]}<small>${t.descriptions[i]}</small></span><span class="campusArrow" aria-hidden="true">↗</span></a>`).join('');
  if (guide) { guide.className = 'campusGuide'; guide.textContent = t.guide; links.append(guide); }
  const brand = document.querySelector('.campusBrand');
  if (brand) brand.href = '#accueil';
  const backLink = document.querySelector('.campusBack');
  if (backLink) backLink.textContent = t.back;
  const headerCTA = document.querySelector('.headerCta');
  if (headerCTA) { headerCTA.href = '#choisir-ecole'; headerCTA.textContent = t.start; }
  const footerLinks = document.querySelector('.campusFooter .footerLinks');
  if (footerLinks) {
    footerLinks.querySelectorAll('a[href^="#"]').forEach(a => a.remove());
    footerLinks.insertAdjacentHTML('afterbegin', navHTML);
  }
  function intro(page, title, lead) {
    const section = document.createElement('section');
    section.className = 'campusPageIntro';
    section.dataset.campusSection = page;
    section.innerHTML = `<p class="kicker">Westward Campus</p><h1>${title}</h1><p>${lead}</p>`;
    return section;
  }
  const statement = document.getElementById('accompagnement');
  const evidence = document.querySelector('.evidenceSection');
  main.insertBefore(intro('why', t.whyTitle, t.whyLead), main.firstChild);
  if (evidence) {
    main.insertBefore(evidence, statement);
    const story = evidence.querySelector('.evidenceCopy h2 + p');
    if (story) story.textContent = t.story;
  }
  [statement, evidence, document.getElementById('faq')].filter(Boolean).forEach(s => { s.dataset.campusSection = 'why'; });
  const partners = document.getElementById('partenariats');
  const journey = document.getElementById('parcours');
  main.insertBefore(intro('support', t.supportTitle, t.supportLead), partners);
  [partners, journey].forEach(s => { s.dataset.campusSection = 'support'; });
  const method = journey.querySelector('.kicker');
  if (method) method.textContent = t.method;
  const request = document.getElementById('demande');
  request.dataset.campusSection = 'choose';
  const requestHeading = request.querySelector('.requestIntro h2');
  const chooseHeading = document.createElement('h1');
  chooseHeading.textContent = t.choiceTitle;
  requestHeading.replaceWith(chooseHeading);
  request.querySelector('.requestIntro h1 + p').textContent = t.choiceLead;
  const board = document.createElement('section');
  board.className = 'campusDashboard';
  board.dataset.campusSection = 'board';
  board.id = 'campus-dashboard';
  board.innerHTML = `<p class="kicker">${t.nav[2]}</p><h1>${t.boardTitle}</h1><p class="dashboardLead">${t.boardLead}</p><div class="dashboardGrid"><div class="dashboardChecklist"><p class="dashboardProgress" role="status" aria-live="polite"></p><progress max="${t.tasks.length}" value="0"></progress><div class="dashboardTasks">${t.tasks.map((task, i) => `<label><input type="checkbox" data-task="${i}"><span>${task}</span></label>`).join('')}</div><label class="dashboardSave"><input type="checkbox" data-save><span>${t.save}</span></label><p class="dashboardStorage">${t.storage}</p><button type="button" class="campusTextButton" data-reset>${t.reset}</button></div><aside class="dashboardAside"><h2>${t.secureTitle}</h2><p>${t.secure}</p><a class="campusPrimaryLink" href="#choisir-ecole">${t.start}</a><a class="campusSecondaryLink" href="mailto:anthony@westwardco.fr">${t.contact}</a></aside></div>`;
  main.append(board);
  const tasks = Array.from(board.querySelectorAll('[data-task]'));
  const save = board.querySelector('[data-save]');
  const storageKey = 'westward-campus-preparation-v1';
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || 'null');
    if (saved && saved.version === 1 && Array.isArray(saved.checked)) {
      save.checked = true;
      tasks.forEach((task, i) => { task.checked = saved.checked[i] === true; });
    }
  } catch { /* Storage is optional; no personal data is persisted. */ }
  function progress(persist = true) {
    const count = tasks.filter(task => task.checked).length;
    board.querySelector('.dashboardProgress').textContent = `${count} / ${tasks.length} ${t.progress}`;
    board.querySelector('progress').value = count;
    board.querySelector('progress').setAttribute('aria-label', `${count} / ${tasks.length} ${t.progress}`);
    if (!persist) return;
    try {
      if (save.checked) localStorage.setItem(storageKey, JSON.stringify({ version: 1, checked: tasks.map(task => task.checked) }));
      else localStorage.removeItem(storageKey);
    } catch { save.checked = false; board.querySelector('.dashboardStorage').textContent = t.storageError; }
  }
  tasks.forEach(task => task.addEventListener('change', () => progress()));
  save.addEventListener('change', () => progress());
  board.querySelector('[data-reset]').addEventListener('click', () => {
    if (!window.confirm(t.resetConfirm)) return;
    tasks.forEach(task => { task.checked = false; });
    progress();
  });
  progress(false);

  // Navigation keeps all old deep links usable and avoids changing other sites.
  const routes = { '#pourquoi': 'why', '#accompagnement': 'why', '#faq': 'why', '#choisir-ecole': 'choose', '#demande': 'choose', '#tableau-de-bord': 'board', '#mon-accompagnement': 'support', '#partenariats': 'support', '#parcours': 'support' };
  const sections = Array.from(main.children).filter(el => el.tagName === 'SECTION');
  const header = document.getElementById('site-header');
  const menuButton = header.querySelector('.menuButton');
  const closeMenu = () => {
    mobile.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', t.openMenu);
  };
  mobile.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  menuButton.addEventListener('click', () => {
    menuButton.setAttribute('aria-label', menuButton.getAttribute('aria-expanded') === 'true' ? t.closeMenu : t.openMenu);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !mobile.hidden) { closeMenu(); menuButton.focus(); }
  });
  document.addEventListener('click', event => { if (!header.contains(event.target)) closeMenu(); });
  function showPage(focus = false) {
    const page = routes[location.hash] || 'home';
    body.dataset.campusPage = page;
    body.dataset.view = page === 'home' ? 'home' : 'campus-v2';
    sections.forEach(s => { s.hidden = s.dataset.campusSection !== page; });
    document.querySelectorAll('.campusNav a, #mobile-menu > a').forEach(a => {
      if (routes[a.hash] === page) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
    closeMenu();
    requestAnimationFrame(() => {
      const legacy = ['#faq', '#partenariats', '#parcours'].includes(location.hash) ? document.getElementById(location.hash.slice(1)) : null;
      const target = legacy || (page === 'home' ? welcome : sections.find(s => s.dataset.campusSection === page));
      if (target) target.scrollIntoView({ block: 'start', behavior: 'instant' });
      header.classList.remove('headerHidden');
      if (focus && target) {
        const heading = target.querySelector('h1, h2');
        if (heading) { heading.tabIndex = -1; heading.focus({ preventScroll: true }); }
      }
    });
  }
  body.classList.add('campusV2');
  window.addEventListener('hashchange', () => showPage(true));
  showPage(false);

  // Extend the existing four-step form rather than replacing its questions.
  const formNote = document.createElement('p');
  formNote.className = 'campusFormHelp';
  formNote.textContent = t.formHelp;
  form.querySelector('.formProgress').after(formNote);
  const controlsFor = name => Array.from(form.querySelectorAll(`[name="${name}"]`));
  const names = ['naissance', 'telephone', 'residence', 'langue_contact', 'etablissement', 'niveau_scolaire', 'diplome', 'annee_diplome', 'resultats', 'activites', 'niveau_recherche', 'rentree', 'duree', 'type_etablissement', 'environnement', 'lieux', 'pratique_anglais', 'budget', 'financement', 'aide_financiere', 'details_financiers', 'candidature', 'passeport', 'experience_usa', 'disponibilites', 'participants'];
  names.forEach(name => {
    const controls = controlsFor(name);
    controls.forEach(control => { control.required = true; });
    const control = controls[0];
    if (!control) return;
    const label = control.type === 'radio' ? control.closest('.choiceGroup').querySelector('legend') : control.closest('label');
    if (label && !label.childNodes[0].textContent.includes('*')) label.insertBefore(document.createTextNode(' * '), control.type === 'radio' ? null : control);
  });
  form.querySelectorAll('input[type="text"], input[type="tel"]').forEach(el => { el.maxLength = el.name === 'telephone' ? 40 : 250; });
  form.querySelectorAll('textarea').forEach(el => { el.maxLength = 1000; });
  const birth = form.elements.naissance;
  const today = new Date();
  birth.max = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const parentPanel = form.querySelector('[data-parent-fields]');
  parentPanel.querySelector('p').textContent = t.parent;
  const roles = controlsFor('situation');
  function parentFields() {
    const value = birth.value;
    const adultDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    const minor = value && new Date(`${value}T00:00:00`) > adultDate;
    const selected = roles.findIndex(input => input.checked);
    const needed = selected > 0 || Boolean(minor);
    parentPanel.hidden = !needed;
    parentPanel.querySelectorAll('input').forEach(input => { input.disabled = !needed; input.required = needed; });
  }
  roles.forEach(input => input.addEventListener('change', parentFields));
  birth.addEventListener('change', parentFields);
  parentFields();
  const currencyLabel = document.createElement('label');
  currencyLabel.textContent = `${t.currency} *`;
  const currency = document.createElement('select');
  currency.name = 'devise_budget'; currency.required = true;
  ['', 'EUR', 'USD'].forEach(value => { const option = document.createElement('option'); option.value = value; option.textContent = value || '—'; currency.append(option); });
  currencyLabel.append(currency);
  form.elements.budget.closest('.formSplit').after(currencyLabel);
  const oldTest = form.elements.test_anglais;
  const testSelect = document.createElement('select'); testSelect.name = oldTest.name; testSelect.required = true;
  ['', ...t.tests].forEach((value, i) => { const option = document.createElement('option'); option.value = value; option.textContent = value || '—'; if (i === 1) option.dataset.noTest = 'true'; testSelect.append(option); });
  oldTest.replaceWith(testSelect);
  testSelect.before(document.createTextNode(' * '));
  const score = form.elements.score_anglais;
  score.before(document.createTextNode(' * '));
  function testFields() {
    const needed = Boolean(testSelect.value) && !testSelect.selectedOptions[0].dataset.noTest;
    score.required = needed; score.disabled = !needed; score.closest('label').hidden = !needed;
  }
  testSelect.addEventListener('change', testFields); testFields();
  const applied = controlsFor('candidature');
  const responses = controlsFor('reponse');
  const applications = form.elements.candidatures_details;
  function applicationFields() {
    const selected = applied.findIndex(input => input.checked);
    const needed = selected === 0 || selected === 2;
    applications.disabled = !needed; applications.required = needed; applications.closest('label').hidden = !needed;
    responses.forEach(input => { input.disabled = !needed; input.required = needed; });
    responses[0].closest('.choiceGroup').hidden = !needed;
  }
  applied.forEach(input => input.addEventListener('change', applicationFields)); applicationFields();
  const needs = controlsFor('besoins');
  function needsValidity() {
    if (needs.length) needs[0].setCustomValidity(needs.some(input => input.checked) ? '' : t.formHelp);
  }
  needs.forEach(input => input.addEventListener('change', needsValidity));
  needsValidity();
  if (needs[0]) needs[0].closest('.choiceGroup').querySelector('legend').append(document.createTextNode(' *'));
  const documentNote = document.createElement('p'); documentNote.className = 'campusDocumentNotice'; documentNote.textContent = t.documents;
  form.querySelector('[data-step="1"]').append(documentNote);
  const privacy = form.querySelector('.privacyNotice');
  const privacyLink = privacy.querySelector('a');
  if (privacyLink) privacyLink.href = `https://westwardco.fr${lang === 'fr' ? '' : '/' + lang}/confidentialite/`;
  privacy.replaceChildren(document.createTextNode(`${t.privacy} `));
  if (privacyLink) privacy.append(privacyLink);
  form.querySelector('[data-submit]').textContent = t.review;

  // Explicit review and verified success; no silent mailto and no false send result.
  const review = document.createElement('section'); review.className = 'campusReview'; review.hidden = true;
  review.innerHTML = `<h3>${t.reviewTitle}</h3><p>${t.reviewHelp}</p><pre></pre><div class="campusReviewActions"><button type="button" data-confirm>${t.send}</button><a data-mail>${t.email}</a><button type="button" data-download>${t.download}</button></div><p role="status" aria-live="polite" data-review-status></p>`;
  mount.append(review);
  let payload = null;
  const confirm = review.querySelector('[data-confirm]');
  const reviewStatus = review.querySelector('[data-review-status]');
  function invalidate() {
    payload = null;
    review.hidden = true;
    confirm.disabled = false;
    reviewStatus.textContent = '';
    const whatsapp = review.querySelector('[data-whatsapp-review]');
    if (whatsapp) whatsapp.remove();
  }
  form.addEventListener('input', invalidate);
  form.addEventListener('change', invalidate);
  const next = form.querySelector('[data-next]');
  const previous = form.querySelector('[data-back]');
  const steps = Array.from(form.querySelectorAll('.formStep'));
  form.addEventListener('submit', event => {
    event.preventDefault(); event.stopImmediatePropagation();
    const activeIndex = steps.findIndex(step => !step.hidden);
    if (activeIndex < steps.length - 1) { next.click(); return; }
    const invalid = Array.from(form.elements).find(el => !el.disabled && el.willValidate && !el.checkValidity());
    if (invalid) {
      const targetIndex = steps.indexOf(invalid.closest('.formStep'));
      if (targetIndex >= 0) for (let i = activeIndex; i > targetIndex; i--) previous.click();
      invalid.reportValidity(); invalid.focus(); return;
    }
    const values = new FormData(form);
    const lines = [];
    const seen = new Set();
    form.querySelectorAll('input, select, textarea').forEach(control => {
      if (control.disabled || !control.name || ['website', 'resume', 'consentement'].includes(control.name)) return;
      if (['radio', 'checkbox'].includes(control.type) && !control.checked) return;
      if (seen.has(control.name)) return;
      seen.add(control.name);
      const label = control.closest('.choiceGroup')?.querySelector('legend')?.textContent || control.closest('label')?.childNodes[0]?.textContent || control.name;
      lines.push(`${label.trim()} : ${values.getAll(control.name).join(', ')}`);
    });
    const summary = lines.join('\n');
    if (summary.length > 14000) { form.querySelector('.formStatus').textContent = t.tooLong; return; }
    payload = { ...Object.fromEntries(values.entries()), resume: summary, type: 'campus', besoins: values.getAll('besoins') };
    review.querySelector('pre').textContent = summary;
    review.querySelector('[data-mail]').href = `mailto:anthony@westwardco.fr?subject=${encodeURIComponent(t.subject)}&body=${encodeURIComponent(summary)}`;
    let whatsapp = review.querySelector('[data-whatsapp-review]');
    if (!whatsapp) {
      whatsapp = document.createElement('a');
      whatsapp.dataset.whatsappReview = 'true';
      whatsapp.className = 'campusReviewWhatsApp';
      whatsapp.target = '_blank';
      whatsapp.rel = 'noopener noreferrer';
      whatsapp.textContent = whatsappAfterReview.label;
      review.querySelector('.campusReviewActions').append(whatsapp);
    }
    whatsapp.href = `https://wa.me/33760512465?text=${encodeURIComponent(whatsappAfterReview.message)}`;
    reviewStatus.textContent = '';
    review.hidden = false;
    review.scrollIntoView({ block: 'start', behavior: 'smooth' });
    review.querySelector('h3').tabIndex = -1;
    review.querySelector('h3').focus({ preventScroll: true });
  }, { capture: true });
  confirm.addEventListener('click', async () => {
    if (!payload || confirm.disabled) return;
    confirm.disabled = true; reviewStatus.textContent = t.sending;
    const snapshot = payload;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(snapshot), signal: controller.signal });
      const result = await response.json();
      if (!response.ok || result.ok !== true) throw new Error('No confirmed delivery');
      if (payload === snapshot) reviewStatus.textContent = t.sent;
    } catch {
      if (payload === snapshot) { reviewStatus.textContent = t.failed; confirm.disabled = false; }
    } finally { clearTimeout(timeout); }
  });
  review.querySelector('[data-download]').addEventListener('click', () => {
    if (!payload) return;
    const url = URL.createObjectURL(new Blob([payload.resume], { type: 'text/plain;charset=utf-8' }));
    const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'mon-projet-westward-campus.txt'; anchor.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
  body.dataset.campusReady = 'true';
})();
