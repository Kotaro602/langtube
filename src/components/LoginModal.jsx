import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import shouldPureComponentUpdate from 'react-pure-render/function';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

class LoginModal extends React.Component {
  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
  }

  test = () => {
    console.log('after login');
  };

  // componentDidUpdate() {
  //   if (this.props.gapi) {
  //     this.props.gapi.signin2.render('google-signin-button', {
  //       theme: 'dark',
  //       longtitle: true,
  //       onsuccess: this.test,
  //       onfailure: console.error('sometging')
  //     });
  //   }
  // }

  render() {
    const { modalOpen, modalClose, gapi, ...other } = this.props;

    if (this.props.gapi) {
      this.props.gapi.signin2.render('google-signin-button', {
        theme: 'dark',
        longtitle: true,
        onsuccess: console.log('success'),
        onfailure: console.log('error')
      });
    }
    return (
      <Dialog onClose={modalClose} open={this.props.open}>
        <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
        <div id="google-signin-button" />
      </Dialog>
    );
  }
}

export default LoginModal;
