# GraphQL

GraphQL nous permet de mettre en place un système de requêtage de notre API.

Les requêtes vont être de la forme :

```ql
{
    categories{
        label
        posts {
            category{
                route
                id
            }
        }
    }
}
```

Cette requête va remonter les **labels**,**posts** de toutes les catégories. Dans les posts seront remontés l'**id** et la **category**. De celle-ci on remontera la **route** et l'**id**.

Toutes les requêtes sont adressées en **POST** sur l'url `/graphql`.

## Schéma

Il permet de définir les objets avec lesquels ont va intéragir (requêtage).
Il s'agit de `typeDefs`.

La description des objets se fait via des propriétés en précisant leur type.
De ces définitions vont découler les différentes requêtes possibles via notre API.

## Resolver

Il permet la discussion avec la base de données.
Comme nous le faisions via le DataMapper, le resolver va être le chainon entre la requête du client (le schéma) et la BDD.

On retrouvera ici la définition des méthodes mises à dispositions pour requêter notre BDD.

### DataSource

La classe DataSource est propre au module Apollo.

La classe DataSource va nous permettre de préciser des méthodes spécifiques à nos différents présents dans le schéma. Elle agit comme un DataMapper.

### DataLoader

La classe DataLoader nous permet de mettre en place un système d'organisation au niveau des requêtes poussées via GraphQL. Par exemple, on évitera les doublons.

## Connecteur

Il rassemble les éléments pour faire fonctionner notre API.

On va préciser les éléments nécessaires à Apollo :

```js
// On définit notre serveur Apollo
// on met en place une écoute sur la route /graphql
const graphQLServer = new ApolloServer({
    // schéma
    typeDefs:schema,
    // résolver
    resolvers:resolver,
    context:()=>{
        return {
            client
        }
    },
    dataSources: ()=> dataSources
});

```
