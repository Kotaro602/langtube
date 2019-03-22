import React, { Component } from 'react';
import Draggable from 'react-draggable';
import { StyleSheet, css } from 'aphrodite';
import shouldPureComponentUpdate from 'react-pure-render/function';

import { getSearchWordsArray } from '../../util/dictionaryUtil';

export default class Dictionary extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
    this.state = {
      searchResult: []
    };
  }
  dictionary = [];

  componentWillMount() {
    new Promise((resolve, reject) => {
      const url = `/data/dictionary.json`;
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.responseType = 'json';
      xhr.onload = () => {
        return resolve(xhr.response);
      };
      xhr.send('');
    })
      .then(res => {
        this.dictionary = res;
      })
      .catch(error => {
        // TODO: エラーハンドリング
      });
  }

  render() {
    const { searchWord } = this.props;
    const searchResult = getSearchWordsArray(searchWord, this.dictionary);

    return (
      <div>
        {searchWord && (
          <Draggable
            handle=".handle"
            position={{ x: 10, y: -140 }}
            onStart={this.handleStart}
            onDrag={this.handleDrag}
            onStop={this.handleStop}>
            <div className="handle" style={{ zIndex: 1000, position: 'absolute' }}>
              <div className={css(styles.box)}>
                {searchResult &&
                  searchResult.map((result, i) => {
                    return (
                      <div key={i} className={css(styles.searchBox)}>
                        <span className={css(styles.searchWord)}>{result.t}</span>
                        <span>{result.m}</span>
                      </div>
                    );
                  })}
              </div>
            </div>
          </Draggable>
        )}
      </div>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#fff',
    border: '1px solid #999',
    width: '400px',
    height: '300px',
    display: 'inline-block',
    cursor: 'move',
    opacity: '0.95',
    overflow: 'hidden',
    resize: 'both',
    textAline: 'left'
  },
  searchBox: {
    textAlign: 'left'
  },
  searchWord: {
    fontWeight: 'bold',
    color: 'blue'
  }
});
