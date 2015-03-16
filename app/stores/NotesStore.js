var AppDispatcher = require("../dispatcher/AppDispatcher");
var AppConstants = require("../constants/AppConstants");
var EventEmitter = require("events").EventEmitter;
var ObjectAssign = require("react/lib/Object.assign");

var CHANGE_EVENT="notes_change";

var _state = {
  notes: [],
  user: ""
};

var addNote =  function(note) {
  _state.notes.push(note);
};

var changeUser = function(userNotes) {
  _state.user = userNotes.user;
  _state.notes = userNotes.notes;
}

var NotesStore = ObjectAssign({}, EventEmitter.prototype, {
  getState: function() {
    return _state;
  },

  addChangeListener: function(cb) {
    this.on(CHANGE_EVENT, cb);
  },

  removeChangeListener: function(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  }
});

AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.actionType) {
    case AppConstants.NOTE_ADD:
      addNote(action.data);
      NotesStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.CHANGE_USER:
      changeUser(action.data);
      NotesStore.emit(CHANGE_EVENT);
      break;

    default:
      console.log("unhandled action in NotesStore: " + action.actionType);
      return true;
      break;
  };
});

module.exports = NotesStore;
