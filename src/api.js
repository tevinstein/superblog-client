//@flow

export default {
  getArticles,
  getArticle,
  addArticle,
  editArticle,
  deleteArticle,
  getUsers,
  getUser,
  registerUser,
};

const USER_URL = 'http://localhost:8000/api/users';
const ARTICLE_URL = 'http://localhost:8000/api/articles';

function getArticles() {
  return fetch(ARTICLE_URL).then((res) => res.json());
}

function getArticle(articleID) {
  return fetch(`${ARTICLE_URL}/${articleID}`).then((res) => res.json());
}

function addArticle(article) {
  return fetch(`${ARTICLE_URL}/add`, {
    method: 'post',
    body: JSON.stringify(article),
  }).then((res) => res.json());
}

function editArticle(id, article) {
  return fetch(`${ARTICLE_URL}/${id}/edit`, {
    method: 'post',
    body: JSON.stringify(article),
  }).then((res) => res.json());
}

function deleteArticle(id) {
  return fetch(`${ARTICLE_URL}/${id}/delete`).then((res) => res.json());
}

function getUsers() {
  return fetch(USER_URL).then((res) => res.json());
}

function getUser(userID) {
  return fetch(`${USER_URL}/${userID}`).then((res) => res.json());
}

function registerUser(user) {
  return fetch(`${USER_URL}/add`, {
    method: 'post',
    body: JSON.stringify(user),
  }).then((res) => res.json());
}
