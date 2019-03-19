import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import shouldPureComponentUpdate from 'react-pure-render/function';
import withRoot from '../withRoot';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { StyleSheet, css } from 'aphrodite';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { firebaseApp } from '../../config.js';
import { getRelatedVideo } from '../api/YoutubeAPI';
import { Card } from '@material-ui/core';

class VideoSlick extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
    this.state = {
      result: null
    };
  }

  componentDidMount() {
    getRelatedVideo('25', 50).then(json => this.setState({ result: json }));
  }
  beforeChangeSlider() {
    this.sliderFlg = true;
  }
  afterChangeSlider() {
    this.sliderFlg = false;
  }

  render() {
    const settings = {
      //infinite: true,
      // draggable: true,
      // centerMode: true,
      //fade: true,
      lazyLoad: true,
      arrows: true,
      centerPadding: 50,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 5,
      initialSlide: 0,
      beforeChange: this.beforeChangeSlider,
      afterChange: this.afterChangeSlider,
      responsive: [
        {
          breakpoint: 1930, //under
          settings: {
            centerPadding: 90,
            slidesToShow: 4,
            slidesToScroll: 4
          }
        },
        {
          breakpoint: 1600, //under
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
          }
        }
      ]
    };

    console.log(this.state.result);

    return (
      <Card className={css(styles.sliderBox)}>
        <div>
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

const styles = StyleSheet.create({
  sliderBox: {
    margin: '20px 25px 0px 20px'
  }
});
