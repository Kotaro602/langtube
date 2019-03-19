import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import shouldPureComponentUpdate from 'react-pure-render/function';
import withRoot from '../withRoot';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { firebaseApp } from '../../config.js';
import List from '../components/List';
import { ReadViewHisoty } from '../api/FirebaseAPI';

import Card from '@material-ui/core/Card';

class Home extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
    this.state = {
      result: []
    };
  }

  componentDidMount() {
    ReadViewHisoty(firebaseApp.auth().currentUser).then(result => {
      this.setState({ result: result });
    });
  }

  render() {
    return (
        <div>
        <Grid container spacing={16}>
          <Hidden mdDown>
            <Grid item xs={1} />
          </Hidden>
          <Grid item xs={12} md={6} lg={5}>
              bbb
          </Grid>
          <Grid item xs={12} md={6} lg={5}>
            aaa
          </Grid>
          <Hidden mdDown>
            <Grid item xs={1} />
          </Hidden>
        </Grid>
      </div>
  }
}

//TODO: componentを使ってみる
export default withRoot(withWidth()(Home));
