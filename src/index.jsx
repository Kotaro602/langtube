import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';
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
    );
  }
}
ReactDOM.render(<App />, document.querySelector('#content'));
