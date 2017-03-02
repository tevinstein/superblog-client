//@flow

import React, {Component, PropTypes} from 'react';
import autobind from 'class-autobind';
import {Link} from 'react-router';

import View from '../components/coreUI/View';

import api from '../api';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      openSnackbar: false,
    };
    autobind(this);
  }
  _loginUser(event) {
    event.preventDefault();
    let {email, password} = this.state;
    this.setState({
      email: '',
      password: '',
    });
    if (email !== '' && password !== '') {
      api.getUsers()
      .then((res) => {
        let found = false;
        for (let user of res.data) {
          if (user.email === email && user.password === password) {
            found = true;
            this.context.router.push(`/profile/${user.name}/articles`);
          }
        }
        if (!found) {
          this.setState({
            openSnackbar: true,
          });
        }
      });
    }
  }
  _onEmailChange(event) {
    this.setState({
      email: event.target.value,
    });
  }
  _onPasswordChange(event) {
    this.setState({
      password: event.target.value,
    });
  }
  _onCloseSnackbar() {
    this.setState({
      openSnackbar: false,
    });
  }
  render() {
    let {styles} = this.props;
    let {email, password, openSnackbar} = this.state;
    return (
      <View style={styles.tabContent}>
        <h3 style={styles.headline}>We've missed you.. big time! 🙌</h3>
        <form>
          <TextField
            hintText="Email"
            floatingLabelText="Email"
            fullWidth={true}
            onChange={this._onEmailChange}
            value={email}
          />
          <TextField
            hintText="Password"
            floatingLabelText="Password"
            fullWidth={true}
            type="password"
            onChange={this._onPasswordChange}
            value={password}
          />
          <div style={styles.buttons}>
            <Link to="/">
            <RaisedButton label="Cancel"/>
          </Link>
          <RaisedButton label="Log In"
            style={styles.saveButton}
            type="submit"
            onClick={this._loginUser}
            primary={true}/>
            <Snackbar
              open={openSnackbar}
              message="Sorry, we could not find you in our database :("
              autoHideDuration={4000}
              onRequestClose={this._onCloseSnackbar}
            />
          </div>
        </form>
        <View style={styles.clear}/>
      </View>
    );
  }
}

Login.contextTypes = {
  router: PropTypes.object.isRequired,
};
