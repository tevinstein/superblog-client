//@flow

import React, {Component} from 'react';
import autobind from 'class-autobind';

import api from '../api';

import View from '../components/coreUI/View';

import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import {typography} from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.article ? this.props.article.title : '',
      image: this.props.article ? this.props.article.image : '',
      content: this.props.article ? this.props.article.content : '',
      openSnackbar: false,
    };
    autobind(this);
  }
  _postArticle(event) {
    event.preventDefault();
    let {title, image, content} = this.state;
    let {author, type} = this.props;
    this.setState({
      title: '',
      image: '',
      content: '',
    });
    let newArticle = {title, image, content, author};
    if (type === "add") {
      if (newArticle.title !== '' && newArticle.image !== '' && newArticle.content !== '' && newArticle.author !== '') {
        api.addArticle(newArticle)
        .then((res) => {
          this.setState({
            openSnackbar: true,
          });
          this._handleCloseDialog();
          this.props.getArticles();
        });
      }
    } else if (type === "edit") {
      if (newArticle.title !== '' && newArticle.image !== '' && newArticle.content !== '' && newArticle.author !== '') {
        api.editArticle(this.props.article.id, newArticle)
        .then((res) => {
          this.setState({
            openSnackbar: true,
          });
          this._handleCloseDialog();
          this.props.getArticles();
        });
      }
    }
  }
  _onTitleChange(event) {
    this.setState({
      title: event.target.value,
    });
  }
  _onImageChange(event) {
    this.setState({
      image: event.target.value,
    });
  }
  _onContentChange(event) {
    this.setState({
      content: event.target.value,
    });
  }
  _handleCloseDialog() {
    this.props.handleCloseDialog();
  }
  _onCloseSnackbar() {
    this.setState({
      openSnackbar: false,
    });
  }
  render() {
    let {title, image, content, openSnackbar} = this.state;
    let {type} = this.props;
    let actionTitle = (type === "add") ? "Add Article" : "Edit Article";
    let styles = {
      dialog: {
        padding: '0 40px 40px 40px',
      },
      actions: {
        padding: '40px 40px 40px 0',
      },
      title: {
        padding: '40px 0 40px 40px',
        fontSize: 35,
        fontWeight: typography.fontWeightLight,
      },
    };
    let actions = [
      <RaisedButton
        label="Cancel"
        onTouchTap={this._handleCloseDialog}
      />,
      <RaisedButton
        label={actionTitle}
        primary={true}
        type="submit"
        onClick={this._postArticle}
      />,
    ];
    return (
      <View>
        <Dialog
          title={actionTitle}
          bodyStyle={styles.dialog}
          titleStyle={styles.title}
          actionsContainerStyle={styles.actions}
          actions={actions}
          modal={false}
          open={this.props.openDialog}
          autoScrollBodyContent={true}
          onRequestClose={this._handleCloseDialog}
          >
            <form>
              <TextField
                hintText="Title"
                floatingLabelText="Title"
                fullWidth={true}
                onChange={this._onTitleChange}
                value={title}
              />
              <TextField
                hintText="Image"
                floatingLabelText="Image"
                fullWidth={true}
                onChange={this._onImageChange}
                value={image}
              />
              <TextField
                hintText="Content"
                floatingLabelText="Content"
                fullWidth={true}
                multiLine={true}
                rows={6}
                onChange={this._onContentChange}
                value={content}
              />
            </form>
          </Dialog>
          <Snackbar
            open={openSnackbar}
            message="Article has been posted!"
            autoHideDuration={4000}
            onRequestClose={this._onCloseSnackbar}
          />
        </View>
    );
  }
}
