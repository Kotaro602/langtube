import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import shouldPureComponentUpdate from 'react-pure-render/function';
import withRoot from '../withRoot';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { firebaseApp } from '../../config.js';
import List from '../components/List';
import { ReadViewHisoty } from '../api/FirebaseAPI';

class History extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
    this.state = {
      result: []
    };
  }

  componentDidMount() {
    firebaseApp.auth().onAuthStateChanged(user => {
      if (user) {
        ReadViewHisoty(firebaseApp.auth().currentUser).then(result => {
          this.setState({ result: result });
        });
      }
    });
  }

  render() {
    return <List result={this.state.result} />;
  }
}

//TODO: componentを使ってみる
export default withRoot(withWidth()(History));
