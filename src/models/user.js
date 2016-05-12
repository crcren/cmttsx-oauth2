var Schema, UsersModel, UsersSchema, mongoose, sha1;

mongoose = require("mongoose");

sha1 = require("sha1");

Schema = mongoose.Schema;

UsersSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  authorizations: [
    {
      app: String,
      scopes: String
    }
  ]
});

UsersSchema["static"]("register", function(fields, cb) {
  var user;
  user = new UsersModel(fields);
  return user.save(cb);
});

UsersSchema["static"]("getUser", function(username, password, cb) {
  return UsersModel.authenticate(username, password, function(err, user) {
    if (err || !user) {
      return cb(err);
    }
    return cb(null, user.username);
  });
});

UsersSchema["static"]("authenticate", function(username, password, cb) {
  return UsersModel.findByName(username, function(err, user) {
    var authenticatedUser, passwordOk;
    if (err || !user) {
      return cb(err);
    }
    passwordOk = sha1(password) === user.password;
    authenticatedUser = passwordOk ? user : null;
    return cb(null, authenticatedUser);
  });
});

UsersSchema["static"]("findByName", function(username, cb) {
  return this.findOne({
    username: username
  }, cb);
});

mongoose.model("users", UsersSchema);

UsersModel = mongoose.model("users");

module.exports = UsersModel;

