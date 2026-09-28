# Westward Co. — site institutionnel

Copie statique du site Floot validé. La structure de l’accueil, les textes, les couleurs, les CSS et les sept images viennent du projet Floot `168dbd21-d27b-4f67-9b15-b2321d657f8c` (version `1790633872731`). Les pages sont servies sans dépendance à Floot.

## Déploiement Cloudflare Pages

1. Créer un dépôt GitHub pour ce dossier et pousser la branche `main`.
2. Dans **Workers & Pages → Create → Pages → Import a Git repository**, autoriser seulement ce dépôt.
3. Choisir `main`, laisser la commande de build vide, et indiquer `public` comme répertoire de sortie. Si le dépôt contient directement ce dossier, laisser le root directory vide.
4. Vérifier l’URL `*.pages.dev`, les cinq pages, les images, le menu mobile, `robots.txt` et `sitemap.xml`.
5. Ajouter `westwardco.fr` puis `www.westwardco.fr` dans **Custom domains**. Pour le domaine racine, ajouter la zone DNS à Cloudflare et remplacer les serveurs DNS chez IONOS uniquement après avoir recopié et vérifié les enregistrements de messagerie (MX, SPF, DKIM, DMARC) et les autres services existants.
6. Rediriger `www` vers le domaine racine (ou inversement, mais garder les canoniques cohérentes). Enregistrer le sitemap dans Google Search Console après activation du domaine.

Les pages de mentions légales et de confidentialité sont toujours les textes temporaires du site Floot et restent `noindex`. Le formulaire ouvre le logiciel de messagerie du visiteur, comme dans le site Floot. La commande `python3 generate.py` régénère les cinq pages à partir des contenus approuvés.

Les cartes Campus, Coffee Shop, Digital et Cowboy Culture affichent « Site à venir » jusqu’au lancement de leurs sites annexes ; leurs liens seront ajoutés après mise en ligne des sous-domaines.
