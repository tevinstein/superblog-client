//@flow

import React, {Component} from 'react';
import autobind from 'class-autobind';

import api from '../api';

import View from '../components/coreUI/View';
import ManageArticle from '../components/ManageArticle';

import {redA700} from 'material-ui/styles/colors';
import ArticleCard from '../components/ArticleCard';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

export default class UserArticles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      articles: [],
      openDialog: false,
    };
    autobind(this);
  }
  componentDidMount() {
    this._getUser();
    this._getArticles();
  }
  _getArticles() {
    api.getArticles()
    .then((res) => {
      this.setState({
        articles: res.data,
      });
    });
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
    });
  }
  _handleOpenDialog() {
    this.setState({
      openDialog: true,
    });
  }
  _handleCloseDialog() {
    this.setState({
      openDialog: false,
    });
  }
  render() {
    let styles = {
      floatingActionButton: {
        margin: 0,
        top: 'auto',
        right: 40,
        bottom: 40,
        left: 'auto',
        position: 'fixed',
      },
      icon: {
        width: '60px',
        height: '60px',
      }
    };
    let {articles, user} = this.state;
    let loadArticles = articles.map((article) => {
      if (article.author === user.id) {
        let {username} = this.props.params;
        let {title, id} = article;
        let link = `/profile/${username}/articles/${title}`;
        return (
          <ArticleCard key={id} getArticles={this._getArticles} actions={true} link={link} article={article} className="col-xs-12 col-md-8 col-sm-offset-2"/>
        );
      }
    });
    return (
      <View>
        <FloatingActionButton
          style={styles.floatingActionButton}
          backgroundColor={redA700}
          onTouchTap={this._handleOpenDialog}
          iconStyle={styles.icon}>
          <ContentAdd />
        </FloatingActionButton>
        <ManageArticle openDialog={this.state.openDialog} author={user.id} type={"add"} handleCloseDialog={this._handleCloseDialog} getArticles={this._getArticles}/>
        <View className="row">
          {loadArticles}
        </View>
      </View>
    );
  }
}
