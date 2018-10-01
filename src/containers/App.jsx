import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import config from '../../config.js';
import appConst from '../../app-const.js';
import Header from '../components/Header';
import ShowVideo from '../components/video/ShowVideo';
import RelatedVideo from '../components/video/RelatedVideo';
import Subtitle from '../components/video/Subtitle';
import Dictionary from '../components/video/Dictionary';
import { getSubtitleList, getSubtitle } from '../api/YoutubeAPI';

import { StyleSheet, css } from 'aphrodite';
import ReactQueryParams from 'react-query-params';
import YouTube from 'react-youtube';
import unescape from 'unescape';

import withRoot from '../withRoot';
import Hidden from '@material-ui/core/Hidden';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

class App extends ReactQueryParams {
  constructor(props) {
    super(props);
    this.state = {
      videoInfo: null,
      searchWord: null,
      relatedVideoList: null,
      subtitle: [],
      subtitleInfo: null,
      currentTimeArray: [],
      currentTextNo: 0
    };

    this.videoId = this.queryParams.videoId ? this.queryParams.videoId : '4qQW1uSoxRg';
    this.player = null;

    this.onReady = this.onReady.bind(this);
    this.seekToYoutube = this.seekToYoutube.bind(this);
    this.stateChange = this.stateChange.bind(this);
    this.startChange = this.startChange.bind(this);
    this.textHover = this.textHover.bind(this);
  }

  componentDidMount() {
    setInterval(() => {
      const player = this.player;
      if (
        player !== null &&
        player.getPlayerState() !== YT.PlayerState.BUFFERING &&
        player.getPlayerState() !== YT.PlayerState.PAUSED &&
        player.getCurrentTime() > this.state.currentTimeArray[this.state.currentTextNo + 1]
      ) {
        this.setState({ currentTextNo: this.state.currentTextNo + 1 });
      }
    }, 200);

    getSubtitle(this.videoId, null).then(info =>{
      let currentTimeArray = [];
      info.subtitle.forEach(text =>{
        currentTimeArray.push(text.attributes.start);
      })
      this.setState(Object.assign(info, {currentTimeArray: currentTimeArray}));
    })
  }

  onReady(event) {
    this.player = event.target;
  }

  stateChange(event) {
    if (event.data === YT.PlayerState.BUFFERING || event.data === YT.PlayerState.PLAYING) {
      const currentTime = this.player.getCurrentTime();
      const targetIndex = this.state.currentTimeArray.findIndex(item => item > currentTime);
      if (targetIndex !== 0) {
        this.setState({ currentTextNo: Number(targetIndex - 1) });
      }
    }
  }

  startChange() {
    // if (this.player.getPlayerState() === YT.PlayerState.PLAYING) {
    //   this.player.pauseVideo();
    // } else {
    //   this.player.playVideo();
    // }
  }

  seekToYoutube(event) {
    const element = event.target.parentNode;
    this.player.seekTo(element.getAttribute('start'));
    this.setState({
      currentTextNo: Number(element.getAttribute('id'))
    });
  }

  textHover(event) {
    this.setState({
      searchWord: event.target.textContent
    });
  }

  render() {
    const { classes, width } = this.props;

    return (
      <div>
        <Grid container spacing={8} direction="row-reverse">
          <Hidden smDown>
            <Header />
          </Hidden>
          <Hidden mdDown>
            <Grid item xs={1} />
          </Hidden>
          <Grid item xs={12} md={6} lg={5} className={classes.right}>
            <div>
              <ShowVideo
                width={width}
                videoId={this.videoId}
                onReady={this.onReady}
                stateChange={this.stateChange}
                onPlaybackRateChange={this.onPlaybackRateChange}
              />
              <RelatedVideo videoId={this.videoId} />
            </div>
          </Grid>
          <Grid item xs={12} md={6} lg={5} className={classes.left}>
            <Subtitle
              width={width}
              currentTextNo={this.state.currentTextNo}
              subtitle={this.state.subtitle}
              seekToYoutube={this.seekToYoutube}
              textHover={this.textHover}
            />
          </Grid>
          <Hidden mdDown>
            <Grid item xs={1} />
          </Hidden>
        </Grid>
        {/* <Dictionary searchWord={this.state.searchWord} /> */}
      </div>
    );
  }
}

const styles = theme => ({
  right: {
    position: 'relative',
    paddingBottom: '56.25%',
    [theme.breakpoints.down('sm')]: {
      //marginTop: '-4px'
    }
  },
  youtubeStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  },
  left: {
    position: 'relative',
    height: 'auto !important'
  }
});

//TODO: componentを使ってみる
export default withRoot(withStyles(styles)(withWidth()(App)));
