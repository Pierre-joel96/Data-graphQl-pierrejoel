const { DataSource } = require("apollo-datasource");
const DataLoader = require("dataloader");
const client = require("../../dataClient");

/*
id : int
content : string
excerpt : string
title : string
slug : string
*/

module.exports = class PostDataSource extends DataSource {
    // Le constructor de notre DataSource est repris à l'identique
    constructor() {
        // le super fait référence au constructeur de DataSource
        super();
    }

    /* INITIALISATION */
    initialize(config) {
        this.context = config.context;
        this.client = config.context.client
    }

    /* METHODES */
    postLoader = new DataLoader(async (ids) => {
        try {
            const posts = await client.query("SELECT * FROM post WHERE id = ANY ($1)", [ids]);

            return posts.rows;
        }
        catch (err) {
            return [];
        }
    });

    async findPostById(id) {
        // je récupère la catégorie par son id via le DataLoader
        return await this.postLoader.load(id);
    }

    async findAllPosts() {
        const posts = await client.query("SELECT * FROM post");
    }

    async findPostsByCategoryId(category_id) {
        try {
            const result = await client.query("SELECT * FROM post WHERE category_id=$1", [category_id]);
            return result.rows;
        }
        catch (err) {
            console.log(err);
            return [];
        }
    }
}