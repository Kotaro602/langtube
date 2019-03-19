import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { StyleSheet, css } from 'aphrodite';
import YouTube from 'react-youtube';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { firebaseApp } from '../../../config.js';
import moment from 'moment';
import Card from '@material-ui/core/Card';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { getVideoInfo } from '../../api/YoutubeAPI';
import { registerViewHistory } from '../../api/FirebaseAPI';

export default class ShowVideo extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
    this.state = {
      videoInfo: null
    };
    this.iframeMouseOver = false;
  }

  componentDidMount() {
    window.addEventListener('blur', function() {
      if (this.iframeMouseOver) {
        console.log('Wow! Iframe Click!');
      }
    });

    document.getElementById('youtubeVideoBox').addEventListener('mouseover', function() {
      console.log('mouseOver');
      wondow.focus();
      this.iframeMouseOver = true;
    });

    document.getElementById('youtubeVideoBox').addEventListener('mouseout', function() {
      console.log('mouseOut');
      wondow.focus();
      this.iframeMouseOver = false;
    });
  }

  render() {
    const { width, videoId, videoInfo, onReady, stateChange, onPlaybackRateChange } = this.props;
    const opts = {
      playerVars: {
        autoplay: 0,
        controls: 2,
        playsinline: 1,
        rel: 0,
        disablekb: 1
      }
    };

    return (
      <div>
        <div className={css(styles.youtubeBox)} id="youtubeVideoBox">
          <YouTube
            videoId={videoId}
            opts={opts}
            className={css(styles.youtubeStyle)}
            onReady={onReady}
            onStateChange={stateChange}
            onPlaybackRateChange={onPlaybackRateChange}
          />
          {/* <IconButton style={{ color: 'red' }} aria-label="Delete" color="inherit" label="test">
            <Icon className={css(styles.bookmarkIcon)}>bookmark</Icon>
          </IconButton> */}
        </div>

        {videoInfo && (
          <Card className={css(styles.videoInfoCard)}>
            <div className={css(styles.infoBox)}>
              <p className={css(styles.title)}>{videoInfo.snippet.localized.title}</p>
              <p className={css(styles.channelTitle)}>{videoInfo.snippet.channelTitle}</p>
              <p className={css(styles.statistics)}>
                <span className={css(styles.publish)}>
                  {moment(videoInfo.snippet.publishedAt).format('DD MMM YYYY')} |{' '}
                </span>
                <span className={css(styles.view)}>{videoInfo.statistics.viewCount} views</span>
              </p>
            </div>
            <div className={css(styles.iconBox)}>
              <IconButton style={{ color: 'red' }} aria-label="Delete" color="inherit" label="test">
                <Icon className={css(styles.bookmarkIcon)}>bookmark</Icon>
              </IconButton>
              <a className={css(styles.bookmarkText)}>bookmark</a>
              <IconButton aria-label="Delete" color="inherit">
                <Icon className={css(styles.shareIcon)}>share</Icon>
              </IconButton>
              <a className={css(styles.shareText)}>share</a>
            </div>
          </Card>
        )}
      </div>
    );
  }
}
//bookmark_border
const styles = StyleSheet.create({
  youtubeStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  },
  youtubeBox: {
    position: 'relative',
    paddingBottom: '56.25%'
  },
  videoInfoCard: {
    position: 'relative',
    margin: '7px 0px'
  },
  infoBox: {
    float: 'left',
    textAlign: 'left',
    width: '100%',
    margin: '12px -200px 15px 12px',
    paddingRight: '200px'
  },
  title: {
    margin: 10,
    fonwWeight: 500,
    fontSize: 20,
    fontFamily: 'Retina,arial'
  },
  channelTitle: {
    fontSize: 14,
    margin: '0px 15px'
  },
  statistics: {
    margin: '0px 15px',
    fontSize: 12
  },
  publish: {
    fontSize: 12
  },
  view: {},
  iconBox: {
    float: 'right',
    position: 'relative',
    width: 182
  },
  bookmarkIcon: {
    fontSize: 32
  },
  shareIcon: {
    fontSize: 32
  },
  bookmarkText: {
    position: 'absolute',
    fontSize: 10,
    top: 42,
    left: 5
  },
  shareText: {
    position: 'absolute',
    fontSize: 10,
    top: 42,
    left: 73
  }
});
