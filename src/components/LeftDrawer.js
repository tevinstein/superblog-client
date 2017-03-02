//@flow

import React, {Component} from 'react';
import autobind from 'class-autobind';

import View from '../components/coreUI/View';
import Drawer from 'material-ui/Drawer';
import {spacing, typography} from 'material-ui/styles';
import {white, deepOrangeA700} from 'material-ui/styles/colors';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';
import {Link} from 'react-router';

export default class LeftDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    autobind(this);
  }
  render() {
    let {greetings, avatar, menus, logo} = this.props;
    let styles = {
      logo: {
        cursor: 'pointer',
        fontSize: 22,
        color: typography.textFullWhite,
        lineHeight: `${spacing.desktopKeylineIncrement}px`,
        fontWeight: typography.fontWeightLight,
        backgroundColor: deepOrangeA700,
        paddingLeft: 55,
        height: 56,
      },
      menuItem: {
        color: white,
        fontSize: 14,
      },
      avatar: {
        div: {
          padding: '15px 0 20px 20px',
          backgroundImage: 'url(http://imgur.com/mn348Cl.jpg)',
          height: 120,
          align: 'right',
        },
        icon: {
          float: 'right',
          display: 'block',
          marginRight: 15,
          boxShadow: '0px 0px 0px 8px rgba(0,0,0,0.2)',
        },
        span: {
          fontSize: 17,
          paddingTop: 105,
          display: 'block',
          color: 'white',
          fontWeight: 300,
          textShadow: '1px 1px #444',
        },
      },
    };
    let loadLogo = logo ? <View style={styles.logo}>SUPERBLOG</View> : <View></View>;
    let loadMenus = menus.map((menu, index) =>
        <MenuItem
          key={index}
          style={styles.menuItem}
          primaryText={menu.text}
          leftIcon={menu.icon}
          containerElement={<Link to={menu.link}/>}/>
    );
    return (
      <Drawer
        docked={true}
        open={true}>
        {loadLogo}
        <View style={styles.avatar.div}>
          <Avatar src={avatar}
          size={90}
          style={styles.avatar.icon}/>
          <span style={styles.avatar.span}>{greetings}</span>
        </View>
        <View>
          {loadMenus}
        </View>
      </Drawer>
    );
  }
}
