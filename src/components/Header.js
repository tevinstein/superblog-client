//@flow

import React, {Component} from 'react';
import autobind from 'class-autobind';
import {Link} from 'react-router';

import View from '../components/coreUI/View';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {white} from 'material-ui/styles/colors';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    autobind(this);
  }
  render() {
    let {styles, signOutIcon} = this.props;
    let style = {
      appBar: {
        position: 'fixed',
        top: 0,
        overflow: 'hidden',
        maxHeight: 57,
      },
      iconsRightContainer: {
        marginLeft: 20,
      },
    };
    return (
      <View>
        <AppBar
          style={{...styles, ...style.appBar}}
          showMenuIconButton={false}
          iconElementRight={<View style={style.iconsRightContainer}>
            <IconMenu
              color={white}
              iconButtonElement={<IconButton><MoreVertIcon color={white}/></IconButton>}
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
              >
                <MenuItem
                  primaryText="Sign out"
                  containerElement={<Link to="/"/>}/>
                </IconMenu>
              </View>}
            />
          </View>
    );
  }
}
