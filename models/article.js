const mongoose = require('mongoose');
const searchPlugin = require('mongoose-search-plugin');

const articleSchema =  mongoose.Schema({
  title: String,
  url: String,
  description: String,
  author: String,
  tags: [String]
});

articleSchema.plugin(searchPlugin, {
  fields: ['title', 'url', 'description','author']
});

const Article = module.exports = mongoose.model('Article', articleSchema);
