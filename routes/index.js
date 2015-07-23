var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/zine-db');
var articles = db.get('articles');
var inputCheck = require('../lib/validation');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'The Zine' });
});

router.get('/new-article', function (req, res) {
  res.render('new-article');
});

router.post('/new-article', function (req, res) {
  var formData = req.body
  var returnArray = inputCheck(formData)
  if (returnArray.length > 0) {
    res.render('new-article', {errorArray: returnArray, oldTitle: formData.title, oldExcerpt: formData.excerpt,
    oldBody: formData.bodyText, oldUrl: formData.backgroundUrl, oldCheck: formData.hasDarkColors});
  }
  else {
    articles.insert(formData);
    res.redirect('/');
  }
});

module.exports = router;
