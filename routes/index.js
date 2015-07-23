var express = require('express');
var router = express.Router();
var db = require('monk')(process.env.MONGO_URI);
var articles = db.get('articles');
var inputCheck = require('../lib/validation');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'The Zine' });
});

router.get('/new-article', function (req, res) {
  res.render('new-article');
});

router.get('/articles', function (req, res) {
  articles.find({}, function (err, data) {
    data.reverse();
    res.render('articles', {allArticles: data});
  });
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
    res.redirect('/articles');
  }
});

router.get('/article/:id', function (req, res) {
  articles.findOne({_id: req.params.id}, function (err, data) {
    res.render('article', {article: data});
  });
});


module.exports = router;
