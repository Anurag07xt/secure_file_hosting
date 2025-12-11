// frontend/utils.js

const API_BASE = 'http://localhost:4000/api';

function saveAuth(token, username, userId) {
  localStorage.setItem('token', token);
  localStorage.setItem('username', username);
  localStorage.setItem('userId', userId);
}

function getAuth() {
  return {
    token: localStorage.getItem('token'),
    username: localStorage.getItem('username'),
    userId: localStorage.getItem('userId')
  };
}

function clearAuth() {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  localStorage.removeItem('userId');
}

export { API_BASE, saveAuth, getAuth, clearAuth };
