//@flow

import React, {Component} from 'react';
import autobind from 'class-autobind';

import Login from '../components/Login';
import Register from '../components/Register';
import View from '../components/coreUI/View';

import Paper from 'material-ui/Paper';
import {Tabs, Tab} from 'material-ui/Tabs';
import {typography} from 'material-ui/styles';
import {grey500} from 'material-ui/styles/colors';

export default class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'register',
    };
    autobind(this);
  }
  _handleChange(value) {
    this.setState({
      value: value,
    });
  }
  render() {
    let {value} = this.state;
    let styles = {
      headline: {
        fontSize: 30,
        marginBottom: 12,
        fontWeight: typography.fontWeightLight,
      },
      tabContent: {
        padding: 30,
      },
      clear: {
        clear: 'both',
      },
      buttons: {
        marginTop: 30,
        float: 'right',
      },
      saveButton: {
        marginLeft: 5,
      },
    };
    return (
      <View className="col-xs-12 col-sm-8 col-sm-offset-2">
        <Paper>
          <Tabs
            tabItemContainerStyle={{background: '#6e6e6e'}}
            inkBarStyle={{background: grey500}}
            value={value}
            onChange={this._handleChange}
            >
              <Tab label="Log In" value="login" >
                <Login styles={styles}/>
              </Tab>
              <Tab label="Register" value="register">
                <Register styles={styles} handleChange={this._handleChange}/>
              </Tab>
          </Tabs>
        </Paper>
      </View>
    );
  }
}
