import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { StyleSheet, css } from 'aphrodite';
import shouldPureComponentUpdate from 'react-pure-render/function';

import { getRelatedVideo } from '../../api/YoutubeAPI';

export default class RelatedVideo extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
    this.state = {
      relatedVideoList: null
    };
    this.sliderFlg = false;

    this.beforeChangeSlider = this.beforeChangeSlider.bind(this);
    this.afterChangeSlider = this.afterChangeSlider.bind(this);
  }

  componentDidMount() {
    //get related videos
    getRelatedVideo(this.props.videoId, 24).then(json => this.setState({ relatedVideoList: json }));
  }

  boxOnClick(id) {
    if (!this.sliderFlg) document.location.href = `/?videoId=${id}`;
  }

  beforeChangeSlider() {
    this.sliderFlg = true;
  }

  afterChangeSlider() {
    this.sliderFlg = false;
  }

  render() {
    var settings = {
      //infinite: true,
      // draggable: true,
      // centerMode: true,
      //fade: true,
      arrows: true,
      centerPadding: 80,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 5,
      initialSlide: 0,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      beforeChange: this.beforeChangeSlider,
      afterChange: this.afterChangeSlider
      // responsive: [
      //   {
      //     breakpoint: 1880,
      //     settings: {
      //       dots: false,
      //       swipeToShow: 4,
      //       centerPadding: 0
      //     },
      //     breakpoint: 1450,
      //     settings: {
      //       dots: false,
      //       swipeToShow: 4,
      //       centerPadding: -50
      //     }
      //   }
      // ]
    };

    return (
      <div className={css(styles.sliderBox)}>
        <Slider {...settings}>
          {this.state.relatedVideoList &&
            this.state.relatedVideoList.items.map((item, i) => {
              return (
                <div key={i} className={css(styles.box)} onClick={this.boxOnClick.bind(this, item.id.videoId)}>
                  <img
                    src={item.snippet.thumbnails.medium.url}
                    className={css(styles.image)}
                    href={`/?videoId=${item.id.videoId}`}
                  />
                  <div className={css(styles.titleBox)}>
                    <p className={css(styles.title)} href={`/?videoId=${item.id.videoId}`}>
                      {item.snippet.title}
                    </p>
                  </div>
                </div>
              );
            })}
        </Slider>
      </div>
    );
  }
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={css(styles.arrowBox, styles.arrowPrev)} style={{ ...style, display: 'block' }} onClick={onClick}>
      <img src="/img/arrow-prev.png" className={css(styles.arrowImg)} />
    </div>
  );
}

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={css(styles.arrowBox, styles.arrowNext)} style={{ ...style, display: 'block' }} onClick={onClick}>
      <img src="/img/arrow-next.png" className={css(styles.arrowImg)} />
    </div>
  );
}

const styles = StyleSheet.create({
  box: {
    textAlign: 'left',
    cursor: 'pointer',
    marginLeft: 10,
    ':focus': {
      outline: 'none'
    }
  },
  image: {
    width: 145
  },
  titleBox: {
    width: 145,
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
    left: -15,
    zIndex: 100
  },
  arrowImg: {
    width: 20
  }
});
