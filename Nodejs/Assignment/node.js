const http = require("http");
const fs = require("fs");

const myServer = http.createServer((req, res) => {
  const timestamp = new Date().toLocaleString();
  let pageContent = "";
  
  //  switch case
  switch (req.url) {
    case "/":
      pageContent = "Home page";
      break;
    case "/about":
      pageContent = "About page";
      break;
    case "/contact":
      pageContent = "Contact page";
      break;
    default:
      pageContent = "404 page Not Found";
      break;
  }
  
  const log = `${timestamp}: ${req.url} -> ${pageContent}\n`;
  fs.appendFile("log.txt", log, (err) => {
    if (err) console.error(err);
  });
  
  res.end(pageContent);
});

myServer.listen(8000, () => console.log("Server Started"));
//to render home about contact page in log.txt file with timestamp
//we can hid the api and see the data of the page from this trick
//from server we me