var express = require('express');
var serveStatic = require('serve-static');
var axios = require('axios');

var GITHUB_ID = process.env.GITHUB_ID;
var GITHUB_SECRET = process.env.GITHUB_SECRET;

var app = express();
app.use(serveStatic('public'));

app.get("/github/users/:username", function(req, res) {
  var param = "?client_id=" + GITHUB_ID + "&client_secret=" + GITHUB_SECRET;
  var url = "https://api.github.com/users/" + req.params.username + param;
  axios.get(url)
    .then(function(githubResponse) {
      res.send(githubResponse.data);
    })
    .catch(function(githubErrorResponse) {
      console.log("error communicating with github");
      console.log(githubErrorResponse);
      res.status(githubErrorResponse.status).send({error: "error communicating with Github"});
    });
});

app.get("/github/users/:username/repos", function(req, res) {
  var param = "?client_id=" + GITHUB_ID + "&client_secret=" + GITHUB_SECRET;
  var url = "https://api.github.com/users/" + req.params.username + "/repos" + param;
  axios.get(url)
    .then(function(githubResponse) {
      res.send(githubResponse.data);
    })
    .catch(function(githubErrorResponse) {
      console.log("error communicating with github");
      console.log(githubErrorResponse);
      res.status(githubErrorResponse.status).send({error: "error communicating with Github"});
    });
});

app.listen(process.env.PORT || 3000);
