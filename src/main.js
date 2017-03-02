//@flow

import React from 'react';
import {render} from 'react-dom';

import {Router, hashHistory} from 'react-router';
import routes from './routes';

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ThemeDefault from './theme-default';

injectTapEventPlugin();

render(
  <MuiThemeProvider muiTheme={ThemeDefault}>
    <Router routes={routes} history={hashHistory} />
  </MuiThemeProvider>,
  document.getElementById('app')
);
