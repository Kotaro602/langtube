import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import config from '../config.js';
import Watch from './containers/Watch';
import Search from './containers/Search';
import Header from './components/Header';
import LoginModal from './components/LoginModal';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const NotFound = () => {
  return <h2>Not Found</h2>;
};

class App extends Component {
  state = {
    authenticated: false,
    gapi: null,
    modalOpen: false
  };
  componentDidMount() {
    this.downloadGoogleScript(this.initSignInButton);
  }
  downloadGoogleScript = callback => {
    const element = document.getElementsByTagName('script')[0];
    const js = document.createElement('script');
    js.id = 'google-platform';
    js.src = '//apis.google.com/js/platform.js';
    js.async = true;
    js.defer = true;
    element.parentNode.insertBefore(js, element);
    js.onload = () => callback(window.gapi);
  };
  initSignInButton = gapi => {
    gapi.load('auth2', () => {
      gapi.auth2.init({ client_id: config.youtube.clientId }).then(
        result => {
          if (result.isSignedIn.get()) {
            this.setState({ authenticated: true, gapi });
          } else {
            this.setState({ authenticated: false, gapi });
          }
        },
        err => console.error(err)
      );
    });
  };
  onSignIn = googleUser => {
    console.log('UserID: ' + googleUser.getBasicProfile().getId());
    this.setState({ authenticated: true });
  };
  onSignOut = () => {
    const auth2 = this.state.gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => console.log('sign out'));
    this.setState({ authenticated: false });
  };
  modalClickOpen = () => {
    console.log('openmodal');
    this.setState({ modalOpen: true });
  };
  modalClose = value => {
    this.setState({ modalOpen: false });
  };
  render() {
    return (
      <Router>
        <div>
          <Header
            authenticated={this.state.authenticated}
            onSignOut={this.onSignOut}
            onSignIn={this.onSignIn}
            gapi={this.state.gapi}
            modalClickOpen={this.modalClickOpen}
          />
          <Switch>
            {/* <Route exact path="/" component={Watch} /> */}
            <Route path="/watch" component={Watch} />
            <Route path="/search" component={Search} />
            <Route component={NotFound} />
          </Switch>
          <LoginModal
            open={this.state.modalOpen}
            modalOpen={this.state.modalOpen}
            modalClose={this.modalClose}
            gapi={this.state.gapi}
            onSignIn={this.onSignIn}
          />
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#content'));
