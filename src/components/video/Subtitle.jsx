import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { StyleSheet, css } from 'aphrodite';
import shouldPureComponentUpdate from 'react-pure-render/function';
import $ from 'jquery';
import unescape from 'unescape';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


import Typography from '@material-ui/core/Typography';

export default class Subtitle extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
    this.state = {
      age: '',
      open: false,
    };
  
  }

  componentDidUpdate(){
    const node = document.getElementById(this.props.currentTextNo);
    setTimeout(() => {
      $('#subtitle').animate({scrollTop: node.offsetTop - 250}, 350, 'linear');
    }, 50);
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };


  render() {
    const { width, seekToYoutube, subtitle, currentTextNo, textHover } = this.props;

    //console.log(decode('&lt;div&gt;abc&lt;/div&gt;'));

    let textArray = [];
    if (subtitle) {
      subtitle.forEach((item, i) => {
        const start = item.attributes.start;
        const text = unescape(item.elements[0].text).replace(/(\n|\r)/g, ' ');
        const colorStyle = css(currentTextNo == i && styles.textColor);
        
        textArray.push(
          <a key={i} id={i} start={start} className={colorStyle} onClick={seekToYoutube}>
            {text.split(' ').map((word, j) => (
              <span key={j} onMouseOver={textHover}>
                {word + ' '}
              </span>
            ))}
          </a>
        );
      })
    }

    return (
      <div style={{marginTop: 10}}>
        <Card id="subtitle" className={css(styles.textBox)}>
        <CardContent>
          <div style={{margin: '10px'}}>
            <Typography className={css(styles.text)}>{textArray}</Typography>
          </div>
          </CardContent>
        </Card>
        {/* <FormControl>
            <Select
              open={this.state.open}
              onClose={this.handleClose}
              onOpen={this.handleOpen}
              value={this.state.age}
              onChange={this.handleChange}
              inputProps={{
                name: 'age',
                id: 'demo-controlled-open-select',
              }}
            >
              <MenuItem value={10}>English</MenuItem>
              <MenuItem value={20}>日本語</MenuItem>
              <MenuItem value={30}>Italy</MenuItem>
            </Select>
       </FormControl> */}
      </div>
    );
  }
}

const styles = StyleSheet.create({
  textBox: {
    height: '80vh',
    textAlign: 'left',
    //padding: '10px',
    overflow: 'auto',
    controls: 0,
    WebkitOverflowScrolling: 'touch',
    overflowScrolling: 'touch',
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
  }
});
