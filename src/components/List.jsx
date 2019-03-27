import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import windowSize from 'react-window-size';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import { imageUrl } from '../../app-const';

class List extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.result !== nextProps.result;
  }

  render() {
    const { windowWidth, result } = this.props;
    console.log(result);
    return (
      <div>
        <Card className={css(styles.listCard)}>
          {result &&
            result.map((item, i) => {
              return (
                <Link key={i} to={`/watch/?videoId=${item.id.videoId}`}>
                  <div className={css(styles.eachBox)}>
                    <img src={`${imageUrl}${item.id.videoId}/mqdefault.jpg`} className={css(styles.img)} />
                    <div className={css(styles.infoBox)}>
                      <p className={css(styles.title)}>{item.snippet.title}</p>
                      {windowWidth > 850 && (
                        <p className={css(styles.description)}>{item.snippet.description}</p>
                      )}
                    </div>
                  </div>
                </Link>
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
    fontWeight: 'bold',
    '@media (max-width: 650px)': {
      fontSize: 14
    }
  },
  description: {
    fontSize: 13
  }
});
