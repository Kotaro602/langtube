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
      recommendList: null
    };
  }

  componentDidMount() {
    const shaffleList = shuffle(category);
    Promise.all([
      getSearchResult(shaffleList.slice(0, 1)[0], 48),
      getSearchResult(shaffleList.slice(1, 2)[0], 48),
      getSearchResult(shaffleList.slice(2, 3)[0], 48)
    ]).then(recommendList => {
      this.setState({ shaffleList: shaffleList, recommendList: recommendList });
    });
  }

  render() {
    const recommendLists = this.state.recommendList;
    return (
      <div>
        <div className={css(styles.fabBox)}>
          {this.state.shaffleList.slice(4, 12).map((item, i) => {
            return (
              <Link key={i} to={`/search/?q=${item}`}>
                <Fab variant="extended" size="small" color="primary" className={css(styles.pillButton)}>
                  <span className={css(styles.buttonText)}>{item}</span>
                </Fab>
              </Link>
            );
          })}
        </div>
        {recommendLists && (
          <div>
            <VideoSlick title={this.state.shaffleList.slice(0, 1)} recommendList={recommendLists[0]} />
            <VideoSlick title={this.state.shaffleList.slice(1, 2)} recommendList={recommendLists[1]} />
            <VideoSlick title={this.state.shaffleList.slice(2, 3)} recommendList={recommendLists[2]} />
          </div>
        )}
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
