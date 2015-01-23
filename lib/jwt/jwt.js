module.exports = {

  getToken: function() {
    return window.localStorage.getItem('token');
  },

  setToken: function(token) {
    window.localStorage.setItem('token', token);
  },

  clear: function() {
    window.localStorage.setItem('token', '');
  },

  getLoginUrl: function(hostname) {
    // fixme: use buildUrl helper
    return hostname + '/signin/' + this.getToken();
  }

}