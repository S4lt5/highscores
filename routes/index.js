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

  //Set these environment variables to connect to DB
  dbuser = process.env.DBUSER;
  dbpass = process.env.DBPASS;
db.connect("mongodb://" + dbuser + ":" + dbpass +  "@ds127994.mlab.com:27994/highscores");
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

router.post('/', function(request,res,next)
{
  console.log(request.body);
    dbuser = process.env.DBUSER;
  dbpass = process.env.DBPASS;
  db.connect("mongodb://" + dbuser + ":" + dbpass +  "@ds127994.mlab.com:27994/highscores");
  var Score = db.model("scores", scoreSchema);  
  var score = new Score({name: request.body.name, score: request.body.score});
  score.save();
  res.send();
});

module.exports = router;
