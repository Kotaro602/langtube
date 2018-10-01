import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { StyleSheet, css } from 'aphrodite';
import YouTube from 'react-youtube';
import shouldPureComponentUpdate from 'react-pure-render/function';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import { getVideoInfo } from '../../api/YoutubeAPI';

export default class ShowVideo extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
    this.state = {
      videoInfo: null
    };
  }

  componentDidMount() {
    getVideoInfo(this.props.videoId).then(res => {
      this.setState({ videoInfo: res });
    });
  }

  render() {
    const { width, videoId, onReady, stateChange, onPlaybackRateChange } = this.props;
    const videoInfo = this.state.videoInfo ? this.state.videoInfo.items[0] : null;
    const opts = {
      playerVars: {
        autoplay: 0,
        showinfo: 0,
        controls: 2,
        playsinline: 1,
        rel: 0
      }
    };

    return (
      <div style={{marginTop:10}}>
        <div className={css(styles.youtubeBox)}>
          <YouTube
            videoId={videoId}
            opts={opts}
            className={css(styles.youtubeStyle)}
            onReady={onReady}
            onStateChange={stateChange}
            onPlaybackRateChange={onPlaybackRateChange}
          />
        </div>
        {videoInfo && (
          <Card>
            <CardContent>
          <Grid container spacing={8}>
            <Grid item xs={9}>
              <div className={css(styles.infoBox)}>
                <p className={css(styles.title)}>{videoInfo.snippet.localized.title}</p>
                <p className={css(styles.channelTitle)}>{videoInfo.snippet.channelTitle}</p>
                <p className={css(styles.statistics)}>
                  <span className={css(styles.publish)}>{moment(videoInfo.snippet.publishedAt).format('DD MMM YYYY')} | </span>
                  <span className={css(styles.view)}>{videoInfo.statistics.viewCount} views</span>
                </p>
              </div>
            </Grid>
            <Grid item xs={3}>
              <div style={{ background: 'yellow' }} />
            </Grid>
          </Grid>
          </CardContent>
          </Card>
        )}
      </div>
    );
  }
}

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
  infoBox: {
    textAlign: 'left',
    height: 100
  },
  title: {
    margin: 10,
    //width: 500,
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
  view: {}
});
