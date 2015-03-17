var React = require("react");
var NotesStore = require("../../stores/NotesStore");
var NoteActions = require("../../actions/NoteActions");
var AddNote = require("./AddNote");
var NotesList = require("./NotesList");

var Notes = React.createClass({
  getInitialState: function() {
    var notesState = NotesStore.getState();

    return {
      user: notesState.user,
      notes: notesState.notes
    };
  },

  componentWillReceiveProps: function(nextProps) {
    NoteActions.changeUser(nextProps.username);
  },

  componentDidMount () {
    NoteActions.changeUser(this.props.username);
    NotesStore.addChangeListener(this.userDidChange);
  },

  componentWillUnmount () {
    NotesStore.removeChangeListener(this.userDidChange);
  },

  userDidChange () {
    var notesState = NotesStore.getState();

    this.setState({
      user: notesState.user,
      notes: notesState.notes
    });
  },

  render: function() {
    return(
      <div>
        <h3>Notes for {this.props.username}</h3>
        <AddNote username={this.props.username} />
        <NotesList notes={this.state.notes} username={this.props.username} />
      </div>
    );
  }
});

module.exports = Notes;
