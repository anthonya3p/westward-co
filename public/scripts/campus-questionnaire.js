(() => {
  const mount = document.getElementById('campus-questionnaire');
  if (!mount) return;

  const copy = {
    fr: {
      step:'Étape', of:'sur', back:'Précédent', next:'Continuer', send:'Envoyer la demande de suivi',
      required:'Veuillez compléter les champs obligatoires avant de continuer.',
      sections:['L’étudiant','Parcours scolaire','Projet aux États-Unis','Besoins et contact'],
      intro:['Qui est concerné par la demande ?','Quelques repères suffisent pour commencer.','Où en est le projet aujourd’hui ?','Comment pouvons-nous vous aider ?'],
      labels:{
        role:'Vous remplissez ce questionnaire en tant que', studentName:'Nom et prénom de l’étudiant', birthDate:'Date de naissance', email:'E-mail de contact', phone:'Téléphone', city:'Ville et pays de résidence', language:'Langue de contact préférée', parentName:'Nom du parent ou représentant légal', parentContact:'E-mail ou téléphone du parent',
        school:'Établissement actuel', schoolLevel:'Classe ou niveau d’études', diploma:'Diplôme préparé ou dernier diplôme', graduation:'Année d’obtention prévue ou obtenue', grades:'Résultats, spécialités ou matières fortes', activities:'Activités, engagements ou expériences',
        field:'Domaine d’études envisagé', degree:'Niveau recherché', intake:'Date de rentrée souhaitée', duration:'Durée d’études envisagée', projectStage:'Niveau de précision du projet', institution:'Type d’établissement envisagé', environment:'Environnement préféré', locations:'États, villes ou établissements déjà envisagés', motivation:'Pourquoi souhaitez-vous étudier aux États-Unis ?', english:'Niveau d’anglais estimé', englishPractice:'Pratique actuelle de l’anglais', test:'Test d’anglais déjà passé', score:'Score et date', budget:'Budget annuel envisagé, études et vie sur place', payer:'Personne finançant le projet', aid:'Besoin d’aide financière', finance:'Éléments financiers utiles',
        applied:'Avez-vous déjà candidaté ?', response:'Avez-vous déjà reçu une réponse ?', applications:'Établissements contactés, candidatures et réponses', passport:'Passeport', usa:'Expérience des États-Unis', needs:'Sujets prioritaires', question:'Votre principale question aujourd’hui', contact:'Format de contact préféré', availability:'Jours et créneaux disponibles', attendees:'Personnes présentes au premier échange', extra:'Autre information utile', consent:'Je confirme l’exactitude des informations transmises et j’accepte leur utilisation par Westward Co. Campus pour analyser la demande, organiser les échanges et assurer le suivi du projet.',
      },
      choices:{
        role:['Étudiant majeur','Étudiant mineur','Parent ou représentant légal'], language:['Français','Anglais','Espagnol'],
        stage:['Projet défini','Plusieurs pistes','À construire'], institution:['University','College','Community college','Sans préférence'], environment:['Grande ville','Ville étudiante','Campus résidentiel','Sans préférence'], english:['Débutant','Intermédiaire','Avancé','Bilingue'], aid:['Indispensable','Souhaitable','Non prioritaire','À évaluer'], yesno:['Oui','Non','Dossier en préparation'], response:['Oui','Non','En attente'], passport:['Valide','À renouveler','À demander'], usa:['Aucune','Voyage','Séjour d’études','Autre'], needs:['Orientation','Sélection d’établissements','Candidatures','Budget','Visa','Logement','Préparation au départ','Installation'], contact:['Visioconférence','Téléphone','E-mail']
      },
      placeholders:{grades:'Moyennes, mentions, disciplines appréciées…',activities:'Sport, association, bénévolat, emploi, projet personnel…',locations:'Indiquez aussi les critères importants ou les options à éviter.',motivation:'Objectifs académiques, personnels ou professionnels.',englishPractice:'Cours, séjour, certification, usage quotidien…',finance:'Épargne, financement familial, prêt envisagé, contraintes…',applications:'Précisez les dates ou échéances connues.',question:'Ce que vous souhaitez obtenir du premier échange.',extra:'Situation particulière, échéance proche, besoin d’accessibilité…'},
      select:'Choisir une réponse', optional:'Facultatif', privacy:'Les réponses sont envoyées directement à Westward Co. et ne sont pas enregistrées dans une base de données du site.', privacyLink:'Politique de confidentialité', note:'Westward Co. Campus fournit un accompagnement d’information et d’organisation. Les décisions d’admission, de bourse et de visa appartiennent exclusivement aux organismes compétents.'
    },
    en: {
      step:'Step', of:'of', back:'Back', next:'Continue', send:'Send follow-up request', required:'Please complete the required fields before continuing.',
      sections:['The student','Academic background','U.S. study project','Support and contact'], intro:['Who is this request about?','A few key details are enough to begin.','Where does the project stand today?','How can we help?'],
      labels:{role:'You are completing this form as',studentName:'Student’s full name',birthDate:'Date of birth',email:'Contact email',phone:'Phone',city:'City and country of residence',language:'Preferred contact language',parentName:'Parent or legal guardian’s name',parentContact:'Parent’s email or phone',school:'Current school',schoolLevel:'Current grade or level',diploma:'Current or latest diploma',graduation:'Expected or completed graduation year',grades:'Results, subjects or academic strengths',activities:'Activities, commitments or experience',field:'Intended field of study',degree:'Desired study level',intake:'Preferred intake date',duration:'Expected study duration',projectStage:'How defined is the project?',institution:'Preferred institution type',environment:'Preferred environment',locations:'States, cities or institutions already considered',motivation:'Why do you want to study in the United States?',english:'Estimated English level',englishPractice:'Current English practice',test:'English test already taken',score:'Score and date',budget:'Estimated annual budget, tuition and living costs',payer:'Who will finance the project?',aid:'Need for financial aid',finance:'Useful financial information',applied:'Have you already applied?',response:'Have you received a decision?',applications:'Institutions contacted, applications and decisions',passport:'Passport',usa:'Experience in the United States',needs:'Priority topics',question:'Your main question today',contact:'Preferred contact format',availability:'Available days and times',attendees:'People attending the first conversation',extra:'Other useful information',consent:'I confirm that the information provided is accurate and agree that Westward Co. Campus may use it to review the request, organise conversations and follow the project.'},
      choices:{role:['Adult student','Minor student','Parent or legal guardian'],language:['French','English','Spanish'],stage:['Defined project','Several options','To be built'],institution:['University','College','Community college','No preference'],environment:['Large city','College town','Residential campus','No preference'],english:['Beginner','Intermediate','Advanced','Bilingual'],aid:['Essential','Preferred','Not a priority','To assess'],yesno:['Yes','No','Application in progress'],response:['Yes','No','Pending'],passport:['Valid','Needs renewal','To apply for'],usa:['None','Travel','Study stay','Other'],needs:['Guidance','Institution selection','Applications','Budget','Visa','Housing','Departure preparation','Settling in'],contact:['Video call','Phone','Email']},
      placeholders:{grades:'Grades, honours, preferred subjects…',activities:'Sport, associations, volunteering, work, personal projects…',locations:'Include important criteria or options to avoid.',motivation:'Academic, personal or professional goals.',englishPractice:'Classes, travel, certification, daily use…',finance:'Savings, family funding, planned loan, constraints…',applications:'Include known dates or deadlines.',question:'What you hope to obtain from the first conversation.',extra:'Special situation, close deadline, accessibility needs…'},
      select:'Choose an answer', optional:'Optional', privacy:'Answers are sent directly to Westward Co. and are not stored in a website database.', privacyLink:'Privacy policy', note:'Westward Co. Campus provides information and organisational support. Admission, scholarship and visa decisions remain exclusively with the relevant organisations.'
    },
    es: {
      step:'Etapa', of:'de', back:'Anterior', next:'Continuar', send:'Enviar la solicitud de seguimiento', required:'Complete los campos obligatorios antes de continuar.',
      sections:['El estudiante','Trayectoria académica','Proyecto en Estados Unidos','Apoyo y contacto'], intro:['¿A quién corresponde la solicitud?','Algunos datos son suficientes para empezar.','¿En qué punto se encuentra el proyecto?','¿Cómo podemos ayudarle?'],
      labels:{role:'Completa este formulario como',studentName:'Nombre y apellidos del estudiante',birthDate:'Fecha de nacimiento',email:'Correo electrónico de contacto',phone:'Teléfono',city:'Ciudad y país de residencia',language:'Idioma de contacto preferido',parentName:'Nombre del padre, madre o tutor legal',parentContact:'Correo o teléfono del representante',school:'Centro educativo actual',schoolLevel:'Curso o nivel de estudios',diploma:'Título en preparación o último título',graduation:'Año previsto u obtenido',grades:'Resultados, especialidades o puntos fuertes',activities:'Actividades, compromisos o experiencias',field:'Área de estudios prevista',degree:'Nivel buscado',intake:'Fecha de inicio deseada',duration:'Duración prevista de los estudios',projectStage:'Nivel de definición del proyecto',institution:'Tipo de centro previsto',environment:'Entorno preferido',locations:'Estados, ciudades o centros ya considerados',motivation:'¿Por qué desea estudiar en Estados Unidos?',english:'Nivel estimado de inglés',englishPractice:'Práctica actual del inglés',test:'Prueba de inglés realizada',score:'Puntuación y fecha',budget:'Presupuesto anual previsto, estudios y vida diaria',payer:'Persona que financiará el proyecto',aid:'Necesidad de ayuda financiera',finance:'Información financiera útil',applied:'¿Ya ha presentado solicitudes?',response:'¿Ya ha recibido una respuesta?',applications:'Centros contactados, solicitudes y respuestas',passport:'Pasaporte',usa:'Experiencia en Estados Unidos',needs:'Temas prioritarios',question:'Su pregunta principal hoy',contact:'Formato de contacto preferido',availability:'Días y horarios disponibles',attendees:'Personas presentes en la primera conversación',extra:'Otra información útil',consent:'Confirmo que la información transmitida es exacta y acepto que Westward Co. Campus la utilice para analizar la solicitud, organizar los intercambios y realizar el seguimiento del proyecto.'},
      choices:{role:['Estudiante mayor de edad','Estudiante menor de edad','Padre, madre o tutor legal'],language:['Francés','Inglés','Español'],stage:['Proyecto definido','Varias opciones','Por construir'],institution:['University','College','Community college','Sin preferencia'],environment:['Gran ciudad','Ciudad universitaria','Campus residencial','Sin preferencia'],english:['Principiante','Intermedio','Avanzado','Bilingüe'],aid:['Indispensable','Deseable','No prioritario','Por evaluar'],yesno:['Sí','No','Solicitud en preparación'],response:['Sí','No','En espera'],passport:['Válido','Por renovar','Por solicitar'],usa:['Ninguna','Viaje','Estancia de estudios','Otra'],needs:['Orientación','Selección de centros','Solicitudes','Presupuesto','Visado','Alojamiento','Preparación de la salida','Instalación'],contact:['Videollamada','Teléfono','Correo electrónico']},
      placeholders:{grades:'Notas, menciones, materias preferidas…',activities:'Deporte, asociación, voluntariado, trabajo, proyecto personal…',locations:'Indique también los criterios importantes o las opciones que desea evitar.',motivation:'Objetivos académicos, personales o profesionales.',englishPractice:'Cursos, estancia, certificación, uso cotidiano…',finance:'Ahorros, financiación familiar, préstamo previsto, limitaciones…',applications:'Indique las fechas o plazos conocidos.',question:'Lo que desea obtener de la primera conversación.',extra:'Situación particular, plazo próximo, necesidad de accesibilidad…'},
      select:'Elegir una respuesta', optional:'Opcional', privacy:'Las respuestas se envían directamente a Westward Co. y no se guardan en una base de datos del sitio.', privacyLink:'Política de privacidad', note:'Westward Co. Campus ofrece acompañamiento informativo y organizativo. Las decisiones de admisión, beca y visado corresponden exclusivamente a los organismos competentes.'
    }
  };

  const lang = ['fr','en','es'].includes(document.documentElement.lang) ? document.documentElement.lang : 'fr';
  const t = copy[lang];
  const option = (value) => `<option value="${value}">${value}</option>`;
  const select = (name, label, values, required = false) => `<label>${label}${required ? ' *' : ''}<select name="${name}" ${required ? 'required' : ''}><option value="">${t.select}</option>${values.map(option).join('')}</select></label>`;
  const input = (name, label, type = 'text', required = false, autocomplete = '') => `<label>${label}${required ? ' *' : ''}<input name="${name}" type="${type}" ${required ? 'required' : ''} ${autocomplete ? `autocomplete="${autocomplete}"` : ''}></label>`;
  const area = (name, label, placeholder = '', required = false) => `<label>${label}${required ? ' *' : ''}<textarea name="${name}" rows="4" ${required ? 'required' : ''} placeholder="${placeholder}"></textarea></label>`;
  const radios = (name, label, values, required = false) => `<fieldset class="choiceGroup"><legend>${label}${required ? ' *' : ''}</legend><div class="choiceGrid">${values.map((value, index) => `<label><input type="radio" name="${name}" value="${value}" ${required && index === 0 ? 'required' : ''}><span>${value}</span></label>`).join('')}</div></fieldset>`;
  const checks = (name, label, values) => `<fieldset class="choiceGroup"><legend>${label}</legend><div class="choiceGrid choiceGridWide">${values.map(value => `<label><input type="checkbox" name="${name}" value="${value}"><span>${value}</span></label>`).join('')}</div></fieldset>`;

  mount.innerHTML = `<form class="campusForm campusQuestionnaire" id="campus-form" novalidate>
    <div class="formTrap" aria-hidden="true"><label>Website<input name="website" tabindex="-1" autocomplete="off"></label></div>
    <div class="formProgress"><div class="progressMeta"><span>${t.step} <strong data-step-number>1</strong> ${t.of} 4</span><span data-step-name>${t.sections[0]}</span></div><div class="progressTrack"><span data-progress-bar></span></div><ol>${t.sections.map((name,index)=>`<li class="${index === 0 ? 'active' : ''}" data-progress-step="${index}"><span>${index+1}</span><small>${name}</small></li>`).join('')}</ol></div>
    <p class="stepError" role="alert" hidden>${t.required}</p>
    <fieldset class="formStep active" data-step="0"><legend><span>01</span>${t.sections[0]}</legend><p class="stepIntro">${t.intro[0]}</p>
      ${radios('situation',t.labels.role,t.choices.role,true)}
      <div class="formSplit">${input('nom',t.labels.studentName,'text',true,'name')}${input('naissance',t.labels.birthDate,'date')}</div>
      <div class="formSplit">${input('email',t.labels.email,'email',true,'email')}${input('telephone',t.labels.phone,'tel',false,'tel')}</div>
      <div class="formSplit">${input('residence',t.labels.city)}${select('langue_contact',t.labels.language,t.choices.language)}</div>
      <div class="conditionalPanel" data-parent-fields><p>${t.optional}</p><div class="formSplit">${input('parent_nom',t.labels.parentName)}${input('parent_contact',t.labels.parentContact)}</div></div>
    </fieldset>
    <fieldset class="formStep" data-step="1" hidden><legend><span>02</span>${t.sections[1]}</legend><p class="stepIntro">${t.intro[1]}</p>
      <div class="formSplit">${input('etablissement',t.labels.school)}${input('niveau_scolaire',t.labels.schoolLevel)}</div>
      <div class="formSplit">${input('diplome',t.labels.diploma)}${input('annee_diplome',t.labels.graduation)}</div>
      ${area('resultats',t.labels.grades,t.placeholders.grades)}${area('activites',t.labels.activities,t.placeholders.activities)}
    </fieldset>
    <fieldset class="formStep" data-step="2" hidden><legend><span>03</span>${t.sections[2]}</legend><p class="stepIntro">${t.intro[2]}</p>
      <div class="formSplit">${input('domaine',t.labels.field,'text',true)}${input('niveau_recherche',t.labels.degree)}</div>
      <div class="formSplit">${input('rentree',t.labels.intake)}${input('duree',t.labels.duration)}</div>
      ${radios('precision_projet',t.labels.projectStage,t.choices.stage,true)}${radios('type_etablissement',t.labels.institution,t.choices.institution)}${radios('environnement',t.labels.environment,t.choices.environment)}
      ${area('lieux',t.labels.locations,t.placeholders.locations)}${area('motivation',t.labels.motivation,t.placeholders.motivation,true)}
      ${radios('niveau_anglais',t.labels.english,t.choices.english,true)}${area('pratique_anglais',t.labels.englishPractice,t.placeholders.englishPractice)}
      <div class="formSplit">${input('test_anglais',t.labels.test)}${input('score_anglais',t.labels.score)}</div>
      <div class="formSplit">${input('budget',t.labels.budget)}${input('financement',t.labels.payer)}</div>
      ${radios('aide_financiere',t.labels.aid,t.choices.aid)}${area('details_financiers',t.labels.finance,t.placeholders.finance)}
    </fieldset>
    <fieldset class="formStep" data-step="3" hidden><legend><span>04</span>${t.sections[3]}</legend><p class="stepIntro">${t.intro[3]}</p>
      <div class="formSplit">${radios('candidature',t.labels.applied,t.choices.yesno)}${radios('reponse',t.labels.response,t.choices.response)}</div>
      ${area('candidatures_details',t.labels.applications,t.placeholders.applications)}
      <div class="formSplit">${radios('passeport',t.labels.passport,t.choices.passport)}${radios('experience_usa',t.labels.usa,t.choices.usa)}</div>
      ${checks('besoins',t.labels.needs,t.choices.needs)}${area('question',t.labels.question,t.placeholders.question,true)}
      ${radios('format_contact',t.labels.contact,t.choices.contact,true)}
      <div class="formSplit">${input('disponibilites',t.labels.availability)}${input('participants',t.labels.attendees)}</div>
      ${area('message',t.labels.extra,t.placeholders.extra)}
      <div class="legalReminder">${t.note}</div>
      <label class="consent"><input name="consentement" type="checkbox" value="oui" required><span>${t.labels.consent} *</span></label>
      <p class="privacyNotice">${t.privacy} <a href="${lang === 'fr' ? '' : `/${lang}`}/confidentialite/">${t.privacyLink}</a>.</p>
    </fieldset>
    <input type="hidden" name="resume">
    <div class="formNavigation"><button type="button" class="formBack" data-back hidden>${t.back}</button><button type="button" class="formNext" data-next>${t.next}</button><button type="submit" class="formSubmit" data-submit hidden>${t.send}</button></div>
    <p class="formStatus" role="status" aria-live="polite"></p>
  </form>`;

  const form = mount.querySelector('form');
  const steps = [...form.querySelectorAll('.formStep')];
  const progressItems = [...form.querySelectorAll('[data-progress-step]')];
  const back = form.querySelector('[data-back]');
  const next = form.querySelector('[data-next]');
  const submit = form.querySelector('[data-submit]');
  const error = form.querySelector('.stepError');
  let current = 0;

  function showStep(index) {
    current = index;
    steps.forEach((step,i) => { step.hidden = i !== index; step.classList.toggle('active', i === index); });
    progressItems.forEach((item,i) => { item.classList.toggle('active', i === index); item.classList.toggle('complete', i < index); });
    form.querySelector('[data-step-number]').textContent = String(index + 1);
    form.querySelector('[data-step-name]').textContent = t.sections[index];
    form.querySelector('[data-progress-bar]').style.width = `${((index + 1) / steps.length) * 100}%`;
    back.hidden = index === 0; next.hidden = index === steps.length - 1; submit.hidden = index !== steps.length - 1;
    error.hidden = true;
    form.scrollIntoView({behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block:'start'});
  }

  function validStep() {
    const controls = [...steps[current].querySelectorAll('input, select, textarea')];
    const invalid = controls.find(control => !control.checkValidity());
    if (!invalid) return true;
    error.hidden = false; invalid.reportValidity(); invalid.focus(); return false;
  }

  next.addEventListener('click', () => { if (validStep()) showStep(Math.min(current + 1, steps.length - 1)); });
  back.addEventListener('click', () => showStep(Math.max(current - 1, 0)));
  form.querySelectorAll('input, select, textarea').forEach(control => control.addEventListener('input', () => { error.hidden = true; }));

  const parentPanel = form.querySelector('[data-parent-fields]');
  const roleInputs = [...form.querySelectorAll('[name="situation"]')];
  function updateParentFields() {
    const selected = roleInputs.find(input => input.checked);
    const needed = selected && selected.value !== t.choices.role[0];
    parentPanel.hidden = !needed;
    parentPanel.querySelectorAll('input').forEach(input => { input.disabled = !needed; input.required = Boolean(needed); });
  }
  roleInputs.forEach(input => input.addEventListener('change', updateParentFields));
  updateParentFields();

  form.addEventListener('submit', () => {
    const data = new FormData(form);
    const lines = [];
    form.querySelectorAll('input:not([type="hidden"]), select, textarea').forEach(control => {
      if (!control.name || ['website','consentement','besoins'].includes(control.name)) return;
      if ((control.type === 'radio' || control.type === 'checkbox') && !control.checked) return;
      const label = control.closest('label')?.childNodes[0]?.textContent?.trim() || control.closest('fieldset')?.querySelector('legend')?.textContent?.trim() || control.name;
      const value = control.value.trim();
      if (value) lines.push(`${label} : ${value}`);
    });
    const needs = data.getAll('besoins');
    if (needs.length) lines.push(`${t.labels.needs} : ${needs.join(', ')}`);
    form.elements.resume.value = lines.join('\n');
  }, {capture:true});

  showStep(0);
})();
