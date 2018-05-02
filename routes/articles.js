const express = require('express');
const router = express.Router();

// Article Model
const Article = require('../models/article');

// GET Add
router.get('/add', function(req, res){
  res.render('articles', {
    title:'Add Article'
  });
});

// POST Add
router.post('/add', function(req, res){

    const article = new Article();
    article.title = req.body.title;
    article.url = req.body.url;
    article.author = req.body.author;
    article.description = req.body.description;

    article.save(function(err){
      if(err){
        console.log(err);
        return;
      } else {
        res.redirect('/');
      }
    });
  
});

// GET idArticle
router.get('/:idArticle', function(req, res){
  
  const idArticle = req.params.idArticle;
  
   Article.findOne({ "_id" : idArticle },{}, function(err, article){
    if(err){
      console.log(err)
    } else {
      res.render('article', {
        article:article
      });
    }
  });
});

module.exports = router;
