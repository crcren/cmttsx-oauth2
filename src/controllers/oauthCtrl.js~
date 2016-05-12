var App, User, _;

User = require("../models").User;
App = require("../models").App;
_ = require("lodash");
Sha1 = require("sha1");

module.exports = function(app) {
  var authCodeMiddleware, authCodeValidate;
  authCodeValidate = function(req, res, next, cb) {
    if (cb == null) {
      cb = function() {};
    }
    //接收变量
    var user = req.body.username;
    var password = req.body.password;
    var client_id = req.query.client_id;
    var redirect_uri = req.query.redirect_uri;
    var response_type = req.query.response_type;
    //判断变量是否都有效
    if (!user) {
      return res.redirect("/oauth/authorise?response_type=" + req.query.response_type + "&client_id=" + client_id + "&redirect_uri=" + redirect_uri);
    }
    if (!password) {
      return res.redirect("/oauth/authorise?response_type=" + req.query.response_type + "&client_id=" + client_id + "&redirect_uri=" + redirect_uri);
    }
    if (response_type !== "code") {
      unauthorized(res, "The response_type must by 'code'.");
    }
    if (client_id == null) {
      return unauthorized(res, "A client_id is required.");
    }
    if (redirect_uri == null) {
      return unauthorized(res, "A redirect_uri is required.");
    }

   //判断客户端是否有效
    return App.findOne({
      clientId: client_id
    }, function(err, app) {
      if (err) {
        return unauthorized(res, "The app doesn't exist.");
      }
      if (redirect_uri !== app.redirectUri) {
        return unauthorized(res, "The redirect_uri is invalid.");
      }
      return User.findOne({
        username: user,
        password: Sha1(password)
      }, function(err, user) {
        if (err || !user) {
          return unauthorized(res, "account error");
        }
        console.log("user"+user);
        req.body.allow = "yes";
        return next();
      });
    });
  };


  authCodeMiddleware = function() {
    return app.oauth.authCodeGrant(function(req, next) {
      return next(null, req.body.allow === "yes", req.body.username);
    });
  };

  app.all("/oauth/token", app.oauth.grant());

  app.get("/oauth/authorise", (function(req, res, next) {
    client_id = req.query.client_id;
    redirect_uri = req.query.redirect_uri;
    if (req.query.response_type !== "code") {
      unauthorized(res, "请求格式必须是'code'。");
    }
    if (client_id == null) {
      return unauthorized(res, "client_id未找到.");
    }
    if (redirect_uri == null) {
      return unauthorized(res, "redirect_uri未找到.");
    }
    //比对请求客户端信息。
    return App.findOne({
      clientId: client_id
    }, function(err, app) {
      if (err) {
        return unauthorized(res, "对不起，该app未注册.");
      }
      if (redirect_uri !== app.redirectUri) {
        return unauthorized(res, "错误的redirect_uri.");
      }
      return res.send('<html>第三方应用请求获得您的认证，是否同意授权？ <form method="post"><input type="text" placeholder="username" name="username"><input type="password" placeholder="password" name="password"><button type="submit">登录</button></form>');
    });
  }));



  return app.post("/oauth/authorise", (function(req, res, next) {
    return authCodeValidate(req, res, next, function(arg) {
      var app, user;
      user = arg.user, app = arg.app;
      user.authorizations.push({
        app: app.clientId,
        scopes: app.scopes
      });
      user.save();
      return next();
    });
  }), authCodeMiddleware());
};


