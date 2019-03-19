import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { StyleSheet, css } from 'aphrodite';
import shouldPureComponentUpdate from 'react-pure-render/function';
import $ from 'jquery';
import decode from 'unescape';
import { FadeLoader } from 'react-spinners';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

export default class Subtitle extends Component {
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
    setTimeout(() => {
      if (this.state.textScroll) {
        $('#subtitle').animate({ scrollTop: node.offsetTop - 250 }, 350, 'linear');
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
      width,
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
      <div>
        <Card id="subtitle" className={css(styles.textBox)}>
          <CardContent>
            <div style={{ margin: '10px' }}>
              <FadeLoader sizeUnit={'px'} size={150} color={'#123abc'} loading={this.state.loading} />
              <div className={css(styles.text)}>{textArray}</div>
            </div>
          </CardContent>
        </Card>
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
      </div>
    );
  }
}

const styles = StyleSheet.create({
  textBox: {
    height: 'calc(100vh - 180px)',
    textAlign: 'left',
    overflow: 'auto',
    controls: 0,
    WebkitOverflowScrolling: 'touch',
    overflowScrolling: 'touch'
    //border: '1px solid #a5a2a6'
    // [theme.breakpoints.down('sm')]: {
    //   height: '60vh'
    // }
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
