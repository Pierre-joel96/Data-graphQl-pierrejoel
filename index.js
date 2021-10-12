require("dotenv").config();
const express = require("express");
const { ApolloServer} = require("apollo-server-express");
const schema = require("./GraphQL/schema.js");
const resolver = require("./GraphQL/resolver.js");
const client = require("./dataClient.js");
const dataSources = require("./GraphQL/DataSource");

const app = express();

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

async function init(){
    await graphQLServer.start();

    app.use(express.json());

    // On attache le middleware graphQL à notre serveur express
    app.use(graphQLServer.getMiddleware());

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, _ =>{
        console.log("Serveur démarré sur le port",PORT);
    });
}

init();