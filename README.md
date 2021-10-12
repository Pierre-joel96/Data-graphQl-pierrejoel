# API de blog

Les étudiants React vont bientôt coder un petit appli de blog qui consomme une API simpliste (vous me direz, c'est pas très important, ils se concentrent sur le front). Du coup, on pourrait peut-être reprendre le concept mais l'étendre grâce aux super-pouvoirs d'Express et Postgres, non ? C'est beau de collaborer entre spés, vous trouvez pas ?

Je vous propose donc de vous baser sur [cette structure de données](https://oclock-open-apis.now.sh/) (uniquement _posts_ et _catégories_).

On va donc recoder les routes :
- `GET /posts` qui affiche la liste des posts dans notre base de données
- `GET /categories` qui fait la même chose pour les catégories

Puis d'y apporter quelques embellissements :
- Une route `GET /posts/:id` pour afficher un unique article à partir de son _id_
- Une route `GET /posts/category/:id` idem mais pour n'afficher que les posts d'une catégorie précise

Pour être sur que *id* a bien la forme d'un id (donc un nombre) et pas n'importe quoi (comme "tarteauxfraises" par exemple) on peut utiliser une feature d'Express : la validation des paramètres d'URL via les regexs ! Plus d'info [par ici](https://expressjs.com/en/guide/routing.html#route-parameters).

Et en **bonus** :

Une route `POST /posts` pour ajouter un article, dont on enverra la structure en JSON. La route nous renverra ce même article, mais avec une propriété en plus : son _id_, preuve qu'il a bien été sauvegardé en base. Cette nouvelle route devra utiliser [Joi](https://www.npmjs.com/package/joi) pour valider les données passées dans la requête.

## Hépépép

Partez pas tête dans le guidon, tout bon projet commence par une phase de conception. Pour que votre API envoie du poney, il faut qu'elle puisse accéder à une base robuste et sécurisée. Alors on commence par dresser le MCD du projet (ça devrait aller :smirk:), puis on applique les règles de transformation. On se crée un nouveau projet Sqitch, dans un sous-dossier `migrations` par exemple (ou `alphonse`, c'est sympa aussi), on écrit une première migration, on configure, on déploie et si plus tard, on se dit "tiens, ce type-là, c'est peut-être pas le choix le plus judicieux", on fera une nouvelle migration, tout simplement.

## Ordo Ab Chao

Le projet est modeste mais c'est pas une raison pour _coder sale_. C'est une petite API, donc ça va pas être un MVC de compétition (déjà, il n'y aura pas de vues) mais créer quelques dossiers avec des noms explicites n'a jamais tué personne.

## On met rien dans les tables ?

Si si, les données sont dans le dossier data de ce repo. Ah, par contre, c'est pas des insertions SQL, c'est du JSON, mais vous avez normalement toutes les compétences nécessaires pour créer ce qu'on appelle dans le jargon métier un _import ad hoc_ : un petit script sur mesure pour créer un pont entre 2 technos qui ne savent pas communiquer nativement (ici JSON et SQL). Vous pouvez vous y frotter en premier ou en dernier, mais si vous commencez par ça, l'avantage que votre API aura tout de suite des données à afficher :wink:

<details>
<summary>Comment faire ?</summary>

1. Créer un script sobrement nommé `import.js` : ben oui, le pont le plus évident entre JSON et SQL, c'est Javascript.
2. Récupérer les données du fichier JSON
3. Boucler sur ces données
4. Pour chaque donnée, exécuter une requête d'insertion SQL
5. Parce que vous allez probablement essayer plusieurs fois avant d'y arriver, vous allez avoir des problèmes d'unicité et autres joyeusetés SQL : prévoyez de faire table rase des données déjà dans la base avant de commencer à boucler :bomb:
</details>
