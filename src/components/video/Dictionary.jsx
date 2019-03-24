import React, { Component } from 'react';
import Draggable from 'react-draggable';
import { StyleSheet, css } from 'aphrodite';
import shouldPureComponentUpdate from 'react-pure-render/function';
import windowSize from 'react-window-size';
import { getSearchWordsArray } from '../../util/dictionaryUtil';

class Dictionary extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
    this.state = {
      searchResult: []
    };
  }
  dictionary = [];

  componentWillMount() {
    //TODO: 英英辞書を作成する
    new Promise((resolve, reject) => {
      const url = `/data/dictionary.json`;
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.responseType = 'json';
      xhr.onload = () => {
        return resolve(xhr.response);
      };
      xhr.send('');
    }).then(res => {
      this.dictionary = res;
    });
  }

  render() {
    const { windowWidth, searchWord, textClear } = this.props;
    const searchResult = getSearchWordsArray(searchWord, this.dictionary);

    return (
      <div>
        {searchWord && (
          <div className={css(styles.parentBox)} onClick={textClear}>
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
        )}
      </div>
    );
  }
}
export default windowSize(Dictionary);

const styles = StyleSheet.create({
  parentBox: {
    position: 'relative',
    width: '100%'
  },
  box: {
    position: 'absolute',
    zIndex: 1000,
    backgroundColor: '#fff',
    border: '1px solid #999',
    display: 'inline-block',
    opacity: '0.95',
    overflow: 'hidden',
    textAline: 'left',
    '@media (min-width: 1050px)': {
      top: 5,
      left: 5,
      width: 'calc(100% - 10px)',
      height: '33vh'
    },
    '@media (max-width: 1050px)': {
      top: 'calc(3vw * 9 / 16)',
      left: '3vw',
      width: '94vw',
      height: 'calc(94vw * 9 / 16)',
      fontSize: 14
    }
  },
  searchBox: {
    textAlign: 'left'
  },
  searchWord: {
    fontWeight: 'bold',
    color: 'blue'
  }
});
