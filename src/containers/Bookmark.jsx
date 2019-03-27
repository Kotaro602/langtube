import React, { Component } from 'react';
import List from '../components/List';

class Bookmark extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(window.bookmarkList);
    return <List result={window.bookmarkList} />;
  }
}
export default Bookmark;
