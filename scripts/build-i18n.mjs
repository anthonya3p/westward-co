import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const root = new URL('../public/', import.meta.url).pathname;
const routes = ['', 'nos-univers/', 'campus/', 'coffee-shop/', 'cowboy-culture/', 'digital/', 'contact/', 'mentions-legales/', 'confidentialite/'];

const common = {
  en: {
    'Notre histoire':'Our story', 'Nos univers':'Our worlds', 'Mentions légales':'Legal notice',
    'Politique de confidentialité':'Privacy policy', 'Navigation principale gauche':'Main navigation left',
    'Navigation principale droite':'Main navigation right', 'Navigation mobile':'Mobile navigation',
    'Navigation de pied de page':'Footer navigation', 'Ouvrir le menu':'Open menu',
    'Westward Co. - accueil':'Westward Co. - home', 'Découvrir':'Discover', 'Accéder':'Open',
    'Nous contacter':'Contact us', 'France × États-Unis':'France × United States'
  },
  es: {
    'Notre histoire':'Nuestra historia', 'Nos univers':'Nuestros universos', 'Mentions légales':'Aviso legal',
    'Politique de confidentialité':'Política de privacidad', 'Navigation principale gauche':'Navegación principal izquierda',
    'Navigation principale droite':'Navegación principal derecha', 'Navigation mobile':'Navegación móvil',
    'Navigation de pied de page':'Navegación del pie de página', 'Ouvrir le menu':'Abrir el menú',
    'Westward Co. - accueil':'Westward Co. - inicio', 'Découvrir':'Descubrir', 'Accéder':'Acceder',
    'Nous contacter':'Contactarnos', 'France × États-Unis':'Francia × Estados Unidos', 'France × United States':'Francia × Estados Unidos', 'Contact':'Contacto',
    'United States':'Estados Unidos'
  }
};

