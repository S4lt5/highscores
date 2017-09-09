var express = require('express');
var db = require('mongoose');


var scoreSchema = db.Schema(
  {    
    rank: Number,
    name: String,
    score: Number
  });

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
db.connect("mongodb://highscores:highscores_pw@ds127994.mlab.com:27994/highscores");
  var Score = db.model("scores", scoreSchema);  
  var query = Score.find({}).sort("-score").limit(10);
  query.exec(function (err,scores)
  {
    var rank = 1;
    scores.forEach(function(element) {
      element.rank = rank;
      rank++;
    }, this);
    console.log(scores);    
    res.render('index', { title: 'Express' , scores: scores});
  });
  
  
});

module.exports = router;
