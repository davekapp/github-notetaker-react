var AppConstants = require('../constants/AppConstants');
var axios = require('axios');

var id = "CLIENT_ID_HERE";
var sec = "CLIENT_SECRET_HERE";
var param = "?client_id=" + id + "&client_secret=" + sec;

var GithubUtils = {
  getBio: function(username){
    var url = "https://api.github.com/users/" + username + param;
    return axios.get(url);
  },
  getRepos: function(username){
    var url = "https://api.github.com/users/" + username + "/repos" + param;
    return axios.get(url);
  }
};

module.exports = GithubUtils;