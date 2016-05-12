var AppsModel, AppsSchema, Schema, mongoose;

mongoose = require("mongoose");

Schema = mongoose.Schema;

AppsSchema = new Schema({
  clientId: {
    type: String,
    unique: true,
    required: true
  },
  clientSecret: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  scopes: {
    type: String,
    required: true
  },
  redirectUri: {
    type: String,
    required: true
  }
});

AppsSchema["static"]("getClient", function(clientId, clientSecret, cb) {
  var params;
  params = {
    clientId: clientId
  };
  if (clientSecret !== null) {
    params.clientSecret = clientSecret;
  }
  return AppsModel.findOne(params, cb);
});

AppsSchema["static"]("grantTypeAllowed", function(clientId, grantType, cb) {
  if (grantType === "password" || grantType === "authorization_code") {
    return cb(false, true);
  }
  return cb(false, false);
});

mongoose.model("apps", AppsSchema);

AppsModel = mongoose.model("apps");

module.exports = AppsModel;




