var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({extended: false}));
var reddit = require('./reddit.js');

var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'dysupes', // CHANGE THIS :)
  password : '',
  database: 'reddit'
});

var redditAPI = reddit(connection);

app.get('/hello', function (req, res) {
  res.send('<h1>Hello World!</h1>');
});

app.get('/hello', function (req,res){

	var name = req.query.name;

	res.send(`<h1> Hello ${name}!</h1>`);

});

app.get('/calculator/:operation', function (req, res){
      var numOperation = req.params.operation;
      var numb1 = req.query.num1;
      var numb2 = req.query.num2;
      var solution;

      if(numOperation === 'add' || numOperation === "sub" || numOperation === 'mult' || numOperation === 'div'){
        if (numOperation === 'add'){
          solution = numb1 + numb2;
        }
        else if (numOperation === 'sub'){
          solution = numb1 - numb2;
        }
        else if (numOperation === 'mult'){
          solution = numb1 * numb2;
        }
        else if (numOperation === 'div'){
          solution = numb1 / numb2;
        }
        res.send({
          operator: numOperation,
          firstOperand: numb1,
          secondOperand: numb2,
          finalResult: solution
        });
      }
      else {
        res.status(400).send("Error Code: 400");
      }
});

app.get('/posts', function(request, response){
  var num = parseInt(request.query.id);

  redditAPI.getLastFivePostsFromUser(num, {}, function(err, res){

    function createLi(post){
      return `
      <li>
        <p>
          ${post.title}
        </p>
      </li>
      <ul><li>
        <p>
          ${post.url}
        </p>
      </li></ul>
      `;}

      var html = `
      <div id="contents">
      <h1>List of contents</h1>
      <ul class="contents-list">
        ${res.map(function(post){
          return createLi(post);
        }).join("")}
      </ul>
      </div>
      `;


      response.send(html);

  })
});

app.get('/createContent', function(request, response){
  var htmlForm = `
  <form action="/createContent" method="POST"> <!-- what is this method="POST" thing? you should know, or ask me :) -->
    <div>
      <input type="text" name="url" placeholder="Enter a URL to content">
    </div>
    <div>
      <input type="text" name="title" placeholder="Enter the title of your content">
    </div>
    <button type="submit">Create!</button>
  </form>
  `;


  response.send(htmlForm);
});

app.post('/createContent', function(request, response){
  console.log(request.body);
  redditAPI.createPost({
    title: request.body.title,
    url: request.body.url,
    userId: 1
  }, function (err, post){
    res.send(post);
  });
});


/* YOU DON'T HAVE TO CHANGE ANYTHING BELOW THIS LINE :) */

// Boilerplate code to start up the web server
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
