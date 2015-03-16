var React = require("react");
var NotesStore = require("../../stores/NotesStore");
var NoteActions = require("../../actions/NoteActions");

var AddNote = React.createClass({
  handleSubmit: function() {
    var node = this.refs.note.getDOMNode();
    var note = node.value;
    NoteActions.addNote({
      user: this.props.username,
      note: note
    });
    node.value = "";
  },

  render: function(){
    return (
      <div className="input-group cushion">
        <input type="text" ref="note" className="form-control" placeholder="Add Note" />
        <span className="input-group-btn">
          <button className="btn btn-default" type="button" onClick={this.handleSubmit}>Submit</button>
        </span>
      </div>
    )
  }
});

module.exports = AddNote;
