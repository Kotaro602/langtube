import React, { Component } from 'react';
import firebase from 'firebase/app';
import Draggable from 'react-draggable';
import { StyleSheet, css } from 'aphrodite';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { withRouter } from 'react-router';
import withRoot from '../withRoot';
import { Link } from 'react-router-dom';

import { firebaseApp } from '../../config.js';

import Drawer from './Drawer';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

class Header extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
    this.state = {
      drawerOpenFlg: false
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.inputOnFocus = this.inputOnFocus.bind(this);
  }

  componentDidMount() {
    document.getElementById('searchBox').addEventListener('keyup', event => {
      if (event.key === 'Enter') {
        this.props.history.push(`/search?q=${event.target.value}`);
      }
    });
  }
  toggleDrawer() {
    this.setState({
      drawerOpenFlg: !this.state.drawerOpenFlg
    });
  }
  login() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  }
  logout() {
    firebaseApp.auth().signOut();
    location.href = '/';
  }
  inputOnFocus() {
    console.log('ss');
    window.removeEventListener('keydown', event);
  }

  render() {
    const user = this.props.firebaseApp.auth().currentUser;
    console.log(user);
    return (
      <div>
        <AppBar position="static" color="primary" className={css(styles.appBar)}>
          <Toolbar>
            <Link>
              <h1 className={css(styles.title)}>LangTube</h1>
            </Link>
            <div className={css(styles.searchPosition)}>
              <div className={css(styles.searchBox)}>
                <div className={css(styles.searchIcon)}>
                  <SearchIcon />
                </div>
                <Input
                  id="searchBox"
                  placeholder="Search video with subtitle"
                  onFocus={this.inputOnFocus}
                  disableUnderline
                  className={css(styles.searchInput)}
                />
              </div>
            </div>
            <div className={css(styles.accountBox)}>
              {!user && (
                <Button className={css(styles.loginButton)} onClick={this.login}>
                  Sign IN
                </Button>
              )}
              {user && (
                <Link to={`/history`}>
                  <Button className={css(styles.loginButton)}>History</Button>
                </Link>
              )}
              <IconButton
                //aria-owns={open ? 'menu-appbar' : null}
                aria-haspopup="true"
                //onClick={this.handleMenu}
                color="inherit"
                className={css(styles.accountIcon)}>
                <AccountCircle />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {/* <Drawer drawerOpenFlg={this.state.drawerOpenFlg} toggleDrawer={this.toggleDrawer} /> */}
      </div>
    );
  }
}

export default withRouter(withRoot(withWidth()(Header)));

const styles = StyleSheet.create({
  appBar: {
    height: 50,
    marginBottom: 16
  },
  menuButton: {
    top: -8
  },
  title: {
    position: 'absolute',
    color: 'white',
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
  },
  loginButton: {
    color: 'white'
  }
});

{
  /* <IconButton className={css(styles.menuButton)} color="inherit" onClick={this.toggleDrawer}>
  <MenuIcon />
</IconButton>; */
}
