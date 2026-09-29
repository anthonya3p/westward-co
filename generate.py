"""Generate the static Westward Co. site from the approved Floot copy."""

from html import escape
from pathlib import Path
import json

ROOT = Path(__file__).parent / "public"
SITE = "https://westwardco.fr"
LOGO_BLACK = "/assets/0a89128e-3b66-4128-b890-8c855a164e61-westward-logo-black.png"
LOGO_WHITE = "/assets/49dc0be8-ac8c-464d-b4f4-c8be1ae4d64a-westward-logo-white.png"
HERO = "/assets/1ab40899-ffe2-4c18-956b-239a7f4a623a-utah-hero-real.jpg"


def header():
    return f'''<header class="header" id="site-header">
  <div class="headerInner">
    <nav class="desktopLeft" aria-label="Navigation principale gauche">
      <a href="/#notre-histoire">Notre histoire</a><a href="/nos-univers/">Nos univers</a>
    </nav>
    <button class="menuButton" type="button" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="mobile-menu"><span></span><span></span></button>
    <a class="brand" href="/" aria-label="Westward Co. - accueil"><img src="{LOGO_BLACK}" alt="Westward Co."></a>
    <nav class="desktopRight" aria-label="Navigation principale droite"><a href="/contact/">Contact</a><span>FR / EN</span></nav>
    <span class="mobileLang">FR / EN</span>
  </div>
  <nav class="mobileMenu" id="mobile-menu" aria-label="Navigation mobile" hidden>
    <a href="/#notre-histoire">Notre histoire</a><a href="/nos-univers/">Nos univers</a><a href="/contact/">Contact</a>
  </nav>
</header>'''


def footer():
    return f'''<footer class="footer">
  <div class="footerGrid">
    <div class="footerBrand"><img src="{LOGO_WHITE}" alt="Westward Co."><p>Westward Co. — France × United States</p></div>
    <nav class="footerNav" aria-label="Navigation de pied de page"><a href="/#notre-histoire">Notre histoire</a><a href="/nos-univers/">Nos univers</a><a href="/contact/">Contact</a></nav>
    <div class="footerContact"><a href="mailto:anthony@westwardco.fr">anthony@westwardco.fr</a>
      <div class="footerLegal"><a href="/mentions-legales/">Mentions légales</a><a href="/confidentialite/">Politique de confidentialité</a></div>
    </div>
  </div><div class="footerBottom">© Westward Co. 2026</div>
</footer>'''


def page(path, title, description, body, css=None, noindex=False):
    url = SITE + path
    image = SITE + HERO
    structured = [{
        "@context": "https://schema.org", "@type": "Organization",
        "@id": SITE + "/#organization", "name": "Westward Co.", "url": SITE + "/",
        "logo": SITE + LOGO_BLACK, "email": "anthony@westwardco.fr",
    }, {
        "@context": "https://schema.org", "@type": "WebPage", "@id": url + "#webpage",
        "url": url, "name": title, "description": description, "inLanguage": "fr-FR",
        "isPartOf": {"@id": SITE + "/#website"},
        "publisher": {"@id": SITE + "/#organization"},
    }]
    if path == "/":
        structured.append({"@context": "https://schema.org", "@type": "WebSite",
                           "@id": SITE + "/#website", "url": SITE + "/",
                           "name": "Westward Co.", "inLanguage": "fr-FR",
                           "publisher": {"@id": SITE + "/#organization"}})
    tags = "\n".join(f'<script type="application/ld+json">{json.dumps(x, ensure_ascii=False).replace("<", "\\u003c")}</script>' for x in structured)
    content = f'''<!doctype html>
<html lang="fr"><head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{escape(title)}</title><meta name="description" content="{escape(description, quote=True)}">
  <meta name="robots" content="{'noindex, nofollow' if noindex else 'index, follow'}">
  <link rel="canonical" href="{url}"><meta name="theme-color" content="#F4EFE6">
  <link rel="icon" type="image/png" href="{LOGO_BLACK}">
  <meta property="og:type" content="website"><meta property="og:site_name" content="Westward Co.">
  <meta property="og:locale" content="fr_FR"><meta property="og:title" content="{escape(title, quote=True)}">
  <meta property="og:description" content="{escape(description, quote=True)}"><meta property="og:url" content="{url}">
  <meta property="og:image" content="{image}"><meta property="og:image:alt" content="Paysage de l'Ouest américain — Westward Co.">
  <meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="{escape(title, quote=True)}">
  <meta name="twitter:description" content="{escape(description, quote=True)}"><meta name="twitter:image" content="{image}">
  {tags}
  <link rel="stylesheet" href="/styles/base.css"><link rel="stylesheet" href="/styles/chrome.css">
  {f'<link rel="stylesheet" href="/styles/{css}.css">' if css else ''}
  {f'<link rel="preload" as="image" href="{HERO}">' if path == '/' else ''}
  <script src="/scripts/site.js" defer></script>
</head><body>{header()}{body}{footer()}</body></html>'''
    destination = ROOT / path.lstrip("/") / "index.html"
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(content, encoding="utf-8")


