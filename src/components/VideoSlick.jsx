import React, { Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import withRoot from '../withRoot';
import windowSize from 'react-window-size';
import { StyleSheet, css } from 'aphrodite';
import moment from 'moment';
import ellipsis from 'text-ellipsis';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { Card } from '@material-ui/core';

class VideoSlick extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
    this.state = {
      result: null
    };
    this.settings = {
      infinite: true,
      lazyLoad: true,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      responsive: [
        {
          breakpoint: 3000, //under
          settings: {
            slidesToShow: 6,
            slidesToScroll: 4
          }
        },
        {
          breakpoint: 1400, //under
          settings: {
            slidesToShow: 3,
            slidesToScroll: 2
          }
        }
      ]
    };
  }

  render() {
    const { windowWidth, recommendList } = this.props;
    console.log('aaa');
    let recList;
    if (!recommendList.items) {
      recList = null;
    } else if (windowWidth > 800) {
      recList = recommendList.items;
    } else {
      recList = recommendList.items.slice(0, 7);
    }

    return (
      <div>
        {/* PC */}
        {windowWidth > 800 && (
          <Card className={css(pcStyles.sliderBox)}>
            <h4 className={css(pcStyles.boxTitle)}>{this.props.title}</h4>
            <Slider {...this.settings}>
              {recList &&
                recList.map((item, i) => {
                  return (
                    <div key={i} className={css(pcStyles.box)}>
                      <Link to={`/watch/?videoId=${item.id.videoId}`} className={css(pcStyles.link)}>
                        <img src={item.snippet.thumbnails.medium.url} className={css(pcStyles.image)} />
                        <div className={css(pcStyles.titleBox)}>
                          <p className={css(pcStyles.title)}>{item.snippet.title}</p>
                        </div>
                        <span className={css(pcStyles.channelTitle)}>
                          {ellipsis(item.snippet.channelTitle, 25, { ellipsis: '...' })}
                          {'  '}
                        </span>
                        <span className={css(pcStyles.publishedAt)}>
                          {moment(item.snippet.publishedAt).format('DD MMM YYYY')}
                        </span>
                      </Link>
                    </div>
                  );
                })}
            </Slider>
          </Card>
        )}
        {/* SP */}
        {windowWidth < 800 && (
          <Card className={css(spStyles.sliderBox)}>
            <h4 className={css(spStyles.boxTitle)}>{this.props.title}</h4>
            {recList &&
              recList.map((item, i) => {
                return (
                  <div key={i} className={css(spStyles.box)}>
                    <Link to={`/watch/?videoId=${item.id.videoId}`} className={css(spStyles.link)}>
                      <img src={item.snippet.thumbnails.medium.url} className={css(spStyles.image)} />
                      <div className={css(spStyles.titleBox)}>
                        <p className={css(spStyles.title)}>{item.snippet.title}</p>
                      </div>
                      <span className={css(spStyles.channelTitle)}>
                        {item.snippet.channelTitle}
                        {'  '}
                      </span>
                      <span className={css(spStyles.publishedAt)}>
                        {moment(item.snippet.publishedAt).format('DD MMM YYYY')}
                      </span>
                    </Link>
                  </div>
                );
              })}
          </Card>
        )}
      </div>
    );
  }
}

export default withRoot(windowSize(VideoSlick));

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={css(pcStyles.arrowBox, pcStyles.arrowPrev)}
      style={{ ...style, display: 'block' }}
      onClick={onClick}>
      <img src="/img/arrow-prev.png" className={css(pcStyles.arrowImg)} />
    </div>
  );
}

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={css(pcStyles.arrowBox, pcStyles.arrowNext)}
      style={{ ...style, display: 'block' }}
      onClick={onClick}>
      <img src="/img/arrow-next.png" className={css(pcStyles.arrowImg)} />
    </div>
  );
}

const pcStyles = StyleSheet.create({
  sliderBox: {
    '@media (min-width: 1400px)': {
      width: '1400px',
      marginLeft: 'calc(calc(100% - 1400px)/2)'
    },
    '@media (max-width: 1400px)': {
      width: '800px',
      marginLeft: 'calc(calc(100% - 800px)/2)'
    },
    padding: '20px 30px 8px 30px',
    marginTop: 20
  },
  boxTitle: {
    margin: '0px 0px 10px 10px',
    fontSize: 18
  },
  box: {
    textAlign: 'left',
    cursor: 'pointer',
    marginLeft: 'calc(calc(100% - 210px)/2)',
    ':focus': {
      outline: 'none'
    }
  },
  link: {
    textDecoration: 'none',
    color: 'black'
  },
  image: {
    width: 210
  },
  titleBox: {
    width: 210,
    wordWrap: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  title: {
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    fontWeight: 'bold',
    fontSize: '14px',
    overflow: 'hidden',
    wordWrap: 'nowrap',
    marginTop: 0,
    marginBottom: 0,
    height: 37
  },
  channelTitle: {
    fontSize: '12px'
  },
  publishedAt: {
    fontSize: '12px'
  },
  arrowBox: {
    position: 'absolute',
    top: '30%',
    cursor: 'pointer',
    opacity: 0.5,
    ':hover': {
      opacity: 1
    }
  },
  arrowNext: {
    right: -20
  },
  arrowPrev: {
    left: -20
  },
  arrowImg: {
    width: 20
  }
});

const spStyles = StyleSheet.create({
  sliderBox: {
    padding: '0px 10px',
    margin: '10px 0px 20px'
  },
  boxTitle: {
    margin: '10px 0px',
    fontSize: 20
  },
  box: {
    margin: '13px 0px'
  },
  link: {
    textDecoration: 'none',
    color: 'black'
  },
  image: {
    width: '100%'
  },
  titleBox: {
    width: '100%',
    wordWrap: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  title: {
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    fontWeight: 'bold',
    fontSize: '14px',
    overflow: 'hidden',
    wordWrap: 'nowrap',
    marginTop: 0,
    marginBottom: 0
  },
  channelTitle: {
    fontSize: '12px'
  },
  publishedAt: {
    fontSize: '12px'
  }
});
