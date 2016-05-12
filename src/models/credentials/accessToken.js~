var AccessTokensModel, AccessTokensSchema, Schema, mongoose;

mongoose = require("mongoose");

Schema = mongoose.Schema;

AccessTokensSchema = new Schema({
  accessToken: {
    type: String,
    required: true,
    unique: true
  },
  clientId: String,
  userId: {
    type: String,
    required: true
  },
  expires: Date
});

module.exports.getAccessToken = function(bearerToken, cb) {
  return AccessTokensModel.findOne({
    accessToken: bearerToken
  }, cb);
};

module.exports.saveAccessToken = function(token, clientId, expires, userId, cb) {
  var fields;
  if (userId.id != null) {
    userId = userId.id;
  }
  fields = {
    clientId: clientId,
    userId: userId,
    expires: expires
  };
  return AccessTokensModel.update({
    accessToken: token
  }, fields, {
    upsert: true
  }, function(err) {
    if (err) {
      console.error(err);
    }
    return cb(err);
  });
};

mongoose.model("accessTokens", AccessTokensSchema);

AccessTokensModel = mongoose.model("accessTokens");

