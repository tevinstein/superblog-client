//@flow

import React, {Component} from 'react';
import autobind from 'class-autobind';
import moment from 'moment';

import api from '../api';

import View from '../components/coreUI/View';

import PageBase from '../components/PageBase';
import {typography} from 'material-ui/styles';

export default class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: {},
      user: {},
    };
    autobind(this);
  }
  componentWillMount() {
    this._getArticle();
  }
  _getArticle() {
    api.getArticles()
    .then((res) => {
      for (let article of res.data) {
        if (article.title === this.props.params.article) {
          this.setState({
            article: article,
          });
          this._getUser(article.author);
        }
      }
    });
  }
  _getUser(userID) {
    api.getUser(userID)
    .then((res) => {
      this.setState({
        user: res.data,
      });
    });
  }
  render() {
    let {article, user} = this.state;
    let {name} = user;
    let {title, image, content, date_created} = article;
    let styles = {
      image: {
        maxWidth: '100%',
        marginTop: 10,
        marginBottom: 20,
      },
      content: {
        fontSize: 19,
        fontWeight: typography.fontWeightLight,
        whiteSpace: 'pre-line',
        lineHeight: '180%',
      },
    };
    return (
      <View className="row">
        <PageBase title={title}
          navigation={`Posted by: @${name} | ${moment(date_created).fromNow()}`}
          className="col-xs-12 col-sm-8 col-sm-offset-2">
          <View style={styles.image}>
            <View>
              <img style={styles.image} src={image} alt={title}/>
            </View>
            <span style={styles.content}>
              {content}
            </span>
          </View>
        </PageBase>
      </View>
    );
  }
}
