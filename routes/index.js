const express = require('express');
const router = express.Router();

const Article = require('../models/article');
const Website = require('../models/website');

router.get('/', function(req, res, next) {
  
  res.render('index', {
          title: '',
          elements: '',
          type : ''
        });
});

router.post("/", function (req, res, next) {
  const searchType = req.body.searchType
  const query = req.body.searchText;
  
  if(searchType =='website'){
    Website.search(query, {title: 1}, {
        conditions: {title: {$exists: true}},
        sort: {title: 1},
        limit: 10
      }, function(err, data) {
        if(data.results == ''){
            res.render('index', {
              title: 'no result for : '+ query,
              elements: '',
              type : ''
            });
          }else{
            res.render('index', {
              title: 'this websites contain the key: '+ query,
              elements: data.results,
              type : searchType+'s'
            });
          }    
    });
 }else if(searchType =='article'){
  console.log('article');
    Article.search(query, {title: 1}, {
        conditions: {title: {$exists: true}},
        sort: {title: 1},
        limit: 10
      }, function(err, data) {
          if(data.results == ''){
            res.render('index', {
              title: 'no result for : '+ query,
              elements: '',
              type : ''
            });
          }else{
            res.render('index', {
              title: 'this article contain the key: '+ query,
              elements: data.results,
              type : searchType+'s'
            });
          }
    });
 }
 
});

module.exports = router;
