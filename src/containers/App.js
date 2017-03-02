//@flow

import React, {Component} from 'react';
import autobind from 'class-autobind';

import View from '../components/coreUI/View';

import {deepOrange50} from 'material-ui/styles/colors';
import LeftDrawer from '../components/LeftDrawer';
import Home from 'material-ui/svg-icons/action/home';
import ExitToApp from 'material-ui/svg-icons/action/exit-to-app';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    autobind(this);
  }
  render() {
    let styles = {
      container: {
        margin: '40px 40px 20px 40px',
        paddingLeft: 236,
      },
    };
    const MENUS = [
      {text: 'Home', icon: <Home color={deepOrange50}/>, link: '/'},
      {text: 'Register/Log In', icon: <ExitToApp color={deepOrange50}/>, link: '/registration'},
    ];
    return (
      <View>
        <LeftDrawer grettings="Hello, Guest!" avatar={'http://i.imgur.com/fXfViCH.jpg'} menus={MENUS} logo={false}/>
        <View style={styles.container}>
          {this.props.children}
        </View>
      </View>
    );
  }
}
