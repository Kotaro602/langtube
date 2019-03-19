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
import { getRelatedVideo } from '../api/YoutubeAPI';
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
      result: []
    };
    this.showSearchList = [];
  }

  componentDidMount() {
    showSearchList = shuffle(category).slice(0, 6);
  }

  render() {
    return (
      <div>
        <div className={css(styles.fabBox)}>
          {this.subtitleList &&
            this.subtitleList.map((item, i) => {
              return (
                <Fab variant="extended" size="small" color="primary" aria-label="Add" key={i}>
                  culture
                </Fab>
              );
            })}
        </div>
        <VideoSlick />
        <VideoSlick />
        <VideoSlick />
      </div>
    );
  }
}

//TODO: componentを使ってみる
export default withRoot(withWidth()(Home));

const styles = StyleSheet.create({
  fabBox: {
    width: 1000,
    marginLeft: 'calc(calc(100% - 1000px)/2)'
  }
});
