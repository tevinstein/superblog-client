//@flow

import React, {Component} from 'react';
import autobind from 'class-autobind';

import api from '../api';

import View from '../components/coreUI/View';
import ArticleCard from '../components/ArticleCard';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
    };
    autobind(this);
  }
  componentDidMount() {
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
  render() {
    let {articles} = this.state;
    let loadArticles = articles.map((article) => {
      let link = (this.props.params.username) ? `/profile/${this.props.params.username}/articles/${article.title}` : `/articles/${article.title}`;
      return <ArticleCard key={article.id} actions={false} link={link} article={article} className="col-xs-12 col-sm-6"/>;
    });
    return (
      <View>
        <View className="row">
          {loadArticles}
        </View>
      </View>
    );
  }
}
