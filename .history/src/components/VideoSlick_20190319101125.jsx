import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import shouldPureComponentUpdate from 'react-pure-render/function';
import withRoot from '../withRoot';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { firebaseApp } from '../../config.js';
import { getRelatedVideo } from '../api/YoutubeAPI';

class VideoSlick extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
    this.state = {
      result: []
    };
  }

  componentDidMount() {}

  render() {
    return <List result={this.state.result} />;
  }
}

//TODO: componentを使ってみる
export default withRoot(withWidth()(VideoSlick));
