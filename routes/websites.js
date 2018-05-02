const express = require('express');
const router = express.Router();

// Article Model
const Website = require('../models/website');

// GET Add 
router.get('/add', function(req, res){
  res.render('websites', {
    title:'Add Website'
  });
});

// POST Add Route
router.post('/add', function(req, res){

    const website = new Website();
    website.title = req.body.title;
    website.url = req.body.url;
    website.description = req.body.description;

    website.save(function(err){
      if(err){
        console.log(err);
        return;
      } else {
        res.redirect('/');
      }
    });
  
});

//GET idWebsite
router.get('/:idWebsite', function(req, res){
  console.log('b');
  
  const idWebsite = req.params.idWebsite;
  
   Website.findOne({ "_id" : idWebsite },{}, function(err, website){
    if(err){
      console.log(err);
    } else {
      res.render('website', {
        website:website
      });
    }
  });
});

module.exports = router;
