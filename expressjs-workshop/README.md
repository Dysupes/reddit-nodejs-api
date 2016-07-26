# ExpressJS Workshop for DecodeMTL Full-Stack Bootcamp
*Your express way to the web development world!*

## Basic instructions
* **Do this workshop in the same Cloud9 workspace as your Reddit API.**
* Different exercises will require different NPM packages. This will require you to use `npm install --save` to get these packages.
* An **`index.js`** file is made available to you. It contains the code to load the Express library and make a server that listens to the correct port for Cloud 9. You can copy the code as an easy way to get started :)

## Exercise 1: Getting started!
Create a web server that can listen to requests for `/hello`, and respond with some HTML that says `<h1>Hello World!</h1>`

## Exercise 2: A wild parameter has appeared!
Create a web server that can listen to requests for `/hello?name=firstName`, and respond with some HTML that says `<h1>Hello _name_!</h1>`. For example, if a client requests `/hello?name=John`, the server should respond with `<h1>Hello John!</h1>`.

**REMEMBER: THE QUERY STRING IS NOT PART OF THE RESOURCE PATH THAT YOU ARE FILTERING WITH EXPRESS**

## Exercise 3: Operations
Create a web server that can listen to requests for `/calculator/:operation?num1=XX&num2=XX` and respond with a JSON object that looks like the following. For example, `/op/add?num1=31&num2=11`:
```json
{
  "operator": "add",
  "firstOperand": 31,
  "secondOperand": 11,
  "solution": 42
}
```

**NOTE**: **query string parameters** -- the part after the `?` in a URL -- are different conceptually from the **request parameters**, which are part of the path. For example here you are asked to use `:operation` as request parameter. In express, you do this by making your `app.get('/op/:operation', ...)`. The `:` before `operation` will tell Express that this is a **request parameter**. You can access it using the `request.params` object instead of `request.query` which would be for the query string. In general, while the query string is reserved for either optional values or values that can vary wildly, we will use request parameters when they can themselves represent a resource. Here, we are looking for the `calculator` resource, and under it for the `add` "sub-resource". Of course this is our own terminology and in general it's up to us to decide what our URL schema represents.

Your program should work for `add`,`sub`,`mult`,`div` and return the appropriate solution in a JSON string. If `operation` is something other than these 4 values, you should use [`res.status`](http://expressjs.com/4x/api.html#res.status) to send an appropriate [error code](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html). First, figure out the category of error code you need to send, then find an appropriate code using the provided link.

## Exercise 4: Retrieving data from our database
Before doing this exercise, go back to your reddit clone MySQL database from the CLI. Using a few `INSERT` statements, put up a few posts in the `posts` table. Have at least 10-15 posts in there with various `title`s and `url`s. For the `userId`, set it to 1. Also create a user with ID 1 and call him John Smith or something.

Once you have inserted a few posts in the database, it's now time to retrieve the contents from our web server and display them to the user using an HTML `<ul>` list with a bunch of `<li>`s.

Using something similar to your `getHomepage` function, or even directly the function itself,  retrieve the latest 5 posts by `createdAt` date, including the username who created the content.

Once you have the query, create an endpoint in your Express server which will respond to `GET` requests to `/posts`. The Express server will use the MySQL query function to retrieve the array of contents. Then, you should build a string of HTML that you will send with the `request.send` function.

Your HTML should look like the following:

```html
<div id="contents">
  <h1>List of contents</h1>
  <ul class="contents-list">
    <li class="content-item">
      <h2 class="content-item__title">
        <a href="http://the.post.url.value/">The content title</a>
      </h2>
      <p>Created by CONTENT AUTHOR USERNAME</p>
    </li>
    ... one <li> per content that your Sequelize query found
  </ul>
</div>
```

## Exercise 5: Creating a "new content" form
In this exercise, we're going to use Express to simply send an HTML file to our user containing a `<form>`. To do this, let's write a little HTML file that looks like this:

```html
<form action="/createContent" method="POST"> <!-- what is this method="POST" thing? you should know, or ask me :) -->
  <div>
    <input type="text" name="url" placeholder="Enter a URL to content">
  </div>
  <div>
    <input type="text" name="title" placeholder="Enter the title of your content">
  </div>
  <button type="submit">Create!</button>
</form>
```

You can use template strings (with backticks) to write the HTML code directly in your web server file on multiple lines. Then, using ExpressJS create a **`GET`** endpoint called `createContent`. When someone requests this URL, send the HTML form to them.

## Exercise 6: Receiving data from our form
In this exercise, we will write our first `POST` endpoint. The resource will be the same, `/createContent`, but we will be writing a second endpoint using `app.post` instead.

In the code of `app.post('/createContent')`, we will be receiving the form data from step 5. This will get sent by the browser when the user presses the submit button. The form will instruct the browser to make a `POST` request (because of the `method`), and the resource will be `/createContent` because of the `action` parameter.

To parse this data into our request, the easiest way is to have an [ExpressJS middleware](http://expressjs.com/en/guide/using-middleware.html). Start by reading up about middleware and what they do. We will talk about them more in detail in further lectures.

One particular middleware, called [Express bodyParser](https://github.com/expressjs/body-parser) can make sense of form data that is sent by a browser. Before reading the form data, you will have to install the bodyParser middleware with NPM, require it in your server code, then load it with `app.use`.

Form data is sent by default using the **urlencoded** format. The documentation explains [how to make bodyParser read urlencoded request body](https://github.com/expressjs/body-parser#bodyparserurlencodedoptions). After adding this middleware, the form data will be available thru `req.body`. Start by doing a `console.log` of it to see what you get.

Once you are familiar with the contents of `req.body`, use a version of your `createPost` MySQL function to create a new post that has the URL and Title passed to you in the HTTP request. For the moment, set the user as being ID#1, or "John Smith".

Once the data is inserted successfully, you have a few choices of what to do in your callback:

1. Use `response.send("OK")` to tell the browser that everything went well
2. Use `response.send` to send the actual post object that was created (received from the `createPost` function)
3. Use `response.redirect` to send the user back to the `/posts` page you setup in a previous exercise
4. **challenge :)** Using a `response.redirect`, redirect the user to the URL `/posts/:ID` where `:ID` is the ID of the newly created post. This is more challenging because now you have to implement the `/posts/:ID` URL! See if you can do that and return a single post only.
