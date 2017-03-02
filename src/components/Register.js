//@flow

import React, {Component} from 'react';
import autobind from 'class-autobind';
import {Link} from 'react-router';

import api from '../api';

import View from '../components/coreUI/View';

import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      avatar: '',
      openSnackbar: false,
    };
    autobind(this);
  }
  _addUser(event) {
    event.preventDefault();
    let {name, email, password, avatar} = this.state;
    let newUser = {name, email, password, avatar};
    this.setState({
      name: '',
      email: '',
      password: '',
      avatar: '',
    });
    if (newUser.name !== '' && newUser.email !== '' && newUser.password !== '' && newUser.avatar !== '') {
      api.registerUser(newUser)
      .then((res) => {
        this.setState({
          openSnackbar: true,
        });
        this.props.handleChange('login');
      });
    }
  }
  _onNameChange(event) {
    this.setState({
      name: event.target.value,
    });
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
  _onAvatarChange(event) {
    this.setState({
      avatar: event.target.value,
    });
  }
  _onCloseSnackbar() {
    this.setState({
      openSnackbar: false,
    });
  }
  render() {
    let {styles} = this.props;
    let {name, email, password, avatar, openSnackbar} = this.state;
    return (
      <View style={styles.tabContent}>
        <h3 style={styles.headline}>You really should! It's free! 😌</h3>
        <form>
          <TextField
            hintText="Name"
            floatingLabelText="Name"
            fullWidth={true}
            onChange={this._onNameChange}
            value={name}
          />
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
            type="password"
            fullWidth={true}
            onChange={this._onPasswordChange}
            value={password}
          />
          <TextField
            hintText="Avatar"
            floatingLabelText="Avatar"
            fullWidth={true}
            onChange={this._onAvatarChange}
            value={avatar}
          />
          <div style={styles.buttons}>
            <Link to="/">
            <RaisedButton label="Cancel"/>
          </Link>
          <RaisedButton label="Sign Up"
            style={styles.saveButton}
            type="submit"
            onClick={this._addUser}
            primary={true}/>
            <Snackbar
              open={openSnackbar}
              message="You are now registered! Login to start posting blogs!"
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
