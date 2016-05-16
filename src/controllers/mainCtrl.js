//var User, _;
//User = require("../models").User;
//_ = require("lodash");

module.exports = function(app) {
   app.all('/oauth/token', app.oauth.grant());
   return app.get('/', app.oauth.authorise(), function (req, res) {
      return res.send('恭喜，您现在可访问受限资源!');
   });
};


