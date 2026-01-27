const http = require("http");

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (req.method === "GET") {
    switch (url.pathname) {

      case "/":
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Welcome to the Home Page");
        break;

      case "/about":
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("<h1>About Us</h1><p>This is the About page</p>");
        break;

      case "/user":
        const name = url.searchParams.get("name");
        const age = url.searchParams.get("age");

        const userData = {
          name: name,
          age: age
        };

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(userData));
        break;

      default:
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Page Not Found");
    }
  }
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
