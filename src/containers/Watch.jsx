import React, { Component } from 'react';
import windowSize from 'react-window-size';
import { getUserLocale } from 'get-user-locale';
import ReactQueryParams from 'react-query-params';
import withRoot from '../withRoot';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import ShowVideo from '../components/video/ShowVideo';
import RelatedVideo from '../components/video/RelatedVideo';
import Youtube from '../components/video/Youtube';
import Subtitle from '../components/video/Subtitle';
import Dictionary from '../components/video/Dictionary';
import TimeSlider from '../components/video/TimeSlider';
import FooterButtons from '../components/video/FooterButtons';
import { getVideoInfo, getSubtitle } from '../api/YoutubeAPI';
import { registerViewHistory } from '../api/FirebaseAPI';
import { firebaseApp } from '../../config.js';

class Watch extends ReactQueryParams {
  constructor(props) {
    super(props);
    this.state = {
      videoId: null,
      videoInfo: null,
      sliderDispFlg: false,
      currentTime: null,
      searchWord: null,
      relatedVideoList: null,
      subtitle: [],
      subtitleLang: 'en',
      subtitleList: [],
      currentTimeArray: [],
      currentTextNo: 0,
      showInfoForSpFlg: false
    };

    this.player = null;
    this.onReady = this.onReady.bind(this);
    this.seekToYoutube = this.seekToYoutube.bind(this);
    this.stateChange = this.stateChange.bind(this);
    this.getVideoData = this.getVideoData.bind(this);
  }

  componentDidMount() {
    //字幕ハイライトの更新
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

    this.getVideoData(undefined, this.state.subtitleLang, this.props);

    window.addEventListener('keydown', event => {
      const code = event.keyCode;
      const yp = this.player;
      let no;

      if (document.activeElement.value === undefined) {
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
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    this.getVideoData(undefined, this.state.subtitleLang, nextProps);
  }

  componentWillUnmount() {
    clearInterval();
  }

  getVideoData(event, changedLang, props) {
    //TODO: 暇があったら見直す
    const videoId = this.queryParams.videoId;
    let lang;
    if (event) {
      lang = event.target.value ? event.target.value : event.target.getAttribute('value');
    } else {
      lang = changedLang;
    }

    getVideoInfo(videoId).then(res => {
      const videoInfoData = res.items[0];
      const user = firebaseApp.auth().currentUser;
      if (user && this.state.videoId !== videoId) {
        registerViewHistory(user, videoInfoData, props.historyList);
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
    this.setState({ currentTime: this.player.getCurrentTime() });
  }
  stateChange(event) {
    //停止時にSliderを表示
    if (event.data === YT.PlayerState.PAUSED) {
      this.setState({ sliderDispFlg: true });
    }

    // 字幕の表示位置が変わった場合を検知する
    if (event.data === YT.PlayerState.BUFFERING || event.data === YT.PlayerState.PLAYING) {
      const currentTime = this.player.getCurrentTime();
      const targetIndex = this.state.currentTimeArray.findIndex(item => item > currentTime);
      if (targetIndex !== 0) {
        this.setState({ currentTextNo: Number(targetIndex - 1), sliderDispFlg: false });
      }
    }
    //TODO: ipadの大きさの画面でポーズ中にレコメンドビデオが押せなくなる。暇なら直す。
  }
  seekToYoutube(event) {
    const element = event.target.parentNode;
    if (!element.getAttribute('start')) return;

    this.player.seekTo(element.getAttribute('start'));
    this.setState({
      currentTextNo: Number(element.getAttribute('id'))
    });
  }
  sliderChange = values => {
    this.player.seekTo(values[0]);
    this.setState({ currentTime: values[0] });
  };
  playStateChange = () => {
    const yp = this.player;
    yp.getPlayerState() === YT.PlayerState.PLAYING ? yp.pauseVideo() : yp.playVideo();
  };
  timeBack = () => {
    this.player.seekTo(this.player.getCurrentTime() - 3);
    this.setState({ currentTime: this.player.getCurrentTime() });
  };
  timeForword = () => {
    this.player.seekTo(this.player.getCurrentTime() + 3);
    this.setState({ currentTime: this.player.getCurrentTime() });
  };
  wordDisp = event => {
    this.setState({
      searchWord: event.target.textContent
    });
  };
  textClear = () => {
    this.setState({ searchWord: null });
  };
  ChgShowInfoFlg = () => {
    console.log('call');
    this.setState({ showInfoForSpFlg: !this.state.showInfoForSpFlg });
  };
  render() {
    const { windowWidth } = this.props;
    return (
      <div>
        {/* PC */}
        {windowWidth > 960 && (
          <Grid container spacing={16} direction="row-reverse">
            <Hidden mdDown>
              <Grid item xs={1} />
            </Hidden>
            <Grid item xs={12} md={6} lg={5}>
              <div>
                <Youtube videoId={this.state.videoId} onReady={this.onReady} stateChange={this.stateChange} />
                <Dictionary searchWord={this.state.searchWord} subtitleLang={this.state.subtitleLang} />
                <ShowVideo videoInfo={this.state.videoInfo} />
                <RelatedVideo videoInfo={this.state.videoInfo} />
              </div>
            </Grid>
            <Grid item xs={12} md={6} lg={5}>
              <Subtitle
                currentTextNo={this.state.currentTextNo}
                subtitle={this.state.subtitle}
                subtitleLang={this.state.subtitleLang}
                subtitleList={this.state.subtitleList}
                seekToYoutube={this.seekToYoutube}
                wordDisp={this.wordDisp}
                textClear={this.textClear}
                getVideoData={this.getVideoData}
              />
            </Grid>
            <Hidden mdDown>
              <Grid item xs={1} />
            </Hidden>
          </Grid>
        )}
        {/* SP */}
        {windowWidth < 960 && (
          <div>
            <Dictionary
              searchWord={this.state.searchWord}
              textClear={this.textClear}
              subtitleLang={this.state.subtitleLang}
            />
            <Youtube
              videoId={this.state.videoId}
              onReady={this.onReady}
              stateChange={this.stateChange}
              playStateChange={this.playStateChange}
              timeBack={this.timeBack}
              timeForword={this.timeForword}
              sliderDispFlg={this.state.sliderDispFlg}
            />
            {this.state.sliderDispFlg && (
              <TimeSlider
                sliderChange={this.sliderChange}
                videoDuration={this.state.videoDuration}
                currentTime={this.state.currentTime}
                player={this.player}
              />
            )}
            {!this.state.showInfoForSpFlg && (
              <Subtitle
                currentTextNo={this.state.currentTextNo}
                subtitle={this.state.subtitle}
                seekToYoutube={this.seekToYoutube}
                wordDisp={this.wordDisp}
                textClear={this.textClear}
              />
            )}
            {this.state.showInfoForSpFlg && <ShowVideo videoInfo={this.state.videoInfo} />}
            <FooterButtons
              getVideoData={this.getVideoData}
              subtitleList={this.state.subtitleList}
              subtitleLang={this.state.subtitleLang}
              showInfoForSpFlg={this.state.showInfoForSpFlg}
              ChgShowInfoFlg={this.ChgShowInfoFlg}
            />
          </div>
        )}
      </div>
    );
  }
}

export default withRoot(windowSize(Watch));
