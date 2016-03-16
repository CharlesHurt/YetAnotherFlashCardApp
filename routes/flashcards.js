var express = require('express');
var router = express.Router();
var path = require('path');
const HTML_FILE = path.join(__dirname, 'index.html');

var db = require('../config/db');


router.get('/', function(req, res, next) {
	db.query('SELECT * FROM flashcards', function(err, rows, fields) {
		if (err) {
			res.status(400);
			res.send(err);
		} else {
			res.send(rows);
		}
	});
});

router.post('/', function(req, res, next) {
	var q = 'INSERT INTO flashcards (category, question, answer) VALUES (' 
	q +=  req.body.category + ',' + req.body.question + ',' + req.body.answer + ')'
  db.query(q, function(err, rows, fields) {
		if (err) {
			res.status(400);
			res.send(err);
		} else {
			res.send(rows);
		}
	});
});

router.put('/:id', function(req, res, next) {
	var columnName = ''
  //console.log('fieldnames:' + req.body.category + '/' + req.body.question + '/' + req.body.answer)
	if (req.body.category) {
		columnName += " category=" + req.body.category + " "
	}

	if (req.body.question) {
		  if (columnName !== '') {
		  	columnName += ','
		  }
			columnName += " question=" + req.body.question + " "
	}

	if (req.body.answer) {
			if (columnName !== '') {
		  	columnName += ','
		  }
			columnName += " answer=" + req.body.answer + " "
	}

	var q = "UPDATE flashcards SET " + columnName + " where id=" + req.params.id
   
  db.query(q, function(err, rows, fields) {
		if (err) {
			res.status(400);
			res.send(err);
		} else {
			res.send(rows);
		}
	});
});

router.delete('/:id', function(req, res, next) {
	var q = "DELETE FROM flashcards WHERE id=" + req.params.id
  db.query(q, function(err, rows, fields) {
		if (err) {
			res.status(400);
			res.send(err);
		} else {
			res.send(rows);
		}
	});
});

module.exports = router;
