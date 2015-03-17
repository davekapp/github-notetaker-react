var React = require("react");
var GithubActions = require("../../actions/GithubActions");
var GithubStore = require("../../stores/GithubStore");

var Middle = React.createClass({
  getInitialState () {
    return {
      repos: GithubStore.getRepos()
    };
  },

  componentWillReceiveProps (nextProps) {
    GithubActions.getUserRepos(nextProps.username);
  },

  componentDidMount () {
    GithubActions.getUserRepos(this.props.username);
    GithubStore.addChangeListener(this.userDidChange);
  },

  componentWillUnmount () {
    GithubStore.removeChangeListener(this.userDidChange);
  },

  userDidChange () {
    this.setState({
      repos: GithubStore.getRepos()
    })
  },

  render () {
    var repos = this.state.repos.map(function(repo, index) {
      return(
        <li className="list-group-item" key={index}>
          { repo.html_url && <div><h4><a href={repo.html_url}>{repo.name}</a></h4></div> }
          { repo.description && <div>{repo.description}</div> }
        </li>
      );
    });

    return(
      <div>
        <h3>User Repos</h3>
        <ul className="list-group">
          {repos}
        </ul>
      </div>
    );
  },

});

module.exports = Middle;
