// load the mysql library
var mysql = require('mysql');

// create a connection to our Cloud9 server
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'shreyakaicker', // CHANGE THIS :)
  password : '',
  database: 'reddit'
});

// load our API and pass it the connection
var reddit = require('./reddit.js');
var redditAPI = reddit(connection);

//It's request time!

// redditAPI.createUser({username: 'Dylan', password: 'charlie'}, console.log);
// redditAPI.createUser({username: 'Shreya', password: 'anything'}, console.log);
// redditAPI.createUser({username: 'Simon', password: 'hair'}, console.log);
// redditAPI.createUser({username: 'Julian', password: 'gpa'}, console.log);


// redditAPI.createPost({
//   title: 'Hello Reddit!',
//   url: 'https://www.reddit.com',
//   userId: '1',
//   subredditId: null
//   }, 
//   function(err, post) {
//   if (err) {
//     console.log(err);  
//   }
//   else {
//     console.log(post);
//   }  
// });

// redditAPI.createPost({
//   title: 'Howdy do!',
//   url: 'https://www.google.com',
//   userId: '2',
//   subredditId: null
//   }, 
//   function(err, post) {
//   if (err) {
//     console.log(err);  
//   }
//   else {
//     console.log(post);
//   }  
// });

// redditAPI.createPost({
//   title: 'Time to waste some time on Facebook!',
//   url: 'https://www.facebook.com',
//   userId: '3',
//   subredditId: null
//   }, 
//   function(err, post) {
//   if (err) {
//     console.log(err);  
//   }
//   else {
//     console.log(post);
//   }  
// });

// redditAPI.createPost({
//   title: 'I\'d like to graduate from McGill!',
//   url: 'https://www.mcgill.ca',
//   userId: '4',
//   subredditId: null
//   }, 
//   function(err, post) {
//   if (err) {
//     console.log(err);  
//   }
//   else {
//     console.log(post);
//   }  
// });

// redditAPI.createSubreddit({name: 'McGill graduation party', description: 'McGill Campus'}, function(err, res){
//     console.log(res);
// });

// redditAPI.createSubreddit({name: 'Emma\'s birthday party', description: 'Rio Tinto Planetarium'}, function(err, res){
//     console.log(res);
// });

// redditAPI.createSubreddit({name: 'The big presentation', description: 'August 26th at WeWork'}, function(err, res){
//     console.log(res);
// });

// redditAPI.createSubreddit({name: 'Back to school bash', description: 'Concordia University'}, function(err, res){
//     console.log(res);
// });

// redditAPI.createComment({
//   text: 'Today is a beautiful day!',
//   userId: '1',
//   postId: '1'
//   }, 
//   function(err, post) {
//     console.log(post);
//   }
// );

// redditAPI.createComment({
//   text: 'Yesterday was a beautiful day!',
//   userId: '2',
//   postId: '1'
//   }, 
//   function(err, post) {
//     console.log(post);
//   }
// );

// redditAPI.createComment({
//   text: 'What a great day to be alive!',
//   userId: '3',
//   postId: '2'
//   }, 
//   function(err, post) {
//     console.log(post);
//   }
// );

// redditAPI.createComment({
//   text: 'Man oh man, I shouldn\'t have gone out last night!',
//   userId: '4',
//   postId: '3'
//   }, 
//   function(err, post) {
//     console.log(post);
//   }
// );


// redditAPI.getAllPosts(function(err,res){
//   console.log(res);
// });

// redditAPI.getAllPostsFromUser(3, function(err, res){
//   console.log(res);
// });

// redditAPI.getSinglePost(4, function(err, res){
//   console.log(res);
// });

// redditAPI.getAllSubreddits(function (err, res) {
//   if (err) {
//     console.log(err);
//   }
//   else { 
//     console.log(res)
//   }
// });