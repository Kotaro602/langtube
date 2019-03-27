import React, { Component } from 'react';
import List from '../components/List';

class History extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('historyList');
    return <List result={window.historyList} />;
  }
}
export default History;
