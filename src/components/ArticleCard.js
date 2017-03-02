//@flow

import React, {Component} from 'react';
import autobind from 'class-autobind';
import {Link} from 'react-router';
import moment from 'moment';

import api from '../api';

import View from '../components/coreUI/View';
import ManageArticle from '../components/ManageArticle';

import {deepOrangeA700} from 'material-ui/styles/colors';
import {Card, CardHeader, CardMedia, CardActions, CardTitle} from 'material-ui/Card';
import {typography} from 'material-ui/styles';
import FlatButton from 'material-ui/FlatButton';

export default class ArticleCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      openDialog: false,
    };
    autobind(this);
  }
  componentDidMount() {
    this._getUser(this.props.article.author);
  }
  _getUser(userID) {
    api.getUser(userID)
    .then((res) => {
      this.setState({
        user: res.data,
      });
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
    let {article, actions, link, getArticles, ...otherProps} = this.props;
    let {user, openDialog} = this.state;
    let {id, title, image, content, date_created} = article;
    let contentPreview = content.slice(0, 100);
    let styles = {
      name: {
        fontWeight: typography.fontWeightLight,
        fontSize: 16,
      },
      card: {
        marginBottom: 20,
      },
    };
    let loadCardActions = actions ? <CardActions>
      <FlatButton
        label="Edit"
        primary={true}
        onTouchTap={this._handleOpenDialog}/>
      <FlatButton
        label="Delete"
        secondary={true}/>
      <ManageArticle openDialog={openDialog} type={"edit"} author={user.id} handleCloseDialog={this._handleCloseDialog} article={article} getArticles={this.props.getArticles}/>
    </CardActions> : '';
    return (
      <View {...otherProps}>
        <Card id={id} style={styles.card}>
          <CardHeader
            titleStyle={styles.name}
            title={`${user.name}`}
            subtitle={moment(date_created).fromNow()}
            avatar={user.avatar}/>
          <Link to={link}>
            <CardMedia overlay={<CardTitle title={title} subtitle={`${contentPreview}..`} />}>
              <img src={image} />
            </CardMedia>
          </Link>
          {loadCardActions}
        </Card>
      </View>
    );
  }
}
