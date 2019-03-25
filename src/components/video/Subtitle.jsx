import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { StyleSheet, css } from 'aphrodite';
import shouldPureComponentUpdate from 'react-pure-render/function';
import $ from 'jquery';
import decode from 'unescape';
import { FadeLoader } from 'react-spinners';
import windowSize from 'react-window-size';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

class Subtitle extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      textScroll: true
    };
    this.changeTextScroll = this.changeTextScroll.bind(this);
  }

  componentDidUpdate() {
    const node = document.getElementById(this.props.currentTextNo);
    const $subtitle = $('#subtitle');
    const targetHeight =
      this.props.windowWidth > 1050 ? $subtitle.height() * 0.35 : $subtitle.height() * 0.15;

    setTimeout(() => {
      if (this.state.textScroll) {
        $subtitle.animate({ scrollTop: node.offsetTop - targetHeight }, 350, 'linear');
      }
    }, 50);
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.subtitle) this.setState({ loading: false });
  // }

  changeTextScroll() {
    this.setState({ textScroll: !this.state.textScroll });
  }

  render() {
    const {
      windowWidth,
      seekToYoutube,
      subtitle,
      subtitleLang,
      subtitleList,
      currentTextNo,
      wordDisp,
      textClear,
      getVideoData
    } = this.props;

    const pcMode = windowWidth > 1050;

    let textArray = [];
    if (subtitle) {
      subtitle.forEach((item, i) => {
        const start = item.attributes.start;
        const text = item.elements ? decode(item.elements[0].text).replace(/(\n|\r)/g, ' ') : '';
        const colorStyle = css(currentTextNo == i && styles.textColor);

        const node = pcMode ? (
          <a key={i} id={i} start={start} className={colorStyle} onClick={seekToYoutube}>
            {text.split(' ').map((word, j) => (
              <span key={j} onMouseOver={wordDisp} onMouseOut={textClear}>
                {' ' + word}
              </span>
            ))}
          </a>
        ) : (
          <a key={i} id={i} start={start} className={colorStyle}>
            {text.split(' ').map((word, j) => (
              <span key={j} onClick={wordDisp}>
                {' ' + word}
              </span>
            ))}
          </a>
        );
        textArray.push(node);
      });
    }
    return (
      <div>
        <Card id="subtitle" className={css(styles.card)}>
          <CardContent className={css(styles.cardBox)}>
            <FadeLoader sizeUnit={'px'} size={150} color={'#123abc'} loading={this.state.loading} />
            <div className={css(styles.text)}>{textArray}</div>
          </CardContent>
        </Card>
        {pcMode && (
          <div className={css(styles.configBox)}>
            <FormControl className={css(styles.formControl)}>
              <Select value={subtitleLang} onChange={getVideoData} className={css(styles.formSelect)}>
                {subtitleList &&
                  subtitleList.map((item, i) => {
                    return (
                      <MenuItem key={i} value={item.attributes.lang_code}>
                        {item.attributes.lang_original}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
            <Button
              variant="outlined"
              color="primary"
              className={css(styles.playButton)}
              onClick={this.changeTextScroll}>
              <Icon className={css(styles.playIcon)}>
                {this.state.textScroll ? 'pause_icon' : 'play_arrow'}
              </Icon>
              <span className={css(styles.playText)}>text scroll</span>
            </Button>
          </div>
        )}
      </div>
    );
  }
}
export default windowSize(Subtitle);

const styles = StyleSheet.create({
  card: {
    position: 'relative',
    textAlign: 'left',
    overflow: 'auto',
    controls: 0,
    WebkitOverflowScrolling: 'touch',
    overflowScrolling: 'touch',
    '@media (min-width: 1050px)': {
      height: 'calc(100vh - 180px)'
    },
    '@media (max-width: 1050px)': {
      height: 'calc(100vh - calc(100vw * 9 / 16))'
    }
  },
  cardBox: {
    '@media (max-width: 1050px)': {
      padding: '0px 0px 16px 0px',
      margin: 10
    }
  },
  blankArea: {
    position: 'absolute',
    width: '100%',
    top: 'calc(50px + 100vw * 9 / 16)',
    left: 0,
    height: 10,
    backgroundColor: 'white'
  },
  text: {
    fontFamily: 'system-ui',
    '@media (min-width: 1050px)': {
      lineHeight: '1.6',
      fontSize: '20px'
    },
    '@media (max-width: 1050px)': {
      lineHeight: '1.6',
      fontSize: '16px'
    }
  },
  textColor: {
    backgroundColor: 'yellow !important'
  },
  configBox: {},
  formControl: {
    margin: '10px 20px',
    width: 140
  },
  formSelect: {
    maxWidth: 200,
    fontSize: 14
  },
  playButton: {
    float: 'right',
    margin: '10px 5px',
    width: 130,
    minHeight: 30
  },
  playIcon: {
    position: 'absolute',
    left: 10
  },
  playText: {
    position: 'absolute',
    right: 10,
    fontSize: 13
  }
});
