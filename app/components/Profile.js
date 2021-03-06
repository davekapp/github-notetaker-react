var React = require('react');
var Router = require('react-router');
var notesStore = require('../stores/NotesStore');
var Left = require('../components/Github/Left');
var Middle = require('../components/Github/Middle');
var Notes = require('../components/Notes/Notes');

var Profile = React.createClass({
  mixins: [ Router.State ],
  render: function(){
    var username = this.getParams().username;

    return(
      <div>
        <div className="row">
          <div className="col-md-4">
            <Left username={username}/>
          </div>
          <div className="col-md-4">
            <Middle username={username}/>
          </div>
          <div className="col-md-4">
            <Notes username={username}/>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Profile;
