//@flow

import React, {Component, PropTypes} from 'react';
import autobind from 'class-autobind';

import api from '../api';

import View from '../components/coreUI/View';
import Header from '../components/Header';
import LeftDrawer from '../components/LeftDrawer';

import {deepOrange50} from 'material-ui/styles/colors';
import Home from 'material-ui/svg-icons/action/home';
import ViewList from 'material-ui/svg-icons/action/view-list';
import {deepOrangeA700} from 'material-ui/styles/colors';

export default class UserApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
    autobind(this);
  }
  componentDidMount() {
    this._getUser();
  }
  _getUser() {
    api.getUsers()
      .then((res) => {
        for (let user of res.data) {
          if (user.name === this.props.params.username) {
            this.setState({
              user: user,
            });
          }
        }
        if (this.state.user === {}) {
          this.context.router.push('/');
        }
      });
  }
  render() {
    let {avatar, name} = this.state.user;
    let styles = {
      header: {
        paddingLeft: 236,
        backgroundColor: deepOrangeA700,
      },
      container: {
        margin: '100px 40px 20px 40px',
        paddingLeft: 236,
      },
    };
    const MENUS = [
      {text: 'Home', icon: <Home color={deepOrange50}/>, link: `/profile/${name}`},
      {text: 'My Articles', icon: <ViewList color={deepOrange50}/>, link: `/profile/${name}/articles`},
    ];
    return (
      <View>
        <Header styles={styles.header}/>
        <LeftDrawer grettings={`Hello, ${name}!`} avatar={avatar} menus={MENUS} logo={true}/>
        <View style={styles.container}>
          {this.props.children}
        </View>
      </View>
    );
  }
}

UserApp.contextTypes = {
  router: PropTypes.object.isRequired,
};
