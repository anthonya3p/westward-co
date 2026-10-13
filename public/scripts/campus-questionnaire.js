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
  style.rel = 'stylesheet'; style.href = '/styles/campus-navigation.css?v=20261013-2';
  document.head.append(style);
  loadScript('/scripts/campus-questionnaire-core.js?v=20260929-2')
    .then(() => loadScript('/scripts/campus-navigation.js?v=20261013-2'))
    .then(() => {
      if (document.body.dataset.campusReady !== 'true') throw new Error('Campus initialization incomplete');
    })
    .catch(() => {
      const notice = document.createElement('p'); notice.setAttribute('role', 'alert'); notice.textContent = failure; mount.prepend(notice);
    });
})();
