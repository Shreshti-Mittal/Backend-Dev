const http=require('http');
const fs = require("fs");
const url = require("url");
const myServer = http.createServer((req, res) => {
  if (req.url === "/favicon.ico") return res.end();
  const log = `${Date.now()}: ${req.method}  ${req.url} New Req Received\n`;
  const myUrl = url.parse(req.url, true);
  fs.appendFile("log.txt", log, (err, data) => {
    switch (myUrl.pathname) {
      case "/":
        if (req.method === "GET") res.end("Home Page");
        break;
      case "/about":
        const username = myUrl.query.myname;
        res.end(`Hi, ${username}`);
        break;
      case "/search":
        const search = myUrl.query.search_query;
        res.end("Here are your results for " + search);
      case "/signup":
        if (req.method === "GET") res.end("This is a signup form");
        else if (req.method === "POST") {
          // DB Query
          res.end("Success");
        }
        break;
      case "/api/users":
        // Handle user creation
        if (req.method === "POST") {
          res.end("User Created");
        }
        break;
      case "/api/users/update":
        // Using PUT - Replace entire user resource
        if (req.method === "PUT") {
          const userId = myUrl.query.user_id;
          res.end(`User ${userId} updated completely with PUT method`);
        }
        // Using PATCH - Partial update
        else if (req.method === "PATCH") {
          const userId = myUrl.query.user_id;
          res.end(`User ${userId} partially updated with PATCH method`);
        }
        break;
      case "/api/users/delete":
        // Delete a user by ID
        if (req.method === "DELETE") {
          const userId = myUrl.query.user_id;
          res.end(`User ${userId} has been deleted`);
        }
        break;
      default:
        res.end("404 Not Found");
    }
  });
});
myServer.listen(8000, () => console.log("Server Started"));
//put patch delete make user id use put or patch than delete a user id