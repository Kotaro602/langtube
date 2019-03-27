import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';
import "babel-polyfill";
import { createBrowserHistory } from 'history';
import ReactGA from 'react-ga';
import ReactQueryParams from 'react-query-params';
import { firebaseApp, gaTrackingCode } from '../config.js';
import Home from './containers/Home';
import Watch from './containers/Watch';
import Search from './containers/Search';
import History from './containers/History';
import Bookmark from './containers/Bookmark';
import Header from './components/Header';
import { readHistory, readBookmark } from './api/FirebaseAPI';
import '@babel/polyfill'; //TODO: pollyfillを直す

ReactGA.initialize(gaTrackingCode);
const history = createBrowserHistory();
history.listen(location => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
});

export const UserInfoContext = React.createContext();

const NotFound = () => {
  return <h2>Not Found</h2>;
};

class App extends ReactQueryParams {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      user: null
    };
  }

  componentDidMount() {
    firebaseApp.auth().onAuthStateChanged(user => {
      if (user) {
        Promise.all([readHistory(user), readBookmark(user)]).then(lists => {
          window.historyList = lists[0];
          window.bookmarkList = lists[1];
          this.setState({ loading: false, user: user });
        });
      } else {
        window.historyList = [];
        window.bookmarkList = [];
        this.setState({ loading: false });
      }
    });
  }

  initialUserInfo = () => {
    console.log('initialize');
  };

  // chgUserInfo = userInfo => {
  //   if (userInfo !== this.state.userInfo) this.setState({ userInfo: userInfo });
  // };

  render() {
    console.log('index.jsx');
    return (
      //      <UserInfoContext.Provider value={{ userInfo: this.state.userInfo, chgUserInfo: this.chgUserInfo }}>
      <Router history={history}>
        {this.state.loading ? (
          <div>loading...</div>
        ) : (
          <div>
            <Header firebaseApp={firebaseApp} user={this.state.user} />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/watch" component={Watch} />} />
              <Route path="/search" component={Search} />
              <Route path="/history" component={History} />
              <Route path="/bookmark" component={Bookmark} />
              <Route component={NotFound} />
            </Switch>
          </div>
        )}
      </Router>
      //      </UserInfoContext.Provider>
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