const pageText = {
  en: {
    'Westward Co. | Projets entre la France et les États-Unis':'Westward Co. | Projects between France and the United States',
    'Westward Co. | Une marque, quatre destinations':'Westward Co. | One brand, four destinations',
    'Découvrez les quatre projets indépendants de Westward Co. : Campus, Coffee Shop, Digital et Cowboy Culture.':'Discover the four independent Westward Co. projects: Campus, Coffee Shop, Digital and Cowboy Culture.',
    'Westward Co. | Deux pôles, cinq expressions':'Westward Co. | Two pillars, five expressions',
    'Découvrez les deux pôles de Westward Co. : France / USA et Lifestyle, réunissant quatre sites indépendants et le média Mon Enfant aux USA.':'Discover Westward Co.’s two pillars: France / USA and Lifestyle, bringing together four independent websites and the Mon Enfant aux USA media platform.',
    'Westward Co. réunit des projets d’accompagnement, de création digitale et de lifestyle entre la France et les États-Unis.':'Westward Co. brings together guidance, digital creation and lifestyle projects spanning France and the United States.',
    'Les projets':'Projects', 'Les univers':'The worlds', 'La marque':'The brand',
    'Des projets qui relient':'Projects connecting', 'deux horizons.':'two horizons.',
    'Westward Co. est né d’une histoire familiale et d’une envie d’entreprendre entre la France et les États-Unis.':'Westward Co. grew from a family story and a desire to build ventures between France and the United States.',
    'Choisir un univers':'Choose a world', 'Les univers Westward Co.':'The Westward Co. worlds',
    'Choisissez votre':'Choose your', 'direction.':'direction.',
    'Entrez dans l’univers qui correspond à ce que vous recherchez. Les projets associés se dévoilent ensuite.':'Enter the world that matches what you are looking for. Its related projects will then be revealed.',
    'Conseil · média · digital':'Guidance · media · digital', 'Accompagnement':'Guidance', '&amp; Création':'&amp; Creation',
    'Campus · média · stratégie digitale':'Campus · media · digital strategy', 'Éducation':'Education', '&amp; Digital':'&amp; Digital',
    'Accompagner les parcours, informer les familles et développer des identités digitales.':'Supporting education journeys, informing families and developing digital identities.',
    'Éducation &amp; Digital':'Education &amp; Digital', 'Orientation, information':'Guidance, information', 'et création digitale.':'and digital creation.',
    'Donner une direction aux projets, transmettre une expérience et construire une présence.':'Giving projects direction, sharing experience and building a presence.',
    'Découvrir cet univers':'Discover this world', 'Refermer':'Close',
    'Accompagnement &amp; Création':'Guidance &amp; Creation', 'Des projets pour avancer,':'Projects to move forward,', 's’informer et construire.':'learn and build.',
    'Café · vêtements · culture':'Coffee · clothing · culture',
    'Découvrir des concepts, des produits et un art de vivre inspiré par l’Ouest américain.':'Discover concepts, products and a way of life inspired by the American West.',
    'Des expériences à vivre':'Experiences to live', 'et des histoires à porter.':'and stories to wear.',
    'Une marque.':'One brand.', 'Quatre destinations.':'Four destinations.',
    'Deux univers.':'Two worlds.', 'Une lecture claire.':'A clear structure.',
    'Westward Co. rassemble des projets indépendants entre la France, les États-Unis et un même art de vivre.':'Westward Co. brings together independent projects spanning France, the United States and a shared way of life.',
    'Chaque activité conserve sa propre identité et son propre site, tout en restant reliée à l’histoire de Westward Co.':'Each activity keeps its own identity and website while remaining connected to the Westward Co. story.',
    'L’expérience réelle des études et de la vie étudiante aux États-Unis.':'Real-life insight into studying and student life in the United States.',
    'Découvrir le média':'Discover the media platform',
    'Westward Co. réunit quatre projets indépendants. Choisissez celui qui correspond à votre destination.':'Westward Co. brings together four independent projects. Choose the destination that matches your needs.',
    'Découvrir les projets':'Discover the projects', 'Quatre identités.':'Four identities.', 'Quatre chemins.':'Four paths.',
    'Chaque projet possède désormais son propre site, son propre public et sa propre trajectoire.':'Each project now has its own website, audience and path.',
    'Préparer un projet d’études aux États-Unis avec une méthode claire et un accompagnement humain.':'Prepare to study in the United States with a clear method and personal guidance.',
    'Visiter le site':'Visit the website', 'Média associé · Mon Enfant aux USA':'Associated media · Mon Enfant aux USA',
    'Un concept coffee shop pensé entre culture américaine, mobilité et expérience de marque.':'A coffee shop concept combining American culture, mobility and brand experience.',
    'Des identités et des expériences digitales conçues pour rendre chaque projet visible et cohérent.':'Brand identities and digital experiences designed to make every project visible and consistent.',
    'Une marque lifestyle contemporaine inspirée par la culture western et l’Ouest américain.':'A contemporary lifestyle brand inspired by Western culture and the American West.',
    'Une identité commune.':'One shared identity.', 'Des projets indépendants.':'Independent projects.',
    'Westward Co. crée le lien. Chaque projet conserve sa personnalité, son développement et sa destination.':'Westward Co. creates the connection. Each project keeps its own personality, development and destination.',
    'Westward Co. est une marque ombrelle née d’une histoire familiale et de projets développés entre la France et les États-Unis.':'Westward Co. is an umbrella brand born from a family story and projects developed between France and the United States.',
    "Paysage de l'Ouest américain — Westward Co.":'American West landscape — Westward Co.',
    'Différents projets,':'Different projects,', 'une même direction.':'one shared direction.',
    'Westward Co. rassemble différents projets nés de l’amour d’un père pour ses enfants et d’une même volonté : leur offrir davantage d’opportunités, d’ouverture et de choix pour l’avenir.':'Westward Co. brings together projects born from a father’s love for his children and a shared ambition: to offer them more opportunities, openness and choices for the future.',
    'Tout est parti d’un projet familial.':'It all began with a family project.',
    'Lorsque mon fils a choisi de poursuivre ses études aux États-Unis, ce qui devait être avant tout une aventure étudiante est progressivement devenu beaucoup plus.':'When my son chose to continue his studies in the United States, what was initially meant to be a student adventure gradually became much more.',
    'En découvrant de l’intérieur les démarches, les choix à faire, les opportunités mais aussi les difficultés liées à un projet de vie entre la France et les États-Unis, une idée s’est installée :':'By experiencing the procedures, decisions, opportunities and challenges of a life project between France and the United States from the inside, one idea took root:',
    '« Ne pas simplement attendre que les opportunités se présentent, mais essayer de les créer. »':'“Do not simply wait for opportunities to arise, but try to create them.”',
    'Westward Co. est né de cette réflexion.':'Westward Co. grew from this reflection.',
    'Pas autour d’une activité unique, mais autour de plusieurs projets développés avec la même intention : construire, entreprendre et ouvrir de nouvelles possibilités pour l’avenir de mes enfants.':'Not around one single activity, but around several projects developed with the same intention: to build, create and open new possibilities for my children’s future.',
    'Avec le temps, ces projets ont pris des formes différentes. Westward Co. est aujourd’hui l’identité qui les rassemble.':'Over time, these projects have taken different forms. Today, Westward Co. is the identity that brings them together.',
    'Notre vision':'Our vision', 'Créer des projets qui ont du sens, et leur laisser la possibilité d’évoluer.':'Creating meaningful projects and giving them room to evolve.',
    'Westward Co. n’est pas né autour d’un secteur d’activité unique.':'Westward Co. was not built around a single business sector.',
    'Les projets qui le composent peuvent être très différents, mais ils partagent une même origine :':'The projects within it may be very different, but they share the same origin:',
    'l’envie de créer de nouvelles possibilités, de construire dans le temps et de ne pas se limiter à un seul cadre.':'the desire to create new possibilities, build for the long term and avoid being limited to a single framework.',
    'Certains projets sont développés en France, d’autres sont tournés vers les États-Unis. Certains sont déjà concrets, d’autres sont encore en construction.':'Some projects are developed in France, while others are focused on the United States. Some already exist, while others are still being built.',
    'L’objectif n’est pas de tout réunir artificiellement sous une même activité, mais de donner à chaque projet':'The goal is not to force everything into one activity, but to give each project',
    'sa propre identité, son propre développement et sa propre destination':'its own identity, development and destination',
    ', tout en conservant Westward Co. comme fil conducteur.':', while keeping Westward Co. as the common thread.',
    'La suite':'What comes next', 'Westward Co. continuera d’évoluer au rythme des projets, des rencontres et des opportunités qui lui donnent du sens.':'Westward Co. will continue to evolve through the projects, encounters and opportunities that give it meaning.',
    'Découvrir nos univers':'Discover our worlds',
    'Des idées nées en France,':'Ideas born in France,', 'tournées vers les États-Unis.':'looking toward the United States.',
    'Des idées qui':'Ideas that', 'traversent l’Atlantique.':'cross the Atlantic.',
    'Westward Co. réunit quatre univers complémentaires : accompagnement étudiant, coffee shop, création digitale et culture western.':'Westward Co. brings together four complementary worlds: student support, a coffee shop, digital creation and Western culture.',
    'Westward Co. se construit autour de deux pôles : France / USA et Lifestyle, chacun réunissant des activités clairement identifiées.':'Westward Co. is built around two pillars: France / USA and Lifestyle, each bringing together clearly defined activities.',
    'Découvrir les deux pôles':'Discover the two pillars',
    'Deux grands pôles':'Two main pillars', 'Choisissez votre point d’entrée.':'Choose your starting point.', 'Voir toutes les activités':'View all activities',
    'Pôle 01':'Pillar 01', 'Accompagner, informer et créer entre les deux pays.':'Support, inform and create across both countries.',
    'Études &amp; accompagnement':'Study &amp; guidance', 'Média &amp; expérience étudiante':'Media &amp; student experience', 'Identité, sites &amp; contenus':'Brand identity, websites &amp; content',
    'Pôle 02':'Pillar 02', 'Faire vivre des concepts, des produits et une culture.':'Bring concepts, products and culture to life.',
    'Café &amp; expérience':'Coffee &amp; experience', 'Vêtements &amp; culture western':'Clothing &amp; Western culture',
    'Le pôle France / USA rassemble Campus, Digital et le média Mon Enfant aux USA. Le pôle Lifestyle réunit Coffee Shop et Cowboy Culture.':'The France / USA pillar brings together Campus, Digital and the Mon Enfant aux USA media platform. The Lifestyle pillar combines Coffee Shop and Cowboy Culture.',
    'L’architecture Westward Co.':'The Westward Co. architecture', 'Deux pôles.':'Two pillars.', 'Cinq expressions.':'Five expressions.',
    'Une même vision, déployée dans des projets qui possèdent chacun leur identité, leur rythme et leur destination.':'One vision, expressed through projects with their own identity, pace and destination.',
    'Pôle France / USA':'France / USA pillar', 'Relier les':'Connecting', 'deux rives.':'both shores.', 'Études, média et création digitale':'Education, media and digital creation',
    'Pôle Lifestyle':'Lifestyle pillar', 'Créer des':'Creating', 'expériences.':'experiences.', 'Café, vêtements et culture western':'Coffee, clothing and Western culture',
    'Explorer les univers':'Explore the worlds', 'Découvrir l’origine':'Discover our origins',
    'Choisir une direction':'Choose a direction', 'Quel univers voulez-vous découvrir&nbsp;?':'Which world would you like to discover&nbsp;?', 'Voir tous les univers':'View all worlds',
    'À vous de choisir':'Choose your path', 'Quelle direction souhaitez-vous prendre&nbsp;?':'Which direction would you like to take&nbsp;?', 'Voir l’ensemble':'View all',
    'Étudier aux États-Unis':'Study in the United States', 'Découvrir, commander, entreprendre':'Discover, order, build', 'Créer une identité et une présence en ligne':'Create an identity and an online presence', 'Une boutique western contemporaine':'A contemporary Western shop',
    'Le média associé':'Our media platform', 'L’expérience des études et de la vie étudiante aux États-Unis.':'Real insight into studying and student life in the United States.',
    'L’origine':'Our origins', 'Tout a commencé avec le départ d’Enzo aux États-Unis.':'It began when Enzo left to study in the United States.',
    'Son départ pour étudier à Snow College a transformé une aventure familiale en expérience concrète : comprendre les démarches, mesurer les coûts et préparer la vie sur place.':'His move to study at Snow College turned a family adventure into first-hand experience: understanding the process, assessing the costs and preparing for daily life there.',
    'Face aux choix, aux incertitudes et aux possibilités ouvertes par ce parcours, une conviction s’est imposée&nbsp;:':'Faced with the choices, uncertainty and possibilities opened by this journey, one conviction emerged&nbsp;:',
    'Westward Co. est né de cette expérience et d’une envie d’entreprendre autrement.':'Westward Co. grew from this experience and a desire to build differently.',
    'Campus, Coffee Shop, Digital et Cowboy Culture suivent chacun leur propre route. La marque leur donne une origine commune et un lien durable entre la France et les États-Unis.':'Campus, Coffee Shop, Digital and Cowboy Culture each follow their own path. The brand gives them a common origin and a lasting link between France and the United States.',
    'Une identité commune, des activités qui restent libres.':'One shared identity, with room for each activity to grow independently.',
    'Une origine humaine':'A human origin', 'Chaque initiative part d’un besoin vécu, d’une rencontre ou d’une idée à rendre concrète.':'Every initiative begins with a real need, an encounter or an idea worth bringing to life.',
    'Un lien transatlantique':'A transatlantic link', 'La France et les États-Unis nourrissent les usages, les références et les ambitions de la marque.':'France and the United States shape the brand’s uses, references and ambitions.',
    'Un développement indépendant':'Independent development', 'Chaque branche conserve son identité, son public et son rythme, sans perdre le lien avec l’ensemble.':'Each branch keeps its own identity, audience and pace while remaining connected to the whole.',
    'Votre point d’entrée':'Your starting point', 'Commencez par l’univers qui correspond à votre besoin.':'Start with the world that matches your needs.', 'Échanger avec nous':'Talk with us',

    'Nos univers | Westward Co.':'Our worlds | Westward Co.',
    'Découvrez les univers Westward Co. : Campus, Coffee Shop, Digital, Cowboy Culture et le média Mon Enfant aux USA.':'Discover the Westward Co. worlds: Campus, Coffee Shop, Digital, Cowboy Culture and the Mon Enfant aux USA media platform.',
    'Des projets indépendants,':'Independent projects,', 'réunis par une même histoire.':'connected by one story.',
    'Westward Co. rassemble plusieurs projets développés dans des domaines différents. Chacun évolue avec sa propre identité, son propre public et ses propres objectifs.':'Westward Co. brings together several projects developed in different fields. Each one evolves with its own identity, audience and goals.',
    'Choisissez l’univers que vous souhaitez découvrir.':'Choose the world you would like to discover.',
    'Westward Co. Campus accompagne les familles et les étudiants français dans la préparation d’un projet d’études aux États-Unis, de la recherche d’établissement jusqu’à la préparation du départ.':'Westward Co. Campus supports French students and their families as they prepare to study in the United States, from finding a school to preparing for departure.',
    'Retrouvez bientôt ici l’accès au site officiel et à l’application de commande WESTWARD CO. COFFEE SHOP.':'The official website and ordering app for WESTWARD CO. COFFEE SHOP will soon be available here.',
    'Westward Co. Digital développe des identités visuelles, des sites internet et des contenus digitaux pensés pour aider des projets et des entreprises à construire une présence cohérente et professionnelle.':'Westward Co. Digital creates visual identities, websites and digital content to help projects and businesses build a consistent, professional presence.',
    'Westward Co. Cowboy Culture développe un univers lifestyle inspiré de la culture western américaine, à travers des vêtements, des accessoires et des objets pensés dans une approche contemporaine.':'Westward Co. Cowboy Culture develops a lifestyle world inspired by American Western culture through clothing, accessories and objects with a contemporary approach.',
    'Média associé à Westward Co.':'Media partner of Westward Co.',
    'Mon Enfant aux USA est un média consacré à l’expérience des études et de la vie étudiante aux États-Unis, construit à partir d’une expérience familiale réelle et partagé pour informer les familles qui envisagent à leur tour ce parcours.':'Mon Enfant aux USA is a media platform about studying and student life in the United States, based on a real family experience and shared to inform families considering the same journey.',

    'Étudier aux États-Unis | Westward Co. Campus':'Study in the United States | Westward Co. Campus',
    'Westward Co. Campus accompagne les étudiants français et leurs familles dans la préparation d’un projet d’études aux États-Unis.':'Westward Co. Campus supports French students and their families as they prepare to study in the United States.',
    'Un accompagnement humain pour préparer un projet d’études aux États-Unis, de la réflexion au départ.':'Personal support for preparing a study project in the United States, from the first idea to departure.',
    'Westward Co. Campus — études aux États-Unis':'Westward Co. Campus — study in the United States',
    'Campus universitaire américain au pied des montagnes':'American university campus at the foot of the mountains',
    'Étapes de l’accompagnement':'Support stages', "Paysage de l'Ouest américain au coucher du soleil":'American West landscape at sunset',
    'Présentez-nous brièvement le projet, la destination envisagée et vos principales questions.':'Briefly describe the project, the intended destination and your main questions.',
    'Étudier aux États-Unis':'Study in the United States', 'Votre projet':'Your project', 'prend la route.':'starts here.',
    'Un accompagnement humain pour aider les étudiants français et leurs familles à transformer une envie d’Amérique en projet clair, préparé et réaliste.':'Personal support to help French students and their families turn the dream of America into a clear, prepared and realistic project.',
    'Parler de votre projet':'Discuss your project', 'Guide gratuit':'Free guide', 'Découvrir notre méthode':'Discover our method',
    'Préparer le départ, comprendre les étapes, avancer en confiance.':'Prepare for departure, understand each step and move forward with confidence.',
    'Orientation':'Guidance', 'Admission':'Admissions', 'Visa':'Visa', 'Installation':'Settling in',
    'L’accompagnement':'Support', 'Comprendre les étapes avant de prendre une décision.':'Understand the steps before making a decision.',
    'Choisir d’étudier aux États-Unis soulève beaucoup de questions : l’établissement, le budget, le dossier, le visa, le logement ou encore l’arrivée sur place.':'Choosing to study in the United States raises many questions: the school, budget, application, visa, housing and arrival.',
    'Westward Co. Campus propose un accompagnement humain et progressif pour aider chaque famille à comprendre ses options, organiser ses démarches et avancer avec une vision plus claire du projet.':'Westward Co. Campus offers personal, step-by-step support to help each family understand its options, organize the process and move forward with a clearer view of the project.',
    'Les décisions d’admission et de visa relèvent exclusivement des établissements et des autorités compétentes.':'Admission and visa decisions are made exclusively by the relevant schools and authorities.',
    'Notre méthode':'Our method', 'Quatre décisions à prendre, dans le bon ordre.':'Four decisions to make, in the right order.',
    'Vous ne recevez pas une liste abstraite de démarches. Chaque étape répond à une question concrète, produit un résultat clair et prépare la décision suivante.':'You do not receive an abstract checklist. Each step answers a concrete question, produces a clear result and prepares the next decision.',
    'Comprendre':'Understand', '« Mon projet est-il réaliste ? »':'“Is my project realistic?”', 'Poser le bon diagnostic.':'Start with the right assessment.',
    'Profil scolaire, niveau d’anglais, objectifs, calendrier et budget : nous mettons les éléments essentiels sur la table dès le départ.':'Academic profile, English level, goals, schedule and budget: we review the essential elements from the start.',
    'Résultat':'Outcome', 'Une vision claire des possibilités et des points de vigilance.':'A clear view of the possibilities and points requiring attention.',
    'Choisir':'Choose', '« Quelles options me correspondent vraiment ? »':'“Which options truly suit me?”', 'Comparer sans se disperser.':'Compare without losing focus.',
    'Nous examinons les établissements, les formations, les conditions d’admission et le coût global pour faire émerger des choix cohérents.':'We review schools, programs, admission requirements and overall cost to identify coherent choices.',
    'Une sélection argumentée, adaptée au projet familial.':'A reasoned selection tailored to the family project.',
    'Préparer':'Prepare', '« Que faut-il faire, et à quel moment ? »':'“What needs to be done, and when?”', 'Transformer le projet en calendrier.':'Turn the project into a schedule.',
    'Dossier, pièces justificatives, échéances et visa : les démarches sont organisées dans un ordre lisible, sans promesse irréaliste.':'Application, supporting documents, deadlines and visa: every step is organized clearly, without unrealistic promises.',
    'Une feuille de route précise pour avancer sereinement.':'A precise roadmap for moving forward with confidence.',
    'Partir':'Leave', '« Comment réussir l’arrivée sur place ? »':'“How can I prepare for arrival?”', 'Anticiper la vie quotidienne.':'Prepare for everyday life.',
    'Voyage, logement, téléphone, banque et premiers repères : nous préparons les sujets pratiques qui comptent une fois aux États-Unis.':'Travel, housing, phone, banking and first points of reference: we prepare the practical matters that count once in the United States.',
    'Un départ mieux préparé pour l’étudiant comme pour sa famille.':'A better-prepared departure for both the student and the family.',
    'Le fil conducteur':'The guiding principle', 'Comprendre avant de choisir.':'Understand before choosing.', 'Choisir avant d’engager.':'Choose before committing.', 'Préparer avant de partir.':'Prepare before leaving.',
    'Commencer par un échange':'Start with a conversation', 'Une histoire vraie':'A true story', 'L’expérience d’un père et de son fils':'A father and son’s experience',
    'Une expérience vécue':'Real-life experience', 'Né d’un parcours familial réel.':'Born from a real family journey.',
    'Westward Co. Campus est né de l’expérience d’Anthony, père d’un étudiant français parti poursuivre ses études aux États-Unis.':'Westward Co. Campus grew out of Anthony’s experience as the father of a French student who went to study in the United States.',
    'Les recherches, les démarches, les choix financiers, l’installation et la vie sur place ont permis de comprendre les questions que se posent réellement les familles — mais aussi les informations qui leur manquent souvent au début du projet.':'The research, procedures, financial decisions, move and daily life revealed the questions families truly ask—and the information they often lack at the start.',
    'L’objectif est simple : transmettre cette expérience et offrir un point de contact accessible tout au long de la préparation.':'The goal is simple: share this experience and provide an accessible point of contact throughout the preparation.',
    'Un fonctionnement transparent':'A transparent approach', 'Des modalités expliquées avant toute démarche.':'Clear terms before any step is taken.',
    'Selon l’établissement choisi et l’existence d’un partenariat actif, l’accompagnement jusqu’au départ pourra être pris en charge par l’établissement partenaire.':'Depending on the chosen school and an active partnership, support through departure may be covered by the partner school.',
    'Les éventuels frais, la rémunération versée par un établissement et le périmètre exact de l’accompagnement seront toujours présentés clairement à la famille avant tout engagement.':'Any fees, compensation paid by a school and the exact scope of support will always be clearly presented to the family before any commitment.',
    'Questions fréquentes':'Frequently asked questions', 'Les premières réponses avant d’échanger.':'Initial answers before we speak.',
    'À quel moment faut-il commencer les démarches ?':'When should the process begin?',
    'Idéalement plusieurs mois avant la rentrée souhaitée. Le bon calendrier dépend de l’établissement, du dossier et du temps nécessaire pour les formalités.':'Ideally, several months before the desired intake. The right timeline depends on the school, the application and the time required for formalities.',
    'L’accompagnement est-il toujours gratuit pour les familles ?':'Is support always free for families?',
    'Pas nécessairement. Lorsqu’un partenariat actif permet une prise en charge par l’établissement, cela est expliqué clairement. Dans les autres situations, les éventuels frais sont annoncés avant toute démarche.':'Not necessarily. When an active partnership allows the school to cover support, this is clearly explained. In other situations, any fees are announced before the process begins.',
    'Westward Co. Campus garantit-il une admission ou un visa ?':'Does Westward Co. Campus guarantee admission or a visa?',
    'Non. L’admission appartient à chaque établissement et la délivrance du visa relève exclusivement des autorités américaines. L’accompagnement sert à mieux comprendre et préparer le parcours.':'No. Admission decisions belong to each school, and visas are issued exclusively by U.S. authorities. Support helps families understand and prepare for the journey.',
    'Pouvez-vous aider pour l’installation aux États-Unis ?':'Can you help with settling in the United States?',
    'Les besoins liés au voyage, au logement, au téléphone ou aux premières démarches peuvent être abordés pendant la préparation. Les services éventuellement disponibles sont précisés selon le projet et la destination.':'Travel, housing, phone and initial practical needs can be discussed during preparation. Any available services are specified according to the project and destination.',
    'Premier échange':'First conversation', 'Parlez-nous de votre projet d’études.':'Tell us about your study project.',
    'Ce premier contact permet de comprendre votre situation et de déterminer les prochaines étapes possibles.':'This first contact helps us understand your situation and identify possible next steps.',
    'Demande de suivi':'Follow-up request', 'Préparons un premier échange vraiment utile.':'Let’s prepare a genuinely useful first conversation.',
    'Ce questionnaire nous permet de comprendre le profil de l’étudiant, l’avancement du projet et les priorités de la famille avant de vous recontacter.':'This questionnaire helps us understand the student’s profile, the project’s progress and the family’s priorities before contacting you.',
    '4 étapes':'4 steps', 'Environ 8 minutes':'About 8 minutes', 'Sans engagement':'No commitment',
    'Nom et prénom':'Full name', 'E-mail':'Email', 'Téléphone':'Phone', 'Rentrée envisagée':'Planned intake', 'Situation actuelle':'Current situation',
    'Choisir une réponse':'Choose an option', 'Collégien ou lycéen':'Middle or high school student', 'Étudiant':'University student', 'En année de césure':'On a gap year', 'Parent ou représentant légal':'Parent or legal guardian', 'Autre situation':'Other situation',
    'Votre projet':'Your project', 'J’accepte que les informations transmises soient utilisées pour répondre à ma demande, conformément à la':'I agree that the information submitted may be used to answer my request, in accordance with the',
    'politique de confidentialité':'privacy policy', 'Envoyer ma demande':'Send my request', 'Votre demande sera envoyée directement à Westward Co.':'Your request will be sent directly to Westward Co.',
    'Les informations saisies sont transmises à Westward Co. uniquement pour répondre à votre demande. Elles ne sont pas enregistrées dans une base de données du site.':'The information entered is sent to Westward Co. solely to respond to your request. It is not stored in a website database.', 'En savoir plus sur la gestion de vos données.':'Learn more about how your data is handled.',

    'Accédez bientôt au site officiel et à l’application de commande WESTWARD CO. COFFEE SHOP.':'The official website and ordering app for WESTWARD CO. COFFEE SHOP are coming soon.',
    'Le point d’accès au futur site et à l’application WESTWARD CO. COFFEE SHOP.':'Your access point to the future WESTWARD CO. COFFEE SHOP website and app.',
    'Découvrir. Commander. Entreprendre.':'Discover. Order. Build.', 'Choisissez votre':'Choose your', 'destination.':'destination.',
    'Cette page reliera bientôt l’univers Westward Co. au site officiel, à l’application de commande et au programme de franchise WESTWARD CO. COFFEE SHOP.':'This page will soon connect the Westward Co. world to the official website, ordering app and WESTWARD CO. COFFEE SHOP franchise program.',
    'Le site officiel':'The official website', 'Découvrir l’univers, la carte, les événements et toutes les informations pratiques.':'Discover the world, menu, events and all practical information.',
    'Bientôt disponible':'Coming soon', 'L’application':'The app', 'Commander à l’avance, suivre ses points et retrouver ses avantages.':'Order ahead, track points and access rewards.', 'En préparation':'In development',
    'Développer le concept':'Grow the concept', 'Devenir franchisé':'Become a franchisee',
    'Le programme de franchise est en préparation. Vous pouvez dès maintenant présenter votre projet et être informé de son ouverture.':'The franchise program is in development. You can already introduce your project and be notified when it opens.',
    'Présenter mon projet':'Introduce my project', 'Les accès seront activés ici dès leur mise en ligne.':'Access links will be activated here as soon as they go live.', 'Un projet professionnel ou une question&nbsp;?':'A business project or a question?',

    'Accédez bientôt à la boutique en ligne WESTWARD CO. COWBOY CULTURE.':'The WESTWARD CO. COWBOY CULTURE online store is coming soon.',
    'Le point d’accès à la future boutique en ligne WESTWARD CO. COWBOY CULTURE.':'Your access point to the future WESTWARD CO. COWBOY CULTURE online store.',
    'Univers western contemporain WESTWARD CO. COWBOY CULTURE':'Contemporary Western world of WESTWARD CO. COWBOY CULTURE',
    'La boutique':'The store', 'arrive bientôt.':'is coming soon.', 'Cette page deviendra le point d’entrée vers la boutique en ligne WESTWARD CO. COWBOY CULTURE.':'This page will become the gateway to the WESTWARD CO. COWBOY CULTURE online store.',
    'Future destination':'Future destination', 'La boutique en ligne':'The online store', 'Vêtements, accessoires et objets inspirés de la culture western américaine.':'Clothing, accessories and objects inspired by American Western culture.', 'Une question sur le projet&nbsp;?':'A question about the project?',

    'Identités visuelles, sites internet et contenus digitaux par WESTWARD CO. DIGITAL.':'Visual identities, websites and digital content by WESTWARD CO. DIGITAL.',
    'Identités visuelles, sites internet et contenus digitaux pensés avec cohérence.':'Visual identities, websites and digital content designed with consistency.',
    'Espace de création WESTWARD CO. DIGITAL':'WESTWARD CO. DIGITAL creative workspace', 'Bureau de création WESTWARD CO. DIGITAL face aux grands espaces':'WESTWARD CO. DIGITAL creative workspace overlooking open landscapes',
    'Créer une présence cohérente':'Build a consistent presence', 'Donner une forme':'Give a clear shape', 'claire aux idées.':'to ideas.',
    'WESTWARD CO. DIGITAL accompagne les projets et les entreprises dans la construction de leur identité et de leur présence en ligne.':'WESTWARD CO. DIGITAL helps projects and businesses build their identity and online presence.',
    'Le site dédié est en préparation. Les demandes de projet sont déjà ouvertes.':'The dedicated website is in development. Project enquiries are already open.',
    'Expertises':'Expertise', 'EXPERTISES':'EXPERTISE', 'Trois domaines.':'Three areas.', 'Une même direction.':'One direction.',
    'Identité visuelle':'Visual identity', 'Logo, univers graphique et supports cohérents pour rendre un projet immédiatement identifiable.':'Logo, visual world and consistent materials that make a project immediately recognizable.',
    'Sites internet':'Websites', 'Des sites clairs, accessibles et pensés autour des objectifs réels de chaque activité.':'Clear, accessible websites designed around the real goals of each activity.',
    'Contenus digitaux':'Digital content', 'Des contenus visuels et éditoriaux adaptés aux réseaux sociaux et aux prises de parole de la marque.':'Visual and editorial content adapted to social media and brand communications.',
    'Parlons de votre projet':'Let’s discuss your project', 'PARLONS DE VOTRE PROJET':'LET’S DISCUSS YOUR PROJECT',
    'Une idée à structurer':'An idea to shape', 'ou une présence à construire&nbsp;?':'or a presence to build?',
    'Présentez simplement votre activité, votre besoin et votre calendrier. Nous reviendrons vers vous pour définir la suite.':'Tell us about your activity, needs and schedule. We will get back to you to define the next steps.',

    'Parlons de votre projet.':'Let’s discuss your project.', 'Pour une demande générale, une collaboration ou une prise de contact avec Westward Co., vous pouvez nous écrire directement.':'For a general enquiry, collaboration or first contact with Westward Co., you can write to us directly.',
    'Contactez Westward Co. pour une demande générale, une collaboration ou un premier échange autour de nos projets.':'Contact Westward Co. for a general enquiry, collaboration or first conversation about our projects.',
    'Nous écrire':'Write to us', 'Un premier échange, simplement.':'A simple first conversation.',
    'Pour toute demande liée à une activité spécifique de Westward Co., vous pouvez également passer directement par le site de l’univers concerné.':'For enquiries about a specific Westward Co. activity, you can also visit the relevant world directly.',
    'Objet':'Subject', 'Message':'Message', 'Envoyer':'Send',

    'Mentions légales | Westward Co.':'Legal notice | Westward Co.', 'Mentions légales du site Westward Co.':'Legal notice for the Westward Co. website.', 'Cette page est en cours de finalisation. Les informations légales seront ajoutées avant la mise en production définitive du site.':'This page is being finalized. Legal information will be added before the final production launch.',
    'Politique de confidentialité | Westward Co.':'Privacy policy | Westward Co.', 'Politique de confidentialité du site Westward Co.':'Privacy policy for the Westward Co. website.', 'Cette page est en cours de finalisation. Les informations relatives à la confidentialité seront ajoutées avant la mise en production définitive du site.':'This page is being finalized. Privacy information will be added before the final production launch.'
  },
  es: {
    'Westward Co. | Projets entre la France et les États-Unis':'Westward Co. | Proyectos entre Francia y Estados Unidos',
    'Westward Co. | Une marque, quatre destinations':'Westward Co. | Una marca, cuatro destinos',
    'Découvrez les quatre projets indépendants de Westward Co. : Campus, Coffee Shop, Digital et Cowboy Culture.':'Descubra los cuatro proyectos independientes de Westward Co.: Campus, Coffee Shop, Digital y Cowboy Culture.',
    'Westward Co. | Deux pôles, cinq expressions':'Westward Co. | Dos áreas, cinco expresiones',
    'Découvrez les deux pôles de Westward Co. : France / USA et Lifestyle, réunissant quatre sites indépendants et le média Mon Enfant aux USA.':'Descubra las dos áreas de Westward Co.: Francia / Estados Unidos y Lifestyle, que reúnen cuatro sitios independientes y el medio Mon Enfant aux USA.',
    'Westward Co. réunit des projets d’accompagnement, de création digitale et de lifestyle entre la France et les États-Unis.':'Westward Co. reúne proyectos de acompañamiento, creación digital y lifestyle entre Francia y Estados Unidos.',
    'Les projets':'Los proyectos', 'Les univers':'Los universos', 'La marque':'La marca',
    'Des projets qui relient':'Proyectos que conectan', 'deux horizons.':'dos horizontes.',
    'Westward Co. est né d’une histoire familiale et d’une envie d’entreprendre entre la France et les États-Unis.':'Westward Co. nació de una historia familiar y del deseo de emprender entre Francia y Estados Unidos.',
    'Choisir un univers':'Elegir un universo', 'Les univers Westward Co.':'Los universos Westward Co.',
    'Choisissez votre':'Elija su', 'direction.':'dirección.',
    'Entrez dans l’univers qui correspond à ce que vous recherchez. Les projets associés se dévoilent ensuite.':'Entre en el universo que corresponde a lo que busca. A continuación se muestran los proyectos asociados.',
    'Conseil · média · digital':'Asesoramiento · medios · digital', 'Accompagnement':'Acompañamiento', '&amp; Création':'y Creación',
    'Campus · média · stratégie digitale':'Campus · medios · estrategia digital', 'Éducation':'Educación', '&amp; Digital':'y Digital',
    'Accompagner les parcours, informer les familles et développer des identités digitales.':'Acompañar los proyectos educativos, informar a las familias y desarrollar identidades digitales.',
    'Éducation &amp; Digital':'Educación y Digital', 'Orientation, information':'Orientación, información', 'et création digitale.':'y creación digital.',
    'Donner une direction aux projets, transmettre une expérience et construire une présence.':'Orientar proyectos, transmitir experiencia y construir una presencia.',
    'Découvrir cet univers':'Descubrir este universo', 'Refermer':'Cerrar',
    'Accompagnement &amp; Création':'Acompañamiento y Creación', 'Des projets pour avancer,':'Proyectos para avanzar,', 's’informer et construire.':'informarse y construir.',
    'Café · vêtements · culture':'Café · ropa · cultura',
    'Découvrir des concepts, des produits et un art de vivre inspiré par l’Ouest américain.':'Descubra conceptos, productos y un estilo de vida inspirado en el Oeste americano.',
    'Des expériences à vivre':'Experiencias para vivir', 'et des histoires à porter.':'e historias para llevar.',
    'Une marque.':'Una marca.', 'Quatre destinations.':'Cuatro destinos.',
    'Deux univers.':'Dos universos.', 'Une lecture claire.':'Una estructura clara.',
    'Westward Co. rassemble des projets indépendants entre la France, les États-Unis et un même art de vivre.':'Westward Co. reúne proyectos independientes entre Francia, Estados Unidos y un mismo estilo de vida.',
    'Chaque activité conserve sa propre identité et son propre site, tout en restant reliée à l’histoire de Westward Co.':'Cada actividad conserva su propia identidad y su propio sitio web, manteniéndose vinculada a la historia de Westward Co.',
    'L’expérience réelle des études et de la vie étudiante aux États-Unis.':'La experiencia real de los estudios y de la vida estudiantil en Estados Unidos.',
    'Découvrir le média':'Descubrir el medio',
    'Westward Co. réunit quatre projets indépendants. Choisissez celui qui correspond à votre destination.':'Westward Co. reúne cuatro proyectos independientes. Elija el destino que corresponde a sus necesidades.',
    'Découvrir les projets':'Descubrir los proyectos', 'Quatre identités.':'Cuatro identidades.', 'Quatre chemins.':'Cuatro caminos.',
    'Chaque projet possède désormais son propre site, son propre public et sa propre trajectoire.':'Cada proyecto tiene ahora su propio sitio web, su público y su trayectoria.',
    'Préparer un projet d’études aux États-Unis avec une méthode claire et un accompagnement humain.':'Prepare un proyecto de estudios en Estados Unidos con un método claro y un acompañamiento humano.',
    'Visiter le site':'Visitar el sitio', 'Média associé · Mon Enfant aux USA':'Medio asociado · Mon Enfant aux USA',
    'Un concept coffee shop pensé entre culture américaine, mobilité et expérience de marque.':'Un concepto de coffee shop que combina cultura estadounidense, movilidad y experiencia de marca.',
    'Des identités et des expériences digitales conçues pour rendre chaque projet visible et cohérent.':'Identidades y experiencias digitales diseñadas para hacer visible y coherente cada proyecto.',
    'Une marque lifestyle contemporaine inspirée par la culture western et l’Ouest américain.':'Una marca lifestyle contemporánea inspirada en la cultura western y el Oeste estadounidense.',
    'Une identité commune.':'Una identidad común.', 'Des projets indépendants.':'Proyectos independientes.',
    'Westward Co. crée le lien. Chaque projet conserve sa personnalité, son développement et sa destination.':'Westward Co. crea el vínculo. Cada proyecto conserva su personalidad, su desarrollo y su destino.',
    'Westward Co. est une marque ombrelle née d’une histoire familiale et de projets développés entre la France et les États-Unis.':'Westward Co. es una marca paraguas nacida de una historia familiar y de proyectos desarrollados entre Francia y Estados Unidos.',
    "Paysage de l'Ouest américain — Westward Co.":'Paisaje del Oeste americano — Westward Co.',
    'Différents projets,':'Proyectos diferentes,', 'une même direction.':'una misma dirección.',
    'Westward Co. rassemble différents projets nés de l’amour d’un père pour ses enfants et d’une même volonté : leur offrir davantage d’opportunités, d’ouverture et de choix pour l’avenir.':'Westward Co. reúne diferentes proyectos nacidos del amor de un padre por sus hijos y de una misma voluntad: ofrecerles más oportunidades, apertura y opciones para el futuro.',
    'Tout est parti d’un projet familial.':'Todo comenzó con un proyecto familiar.',
    'Lorsque mon fils a choisi de poursuivre ses études aux États-Unis, ce qui devait être avant tout une aventure étudiante est progressivement devenu beaucoup plus.':'Cuando mi hijo decidió continuar sus estudios en Estados Unidos, lo que debía ser ante todo una aventura estudiantil se convirtió poco a poco en mucho más.',
    'En découvrant de l’intérieur les démarches, les choix à faire, les opportunités mais aussi les difficultés liées à un projet de vie entre la France et les États-Unis, une idée s’est installée :':'Al vivir desde dentro los trámites, las decisiones, las oportunidades y también las dificultades de un proyecto de vida entre Francia y Estados Unidos, nació una idea:',
    '« Ne pas simplement attendre que les opportunités se présentent, mais essayer de les créer. »':'«No limitarse a esperar las oportunidades, sino intentar crearlas.»',
    'Westward Co. est né de cette réflexion.':'Westward Co. nació de esta reflexión.',
    'Pas autour d’une activité unique, mais autour de plusieurs projets développés avec la même intention : construire, entreprendre et ouvrir de nouvelles possibilités pour l’avenir de mes enfants.':'No en torno a una única actividad, sino a varios proyectos desarrollados con la misma intención: construir, emprender y abrir nuevas posibilidades para el futuro de mis hijos.',
    'Avec le temps, ces projets ont pris des formes différentes. Westward Co. est aujourd’hui l’identité qui les rassemble.':'Con el tiempo, estos proyectos han adoptado formas diferentes. Hoy, Westward Co. es la identidad que los reúne.',
    'Notre vision':'Nuestra visión', 'Créer des projets qui ont du sens, et leur laisser la possibilité d’évoluer.':'Crear proyectos con sentido y darles la posibilidad de evolucionar.',
    'Westward Co. n’est pas né autour d’un secteur d’activité unique.':'Westward Co. no nació en torno a un único sector de actividad.',
    'Les projets qui le composent peuvent être très différents, mais ils partagent une même origine :':'Los proyectos que lo componen pueden ser muy diferentes, pero comparten un mismo origen:',
    'l’envie de créer de nouvelles possibilités, de construire dans le temps et de ne pas se limiter à un seul cadre.':'el deseo de crear nuevas posibilidades, construir a largo plazo y no limitarse a un único marco.',
    'Certains projets sont développés en France, d’autres sont tournés vers les États-Unis. Certains sont déjà concrets, d’autres sont encore en construction.':'Algunos proyectos se desarrollan en Francia y otros se orientan hacia Estados Unidos. Algunos ya son una realidad y otros siguen en construcción.',
    'L’objectif n’est pas de tout réunir artificiellement sous une même activité, mais de donner à chaque projet':'El objetivo no es reunirlo todo artificialmente bajo una misma actividad, sino dar a cada proyecto',
    'sa propre identité, son propre développement et sa propre destination':'su propia identidad, su propio desarrollo y su propio destino',
    ', tout en conservant Westward Co. comme fil conducteur.':', manteniendo Westward Co. como hilo conductor.',
    'La suite':'Lo que viene', 'Westward Co. continuera d’évoluer au rythme des projets, des rencontres et des opportunités qui lui donnent du sens.':'Westward Co. seguirá evolucionando al ritmo de los proyectos, los encuentros y las oportunidades que le dan sentido.',
    'Découvrir nos univers':'Descubrir nuestros universos',
    'Des idées nées en France,':'Ideas nacidas en Francia,', 'tournées vers les États-Unis.':'orientadas hacia Estados Unidos.',
    'Des idées qui':'Ideas que', 'traversent l’Atlantique.':'cruzan el Atlántico.',
    'Westward Co. réunit quatre univers complémentaires : accompagnement étudiant, coffee shop, création digitale et culture western.':'Westward Co. reúne cuatro universos complementarios: acompañamiento estudiantil, coffee shop, creación digital y cultura western.',
    'Westward Co. se construit autour de deux pôles : France / USA et Lifestyle, chacun réunissant des activités clairement identifiées.':'Westward Co. se estructura en torno a dos grandes áreas: Francia / Estados Unidos y Lifestyle, cada una con actividades claramente identificadas.',
    'Découvrir les deux pôles':'Descubrir las dos áreas',
    'Deux grands pôles':'Dos grandes áreas', 'Choisissez votre point d’entrée.':'Elija su punto de entrada.', 'Voir toutes les activités':'Ver todas las actividades',
    'Pôle 01':'Área 01', 'Accompagner, informer et créer entre les deux pays.':'Acompañar, informar y crear entre ambos países.',
    'Études &amp; accompagnement':'Estudios &amp; acompañamiento', 'Média &amp; expérience étudiante':'Medio &amp; experiencia estudiantil', 'Identité, sites &amp; contenus':'Identidad, sitios web &amp; contenidos',
    'Pôle 02':'Área 02', 'Faire vivre des concepts, des produits et une culture.':'Dar vida a conceptos, productos y cultura.',
    'Café &amp; expérience':'Café &amp; experiencia', 'Vêtements &amp; culture western':'Ropa &amp; cultura western',
    'Le pôle France / USA rassemble Campus, Digital et le média Mon Enfant aux USA. Le pôle Lifestyle réunit Coffee Shop et Cowboy Culture.':'El área Francia / Estados Unidos reúne Campus, Digital y el medio Mon Enfant aux USA. El área Lifestyle reúne Coffee Shop y Cowboy Culture.',
    'L’architecture Westward Co.':'La arquitectura Westward Co.', 'Deux pôles.':'Dos áreas.', 'Cinq expressions.':'Cinco expresiones.',
    'Une même vision, déployée dans des projets qui possèdent chacun leur identité, leur rythme et leur destination.':'Una misma visión, expresada en proyectos con identidad, ritmo y destino propios.',
    'Pôle France / USA':'Área Francia / Estados Unidos', 'Relier les':'Conectar', 'deux rives.':'ambas orillas.', 'Études, média et création digitale':'Estudios, medios y creación digital',
    'Pôle Lifestyle':'Área Lifestyle', 'Créer des':'Crear', 'expériences.':'experiencias.', 'Café, vêtements et culture western':'Café, ropa y cultura western',
    'Explorer les univers':'Explorar los universos', 'Découvrir l’origine':'Descubrir el origen',
    'Choisir une direction':'Elegir una dirección', 'Quel univers voulez-vous découvrir&nbsp;?':'¿Qué universo desea descubrir&nbsp;?', 'Voir tous les univers':'Ver todos los universos',
    'À vous de choisir':'Usted elige', 'Quelle direction souhaitez-vous prendre&nbsp;?':'¿Qué dirección desea tomar&nbsp;?', 'Voir l’ensemble':'Ver todo',
    'Étudier aux États-Unis':'Estudiar en Estados Unidos', 'Découvrir, commander, entreprendre':'Descubrir, pedir, emprender', 'Créer une identité et une présence en ligne':'Crear una identidad y una presencia en línea', 'Une boutique western contemporaine':'Una tienda western contemporánea',
    'Le média associé':'El medio asociado', 'L’expérience des études et de la vie étudiante aux États-Unis.':'La experiencia de estudiar y vivir como estudiante en Estados Unidos.',
    'L’origine':'El origen', 'Tout a commencé avec le départ d’Enzo aux États-Unis.':'Todo comenzó cuando Enzo se fue a estudiar a Estados Unidos.',
    'Son départ pour étudier à Snow College a transformé une aventure familiale en expérience concrète : comprendre les démarches, mesurer les coûts et préparer la vie sur place.':'Su marcha para estudiar en Snow College convirtió una aventura familiar en una experiencia concreta: comprender los trámites, calcular los costes y preparar la vida allí.',
    'Face aux choix, aux incertitudes et aux possibilités ouvertes par ce parcours, une conviction s’est imposée&nbsp;:':'Ante las decisiones, las incertidumbres y las posibilidades abiertas por este recorrido, surgió una convicción&nbsp;:',
    'Westward Co. est né de cette expérience et d’une envie d’entreprendre autrement.':'Westward Co. nació de esta experiencia y del deseo de emprender de otra manera.',
    'Campus, Coffee Shop, Digital et Cowboy Culture suivent chacun leur propre route. La marque leur donne une origine commune et un lien durable entre la France et les États-Unis.':'Campus, Coffee Shop, Digital y Cowboy Culture siguen cada uno su propio camino. La marca les aporta un origen común y un vínculo duradero entre Francia y Estados Unidos.',
    'Une identité commune, des activités qui restent libres.':'Una identidad común y actividades que conservan su libertad.',
    'Une origine humaine':'Un origen humano', 'Chaque initiative part d’un besoin vécu, d’une rencontre ou d’une idée à rendre concrète.':'Cada iniciativa nace de una necesidad real, un encuentro o una idea que merece hacerse realidad.',
    'Un lien transatlantique':'Un vínculo transatlántico', 'La France et les États-Unis nourrissent les usages, les références et les ambitions de la marque.':'Francia y Estados Unidos nutren los usos, las referencias y las ambiciones de la marca.',
    'Un développement indépendant':'Un desarrollo independiente', 'Chaque branche conserve son identité, son public et son rythme, sans perdre le lien avec l’ensemble.':'Cada rama conserva su identidad, su público y su ritmo sin perder la conexión con el conjunto.',
    'Votre point d’entrée':'Su punto de partida', 'Commencez par l’univers qui correspond à votre besoin.':'Empiece por el universo que corresponde a sus necesidades.', 'Échanger avec nous':'Hablar con nosotros',

    'Nos univers | Westward Co.':'Nuestros universos | Westward Co.',
    'Découvrez les univers Westward Co. : Campus, Coffee Shop, Digital, Cowboy Culture et le média Mon Enfant aux USA.':'Descubra los universos Westward Co.: Campus, Coffee Shop, Digital, Cowboy Culture y el medio Mon Enfant aux USA.',
    'Des projets indépendants,':'Proyectos independientes,', 'réunis par une même histoire.':'unidos por una misma historia.',
    'Westward Co. rassemble plusieurs projets développés dans des domaines différents. Chacun évolue avec sa propre identité, son propre public et ses propres objectifs.':'Westward Co. reúne varios proyectos desarrollados en ámbitos diferentes. Cada uno evoluciona con su propia identidad, su público y sus objetivos.',
    'Choisissez l’univers que vous souhaitez découvrir.':'Elija el universo que desea descubrir.',
    'Westward Co. Campus accompagne les familles et les étudiants français dans la préparation d’un projet d’études aux États-Unis, de la recherche d’établissement jusqu’à la préparation du départ.':'Westward Co. Campus acompaña a estudiantes franceses y sus familias en la preparación de un proyecto de estudios en Estados Unidos, desde la búsqueda de un centro hasta la preparación del viaje.',
    'Retrouvez bientôt ici l’accès au site officiel et à l’application de commande WESTWARD CO. COFFEE SHOP.':'Muy pronto encontrará aquí el acceso al sitio oficial y a la aplicación de pedidos de WESTWARD CO. COFFEE SHOP.',
    'Westward Co. Digital développe des identités visuelles, des sites internet et des contenus digitaux pensés pour aider des projets et des entreprises à construire une présence cohérente et professionnelle.':'Westward Co. Digital crea identidades visuales, sitios web y contenidos digitales para ayudar a proyectos y empresas a construir una presencia coherente y profesional.',
    'Westward Co. Cowboy Culture développe un univers lifestyle inspiré de la culture western américaine, à travers des vêtements, des accessoires et des objets pensés dans une approche contemporaine.':'Westward Co. Cowboy Culture desarrolla un universo lifestyle inspirado en la cultura western estadounidense mediante ropa, accesorios y objetos con un enfoque contemporáneo.',
    'Média associé à Westward Co.':'Medio asociado a Westward Co.',
    'Mon Enfant aux USA est un média consacré à l’expérience des études et de la vie étudiante aux États-Unis, construit à partir d’une expérience familiale réelle et partagé pour informer les familles qui envisagent à leur tour ce parcours.':'Mon Enfant aux USA es un medio dedicado a la experiencia de estudiar y vivir como estudiante en Estados Unidos, basado en una experiencia familiar real y compartido para informar a las familias que contemplan este camino.',

    'Étudier aux États-Unis | Westward Co. Campus':'Estudiar en Estados Unidos | Westward Co. Campus',
    'Westward Co. Campus accompagne les étudiants français et leurs familles dans la préparation d’un projet d’études aux États-Unis.':'Westward Co. Campus acompaña a los estudiantes franceses y a sus familias en la preparación de un proyecto de estudios en Estados Unidos.',
    'Un accompagnement humain pour préparer un projet d’études aux États-Unis, de la réflexion au départ.':'Un acompañamiento humano para preparar un proyecto de estudios en Estados Unidos, desde la reflexión hasta la salida.',
    'Westward Co. Campus — études aux États-Unis':'Westward Co. Campus — estudios en Estados Unidos',
    'Campus universitaire américain au pied des montagnes':'Campus universitario estadounidense al pie de las montañas',
    'Étapes de l’accompagnement':'Etapas del acompañamiento', "Paysage de l'Ouest américain au coucher du soleil":'Paisaje del Oeste americano al atardecer',
    'Présentez-nous brièvement le projet, la destination envisagée et vos principales questions.':'Presente brevemente el proyecto, el destino previsto y sus principales preguntas.',
    'Étudier aux États-Unis':'Estudiar en Estados Unidos', 'Votre projet':'Su proyecto', 'prend la route.':'empieza aquí.',
    'Un accompagnement humain pour aider les étudiants français et leurs familles à transformer une envie d’Amérique en projet clair, préparé et réaliste.':'Un acompañamiento humano para ayudar a los estudiantes franceses y a sus familias a convertir el deseo de estudiar en Estados Unidos en un proyecto claro, preparado y realista.',
    'Parler de votre projet':'Hablar de su proyecto', 'Guide gratuit':'Guía gratuita', 'Découvrir notre méthode':'Descubrir nuestro método',
    'Préparer le départ, comprendre les étapes, avancer en confiance.':'Preparar la salida, comprender las etapas y avanzar con confianza.',
    'Orientation':'Orientación', 'Admission':'Admisión', 'Visa':'Visado', 'Installation':'Instalación',
    'L’accompagnement':'El acompañamiento', 'Comprendre les étapes avant de prendre une décision.':'Comprender las etapas antes de tomar una decisión.',
    'Choisir d’étudier aux États-Unis soulève beaucoup de questions : l’établissement, le budget, le dossier, le visa, le logement ou encore l’arrivée sur place.':'Elegir estudiar en Estados Unidos plantea muchas preguntas: el centro, el presupuesto, la solicitud, el visado, el alojamiento y la llegada.',
    'Westward Co. Campus propose un accompagnement humain et progressif pour aider chaque famille à comprendre ses options, organiser ses démarches et avancer avec une vision plus claire du projet.':'Westward Co. Campus ofrece un acompañamiento humano y progresivo para ayudar a cada familia a comprender sus opciones, organizar los trámites y avanzar con una visión más clara del proyecto.',
    'Les décisions d’admission et de visa relèvent exclusivement des établissements et des autorités compétentes.':'Las decisiones de admisión y visado corresponden exclusivamente a los centros y a las autoridades competentes.',
    'Notre méthode':'Nuestro método', 'Quatre décisions à prendre, dans le bon ordre.':'Cuatro decisiones que tomar, en el orden correcto.',
    'Vous ne recevez pas une liste abstraite de démarches. Chaque étape répond à une question concrète, produit un résultat clair et prépare la décision suivante.':'No recibirá una lista abstracta de trámites. Cada etapa responde a una pregunta concreta, produce un resultado claro y prepara la siguiente decisión.',
    'Comprendre':'Comprender', '« Mon projet est-il réaliste ? »':'«¿Es realista mi proyecto?»', 'Poser le bon diagnostic.':'Establecer el diagnóstico adecuado.',
    'Profil scolaire, niveau d’anglais, objectifs, calendrier et budget : nous mettons les éléments essentiels sur la table dès le départ.':'Perfil académico, nivel de inglés, objetivos, calendario y presupuesto: revisamos los elementos esenciales desde el principio.',
    'Résultat':'Resultado', 'Une vision claire des possibilités et des points de vigilance.':'Una visión clara de las posibilidades y de los puntos de atención.',
    'Choisir':'Elegir', '« Quelles options me correspondent vraiment ? »':'«¿Qué opciones me corresponden realmente?»', 'Comparer sans se disperser.':'Comparar sin dispersarse.',
    'Nous examinons les établissements, les formations, les conditions d’admission et le coût global pour faire émerger des choix cohérents.':'Examinamos los centros, los programas, los requisitos de admisión y el coste total para identificar opciones coherentes.',
    'Une sélection argumentée, adaptée au projet familial.':'Una selección razonada y adaptada al proyecto familiar.',
    'Préparer':'Preparar', '« Que faut-il faire, et à quel moment ? »':'«¿Qué hay que hacer y cuándo?»', 'Transformer le projet en calendrier.':'Convertir el proyecto en un calendario.',
    'Dossier, pièces justificatives, échéances et visa : les démarches sont organisées dans un ordre lisible, sans promesse irréaliste.':'Solicitud, documentos, plazos y visado: los trámites se organizan de forma clara, sin promesas irreales.',
    'Une feuille de route précise pour avancer sereinement.':'Una hoja de ruta precisa para avanzar con tranquilidad.',
    'Partir':'Partir', '« Comment réussir l’arrivée sur place ? »':'«¿Cómo preparar bien la llegada?»', 'Anticiper la vie quotidienne.':'Anticipar la vida cotidiana.',
    'Voyage, logement, téléphone, banque et premiers repères : nous préparons les sujets pratiques qui comptent une fois aux États-Unis.':'Viaje, alojamiento, teléfono, banco y primeras referencias: preparamos los aspectos prácticos que cuentan una vez en Estados Unidos.',
    'Un départ mieux préparé pour l’étudiant comme pour sa famille.':'Una salida mejor preparada tanto para el estudiante como para su familia.',
    'Le fil conducteur':'El hilo conductor', 'Comprendre avant de choisir.':'Comprender antes de elegir.', 'Choisir avant d’engager.':'Elegir antes de comprometerse.', 'Préparer avant de partir.':'Preparar antes de partir.',
    'Commencer par un échange':'Empezar con una conversación', 'Une histoire vraie':'Una historia real', 'L’expérience d’un père et de son fils':'La experiencia de un padre y su hijo',
    'Une expérience vécue':'Una experiencia vivida', 'Né d’un parcours familial réel.':'Nacido de una experiencia familiar real.',
    'Westward Co. Campus est né de l’expérience d’Anthony, père d’un étudiant français parti poursuivre ses études aux États-Unis.':'Westward Co. Campus nació de la experiencia de Anthony, padre de un estudiante francés que se fue a estudiar a Estados Unidos.',
    'Les recherches, les démarches, les choix financiers, l’installation et la vie sur place ont permis de comprendre les questions que se posent réellement les familles — mais aussi les informations qui leur manquent souvent au début du projet.':'La búsqueda, los trámites, las decisiones financieras, la instalación y la vida allí permitieron comprender las preguntas reales de las familias y la información que suele faltar al principio.',
    'L’objectif est simple : transmettre cette expérience et offrir un point de contact accessible tout au long de la préparation.':'El objetivo es sencillo: compartir esta experiencia y ofrecer un punto de contacto accesible durante toda la preparación.',
    'Un fonctionnement transparent':'Un funcionamiento transparente', 'Des modalités expliquées avant toute démarche.':'Condiciones explicadas antes de cualquier trámite.',
    'Selon l’établissement choisi et l’existence d’un partenariat actif, l’accompagnement jusqu’au départ pourra être pris en charge par l’établissement partenaire.':'Según el centro elegido y la existencia de una colaboración activa, el centro asociado podrá asumir el acompañamiento hasta la salida.',
    'Les éventuels frais, la rémunération versée par un établissement et le périmètre exact de l’accompagnement seront toujours présentés clairement à la famille avant tout engagement.':'Los posibles gastos, la remuneración abonada por un centro y el alcance exacto del acompañamiento siempre se explicarán claramente a la familia antes de cualquier compromiso.',
    'Questions fréquentes':'Preguntas frecuentes', 'Les premières réponses avant d’échanger.':'Primeras respuestas antes de hablar.',
    'À quel moment faut-il commencer les démarches ?':'¿Cuándo hay que empezar los trámites?',
    'Idéalement plusieurs mois avant la rentrée souhaitée. Le bon calendrier dépend de l’établissement, du dossier et du temps nécessaire pour les formalités.':'Idealmente, varios meses antes del inicio deseado. El calendario adecuado depende del centro, la solicitud y el tiempo necesario para los trámites.',
    'L’accompagnement est-il toujours gratuit pour les familles ?':'¿El acompañamiento es siempre gratuito para las familias?',
    'Pas nécessairement. Lorsqu’un partenariat actif permet une prise en charge par l’établissement, cela est expliqué clairement. Dans les autres situations, les éventuels frais sont annoncés avant toute démarche.':'No necesariamente. Cuando una colaboración activa permite que el centro asuma el acompañamiento, se explica claramente. En las demás situaciones, los posibles gastos se anuncian antes de iniciar los trámites.',
    'Westward Co. Campus garantit-il une admission ou un visa ?':'¿Westward Co. Campus garantiza la admisión o el visado?',
    'Non. L’admission appartient à chaque établissement et la délivrance du visa relève exclusivement des autorités américaines. L’accompagnement sert à mieux comprendre et préparer le parcours.':'No. La admisión corresponde a cada centro y la concesión del visado depende exclusivamente de las autoridades estadounidenses. El acompañamiento ayuda a comprender y preparar mejor el recorrido.',
    'Pouvez-vous aider pour l’installation aux États-Unis ?':'¿Pueden ayudar con la instalación en Estados Unidos?',
    'Les besoins liés au voyage, au logement, au téléphone ou aux premières démarches peuvent être abordés pendant la préparation. Les services éventuellement disponibles sont précisés selon le projet et la destination.':'Las necesidades relacionadas con el viaje, el alojamiento, el teléfono o los primeros trámites pueden tratarse durante la preparación. Los servicios disponibles se precisan según el proyecto y el destino.',
    'Premier échange':'Primera conversación', 'Parlez-nous de votre projet d’études.':'Háblenos de su proyecto de estudios.',
    'Ce premier contact permet de comprendre votre situation et de déterminer les prochaines étapes possibles.':'Este primer contacto permite comprender su situación y determinar los posibles pasos siguientes.',
    'Demande de suivi':'Solicitud de seguimiento', 'Préparons un premier échange vraiment utile.':'Preparemos una primera conversación realmente útil.',
    'Ce questionnaire nous permet de comprendre le profil de l’étudiant, l’avancement du projet et les priorités de la famille avant de vous recontacter.':'Este cuestionario nos permite comprender el perfil del estudiante, el avance del proyecto y las prioridades de la familia antes de volver a contactarle.',
    '4 étapes':'4 etapas', 'Environ 8 minutes':'Unos 8 minutos', 'Sans engagement':'Sin compromiso',
    'Nom et prénom':'Nombre y apellidos', 'E-mail':'Correo electrónico', 'Téléphone':'Teléfono', 'Rentrée envisagée':'Inicio previsto', 'Situation actuelle':'Situación actual',
    'Choisir une réponse':'Elegir una opción', 'Collégien ou lycéen':'Estudiante de secundaria', 'Étudiant':'Estudiante universitario', 'En année de césure':'En año sabático', 'Parent ou représentant légal':'Padre, madre o representante legal', 'Autre situation':'Otra situación',
    'Votre projet':'Su proyecto', 'J’accepte que les informations transmises soient utilisées pour répondre à ma demande, conformément à la':'Acepto que la información enviada se utilice para responder a mi solicitud, de acuerdo con la',
    'politique de confidentialité':'política de privacidad', 'Envoyer ma demande':'Enviar mi solicitud', 'Votre demande sera envoyée directement à Westward Co.':'Su solicitud se enviará directamente a Westward Co.',
    'Les informations saisies sont transmises à Westward Co. uniquement pour répondre à votre demande. Elles ne sont pas enregistrées dans une base de données du site.':'La información introducida se transmite a Westward Co. únicamente para responder a su solicitud. No se guarda en una base de datos del sitio.', 'En savoir plus sur la gestion de vos données.':'Más información sobre la gestión de sus datos.',

    'Accédez bientôt au site officiel et à l’application de commande WESTWARD CO. COFFEE SHOP.':'Muy pronto podrá acceder al sitio oficial y a la aplicación de pedidos de WESTWARD CO. COFFEE SHOP.',
    'Le point d’accès au futur site et à l’application WESTWARD CO. COFFEE SHOP.':'El punto de acceso al futuro sitio y a la aplicación de WESTWARD CO. COFFEE SHOP.',
    'Découvrir. Commander. Entreprendre.':'Descubrir. Pedir. Emprender.', 'Choisissez votre':'Elija su', 'destination.':'destino.',
    'Cette page reliera bientôt l’univers Westward Co. au site officiel, à l’application de commande et au programme de franchise WESTWARD CO. COFFEE SHOP.':'Esta página conectará próximamente el universo Westward Co. con el sitio oficial, la aplicación de pedidos y el programa de franquicias WESTWARD CO. COFFEE SHOP.',
    'Le site officiel':'El sitio oficial', 'Découvrir l’univers, la carte, les événements et toutes les informations pratiques.':'Descubrir el universo, la carta, los eventos y toda la información práctica.',
    'Bientôt disponible':'Próximamente', 'L’application':'La aplicación', 'Commander à l’avance, suivre ses points et retrouver ses avantages.':'Pedir con antelación, consultar los puntos y acceder a las ventajas.', 'En préparation':'En preparación',
    'Développer le concept':'Desarrollar el concepto', 'Devenir franchisé':'Convertirse en franquiciado',
    'Le programme de franchise est en préparation. Vous pouvez dès maintenant présenter votre projet et être informé de son ouverture.':'El programa de franquicias está en preparación. Ya puede presentar su proyecto y recibir información sobre su apertura.',
    'Présenter mon projet':'Presentar mi proyecto', 'Les accès seront activés ici dès leur mise en ligne.':'Los accesos se activarán aquí en cuanto estén disponibles.', 'Un projet professionnel ou une question&nbsp;?':'¿Un proyecto profesional o una pregunta?',

    'Accédez bientôt à la boutique en ligne WESTWARD CO. COWBOY CULTURE.':'La tienda en línea WESTWARD CO. COWBOY CULTURE estará disponible próximamente.',
    'Le point d’accès à la future boutique en ligne WESTWARD CO. COWBOY CULTURE.':'El punto de acceso a la futura tienda en línea WESTWARD CO. COWBOY CULTURE.',
    'Univers western contemporain WESTWARD CO. COWBOY CULTURE':'Universo western contemporáneo WESTWARD CO. COWBOY CULTURE',
    'La boutique':'La tienda', 'arrive bientôt.':'llegará pronto.', 'Cette page deviendra le point d’entrée vers la boutique en ligne WESTWARD CO. COWBOY CULTURE.':'Esta página será el punto de entrada a la tienda en línea WESTWARD CO. COWBOY CULTURE.',
    'Future destination':'Próximo destino', 'La boutique en ligne':'La tienda en línea', 'Vêtements, accessoires et objets inspirés de la culture western américaine.':'Ropa, accesorios y objetos inspirados en la cultura western estadounidense.', 'Une question sur le projet&nbsp;?':'¿Una pregunta sobre el proyecto?',

    'Identités visuelles, sites internet et contenus digitaux par WESTWARD CO. DIGITAL.':'Identidades visuales, sitios web y contenidos digitales de WESTWARD CO. DIGITAL.',
    'Identités visuelles, sites internet et contenus digitaux pensés avec cohérence.':'Identidades visuales, sitios web y contenidos digitales concebidos con coherencia.',
    'Espace de création WESTWARD CO. DIGITAL':'Espacio creativo WESTWARD CO. DIGITAL', 'Bureau de création WESTWARD CO. DIGITAL face aux grands espaces':'Espacio creativo WESTWARD CO. DIGITAL frente a grandes paisajes',
    'Créer une présence cohérente':'Crear una presencia coherente', 'Donner une forme':'Dar una forma', 'claire aux idées.':'clara a las ideas.',
    'WESTWARD CO. DIGITAL accompagne les projets et les entreprises dans la construction de leur identité et de leur présence en ligne.':'WESTWARD CO. DIGITAL acompaña a proyectos y empresas en la construcción de su identidad y su presencia en línea.',
    'Le site dédié est en préparation. Les demandes de projet sont déjà ouvertes.':'El sitio dedicado está en preparación. Ya aceptamos solicitudes de proyectos.',
    'Expertises':'Especialidades', 'EXPERTISES':'ESPECIALIDADES', 'Trois domaines.':'Tres ámbitos.', 'Une même direction.':'Una misma dirección.',
    'Identité visuelle':'Identidad visual', 'Logo, univers graphique et supports cohérents pour rendre un projet immédiatement identifiable.':'Logotipo, universo gráfico y soportes coherentes para que un proyecto sea inmediatamente reconocible.',
    'Sites internet':'Sitios web', 'Des sites clairs, accessibles et pensés autour des objectifs réels de chaque activité.':'Sitios claros, accesibles y pensados en torno a los objetivos reales de cada actividad.',
    'Contenus digitaux':'Contenidos digitales', 'Des contenus visuels et éditoriaux adaptés aux réseaux sociaux et aux prises de parole de la marque.':'Contenidos visuales y editoriales adaptados a las redes sociales y a la comunicación de la marca.',
    'Parlons de votre projet':'Hablemos de su proyecto', 'PARLONS DE VOTRE PROJET':'HABLEMOS DE SU PROYECTO',
    'Une idée à structurer':'Una idea que estructurar', 'ou une présence à construire&nbsp;?':'o una presencia que construir?',
    'Présentez simplement votre activité, votre besoin et votre calendrier. Nous reviendrons vers vous pour définir la suite.':'Presente brevemente su actividad, sus necesidades y su calendario. Nos pondremos en contacto para definir los siguientes pasos.',

    'Parlons de votre projet.':'Hablemos de su proyecto.', 'Pour une demande générale, une collaboration ou une prise de contact avec Westward Co., vous pouvez nous écrire directement.':'Para una consulta general, una colaboración o un primer contacto con Westward Co., puede escribirnos directamente.',
    'Contactez Westward Co. pour une demande générale, une collaboration ou un premier échange autour de nos projets.':'Contacte con Westward Co. para una consulta general, una colaboración o una primera conversación sobre nuestros proyectos.',
    'Nous écrire':'Escribirnos', 'Un premier échange, simplement.':'Una primera conversación, sencillamente.',
    'Pour toute demande liée à une activité spécifique de Westward Co., vous pouvez également passer directement par le site de l’univers concerné.':'Para cualquier consulta relacionada con una actividad específica de Westward Co., también puede acceder directamente al universo correspondiente.',
    'Objet':'Asunto', 'Message':'Mensaje', 'Envoyer':'Enviar',

    'Mentions légales | Westward Co.':'Aviso legal | Westward Co.', 'Mentions légales du site Westward Co.':'Aviso legal del sitio web Westward Co.', 'Cette page est en cours de finalisation. Les informations légales seront ajoutées avant la mise en production définitive du site.':'Esta página se está finalizando. La información legal se añadirá antes del lanzamiento definitivo del sitio.',
    'Politique de confidentialité | Westward Co.':'Política de privacidad | Westward Co.', 'Politique de confidentialité du site Westward Co.':'Política de privacidad del sitio web Westward Co.', 'Cette page est en cours de finalisation. Les informations relatives à la confidentialité seront ajoutées avant la mise en production définitive du site.':'Esta página se está finalizando. La información sobre privacidad se añadirá antes del lanzamiento definitivo del sitio.'
  }
};

