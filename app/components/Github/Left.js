var React = require("react");
var GithubActions = require("../../actions/GithubActions");
var GithubStore = require("../../stores/GithubStore");

var Left = React.createClass({
  getInitialState () {
    return {
      user: GithubStore.getUser(),
      bio: GithubStore.getBio()
    };
  },

  componentWillReceiveProps (nextProps) {
    GithubActions.changeUser(nextProps.username);
    GithubActions.getUserBio(nextProps.username);
  },

  componentDidMount () {
    GithubActions.changeUser(this.props.username);
    GithubActions.getUserBio(this.props.username);
    GithubStore.addChangeListener(this.userDidChange);
  },

  componentWillUnmount () {
    GithubStore.removeChangeListener(this.userDidChange);
  },

  userDidChange () {
    this.setState({
      user: GithubStore.getUser(),
      bio: GithubStore.getBio()
    })
  },

  render () {
    return(
      <div>
        <h3>User Profile</h3>
        <ul className="list-group">
          {this.state.bio.avatar_url && <li className="list-group-item avatar-url"> <img src={this.state.bio.avatar_url} className="img-rounded img-responsive"/> </li>}
          {this.state.bio.name && <li className="list-group-item name"> Name: {this.state.bio.name} </li>}
          {this.state.bio.login && <li className="list-group-item login"> Username: {this.state.bio.login} </li>}
          {this.state.bio.email && <li className="list-group-item email"> Email: {this.state.bio.email} </li>}
          {this.state.bio.location && <li className="list-group-item location"> Location: {this.state.bio.location} </li>}
          {this.state.bio.company && <li className="list-group-item company"> Company: {this.state.bio.company} </li>}
          {this.state.bio.followers !== 0 && <li className="list-group-item followers"> Followers: {this.state.bio.followers} </li>}
          {this.state.bio.following !== 0 && <li className="list-group-item following"> Following: {this.state.bio.following} </li>}
          {this.state.bio.public_repos !== 0 && <li className="list-group-item public-repos"> Public Repos: {this.state.bio.public_repos} </li>}
          {this.state.bio.blog && <li className="list-group-item blog"> Blog: <a href={this.state.bio.blog}> {this.state.bio.blog} </a></li>}
        </ul>
      </div>
    );
  },

});

module.exports = Left;
