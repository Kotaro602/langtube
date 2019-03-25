import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import shouldPureComponentUpdate from 'react-pure-render/function';
import windowSize from 'react-window-size';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

class FooterButtons extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null
    };
  }
  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { subtitleLang, subtitleList, getVideoData, ChgShowInfoFlg, showInfoForSpFlg } = this.props;

    return (
      <div className={css(styles.parrentButtonBox)}>
        <div className={css(styles.buttonBox)}>
          {!showInfoForSpFlg && (
            <Fab
              color="primary"
              size="small"
              className={css(styles.button)}
              aria-owns={this.state.anchorEl ? 'menu-appbar' : null}
              onClick={this.handleMenu}>
              <Icon>closed_caption</Icon>
            </Fab>
          )}
          <Menu
            id="menu-appbar"
            disableAutoFocusItem={true}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            open={Boolean(this.state.anchorEl)}
            onClose={this.handleClose}>
            {subtitleList &&
              subtitleList.map((item, i) => {
                return (
                  <MenuItem
                    key={i}
                    value={item.attributes.lang_code}
                    selected={item.attributes.lang_code === subtitleLang}
                    onClick={e => {
                      this.handleClose(e);
                      getVideoData(e);
                    }}>
                    {item.attributes.lang_original}
                  </MenuItem>
                );
              })}
          </Menu>

          <Fab color="primary" size="small" className={css(styles.button)} onClick={ChgShowInfoFlg}>
            <Icon>{showInfoForSpFlg ? 'subtitles' : 'info'}</Icon>
          </Fab>
        </div>
      </div>
    );
  }
}
export default windowSize(FooterButtons);

const styles = StyleSheet.create({
  parrentButtonBox: {
    position: 'relative',
    width: '100%'
  },
  buttonBox: {
    position: 'fixed',
    bottom: 10,
    right: 0
  },
  button: {
    marginRight: 10
  },
  bookmarkIcon: {
    color: 'red'
  }
});
