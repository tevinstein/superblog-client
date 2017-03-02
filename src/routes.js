//@flow

import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './containers/App';
import UserApp from './containers/UserApp';
import Home from './containers/Home';
import UserArticles from './containers/UserArticles';
import Article from './containers/Article';
import Registration from './containers/Registration';

export default (
  <Route>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="/registration" component={Registration}/>
      <Route path="/articles/:article" component={Article}/>
    </Route>
    <Route path="/profile/:username" component={UserApp}>
      <IndexRoute component={Home}/>
      <Route path="articles" component={UserArticles}/>
      <Route path="articles/:article" component={Article}/>
    </Route>
  </Route>
);