home = f'''<main>
  <section class="hero" style="background-image:linear-gradient(rgba(28,27,24,.33),rgba(28,27,24,.58)),url('{HERO}')">
    <div class="heroInner"><img class="heroLogo" src="{LOGO_WHITE}" alt="Westward Co.">
      <div class="heroCopy"><p class="kicker">France × United States</p>
        <h1>Différents projets,<br>une même direction.</h1>
        <p class="lead">Westward Co. rassemble différents projets nés de l’amour d’un père pour ses enfants et d’une même volonté : leur offrir davantage d’opportunités, d’ouverture et de choix pour l’avenir.</p>
        <div class="heroActions"><a class="primaryButton" href="#notre-histoire">Notre histoire</a><a class="secondaryButton" href="/nos-univers/">Nos univers</a></div>
      </div>
    </div>
  </section>
  <section class="story" id="notre-histoire"><div class="storyTop"><p class="eyebrow">Notre histoire</p>
    <h2>Tout est parti d’un projet familial.</h2><div class="storyIntro">
      <p>Lorsque mon fils a choisi de poursuivre ses études aux États-Unis, ce qui devait être avant tout une aventure étudiante est progressivement devenu beaucoup plus.</p>
      <p>En découvrant de l’intérieur les démarches, les choix à faire, les opportunités mais aussi les difficultés liées à un projet de vie entre la France et les États-Unis, une idée s’est installée :</p>
    </div></div>
    <blockquote>« Ne pas simplement attendre que les opportunités se présentent, mais essayer de les créer. »</blockquote>
    <div class="storyBottom"><span class="storyRule"></span><div>
      <p>Westward Co. est né de cette réflexion.</p>
      <p>Pas autour d’une activité unique, mais autour de plusieurs projets développés avec la même intention : construire, entreprendre et ouvrir de nouvelles possibilités pour l’avenir de mes enfants.</p>
      <p>Avec le temps, ces projets ont pris des formes différentes. Westward Co. est aujourd’hui l’identité qui les rassemble.</p>
    </div></div>
  </section>
  <section class="vision"><div class="sectionInner"><div class="visionHeading"><p class="eyebrow">Notre vision</p>
    <h2>Créer des projets qui ont du sens, et leur laisser la possibilité d’évoluer.</h2></div>
    <div class="visionText"><p>Westward Co. n’est pas né autour d’un secteur d’activité unique.</p>
      <p>Les projets qui le composent peuvent être très différents, mais ils partagent une même origine : <strong>l’envie de créer de nouvelles possibilités, de construire dans le temps et de ne pas se limiter à un seul cadre.</strong></p>
      <p>Certains projets sont développés en France, d’autres sont tournés vers les États-Unis. Certains sont déjà concrets, d’autres sont encore en construction.</p>
      <p>L’objectif n’est pas de tout réunir artificiellement sous une même activité, mais de donner à chaque projet <strong>sa propre identité, son propre développement et sa propre destination</strong>, tout en conservant Westward Co. comme fil conducteur.</p>
    </div></div>
  </section>
  <section class="closing"><div class="closingInner"><p class="eyebrow">La suite</p>
    <h2>Westward Co. continuera d’évoluer au rythme des projets, des rencontres et des opportunités qui lui donnent du sens.</h2>
    <div class="closingLinks"><a href="/nos-univers/">Découvrir nos univers <span>→</span></a><a href="/contact/">Nous contacter <span>→</span></a></div>
  </div></section>
</main>'''

