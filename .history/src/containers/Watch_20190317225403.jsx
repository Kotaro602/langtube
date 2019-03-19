import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ShowVideo from '../components/video/ShowVideo';
import RelatedVideo from '../components/video/RelatedVideo';
import Subtitle from '../components/video/Subtitle';
import { getVideoInfo, getSubtitle } from '../api/YoutubeAPI';
import { registerViewHistory } from '../api/FirebaseAPI';
import { firebaseApp } from '../../config.js';

import ReactQueryParams from 'react-query-params';

import withRoot from '../withRoot';
import Hidden from '@material-ui/core/Hidden';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

class Watch extends ReactQueryParams {
  constructor(props) {
    super(props);
    this.state = {
      videoId: null,
      videoInfo: null,
      searchWord: null,
      relatedVideoList: null,
      subtitle: [],
      subtitleLang: 'en',
      subtitleList: [],
      currentTimeArray: [],
      currentTextNo: 0
    };

    this.player = null;
    this.onReady = this.onReady.bind(this);
    this.seekToYoutube = this.seekToYoutube.bind(this);
    this.stateChange = this.stateChange.bind(this);
    this.textHover = this.textHover.bind(this);
    this.getVideoData = this.getVideoData.bind(this);
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

    this.getVideoData(undefined, this.state.subtitleLang, this.props.match.params.videoId);

    ReactDOM.findDOMNode(this.refs.watch).addEventListener(
      'keydown',
      event => {
        const code = event.keyCode;
        const yp = this.player;
        let no;
        switch (code) {
          case 32: //space
            yp.getPlayerState() === YT.PlayerState.PLAYING ? yp.pauseVideo() : yp.playVideo();
            event.preventDefault();
            break;
          case 37: // ←
          case 78: // n
            yp.seekTo(yp.getCurrentTime() - 3);
            break;
          case 38: // ↑
            no = this.state.currentTextNo;
            if (no !== 0) {
              const nextNo = yp.getCurrentTime() - this.state.currentTimeArray[no] > 1 ? no : no - 1;
              yp.seekTo(this.state.currentTimeArray[nextNo]);
              this.setState({ currentTextNo: nextNo });
            }
            break;
          case 39: // →
          case 77: // m
            yp.seekTo(yp.getCurrentTime() + 3);
            break;
          case 40: // ↓
            no = this.state.currentTextNo;
            if (no !== this.state.currentTimeArray.length) {
              yp.seekTo(this.state.currentTimeArray[no + 1]);
              this.setState({ currentTextNo: no + 1 });
            }
            break;
        }
      },
      true
    );
  }

  componentWillReceiveProps(nextProps) {
    this.getVideoData(undefined, this.state.subtitleLang, nextProps.match.params.videoId);
  }

  getVideoData(event, changedLang, tempVideoId) {
    //TODO: 暇があったら見直す
    const lang = event ? event.target.value : changedLang;
    const videoId = tempVideoId ? tempVideoId : this.state.videoId;

    getVideoInfo(videoId).then(res => {
      const videoInfoData = res.items[0];
      const user = firebaseApp.auth().currentUser;
      if (user) {
        registerViewHistory(user, videoInfoData);
      }
      getSubtitle(videoId, lang).then(info => {
        let currentTimeArray = [];
        info.subtitle.forEach(text => {
          currentTimeArray.push(text.attributes.start);
        });
        this.setState(
          Object.assign(info, {
            videoId: videoId,
            videoInfo: videoInfoData,
            currentTimeArray: currentTimeArray
          })
        );
      });
    });
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

  seekToYoutube(event) {
    const element = event.target.parentNode;
    if (!element.getAttribute('start')) return;

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
      <div ref="watch" tabIndex="-1" style={{ outline: 0, height: '100%' }}>
        <Grid container spacing={16} direction="row-reverse" className={classes.root}>
          <Hidden mdDown>
            <Grid item xs={1} />
          </Hidden>
          <Grid item xs={12} md={6} lg={5} className={classes.right}>
            <div>
              <ShowVideo
                width={width}
                videoId={this.state.videoId}
                videoInfo={this.state.videoInfo}
                onReady={this.onReady}
                stateChange={this.stateChange}
                onPlaybackRateChange={this.onPlaybackRateChange}
              />
              <RelatedVideo videoInfo={this.state.videoInfo} width={width} />
            </div>
          </Grid>
          <Grid item xs={12} md={6} lg={5} className={classes.left}>
            <Subtitle
              width={width}
              currentTextNo={this.state.currentTextNo}
              subtitle={this.state.subtitle}
              subtitleLang={this.state.subtitleLang}
              subtitleList={this.state.subtitleList}
              seekToYoutube={this.seekToYoutube}
              textHover={this.textHover}
              getVideoData={this.getVideoData}
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
  root: {},
  right: {
    //marginTop: '4px',
    // [theme.breakpoints.down('md')]: {
    //   paddingRight: 20
    // }
  },
  left: {
    position: 'relative',
    height: 'auto !important'
  }
});

//TODO: componentを使ってみる
export default withRoot(withStyles(styles)(withWidth()(Watch)));
