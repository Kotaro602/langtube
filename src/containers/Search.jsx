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

import List from '../components/List';

class Search extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
    this.state = {
      result: []
    };
  }

  componentDidMount() {
    const q = queryString.parse(this.props.location.search).q;
    getSearchResult(q, 50).then(json => this.setState({ result: json.items }));
  }

  componentWillReceiveProps(nextProps) {
    const q = queryString.parse(nextProps.location.search).q;
    getSearchResult(q, 50).then(json => this.setState({ result: json.items }));
  }

  render() {
    return <List result={this.state.result} />;
  }
}

//TODO: componentを使ってみる
export default withRoot(withWidth()(Search));
