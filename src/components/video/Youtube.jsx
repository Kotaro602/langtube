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
  }

  componentDidMount() {
    if (this.props.windowWidth > 1050) {
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

  render() {
    const {
      windowWidth,
      videoId,
      onReady,
      stateChange,
      playStateChange,
      timeBack,
      timeForword,
      sliderDispFlg
    } = this.props;

    const controls = windowWidth > 1050 ? '2' : '0';
    const opts = {
      playerVars: {
        autoplay: 0,
        controls: controls,
        playsinline: 1,
        rel: 0,
        disablekb: 1,
        modestbranding: 1
      }
    };

    return (
      <div className={css(styles.youtubeBox)} id="youtubeVideoBox">
        <YouTube
          videoId={videoId}
          opts={opts}
          className={css(styles.youtubeStyle)}
          onReady={onReady}
          onStateChange={stateChange}
        />
        {windowWidth < 1050 && (
          <div>
            <div className={css(styles.backArea, !sliderDispFlg && styles.add)} onClick={timeBack} />
            <div className={css(styles.playArea, !sliderDispFlg && styles.add)} onClick={playStateChange} />
            <div className={css(styles.forwardArea, !sliderDispFlg && styles.add)} onClick={timeForword} />
            {sliderDispFlg && (
              <div>
                <Icon color="action" fontSize="large" className={css(styles.BackIcon)}>
                  fast_rewind
                </Icon>
                <Icon color="action" fontSize="large" className={css(styles.PlayIcon)}>
                  play_circle_outline
                </Icon>
                <Icon color="action" fontSize="large" className={css(styles.ForwardIcon)}>
                  fast_forward
                </Icon>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
export default windowSize(Youtube);

const styles = StyleSheet.create({
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
  backArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 'calc(100% - 50px)',
    width: '28%',
    zIndex: 999
  },
  playArea: {
    position: 'absolute',
    top: 0,
    left: '28%',
    height: 'calc(100% - 50px)',
    width: '46%',
    zIndex: 999
  },
  forwardArea: {
    position: 'absolute',
    top: 0,
    left: '72%',
    height: 'calc(100% - 50px)',
    width: '28%',
    zIndex: 999
  },
  add: {
    height: '100% !important'
  },
  BackIcon: {
    position: 'absolute',
    zIndex: 998,
    top: '40%',
    left: '10%'
  },
  PlayIcon: {
    position: 'absolute',
    zIndex: 998,
    top: '40%',
    left: '45%'
  },
  ForwardIcon: {
    position: 'absolute',
    zIndex: 998,
    top: '40%',
    right: '10%'
  }
});
