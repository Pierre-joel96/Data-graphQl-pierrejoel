/*
CATEGORY
id : int
label : string
route : string
*/

/*
POST
id : int
content : string 
excerpt : string
slug : string
title : string
category_id : int
*/

const { gql } = require("apollo-server-express"); 

// Le schéma me permet de décrire mes données
// Par décrire, il est sous entendu le format attendu pour requêter mon API et obtenir des réponses

const schema = gql`

# permet de commenter à l'intérieur de mon schéma

# le ! signifie NOT NULL
type Category {
    id: ID!
    label: String!
    route: String!

    posts:[Post]
}

type Post {
    id : ID!
    content : String
    excerpt : String
    slug : String
    title : String!

    category : Category! 
    # représente la catégorie du post (on aura l'objet représentant la catégorie)
}

# on définit les points d'entrée :
type Query {
    # Liste des catégories (route /categories)
    categories : [Category]

    # Récupération d'un post par son id (route /posts/id)
    post(id : ID!) : Post
}

`;

module.exports = schema;