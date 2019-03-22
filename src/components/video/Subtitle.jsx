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
      loading: true,
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.subtitleList) this.setState({ loading: false });
  }

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
      textHover,
      textClear,
      getVideoData
    } = this.props;

    let textArray = [];
    if (subtitle) {
      subtitle.forEach((item, i) => {
        const start = item.attributes.start;
        const text = item.elements ? decode(item.elements[0].text).replace(/(\n|\r)/g, ' ') : '';
        const colorStyle = css(currentTextNo == i && styles.textColor);

        textArray.push(
          <a key={i} id={i} start={start} className={colorStyle} onClick={seekToYoutube}>
            {text.split(' ').map((word, j) => (
              <span key={j} onMouseOver={textHover} onMouseOut={textClear}>
                {' ' + word}
              </span>
            ))}
          </a>
        );
      });
    }
    return (
      <div className={css(styles.subtitleBox)}>
        <Card id="subtitle" className={css(styles.textBox)}>
          <CardContent>
            <div style={{ margin: '10px' }}>
              <FadeLoader sizeUnit={'px'} size={150} color={'#123abc'} loading={this.state.loading} />
              <div className={css(styles.text)}>{textArray}</div>
            </div>
          </CardContent>
        </Card>
        {windowWidth > 1050 && (
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
  subtitleBox: {
    position: 'relative',
    '@media (min-width: 800px)': {
      height: 'calc(100vh - 180px)'
    },
    '@media (max-width: 800px)': {
      height: 'calc(100vh - calc(100vw * 9 / 16))'
    }
  },
  textBox: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // width: '100%',
    // height: '100%',
    position: 'relative',
    '@media (min-width: 800px)': {
      height: 'calc(100vh - 180px)'
    },
    '@media (max-width: 800px)': {
      height: 'calc(100vh - calc(100vw * 9 / 16))'
    },
    textAlign: 'left',
    overflow: 'auto',
    controls: 0,
    WebkitOverflowScrolling: 'touch',
    overflowScrolling: 'touch'
  },
  text: {
    fontFamily: 'system-ui',
    lineHeight: '1.6',
    fontSize: '20px'
    // [theme.breakpoints.down('sm')]: {
    //   fontSize: '16px'
    // }
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
