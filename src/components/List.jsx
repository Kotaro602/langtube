import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { StyleSheet, css } from 'aphrodite';
import windowSize from 'react-window-size';
import { Link } from 'react-router-dom';
import { getSearchResult } from '../api/YoutubeAPI';
import queryString from 'query-string';
import withRoot from '../withRoot';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { imageUrl } from '../../app-const';

class List extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
  }

  render() {
    const { windowWidth, result } = this.props;
    return (
      <div style={{}}>
        <Card className={css(styles.listCard)}>
          {result &&
            result.map((item, i) => {
              return (
                <div key={i} className={css(styles.eachBox)}>
                  <Link to={`/watch/?videoId=${item.id.videoId}`}>
                    <img src={`${imageUrl}${item.id.videoId}/mqdefault.jpg`} className={css(styles.img)} />
                    <div className={css(styles.infoBox)}>
                      <p className={css(styles.title)}>{item.snippet.title}</p>
                      {windowWidth > 850 && (
                        <p className={css(styles.description)}>{item.snippet.description}</p>
                      )}
                    </div>
                  </Link>
                </div>
              );
            })}
        </Card>
      </div>
    );
  }
}
export default windowSize(List);

const styles = StyleSheet.create({
  listCard: {
    '@media (min-width: 850px)': {
      width: 780,
      marginLeft: 'calc((100% - 780px) * 3/8 )',
      marginRight: 'auto'
    },
    '@media (max-width: 850px)': {
      width: '100%'
    }
  },
  eachBox: {
    margin: 5,
    padding: 2,
    cursor: 'pointer',
    ':hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.08)'
    },
    '@media (min-width: 850px)': {
      height: 150
    },
    '@media (max-width: 850px)': {
      height: 'calc(40vw * 9/16 + 10px)'
    }
  },
  img: {
    float: 'left',
    '@media (min-width: 850px)': {
      height: 140
    },
    '@media (max-width: 850px)': {
      width: '40vw'
    }
  },
  infoBox: {
    float: 'right',
    color: 'black',
    '@media (min-width: 850px)': {
      height: 140,
      width: 460
    },
    '@media (max-width: 850px)': {
      width: '50vw'
    }
  },
  title: {
    margin: '0px',
    fontWeight: 'bold'
  },
  description: {
    fontSize: 13
  }
});
