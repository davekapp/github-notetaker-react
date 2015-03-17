var AppConstants = require('../constants/AppConstants');
var axios = require('axios');

var serverUrl = AppConstants.SERVER_URL + "/github";

var githubUtils = {
  getBio: function(username){
    var url = serverUrl + "/users/" + username;
    return axios.get(url);
  },
  getRepos: function(username){
    var url = serverUrl + "/users/" + username + "/repos";
    return axios.get(url);
  }
};

module.exports = githubUtils;
