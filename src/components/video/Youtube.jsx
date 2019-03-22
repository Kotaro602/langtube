import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { StyleSheet, css } from 'aphrodite';
import YouTube from 'react-youtube';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { firebaseApp } from '../../../config.js';
import windowSize from 'react-window-size';
import moment from 'moment';
import Card from '@material-ui/core/Card';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { getVideoInfo } from '../../api/YoutubeAPI.js';
import { registerViewHistory } from '../../api/FirebaseAPI.js';

class Youtube extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
    this.state = {
      positionFixed: false
    };
    this.navPos = null;
  }

  componentDidMount() {
    if (this.props.windowWidth < 1050) {
      window.addEventListener('scroll', this.handleScroll);
      this.setState({ positionFixed: true });
    } else {
      document.getElementById('youtubeVideoBox').addEventListener('mouseover', function() {
        window.focus();
      });
      document.getElementById('youtubeVideoBox').addEventListener('mouseout', function() {
        window.focus();
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    console.log(window.scrollY);
    // if (!this.state.positionFixed && window.scrollY >= 50) {
    //   this.setState({ positionFixed: true });
    // } else if (this.state.positionFixed && window.scrollY < 50) {
    //   this.setState({ positionFixed: false });
    // }
  };

  render() {
    const { windowWidth, videoId, onReady, stateChange, onPlaybackRateChange } = this.props;
    const opts = {
      playerVars: {
        autoplay: 0,
        controls: 2,
        playsinline: 1,
        rel: 0,
        disablekb: 1
      }
    };
    console.log(this.state.positionFixed);
    return (
      <div>
        {/* <div className={css(this.state.positionFixed && styles.fixBox)}> */}
        <div className={css(styles.youtubeBox)} id="youtubeVideoBox">
          <YouTube
            videoId={videoId}
            opts={opts}
            className={css(styles.youtubeStyle)}
            onReady={onReady}
            onStateChange={stateChange}
            onPlaybackRateChange={onPlaybackRateChange}
          />
        </div>
        {/* </div> */}
        {/* <div className={css(this.state.positionFixed && styles.marginBox)} /> */}
      </div>
    );
  }
}

export default windowSize(Youtube);

//bookmark_border
const styles = StyleSheet.create({
  fixBox: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%'
  },
  youtubeBox: {
    position: 'relative',
    paddingBottom: '56.25%'
  },
  youtubeStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  },
  marginBox: {
    marginTop: 'calc(100vw * 9 / 16)'
  }
});
