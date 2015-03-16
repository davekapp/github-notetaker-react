var AppDispatcher = require("../dispatcher/AppDispatcher");
var AppConstants = require("../constants/AppConstants");
var FirebaseUtils = require("../utils/FirebaseUtils.js");

var NoteActions = {
  addNote: function(noteObj) {
    AppDispatcher.handleAction({
      actionType: AppConstants.NOTE_ADD,
      data: noteObj.note
    });

    FirebaseUtils.addNote(noteObj);
  },

  changeUser: function(username) {
    FirebaseUtils.homeInstance().child(username).on('value', function(snapshot) {
      AppDispatcher.handleAction({
        actionType: AppConstants.CHANGE_USER,
        data: {
          user: username,
          notes: FirebaseUtils.toArray(snapshot.val())
        }
      });
    });
  }
};

module.exports = NoteActions;
