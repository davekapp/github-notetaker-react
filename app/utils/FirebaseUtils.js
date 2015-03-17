var Firebase = require('firebase');
var AppConstants = require('../constants/AppConstants');

var FBInstance = null;

var firebaseUtils = {
  homeInstance: function(){
    if (FBInstance !== null) {
      return FBInstance;
    } else {
      FBInstance = new Firebase(AppConstants.FIREBASE_HOST);
      return FBInstance;
    }
  },

  addNote: function(noteObj){
    this.homeInstance().child(noteObj.user).push(noteObj.note);
  },

  removeNote: function(noteObj) {
    this.homeInstance().child(noteObj.user).child(noteObj.key).remove();
  },

  toArray: function(obj){
    var arr = [];
    for(var key in obj){
      arr.push(
        {
          note: obj[key],
          key: key
        }
      );
    }
    return arr;
  }
};

module.exports = firebaseUtils;
