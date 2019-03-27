import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import firebase from 'firebase/app';
import moment from 'moment';
import Card from '@material-ui/core/Card';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { firebaseApp } from '../../../config';
import { registerBookmark } from '../../api/FirebaseAPI';

export default class ShowVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookmarkRegistered: false
    };
  }

  handleRegister = () => {
    const user = firebaseApp.auth().currentUser;
    if (user) {
      registerBookmark(user, this.props.videoInfo, this.state.bookmarkRegistered);
      this.setState({ bookmarkRegistered: !this.state.bookmarkRegistered });
    } else {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider);
    }
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      bookmarkRegistered:
        window.bookmarkList.findIndex(item => item.id.videoId === this.props.videoInfo.id) !== -1
    });
  }

  render() {
    const { videoInfo } = this.props;
    return (
      <div>
        {videoInfo && (
          <Card className={css(styles.videoInfoCard)}>
            <div className={css(styles.infoBox)}>
              <p className={css(styles.title)}>{videoInfo.snippet.localized.title}</p>
              <p className={css(styles.channelTitle)}>{videoInfo.snippet.channelTitle}</p>
              <p className={css(styles.statistics)}>
                <span className={css(styles.publish)}>
                  {moment(videoInfo.snippet.publishedAt).format('DD MMM YYYY')} |{' '}
                </span>
                <span className={css(styles.view)}>{videoInfo.statistics.viewCount} views</span>
              </p>
            </div>
            <div className={css(styles.iconBox)}>
<<<<<<< HEAD
              <IconButton onClick={this.handleRegister}>
                {this.state.bookmarkRegistered ? (
                  <Icon className={css(styles.bookmarkIcon)} style={{ color: 'red' }}>
                    bookmark
                  </Icon>
                ) : (
                  <Icon className={css(styles.bookmarkIcon)}>bookmark_border</Icon>
                )}
=======
              <IconButton style={{ color: 'white' }} aria-label="Delete" color="inherit" label="test">
                <Icon className={css(styles.bookmarkIcon)}>bookmark</Icon>
>>>>>>> 8d3677b6765658c76782ec3ca33309895ed7f912
              </IconButton>
              {/* <a className={css(styles.bookmarkText)}>bookmark</a> */}
              {/* <IconButton aria-label="Delete" color="inherit">
                <Icon className={css(styles.shareIcon)}>share</Icon>
              </IconButton>
              <a className={css(styles.shareText)}>share</a> */}
            </div>
          </Card>
        )}
      </div>
    );
  }
}
const styles = StyleSheet.create({
  videoInfoCard: {
    position: 'relative',
    minHeight: 100,
    '@media (min-width: 960px)': {
      margin: '6px 0px'
    }
  },
  infoBox: {
    float: 'left',
    textAlign: 'left',
    width: 'calc(100% - 82px)',
    margin: 10
  },
  title: {
    margin: 0,
    fonwWeight: 500,
    fontSize: 20,
    fontFamily: 'Retina,arial'
  },
  channelTitle: {
    fontSize: 14,
    margin: '5px 0px 3px 0px'
  },
  statistics: {
    margin: 0,
    fontSize: 12
  },
  publish: {
    fontSize: 12
  },
  view: {},
  iconBox: {
    float: 'right',
    position: 'relative',
    width: 60
  },
  bookmarkIcon: {
    fontSize: 32
  },
  bookmarkText: {
    position: 'absolute',
    fontSize: 10,
    top: 40,
    right: 10
  },
  registered: {
    color: 'red'
  },
  noRegistered: {
    color: 'white'
  },

  shareIcon: {
    fontSize: 32
  },
  shareText: {
    position: 'absolute',
    fontSize: 10,
    top: 42,
    left: 73
  }
});
