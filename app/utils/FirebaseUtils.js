var Firebase = require('firebase');
var AppConstants = require('../constants/AppConstants');

var firebaseUtils = {
  homeInstance: function(){
    return new Firebase(AppConstants.FIREBASE_HOST);
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
