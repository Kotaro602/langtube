import React, { Component } from 'react';
import Draggable from 'react-draggable';
import { StyleSheet, css } from 'aphrodite';
import shouldPureComponentUpdate from 'react-pure-render/function';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

export default class Drawer extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const { drawerOpenFlg, toggleDrawer } = this.props;

    return (
      <SwipeableDrawer open={drawerOpenFlg} onClose={toggleDrawer} onOpen={toggleDrawer}>
        <div className={css(styles.drawer)}>
          <List>aaaa</List>
          <Divider />
          <List>bbb</List>
        </div>
      </SwipeableDrawer>
    );
  }
}

const styles = StyleSheet.create({
  drawer: {
    width: 240
  },
  menuButton: {
    top: -8
  },
  title: {
    position: 'absolute',
    top: 13,
    left: 80
  },
  searchPosition: {
    position: 'absolute',
    top: 10,
    left: 400
  },
  searchBox: {
    position: 'relative',
    width: 400,
    height: 30,
    borderRadius: 8,
    backgroundColor: 'rgba(156, 156, 156, 0.45)',
    ':hover': {
      backgroundColor: 'rgba(300, 300, 300, 0.20)'
    }
  },
  searchIcon: {
    position: 'absolute',
    top: 5,
    left: 17
  },
  searchInput: {
    position: 'absolute',
    top: 1,
    left: 55,
    width: 330,
    color: 'white'
  },
  accountBox: {
    position: 'absolute',
    top: 2,
    right: 30
  },
  accountIcon: {
    //width: 50
  }
});
