var Request = require("request");

Request.get(
  "http://localhost:3000/api/users?format=json",
  (error, response, body) => {
    if (error) {
      return console.dir(error);
    }
  }
);