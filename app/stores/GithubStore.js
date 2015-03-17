var AppDispatcher = require("../dispatcher/AppDispatcher");
var AppConstants = require("../constants/AppConstants");
var EventEmitter = require("events").EventEmitter;
var ObjectAssign = require("react/lib/Object.assign");

var CHANGE_EVENT = "github_change";
var _state = {
  user: "",
  bio: {},
  repos: []
};

var setUser = function(user) {
  _state.user = user;
};

var setBio = function(bio) {
  _state.bio = bio;
};

var setRepos = function(repos) {
  _state.repos = repos;
};

var GithubStore = ObjectAssign({}, EventEmitter.prototype, {
  addChangeListener: function(cb) {
    this.on(CHANGE_EVENT, cb);
  },

  removeChangeListener: function(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  },

  getUser: function() {
    return _state.user;
  },

  getBio: function() {
    return _state.bio;
  },

  getRepos: function() {
    return _state.repos;
  }
});

AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.actionType) {
    case AppConstants.GITHUB_USER_BIO:
      setBio(action.data);
      GithubStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.GITHUB_USER_REPOS:
      setRepos(action.data);
      GithubStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.GITHUB_CHANGE_USER:
      setUser(action.data);
      GithubStore.emit(CHANGE_EVENT);
      break;

    default:
      //console.log("unhandled action in GithubStore: " + action.actionType);
      return true;
      break;
  };
});


module.exports = GithubStore;
