global.unauthorized = function(res, message) {
  res.writeHead(401);
  return res.end(message);
};

module.exports = function(app) {
  require("./controllers/oauthCtrl")(app);
  return require("./controllers/mainCtrl")(app);
};
