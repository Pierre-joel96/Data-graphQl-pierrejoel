const CategoryDataSource = require("./category.js");
const PostDataSource = require("./post.js");

module.exports = {
    category : new CategoryDataSource(),
    post : new PostDataSource()
};