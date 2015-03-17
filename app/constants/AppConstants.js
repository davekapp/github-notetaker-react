// use webpack plugins to replace the __BLAH_FOO__ stuff
var AppConstants = {
  SERVER_URL: process.env.SERVER_URL || __SERVER_URL__,
  GITHUB_USER_BIO: "GITHUB_USER_BIO",
  GITHUB_USER_REPOS: "GITHUB_USER_REPOS",
  GITHUB_CHANGE_USER: "GITHUB_CHANGE_USER",

  FIREBASE_HOST: __FIREBASE_HOST__,

  NOTE_ADD: "NOTE_ADD",
  NOTE_REMOVE: "NOTE_REMOVE",
  CHANGE_USER: "NOTE_CHANGE_USER",
};

module.exports = AppConstants;
