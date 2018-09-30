import React, { Component } from 'react';
import Draggable from 'react-draggable';
import { StyleSheet, css } from 'aphrodite';
import shouldPureComponentUpdate from 'react-pure-render/function';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

export default class Header extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
  }

  render() {
    const {} = this.props;

    return (
      <Grid item xs={12}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit">
              LangTube
            </Typography>
          </Toolbar>
        </AppBar>
      </Grid>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#fff',
    border: '1px solid #999',
    width: '360px',
    height: '200px',
    display: 'inline-block',
    cursor: 'move',
    opacity: '0.95',
    overflow: 'hidden',
    resize: 'both',
    textAline: 'left'
  }
});
