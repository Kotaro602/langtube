import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import ReactGA from 'react-ga';
import ReactQueryParams from 'react-query-params';
import Home from './containers/Home';
import Watch from './containers/Watch';
import Search from './containers/Search';
import History from './containers/History';
import Header from './components/Header';
import { firebaseApp, gaTrackingCode } from '../config.js';

ReactGA.initialize(gaTrackingCode);
const history = createBrowserHistory();
history.listen((location) => {
  console.log(location.pathname)
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
});

const NotFound = () => {
  return <h2>Not Found</h2>;
};

class App extends ReactQueryParams {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      user: null
    };
  }

  componentDidMount() {

    console.log()

    firebaseApp.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ loading: false, user: user });
      } else {
        this.setState({ loading: false });
      }
    });
  }

  render() {
    return (
      <Router history={history}>
        {this.state.loading ? (
          <div>loading...</div>
        ) : (
          <div>
            <Header firebaseApp={firebaseApp} user={this.state.user} />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/watch" component={Watch} />} />
              <Route path="/search" component={Search} />
              <Route path="/history" component={History} />
              <Route component={NotFound} />
            </Switch>
          </div>
        )}
      </Router>
    );
  }
}
ReactDOM.render(<App />, document.querySelector('#content'));

// downloadGoogleScript = callback => {
//   const element = document.getElementsByTagName('script')[0];
//   const js = document.createElement('script');
//   js.id = 'google-platform';
//   js.src = '//apis.google.com/js/platform.js';
//   js.async = true;
//   js.defer = true;
//   element.parentNode.insertBefore(js, element);
//   js.onload = () => callback(window.gapi);
// };
// initSignInButton = gapi => {
//   gapi.load('auth2', () => {
//     gapi.auth2.init({ client_id: youtube.clientId }).then(
//       result => {
//         if (result.isSignedIn.get()) {
//           this.setState({ authenticated: true, gapi });
//         } else {
//           this.setState({ authenticated: false, gapi });
//         }
//       },
//       err => console.error(err)
//     );
//   });
// };
// onSignIn = googleUser => {
//   console.log('UserID: ' + googleUser.getBasicProfile().getId());
//   this.setState({ authenticated: true });
// };
// onSignOut = () => {
//   const auth2 = this.state.gapi.auth2.getAuthInstance();
//   auth2.signOut().then(() => console.log('sign out'));
//   this.setState({ authenticated: false });
// };
// modalClickOpen = () => {
//   console.log('openmodal');
//   this.setState({ modalOpen: true });
// };
// modalClose = value => {
//   this.setState({ modalOpen: false });
// };

{
  /* <LoginModal
            open={this.state.modalOpen}
            modalOpen={this.state.modalOpen}
            modalClose={this.modalClose}
            gapi={this.state.gapi}
            onSignIn={this.onSignIn}
          /> */
}
