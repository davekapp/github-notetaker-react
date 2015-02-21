var AppConstants = require('../constants/AppConstants');
var axios = require('axios');

var id = "8aac9fc174be2e332995";
var sec = "a483f37eb84479a1c8ccd3d25c08869e80709c96";
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