const resolver = {
    Query: {
        async categories(_,__,context){
            //return await client.query("SELECT * FROM category");
            return await context.dataSources.category.findAllCategories();
        },

        async post( _ , args , context){
            /*const query = {
                text:"SELECT * FROM post WHERE id=$1",
                values:[args.id]
            };

            return await client.query(query);*/
            // return await client.query("SELECT * FROM post WHERE id=$1",[args.id]);

            return await context.dataSources.post.findPostById(args.id);
        }
    },
    Category: {
        /**
         * récupère les posts d'une catégorie
         */
        async posts(category, _ ,context){
            return await context.dataSources.post.findPostsByCategoryId(category.id);
        }
    },
    Post:{
        async category(post, _ , context){
            return await context.dataSources.category.findCategoryById(post.category_id);
        }
    }
};

module.exports = resolver;