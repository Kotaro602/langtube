import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import shouldPureComponentUpdate from 'react-pure-render/function';
import withRoot from '../withRoot';
import shuffle from 'shuffle-array';
import { Link } from 'react-router-dom';
import windowSize from 'react-window-size';
import { category } from '../../app-const.js';
import VideoSlick from '../components/VideoSlick';
import { getSearchResult } from '../api/YoutubeAPI';
import Fab from '@material-ui/core/Fab';

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
    console.log('bbb');
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
    const { windowWidth } = this.props;
    console.log(windowWidth);
    const recommendLists = this.state.recommendList;
    return (
      <div>
        {windowWidth > 1000 && (
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
        )}
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

export default withRoot(windowSize(Home));

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
