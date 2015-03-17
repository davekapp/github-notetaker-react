var React = require('react');
var NoteActions = require("../../actions/NoteActions");

var NotesList = React.createClass({
  removeNote: function(note) {
    note.user = this.props.username;
    NoteActions.removeNote(note);
  },

  render: function(){
    var styles = {
      removeNote: {
        fontSize: 20,
        float: "right",
        cursor: "pointer",
        color: "rgb(222, 79, 79)"
      },
    };

    var notes = this.props.notes.map(function(note, index){
      return (
        <li className="list-group-item" key={index}>
          <span>{note.note}</span>
          <div className="glyphicon glyphicon-remove"
               style={styles.removeNote}
               onClick={this.removeNote.bind(null, note)} >
          </div>
        </li>
      );
    }.bind(this));

    return (
      <ul className="list-group">
        {notes}
      </ul>
    )
  }
});

module.exports = NotesList;