universes = [
    ("CAMPUS", "campus", "#73715A", "15fbcdd2-521d-4f95-ac0b-6574e3ad5410-westward-campus-bg.png", "Westward Co. Campus accompagne les familles et les étudiants français dans la préparation d’un projet d’études aux États-Unis, de la recherche d’établissement jusqu’à la préparation du départ."),
    ("COFFEE SHOP", "coffee", "#8A694F", "24543af8-3354-4564-995b-f3ab4ed56620-westward-coffee-bg.png", "Westward Co. Coffee Shop est un concept de coffee shop mobile pensé pour proposer une expérience simple, qualitative et flexible, capable de s’installer dans différents lieux et événements."),
    ("DIGITAL", "digital", "#1C1B18", "bf11cd61-1c11-45ca-a1c8-6acf991af2ad-westward-digital-bg.png", "Westward Co. Digital développe des identités visuelles, des sites internet et des contenus digitaux pensés pour aider des projets et des entreprises à construire une présence cohérente et professionnelle."),
    ("COWBOY CULTURE", "cowboy", "#8A694F", "1e854af7-4c40-4e47-b15a-4cf4830b1f88-westward-cowboy-bg.png", "Westward Co. Cowboy Culture développe un univers lifestyle inspiré de la culture western américaine, à travers des vêtements, des accessoires et des objets pensés dans une approche contemporaine."),
]
rows = "\n".join(f'''<{"a" if kind == "campus" else "article"} class="row {kind}" {"href=\"/campus/\"" if kind == "campus" else ""} style="--accent:{accent};--bg-image:url('/assets/{image}')">
  <div class="identity"><img src="{LOGO_BLACK}" alt="Westward Co."><div class="branchLockup"><span class="branchRule" aria-hidden="true"></span><strong>{name}</strong><span class="branchRule" aria-hidden="true"></span></div></div>
  <p>{description}</p><span class="discover">{"Découvrir <b>→</b>" if kind == "campus" else "Site à venir"}</span>
</{"a" if kind == "campus" else "article"}>''' for name, kind, accent, image, description in universes)
universe_body = f'''<main class="page"><section class="hero"><img src="{LOGO_BLACK}" alt="Westward Co.">
  <p class="eyebrow">Nos univers</p><h1>Des projets indépendants,<br>réunis par une même histoire.</h1>
  <p>Westward Co. rassemble plusieurs projets développés dans des domaines différents. Chacun évolue avec sa propre identité, son propre public et ses propres objectifs.</p>
  <span>Choisissez l’univers que vous souhaitez découvrir.</span></section>
  <section class="list">{rows}
    <a class="row mediaRow" href="https://monenfantauxusa.fr" target="_blank" rel="noopener noreferrer" style="--accent:#D8C7AE">
      <div class="identity"><strong class="mediaName">Mon Enfant aux USA</strong><small>Média associé à Westward Co.</small></div>
      <p>Mon Enfant aux USA est un média consacré à l’expérience des études et de la vie étudiante aux États-Unis, construit à partir d’une expérience familiale réelle et partagé pour informer les familles qui envisagent à leur tour ce parcours.</p>
      <span class="discover">Découvrir <b>→</b></span>
    </a>
  </section>
</main>'''

contact = f'''<main class="page"><section class="hero"><img src="{LOGO_BLACK}" alt="Westward Co.">
  <p class="eyebrow">Contact</p><h1>Parlons de votre projet.</h1>
  <p>Pour une demande générale, une collaboration ou une prise de contact avec Westward Co., vous pouvez nous écrire directement.</p>
  <a href="mailto:anthony@westwardco.fr">anthony@westwardco.fr</a></section>
  <section class="contactGrid"><div class="contactInfo"><p class="eyebrow">Nous écrire</p>
    <h2>Un premier échange, simplement.</h2><a href="mailto:anthony@westwardco.fr">anthony@westwardco.fr</a>
    <p>Pour toute demande liée à une activité spécifique de Westward Co., vous pouvez également passer directement par le site de l’univers concerné.</p></div>
    <form class="form" id="contact-form"><label>Nom et prénom<input name="nom" required></label>
      <label>E-mail<input name="email" type="email" required></label><label>Objet<input name="objet" required></label>
      <label>Message<textarea name="message" rows="7" required></textarea></label>
      <button type="submit">Envoyer</button>
    </form>
  </section>
</main>'''


def placeholder(label, text):
    return f'''<main class="legal"><p class="eyebrow">{label}</p><h1>{label}</h1><p>{text}</p></main>'''


page("/", "Westward Co. | Projets entre la France et les États-Unis",
     "Westward Co. est une marque ombrelle née d’une histoire familiale et de projets développés entre la France et les États-Unis.", home, "home")
page("/nos-univers/", "Nos univers | Westward Co.",
     "Découvrez les univers Westward Co. : Campus, Coffee Shop, Digital, Cowboy Culture et le média Mon Enfant aux USA.", universe_body, "universes")
page("/contact/", "Contact | Westward Co.",
     "Contactez Westward Co. pour une demande générale, une collaboration ou un premier échange autour de nos projets.", contact, "contact")
page("/mentions-legales/", "Mentions légales | Westward Co.", "Mentions légales du site Westward Co.",
     placeholder("Mentions légales", "Cette page est en cours de finalisation. Les informations légales seront ajoutées avant la mise en production définitive du site."), noindex=True)
page("/confidentialite/", "Politique de confidentialité | Westward Co.", "Politique de confidentialité du site Westward Co.",
     placeholder("Politique de confidentialité", "Cette page est en cours de finalisation. Les informations relatives à la confidentialité seront ajoutées avant la mise en production définitive du site."), noindex=True)
