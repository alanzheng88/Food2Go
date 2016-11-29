var server = {
  url: "http://localhost:9000",
  getCookie: function(res) {
    var cookie = res.headers['set-cookie'][2];
    return cookie
  },
  getHeaders: function(cookie) {
    return {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Cookie": cookie
    }
  }
};

module.exports = server;
