var models;

models = require("./models");
Sha1 = require("sha1");

models.User.remove({}, function() {
  console.log("All users were removed.");
  return models.App.remove({}, function() {
    var exampleApp, exampleUser;
    console.log("All apps were removed.");
    exampleUser = [{
      username: "crcren",
      password: Sha1('123456'), 
      authorizations: []
    },{
      username: "cl",
      password: Sha1('123456'), 
      authorizations: []
    }];
    exampleApp = [{
      clientId: "oauth",
      clientSecret: "oauth",
      name: "oauth",
      scopes: "all",
      redirectUri: "http://localhost:3000/redirect"
    },{
      clientId: "resource",
      clientSecret: "resource",
      name: "resource",
      scopes: "all",
      redirectUri: "http://localhost:3001/redirect"
    }];
    return models.User.create(exampleUser, function() {
      console.log("User created!");
      return models.App.create(exampleApp, function() {
        console.log("App created!");
        return process.exit(0);
      });
    });
  });
});

