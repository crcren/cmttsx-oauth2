var app, bodyParser, express, models, oauthServer, signature;
express = require("express");
bodyParser = require("body-parser");
oauthServer = require("oauth2-server");
models = require("./models");

app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.oauth = oauthServer({
  model: models.oauth,
  grants: ["password", "authorization_code"],
  debug: true,
  accessTokenLifetime: 2678400
});

require("./routes")(app);
app.use(app.oauth.errorHandler());
app.listen(3000);
console.log("Listening at 3000...");
