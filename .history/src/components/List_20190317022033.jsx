import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { StyleSheet, css } from 'aphrodite';
import { Link } from 'react-router-dom';
import { getSearchResult } from '../api/YoutubeAPI';
import queryString from 'query-string';

import withRoot from '../withRoot';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

export default class List extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
  }

  render() {
    const { result } = this.props;
    console.log(result);
    return (
      <div style={{}}>
        <Card className={css(styles.listCard)}>
          {result &&
            result.map((item, i) => {
              return (
                <div key={i} className={css(styles.eachBox)}>
                  <Link to={`/watch/?videoId=${item.id.videoId}`}>
                    <img src={item.snippet.thumbnails.medium.url} className={css(styles.img)} />
                    <div className={css(styles.infoBox)}>
                      <p className={css(styles.title)}>{item.snippet.title}</p>
                      <p className={css(styles.description)}>{item.snippet.description}</p>
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

const styles = StyleSheet.create({
  listCard: {
    width: 780,
    marginLeft: 'calc((100% - 780px) * 3/8 )',
    marginRight: 'auto'
  },
  eachBox: {
    margin: 5,
    padding: 2,
    height: 150,
    cursor: 'pointer',
    ':hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.08)'
    }
  },
  img: {
    height: 140,
    float: 'left'
  },
  infoBox: {
    float: 'right',
    width: 460,
    height: 140,
    color: 'black'
  },
  title: {
    margin: '0px',
    fontWeight: 'bold'
  },
  description: {
    fontSize: 13
  }
});
