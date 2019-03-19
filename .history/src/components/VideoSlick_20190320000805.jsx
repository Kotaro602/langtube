import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import shouldPureComponentUpdate from 'react-pure-render/function';
import withRoot from '../withRoot';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { StyleSheet, css } from 'aphrodite';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { firebaseApp } from '../../config.js';
import { getSearchResult } from '../api/YoutubeAPI';
import { Card } from '@material-ui/core';

class VideoSlick extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
    this.state = {
      result: null
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.searchWord);
    getSearchResult(nextProps.searchWord, 50).then(json => this.setState({ result: json }));
  }
  beforeChangeSlider() {
    this.sliderFlg = true;
  }
  afterChangeSlider() {
    this.sliderFlg = false;
  }

  render() {
    //console.log(this.props.searchWord);
    const settings = {
      //infinite: true,
      // draggable: true,
      // centerMode: true,
      //fade: true,
      lazyLoad: true,
      dots: false,
      //   arrows: true,
      //   centerPadding: 50,
      speed: 500,
      //   slidesToShow: 5,
      //   slidesToScroll: 5,
      //   initialSlide: 0,
      //   beforeChange: this.beforeChangeSlider,
      //   afterChange: this.afterChangeSlider,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      responsive: [
        {
          breakpoint: 1930, //under
          settings: {
            //centerPadding: 90,
            slidesToShow: 6,
            slidesToScroll: 4
          }
        },
        {
          breakpoint: 1200, //under
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
          }
        }
      ]
    };

    return (
      <Card className={css(styles.sliderBox)}>
        <div>
          <h4 className={css(styles.boxTitle)}>{this.props.searchWord}</h4>
          <Slider {...settings}>
            {this.state.result &&
              this.state.result.items.map((item, i) => {
                return (
                  <div key={i} className={css(styles.box)}>
                    <Link to={`/watch/${item.id.videoId}/`}>
                      <img src={item.snippet.thumbnails.medium.url} className={css(styles.image)} />
                      <div className={css(styles.titleBox)}>
                        <p className={css(styles.title)}>{item.snippet.title}</p>
                      </div>
                    </Link>
                  </div>
                );
              })}
          </Slider>
        </div>
      </Card>
    );
  }
}

//TODO: componentを使ってみる
export default withRoot(withWidth()(VideoSlick));

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={css(styles.arrowBox, styles.arrowPrev)}
      style={{ ...style, display: 'block' }}
      onClick={onClick}>
      <img src="/img/arrow-prev.png" className={css(styles.arrowImg)} />
    </div>
  );
}

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={css(styles.arrowBox, styles.arrowNext)}
      style={{ ...style, display: 'block' }}
      onClick={onClick}>
      <img src="/img/arrow-next.png" className={css(styles.arrowImg)} />
    </div>
  );
}

const styles = StyleSheet.create({
  sliderBox: {
    width: '1400px',
    padding: '20px 30px',
    marginTop: 20,
    marginLeft: 'calc(calc(100% - 1400px)/2)'
  },
  boxTitle: {
    margin: '0px 0px 10px 20px'
  },
  box: {
    textAlign: 'left',
    cursor: 'pointer',
    marginLeft: 'calc(calc(100% - 210px)/2)',
    // '@media (max-width: 3000)': {
    //   marginLeft: 15
    // },
    // '@media (max-width: 1930)': {
    //   marginLeft: 100
    // },
    ':focus': {
      outline: 'none'
    }
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
    fontSize: '12px',
    overflow: 'hidden',
    wordWrap: 'nowrap',
    marginTop: 0,
    marginBottom: 0,
    height: 40
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
