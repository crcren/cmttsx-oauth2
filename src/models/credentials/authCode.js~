var AuthCodesModel, AuthCodesSchema, Schema, mongoose;

mongoose = require("mongoose");

Schema = mongoose.Schema;

AuthCodesSchema = new Schema({
  authCode: {
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

module.exports.getAuthCode = function(authCode, cb) {
  return AuthCodesModel.findOne({
    authCode: authCode
  }, cb);
};

module.exports.saveAuthCode = function(code, clientId, expires, userId, cb) {
  var fields;
  fields = {
    clientId: clientId,
    userId: userId,
    expires: expires
  };
  return AuthCodesModel.update({
    authCode: code
  }, fields, {
    upsert: true
  }, function(err) {
    if (err) {
      console.error(err);
    }
    return cb(err);
  });
};

mongoose.model("authCodes", AuthCodesSchema);

AuthCodesModel = mongoose.model("authCodes");

