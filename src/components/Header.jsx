import React, { Component } from 'react';
import firebase from 'firebase/app';
import { StyleSheet, css } from 'aphrodite';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { withRouter } from 'react-router';
import withRoot from '../withRoot';
import windowSize from 'react-window-size';
import { Link } from 'react-router-dom';
import { firebaseApp } from '../../config.js';

import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';

class Header extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
    this.state = {
      drawerOpenFlg: false,
      anchorEl: null
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
    window.removeEventListener('keydown', event);
  }
  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  moveToBookmark = () => {
    this.props.history.push(`/history`);
    this.setState({ anchorEl: null });
  };
  moveToHistory = () => {
    this.props.history.push(`/history`);
    this.setState({ anchorEl: null });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { windowWidth } = this.props;
    const user = this.props.firebaseApp.auth().currentUser;
    const placeholderText = windowWidth > 800 ? 'Search video with subtitle' : 'Search video';
    const open = Boolean(this.state.anchorEl);

    return (
      <div>
        <AppBar position="static" color="primary" className={css(styles.appBar)}>
          <Toolbar>
            <Link to={`/`}>
              <Typography variant="h6" className={css(styles.title)}>
                LangTube
              </Typography>
            </Link>
            <div className={css(styles.searchPosition)}>
              <div className={css(styles.searchBox)}>
                <div className={css(styles.searchIcon)}>
                  <SearchIcon />
                </div>
                <Input
                  id="searchBox"
                  placeholder={placeholderText}
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
                <div>
                  {windowWidth > 450 && (
                    <IconButton color="inherit" className={css(styles.accountIcon)}>
                      <Icon>bookmarks</Icon>
                    </IconButton>
                  )}
                  {windowWidth > 450 && (
                    <Link to={`/history`} className={css(styles.icon)}>
                      <IconButton color="inherit">
                        <Icon>history</Icon>
                      </IconButton>
                    </Link>
                  )}
                  <IconButton
                    aria-owns={open ? 'menu-appbar' : null}
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    color="inherit"
                    className={css(styles.accountIcon)}>
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                    open={open}
                    onClose={this.handleClose}>
                    <MenuItem onClick={this.moveToBookmark}>Bookmark</MenuItem>
                    <MenuItem onClick={this.moveToHistory}>History</MenuItem>
                    <MenuItem onClick={this.logout}>Logout</MenuItem>
                  </Menu>
                </div>
              )}
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withRouter(withRoot(windowSize(Header)));

const styles = StyleSheet.create({
  appBar: {
    height: 50,
    '@media (min-width: 1050px)': {
      marginBottom: 16
    }
  },
  title: {
    position: 'absolute',
    color: 'white',
    top: 9,
    '@media (min-width: 800px)': {
      left: 80
    },
    '@media (max-width: 800px)': {
      left: 15
    }
  },
  searchPosition: {
    position: 'absolute',
    top: 10,
    '@media (min-width: 800px)': {
      left: 'calc(180px + 7%)'
    },
    '@media (max-width: 800px)': {
      left: 120
    }
  },
  searchBox: {
    position: 'relative',
    height: 30,
    borderRadius: 8,
    backgroundColor: 'rgba(156, 156, 156, 0.45)',
    ':hover': {
      backgroundColor: 'rgba(300, 300, 300, 0.20)'
    },
    '@media (min-width: 800px)': {
      width: 400
    },
    '@media (max-width: 800px)': {
      width: 180
    }
  },
  searchIcon: {
    position: 'absolute',
    top: 5,
    '@media (min-width: 800px)': {
      left: 17
    },
    '@media (max-width: 800px)': {
      left: 8
    }
  },
  searchInput: {
    position: 'absolute',
    top: 1,
    left: 55,
    width: 330,
    color: 'white',
    '@media (min-width: 800px)': {
      left: 55,
      width: 330
    },
    '@media (max-width: 800px)': {
      left: 40,
      width: 220
    }
  },
  accountBox: {
    position: 'absolute',
    top: 2,
    '@media (min-width: 800px)': {
      right: 30
    },
    '@media (max-width: 800px)': {
      right: 0
    }
  },
  icon: {
    textDecoration: 'none',
    color: 'white'
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
