import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { StyleSheet, css } from 'aphrodite';
import shouldPureComponentUpdate from 'react-pure-render/function';
import withRoot from '../withRoot';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import shuffle from 'shuffle-array';
import { firebaseApp, category } from '../../config.js';
import VideoSlick from '../components/VideoSlick';
import { ReadViewHisoty } from '../api/FirebaseAPI';
import { getSearchResult } from '../api/YoutubeAPI';
import Chip from '@material-ui/core/Chip';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';

class Home extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
    this.state = {
      shaffleList: [],
      recommendList: []
    };
  }

  componentDidMount() {
    const shaffleList = shuffle(category);
    Promise.all([getSearchResult(shaffleList.slice(0, 1), 50)]).then(res => {
      console.log(res);
      this.setState({ shaffleList: shaffleList, recommendList: res[0] });
    });
  }

  render() {
    return (
      <div>
        <div className={css(styles.fabBox)}>
          {this.state.shaffleList.slice(4, 12).map((item, i) => {
            return (
              <Fab variant="extended" size="small" color="primary" className={css(styles.pillButton)} key={i}>
                <span className={css(styles.buttonText)}>{item}</span>
              </Fab>
            );
          })}
        </div>
        <VideoSlick title={this.state.shaffleList.slice(0, 1)} recommendList={this.state.recommendList} />
        {/* <VideoSlick searchWord={this.state.shaffleList.slice(10, 11)} />
        <VideoSlick searchWord={this.state.shaffleList.slice(11, 12)} /> */}
      </div>
    );
  }
}

//TODO: componentを使ってみる
export default withRoot(withWidth()(Home));

const styles = StyleSheet.create({
  fabBox: {
    width: 1000,
    display: 'inline-block',
    textAlign: 'center',
    marginLeft: 'calc(calc(100% - 1000px)/2)'
  },
  pillButton: {
    marginRight: 10
  },
  buttonText: {
    padding: '0px 8px',
    textTransform: 'none'
  }
});
