const mongoose = require('mongoose');
const searchPlugin = require('mongoose-search-plugin');

const websiteSchema =  mongoose.Schema({
  title: String,
  url:String,
  description:String ,
  tags: [String]
});

websiteSchema.plugin(searchPlugin, {
  fields: ['title', 'url', 'description']
});

  const Website = module.exports = mongoose.model('Website', websiteSchema);