const legalMains = {
  en: {
    'mentions-legales/': `<main class="legalPage">
  <section class="legalHero"><p class="eyebrow">Official information</p><h1>Legal notice</h1><p>Information about the publisher, publication manager and hosting provider of westwardco.fr.</p><p class="legalDate">Last updated: September 29, 2026</p></section>
  <div class="legalLayout"><aside class="legalAside" aria-label="Contents"><p>On this page</p><a href="#editeur">Publisher</a><a href="#publication">Publication</a><a href="#hebergement">Hosting</a><a href="#propriete">Intellectual property</a><a href="#liens">External links</a><a href="#contact">Contact</a></aside>
    <div class="legalContent">
      <section class="legalCard legalIdentity" id="editeur"><span class="legalNumber">01</span><div><p class="legalLabel">Website publisher</p><h2>Westward Co.</h2><dl><div><dt>Entrepreneur</dt><dd>Anthony Grosdet</dd></div><div><dt>Status</dt><dd>Sole trader — micro-entrepreneur</dd></div><div><dt>Trade name</dt><dd>Westward Co.</dd></div><div><dt>Business address</dt><dd>5 rue de la Prairie<br>77700 Bailly-Romainvilliers, France</dd></div><div><dt>SIREN / SIRET</dt><dd>Pending allocation — this information will be updated as soon as it is issued.</dd></div><div><dt>Email</dt><dd><a href="mailto:anthony@westwardco.fr">anthony@westwardco.fr</a></dd></div></dl></div></section>
      <section class="legalCard" id="publication"><span class="legalNumber">02</span><div><p class="legalLabel">Publication manager</p><h2>Anthony Grosdet</h2><p>The publication manager is Anthony Grosdet, acting as the sole trader operating Westward Co.</p></div></section>
      <section class="legalCard" id="hebergement"><span class="legalNumber">03</span><div><p class="legalLabel">Hosting</p><h2>Cloudflare</h2><p>The website is hosted by Cloudflare, Inc., 101 Townsend Street, San Francisco, California 94107, United States.</p><p><a href="https://www.cloudflare.com/" rel="noopener noreferrer">www.cloudflare.com</a></p></div></section>
      <section class="legalCard" id="propriete"><span class="legalNumber">04</span><div><p class="legalLabel">Intellectual property</p><h2>Content and identity</h2><p>Unless otherwise stated, the texts, graphic elements, logos, photographs, videos and other content on this website are owned by Westward Co. or used with permission from their owners.</p><p>Any reproduction, representation, adaptation or use, in whole or in part, without prior written permission is prohibited, subject to exceptions provided by law.</p></div></section>
      <section class="legalCard" id="liens"><span class="legalNumber">05</span><div><p class="legalLabel">External links</p><h2>Third-party websites</h2><p>This website may contain links to third-party websites or services. Westward Co. does not control their content, availability or privacy practices and cannot be held responsible for them.</p></div></section>
      <section class="legalCard" id="contact"><span class="legalNumber">06</span><div><p class="legalLabel">Contact</p><h2>A legal question?</h2><p>For any question about this website or this legal notice, email <a href="mailto:anthony@westwardco.fr">anthony@westwardco.fr</a> or use the <a href="/contact/">contact page</a>.</p></div></section>
    </div>
  </div>
</main>`,
    'confidentialite/': `<main class="legalPage">
  <section class="legalHero"><p class="eyebrow">Your personal data</p><h1>Privacy policy</h1><p>This policy explains what data Westward Co. may receive, why it is used and how you can exercise your rights.</p><p class="legalDate">Last updated: September 29, 2026</p></section>
  <div class="legalLayout"><aside class="legalAside" aria-label="Contents"><p>On this page</p><a href="#responsable">Controller</a><a href="#donnees">Data received</a><a href="#finalites">Use</a><a href="#conservation">Retention</a><a href="#destinataires">Recipients</a><a href="#droits">Your rights</a><a href="#cookies">Cookies</a></aside>
    <div class="legalContent">
      <section class="legalCard legalIdentity" id="responsable"><span class="legalNumber">01</span><div><p class="legalLabel">Data controller</p><h2>Anthony Grosdet — Westward Co.</h2><p>Anthony Grosdet, the sole trader operating Westward Co., is responsible for the processing described in this policy.</p><dl><div><dt>Address</dt><dd>5 rue de la Prairie<br>77700 Bailly-Romainvilliers, France</dd></div><div><dt>Email</dt><dd><a href="mailto:anthony@westwardco.fr">anthony@westwardco.fr</a></dd></div></dl></div></section>
      <section class="legalCard" id="donnees"><span class="legalNumber">02</span><div><p class="legalLabel">Data received</p><h2>When you contact us</h2><p>Depending on the form or message used, Westward Co. may receive your name, email address, optional phone number, current situation, intended intake, the subject of your request and your message.</p><div class="legalNote"><strong>How forms currently work</strong><p>The forms transmit your request through a secure function hosted by Cloudflare. The information is used solely to generate the email received by Westward Co. and is not stored in a website database. If direct sending is unavailable, your email application may open with a prepared message that you remain free to send.</p></div></div></section>
      <section class="legalCard" id="finalites"><span class="legalNumber">03</span><div><p class="legalLabel">Use</p><h2>Responding to your request</h2><p>Data is used to read and process your request, reply to you, organise useful exchanges and, when your message concerns a project, prepare any pre-contractual steps you request.</p><p>Depending on your request, processing is based on steps taken at your initiative before any contract or on Westward Co.'s legitimate interest in managing its professional correspondence. No automated decision-making is used.</p></div></section>
      <section class="legalCard" id="conservation"><span class="legalNumber">04</span><div><p class="legalLabel">Retention</p><h2>A limited period</h2><p>Messages and attachments are kept for the time needed to process and follow up the request. For prospect enquiries that do not result in a contractual relationship, retention does not exceed three years from the last contact, unless required by law or needed to establish or defend a legal claim.</p></div></section>
      <section class="legalCard" id="destinataires"><span class="legalNumber">05</span><div><p class="legalLabel">Recipients and security</p><h2>Limited access</h2><p>Data is intended for Anthony Grosdet / Westward Co. and, only where necessary, technical providers responsible for email, hosting or security. It is neither sold nor rented.</p><p>The website is hosted and protected by Cloudflare. Technical data required for security and operation, such as IP addresses and request logs, may be processed by this provider in accordance with its data protection commitments.</p></div></section>
      <section class="legalCard" id="droits"><span class="legalNumber">06</span><div><p class="legalLabel">Your rights</p><h2>You remain in control</h2><p>You may request access, rectification or erasure of your data, restriction of processing, object to processing or request portability where that right applies.</p><p>To exercise a right, email <a href="mailto:anthony@westwardco.fr">anthony@westwardco.fr</a> or write to the business address above. Proof of identity may only be requested where there is reasonable doubt. You may also lodge a complaint with the <a href="https://www.cnil.fr/" rel="noopener noreferrer">CNIL</a>.</p></div></section>
      <section class="legalCard" id="cookies"><span class="legalNumber">07</span><div><p class="legalLabel">Cookies and analytics</p><h2>No advertising trackers</h2><p>The website currently uses neither advertising cookies nor analytics tools requiring your consent. Mechanisms strictly necessary for the operation, protection and security of the website may nevertheless be used by Cloudflare.</p><p>If analytics, personalisation or advertising tools are added, this policy will be updated and, where required by law, your consent will be requested before they are activated.</p></div></section>
      <section class="legalCard"><span class="legalNumber">08</span><div><p class="legalLabel">Updates</p><h2>An evolving policy</h2><p>This policy may be amended to reflect changes to the website, services or legal obligations. The date at the top of the page indicates its latest update.</p></div></section>
    </div>
  </div>
</main>`
  },
  es: {
    'mentions-legales/': `<main class="legalPage">
  <section class="legalHero"><p class="eyebrow">Información oficial</p><h1>Aviso legal</h1><p>Información sobre el editor, el director de publicación y el alojamiento de westwardco.fr.</p><p class="legalDate">Última actualización: 29 de septiembre de 2026</p></section>
  <div class="legalLayout"><aside class="legalAside" aria-label="Índice"><p>En esta página</p><a href="#editeur">Editor</a><a href="#publication">Publicación</a><a href="#hebergement">Alojamiento</a><a href="#propriete">Propiedad intelectual</a><a href="#liens">Enlaces externos</a><a href="#contact">Contacto</a></aside>
    <div class="legalContent">
      <section class="legalCard legalIdentity" id="editeur"><span class="legalNumber">01</span><div><p class="legalLabel">Editor del sitio</p><h2>Westward Co.</h2><dl><div><dt>Empresario</dt><dd>Anthony Grosdet</dd></div><div><dt>Estatuto</dt><dd>Empresario individual — microempresario</dd></div><div><dt>Nombre comercial</dt><dd>Westward Co.</dd></div><div><dt>Dirección profesional</dt><dd>5 rue de la Prairie<br>77700 Bailly-Romainvilliers, Francia</dd></div><div><dt>SIREN / SIRET</dt><dd>Pendiente de asignación — esta información se actualizará en cuanto sea emitida.</dd></div><div><dt>Correo electrónico</dt><dd><a href="mailto:anthony@westwardco.fr">anthony@westwardco.fr</a></dd></div></dl></div></section>
      <section class="legalCard" id="publication"><span class="legalNumber">02</span><div><p class="legalLabel">Dirección de publicación</p><h2>Anthony Grosdet</h2><p>El director de publicación es Anthony Grosdet, en calidad de empresario individual que explota Westward Co.</p></div></section>
      <section class="legalCard" id="hebergement"><span class="legalNumber">03</span><div><p class="legalLabel">Alojamiento</p><h2>Cloudflare</h2><p>El sitio está alojado por Cloudflare, Inc., 101 Townsend Street, San Francisco, California 94107, Estados Unidos.</p><p><a href="https://www.cloudflare.com/" rel="noopener noreferrer">www.cloudflare.com</a></p></div></section>
      <section class="legalCard" id="propriete"><span class="legalNumber">04</span><div><p class="legalLabel">Propiedad intelectual</p><h2>Contenido e identidad</h2><p>Salvo indicación contraria, los textos, elementos gráficos, logotipos, fotografías, vídeos y demás contenidos de este sitio pertenecen a Westward Co. o se utilizan con la autorización de sus titulares.</p><p>Queda prohibida cualquier reproducción, representación, adaptación o explotación, total o parcial, sin autorización previa por escrito, salvo las excepciones previstas por la ley.</p></div></section>
      <section class="legalCard" id="liens"><span class="legalNumber">05</span><div><p class="legalLabel">Enlaces externos</p><h2>Sitios de terceros</h2><p>El sitio puede contener enlaces a servicios o sitios de terceros. Westward Co. no controla su contenido, disponibilidad ni prácticas de privacidad y no puede ser considerado responsable de ellos.</p></div></section>
      <section class="legalCard" id="contact"><span class="legalNumber">06</span><div><p class="legalLabel">Contacto</p><h2>¿Una pregunta jurídica?</h2><p>Para cualquier pregunta sobre el sitio o este aviso legal, escriba a <a href="mailto:anthony@westwardco.fr">anthony@westwardco.fr</a> o utilice la <a href="/contact/">página de contacto</a>.</p></div></section>
    </div>
  </div>
</main>`,
    'confidentialite/': `<main class="legalPage">
  <section class="legalHero"><p class="eyebrow">Sus datos personales</p><h1>Política de privacidad</h1><p>Esta política explica qué datos puede recibir Westward Co., por qué se utilizan y cómo ejercer sus derechos.</p><p class="legalDate">Última actualización: 29 de septiembre de 2026</p></section>
  <div class="legalLayout"><aside class="legalAside" aria-label="Índice"><p>En esta página</p><a href="#responsable">Responsable</a><a href="#donnees">Datos recibidos</a><a href="#finalites">Uso</a><a href="#conservation">Conservación</a><a href="#destinataires">Destinatarios</a><a href="#droits">Sus derechos</a><a href="#cookies">Cookies</a></aside>
    <div class="legalContent">
      <section class="legalCard legalIdentity" id="responsable"><span class="legalNumber">01</span><div><p class="legalLabel">Responsable del tratamiento</p><h2>Anthony Grosdet — Westward Co.</h2><p>Anthony Grosdet, empresario individual que explota Westward Co., es responsable de los tratamientos descritos en esta política.</p><dl><div><dt>Dirección</dt><dd>5 rue de la Prairie<br>77700 Bailly-Romainvilliers, Francia</dd></div><div><dt>Correo electrónico</dt><dd><a href="mailto:anthony@westwardco.fr">anthony@westwardco.fr</a></dd></div></dl></div></section>
      <section class="legalCard" id="donnees"><span class="legalNumber">02</span><div><p class="legalLabel">Datos recibidos</p><h2>Cuando nos contacta</h2><p>Según el formulario o mensaje utilizado, Westward Co. puede recibir su nombre, correo electrónico, teléfono opcional, situación actual, fecha de inicio prevista, el asunto de la solicitud y su mensaje.</p><div class="legalNote"><strong>Funcionamiento actual de los formularios</strong><p>Los formularios transmiten su solicitud mediante una función segura alojada por Cloudflare. La información se utiliza únicamente para generar el correo recibido por Westward Co. y no se guarda en una base de datos del sitio. Si el envío directo no está disponible, su aplicación de correo puede abrirse con un mensaje preparado que usted decide si desea enviar.</p></div></div></section>
      <section class="legalCard" id="finalites"><span class="legalNumber">03</span><div><p class="legalLabel">Uso</p><h2>Responder a su solicitud</h2><p>Los datos se utilizan para leer y tratar su solicitud, responderle, organizar los intercambios útiles y, cuando el mensaje se refiere a un proyecto, preparar las posibles medidas precontractuales solicitadas por usted.</p><p>Según la solicitud, el tratamiento se basa en medidas tomadas a iniciativa suya antes de un posible contrato o en el interés legítimo de Westward Co. de gestionar sus intercambios profesionales. No se realiza ninguna decisión automatizada.</p></div></section>
      <section class="legalCard" id="conservation"><span class="legalNumber">04</span><div><p class="legalLabel">Conservación</p><h2>Un plazo limitado</h2><p>Los mensajes y archivos adjuntos se conservan durante el tiempo necesario para tratar y seguir la solicitud. Para consultas de clientes potenciales que no den lugar a una relación contractual, la conservación no supera tres años desde el último contacto, salvo obligación legal o necesidad de ejercer o defender un derecho.</p></div></section>
      <section class="legalCard" id="destinataires"><span class="legalNumber">05</span><div><p class="legalLabel">Destinatarios y seguridad</p><h2>Acceso limitado</h2><p>Los datos se destinan a Anthony Grosdet / Westward Co. y, solo cuando sea necesario, a proveedores técnicos responsables del correo, alojamiento o seguridad. No se venden ni alquilan.</p><p>El sitio está alojado y protegido por Cloudflare. Los datos técnicos indispensables para la seguridad y el funcionamiento, como la dirección IP y los registros de solicitudes, pueden ser tratados por este proveedor conforme a sus compromisos de protección de datos.</p></div></section>
      <section class="legalCard" id="droits"><span class="legalNumber">06</span><div><p class="legalLabel">Sus derechos</p><h2>Usted mantiene el control</h2><p>Puede solicitar el acceso, la rectificación o la supresión de sus datos, la limitación del tratamiento, oponerse al tratamiento o solicitar la portabilidad cuando corresponda.</p><p>Para ejercer un derecho, escriba a <a href="mailto:anthony@westwardco.fr">anthony@westwardco.fr</a> o a la dirección profesional indicada. Solo podrá solicitarse un justificante de identidad en caso de duda razonable. También puede presentar una reclamación ante la <a href="https://www.cnil.fr/" rel="noopener noreferrer">CNIL</a>.</p></div></section>
      <section class="legalCard" id="cookies"><span class="legalNumber">07</span><div><p class="legalLabel">Cookies y medición de audiencia</p><h2>Sin rastreadores publicitarios</h2><p>Actualmente, el sitio no utiliza cookies publicitarias ni herramientas de medición de audiencia que requieran consentimiento. Cloudflare puede aplicar mecanismos estrictamente necesarios para el funcionamiento, la protección y la seguridad del sitio.</p><p>Si se añaden herramientas de medición, personalización o publicidad, esta política se actualizará y, cuando la normativa lo exija, se solicitará su consentimiento antes de activarlas.</p></div></section>
      <section class="legalCard"><span class="legalNumber">08</span><div><p class="legalLabel">Actualización</p><h2>Una política evolutiva</h2><p>Esta política puede modificarse para reflejar la evolución del sitio, los servicios o las obligaciones legales. La fecha indicada en la parte superior muestra su última actualización.</p></div></section>
    </div>
  </div>
</main>`
  }
};

