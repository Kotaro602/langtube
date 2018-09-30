import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { StyleSheet, css } from 'aphrodite';

import Typography from '@material-ui/core/Typography';

export default class Subtitle extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { width, seekToYoutube, subtitleText, currentTextNo, textHover } = this.props;

    let textArray = [];
    if (subtitleText) {
      const texts = subtitleText.getElementsByTagName('text');
      for (let i = 0; i < texts.length; i++) {
        const start = texts[i].getAttribute('start');
        const text = unescape(texts[i].textContent).replace(/(\n|\r)/g, ' ');

        const colorStyle = css(currentTextNo == i && styles.textColor);
        textArray.push(
          <a key={i} id={i} start={start} className={colorStyle} onClick={seekToYoutube}>
            {text.split(' ').map((word, i) => (
              <span key={i} onMouseOver={textHover}>
                {word + ' '}
              </span>
            ))}
          </a>
        );
      }
    }

    return (
      <div className={css(styles.textBox)}>
        <Typography className={css(styles.text)}>{textArray}</Typography>
      </div>
    );
  }
}

const styles = StyleSheet.create({
  textBox: {
    height: '85vh',
    textAlign: 'left',
    padding: '20px',
    overflow: 'auto',
    controls: 0,
    WebkitOverflowScrolling: 'touch',
    overflowScrolling: 'touch'
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
  }
});
