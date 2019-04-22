var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Dossier', description: 'An Express.js Backend Baked with MongoDB and GraphQL' });
});

module.exports = router;