function replaceAll(text, map) {
  const keys = Object.keys(map).sort((a,b) => b.length - a.length).map(key => key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  return text.replace(new RegExp(keys.join('|'), 'g'), match => map[match]);
}

function pathFor(lang, route) { return lang === 'fr' ? `/${route}` : `/${lang}/${route}`; }

function languageNav(lang, route, mobile = false) {
  const labels = {fr:'Français', en:'English', es:'Español'};
  const menuLabels = {fr:'Choisir la langue', en:'Choose language', es:'Elegir idioma'};
  const links = ['fr','en','es'].map(code => `<a href="${pathFor(code, route)}" lang="${code}" aria-label="${labels[code]}" title="${labels[code]}"${code === lang ? ' class="active" aria-current="page"' : ''}>${code.toUpperCase()}</a>`).join('');
  const className = mobile ? 'mobileLang' : 'languageNav';
  return `<details class="${className}"><summary aria-label="${menuLabels[lang]}"><span>${lang.toUpperCase()}</span><svg viewBox="0 0 10 6" aria-hidden="true"><path d="M1 1l4 4 4-4"/></svg></summary><div class="languageOptions">${links}</div></details>`;
}

function alternates(route) {
  return `<link rel="alternate" hreflang="fr" href="https://westwardco.fr/${route}"><link rel="alternate" hreflang="en" href="https://westwardco.fr/en/${route}"><link rel="alternate" hreflang="es" href="https://westwardco.fr/es/${route}"><link rel="alternate" hreflang="x-default" href="https://westwardco.fr/${route}">`;
}

function localizeLinks(html, lang) {
  if (lang === 'fr') return html;
  const prefix = `/${lang}`;
  const destinations = ['/#notre-histoire','/nos-univers/','/campus/','/coffee-shop/','/cowboy-culture/','/digital/','/contact/','/mentions-legales/','/confidentialite/'];
  for (const destination of destinations) html = html.split(`href="${destination}"`).join(`href="${prefix}${destination}"`);
  html = html.split('href="/"').join(`href="${prefix}/"`);
  return html;
}

for (const route of routes) {
  const sourcePath = join(root, route, 'index.html');
  let source = await readFile(sourcePath, 'utf8');
  source = source.replace(/\/styles\/chrome\.css(?:\?v=[^"]+)?/, '/styles/chrome.css?v=20260929-2');
  source = source.replace(/\/scripts\/site\.js(?:\?v=[^"]+)?/, '/scripts/site.js?v=20260929-4');
  if (!source.includes('hreflang="en"')) source = source.replace('<meta name="robots" content="index, follow">', `<meta name="robots" content="index, follow">\n  ${alternates(route)}`);
  source = source.replace(
    /<nav class="desktopRight"[\s\S]*?(?=\s*<nav class="mobileLang")/,
    `<nav class="desktopRight" aria-label="Navigation principale droite"><a href="/contact/">Contact</a>${languageNav('fr', route)}</nav>`
  );
  source = source.replace(/<span class="mobileLang">FR \/ EN<\/span>|<(?:nav|details) class="mobileLang"[\s\S]*?<\/(?:nav|details)>/, languageNav('fr', route, true));
  await writeFile(sourcePath, source);

  const canonical = `https://westwardco.fr/${route}`;
  for (const lang of ['en','es']) {
    let translated = source;
    translated = translated.replace('<html lang="fr">', `<html lang="${lang}">`);
    translated = translated.replace('content="fr_FR"', `content="${lang === 'en' ? 'en_US' : 'es_ES'}"`);
    translated = translated.split('"inLanguage": "fr-FR"').join(`"inLanguage": "${lang === 'en' ? 'en-US' : 'es-ES'}"`);
    translated = translated.split('"inLanguage":"fr-FR"').join(`"inLanguage":"${lang === 'en' ? 'en-US' : 'es-ES'}"`);
    const translatedCanonical = `https://westwardco.fr/${lang}/${route}`;
    translated = translated.replace(`rel="canonical" href="${canonical}"`, `rel="canonical" href="${translatedCanonical}"`);
    translated = translated.replace(`property="og:url" content="${canonical}"`, `property="og:url" content="${translatedCanonical}"`);
    translated = translated.replace(
      `"@id": "${canonical}#webpage", "url": "${canonical}"`,
      `"@id": "${translatedCanonical}#webpage", "url": "${translatedCanonical}"`
    );
    translated = translated.replace(languageNav('fr', route), '<!--LANGUAGE_NAV-->');
    translated = translated.replace(languageNav('fr', route, true), '<!--MOBILE_LANGUAGE_NAV-->');
    if (legalMains[lang][route]) translated = translated.replace(/<main class="legalPage">[\s\S]*?<\/main>/, legalMains[lang][route]);
    translated = localizeLinks(translated, lang);
    translated = replaceAll(translated, {...common[lang], ...pageText[lang]});
    translated = translated.replace('<!--LANGUAGE_NAV-->', languageNav(lang, route));
    translated = translated.replace('<!--MOBILE_LANGUAGE_NAV-->', languageNav(lang, route, true));
    const destination = join(root, lang, route, 'index.html');
    await mkdir(dirname(destination), {recursive:true});
    await writeFile(destination, translated);
  }
}

const sitemapPath = join(root, 'sitemap.xml');
const sitemapUrls = ['', 'en/', 'es/'].flatMap(prefix => routes.map(route => {
  const priority = route === '' ? (prefix === '' ? '1.0' : '0.9') : '0.7';
  return `  <url><loc>https://westwardco.fr/${prefix}${route}</loc><changefreq>monthly</changefreq><priority>${priority}</priority></url>`;
}));
await writeFile(sitemapPath, `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls.join('\n')}\n</urlset>\n`);

console.log(`Generated ${routes.length * 2} translated pages.`);
