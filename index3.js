var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var app = express();
app.use(bodyParser.urlencoded({extended: false}));
var reddit = require('./reddit.js');

var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Sayuri97',
  database: 'reddit'
});

var redditAPI = reddit(connection);

app.get('/signUp', function(request, response){
  var htmlForm = `
    <form action="/signUp" method="POST">
      <div>
        <input type="text" name="user" placeholder="Please create a username">
      </div>
      <div>
        <input type="password" name="password" placeholder="Please enter a password">
        <p>Password should be no less than 8 characters and include \n
        at least one number and one uppercase letter</p>
      </div>
      <button type="submit">Create!</button>
      <div>
        <a href="http://localhost:3000/login">Click here to log in</a>
      </div>
    </form>
  `;
  response.send(htmlForm);
});

app.post('/signUp', function(request, response){

  redditAPI.createUserInHTML({
    password: request.body.password,
    user: request.body.user,
    userId: 1
  }, function (err, user){
    if (err ){
      response.redirect('/signUp');
    }
    else {
      response.redirect('/login');
    }
    // response.redirect('/login');
  });
});

app.get('/login', function (request, response){
  var loginHTMLForm = `
  <form action='/login' method='POST'>
    <div>
      <input type="text" name='user' placeholder="Enter your username">
    </div>
    <div>
      <input type='password' name='password' placeholder='Enter your password'>
    </div>
    <button type='submit'>Login 😜</button>
    </form>
  `;
  response.send(loginHTMLForm);
});

app.post('/login', function (request, response){
  var user = request.body.user;
  var password = request.body.password;

  redditAPI.checkUserLogin(
  user,
  password,
  function (err, user){
    if (err){
      response.redirect('/login');
    }
    else {
      response.redirect('/homepage');
    }
  });
});

app.get('/homepage', function (request, response){
  if(request.query){
    var sort = request.query.sort;
  }

  redditAPI.getAllSortedPosts(sort, {}, function(err, result){
    function createList (post){
      return `
      <ul>
        <li>
          <p><a href="${post.url}">
            ${post.title}
          </a</p>
          <p>
            ${post.createdAt}
          </p>
        </li>
        <li>
          <p>
            ${post.url}
          </p>
        </li>
      </ul>
      `;}

      var homepage = `
          <div>
            <h1>Welcome to our homepage</h1>
          </div>
          <div>
            <h3>List of Posts</h3>
          </div>
          <div>
            <ul>
            ${result.map(function(post){
              return createList(post);
            }).join('')}
            </ul>
          </div>
          `;
          response.send(homepage);
      //   var sortedHTMLForm = `
      //   <form action='/login' method='POST'>
      //     <div>
      //       <input type="text" name='sorting' placeholder="How would you like to sort these posts?">
      //       <p>You can sort posts by: newest, top, hot, or controversial</p>
      //     </div>
      //     <button type='submit'>Submit</button>
      //     </form>
      //   `;
      //   response.send(sortingHTMLForm);
      });

});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
});
