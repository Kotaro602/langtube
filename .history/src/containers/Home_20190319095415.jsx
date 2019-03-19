import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import shouldPureComponentUpdate from 'react-pure-render/function';
import withRoot from '../withRoot';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { firebaseApp } from '../../config.js';
import List from '../components/List';
import { ReadViewHisoty } from '../api/FirebaseAPI';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

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
            <Grid item xs={2} />
          </Hidden>
          <Grid item xs={16} md={12} lg={12}>
            <Card>bbb</Card>
          </Grid>
          <Hidden mdDown>
            <Grid item xs={2} />
          </Hidden>
        </Grid>
      </div>
    );
  }
}

//TODO: componentを使ってみる
export default withRoot(withWidth()(Home));
