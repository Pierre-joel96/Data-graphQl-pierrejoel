const { DataSource } = require("apollo-datasource");
const DataLoader = require("dataloader");
const client = require("../../dataClient");

/*
id : int
label : string
route : string
*/

module.exports = class CategoryDataSource extends DataSource {
    constructor(){
        super();
    }

    /* INITIALISATION */
    initialize(config){
        this.context = config.context;
        this.client = config.context.client
    }

    /* METHODES */
    // Le DataLoader va nous permettre de faire moins de requêtes par rapport au système initial
    categoryLoader = new DataLoader( async (ids)=>{
        const categories = await client.query("SELECT * FROM category WHERE id = ANY ($1)",[ids]);
        
        return categories.rows;
    });

    async findAllCategories(){
        const result = await client.query("SELECT * FROM category");
        return result.rows;
    }

    async findCategoryById(id){
        // je récupère la catégorie par son id via le DataLoader
        return await this.categoryLoader.load(id);
    }
}