var AppDispatcher = require("../dispatcher/AppDispatcher");
var AppConstants = require("../constants/AppConstants");
var FirebaseUtils = require("../utils/FirebaseUtils.js");

var NoteActions = {
  addNote: function(noteObj) {
    // optimistic add
    AppDispatcher.handleAction({
      actionType: AppConstants.NOTE_ADD,
      data: {
        note: noteObj.note,
        key: null
      }
    });

    // send to firebase
    FirebaseUtils.addNote(noteObj);

    // this might seem like we're not going to insert the real note here (with the key),
    // but we already have a Firebase .on listening for the changes over in changeUser below
    // and we don't need another here
  },

  removeNote: function(noteObj) {
    // optimistic removal
    AppDispatcher.handleAction({
      actionType: AppConstants.NOTE_REMOVE,
      data: noteObj
    });

    // tell firebase we're removing it
    FirebaseUtils.removeNote(noteObj);

    // don't need another Firebase listener here either, see changeUser below
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
