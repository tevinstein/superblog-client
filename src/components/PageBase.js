//@flow

import React, {Component} from 'react';
import autobind from 'class-autobind';

import View from '../components/coreUI/View';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import {typography} from 'material-ui/styles';
import {grey600} from 'material-ui/styles/colors';

export default class PageBase extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    autobind(this);
  }
  render() {
    let {title, navigation, ...otherProps} = this.props;
    let styles = {
      navigation: {
        fontSize: 15,
        fontWeight: typography.fontWeightLight,
        color: grey600,
        paddingBottom: 15,
        display: 'block',
      },
      title: {
        fontSize: 38,
        fontWeight: typography.fontWeightLight,
        marginBottom: 20,
      },
      paper: {
        padding: '50px 50px 20px 50px',
        marginBottom: 40,
      },
      clear: {
        clear: 'both',
      },
    };
    return (
      <View {...otherProps}>
        <span style={styles.navigation}>{navigation}</span>
        <Paper style={styles.paper}>
          <h3 style={styles.title}>{title}</h3>
          <Divider/>
          {this.props.children}
          <View style={styles.clear}/>
        </Paper>
      </View>
    );
  }
}
