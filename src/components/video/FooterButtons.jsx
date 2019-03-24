import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import shouldPureComponentUpdate from 'react-pure-render/function';
import windowSize from 'react-window-size';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';

class FooterButtons extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
    this.state = {
      searchResult: []
    };
  }

  render() {
    const { windowWidth } = this.props;

    return (
      <div className={css(styles.parrentButtonBox)}>
        <div className={css(styles.buttonBox)}>
          <Fab color="primary" size="small" className={css(styles.button)}>
            <Icon>closed_caption</Icon>
          </Fab>
          <Fab color="primary" size="small" className={css(styles.button)}>
            <Icon>info</Icon>
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
