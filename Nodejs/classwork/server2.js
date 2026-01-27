const http = require("http");
const fs = require("fs");

let students = [
  { id: 1, name: "Amit", branch: "CSE" },
  { id: 2, name: "Neha", branch: "IT" }
];

function logRequest(req, message) {
  const log = `${new Date().toISOString()} | ${req.method} | ${req.url} | ${message}\n`;
  fs.appendFile("log.txt", log, () => {});
}

const server = http.createServer((req, res) => {
  const urlParts = req.url.split("/");


  if (req.method === "GET" && req.url === "/students") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(students));
    logRequest(req, "Returned all students");
  }


  else if (req.method === "GET" && urlParts[1] === "students" && urlParts[2]) {
    const id = parseInt(urlParts[2]);
    const student = students.find(s => s.id === id);

    if (student) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(student));
      logRequest(req, "Returned single student");
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Student not found" }));
      logRequest(req, "Student not found");
    }
  }


  else if (req.method === "POST" && req.url === "/students") {
    let body = "";

    req.on("data", chunk => {
      body += chunk;
    });

    req.on("end", () => {
      const newStudent = JSON.parse(body);
      newStudent.id = students.length + 1;
      students.push(newStudent);

      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(newStudent));
      logRequest(req, "Added new student");
    });
  }

  else if (req.method === "DELETE" && urlParts[1] === "students" && urlParts[2]) {
    const id = parseInt(urlParts[2]);
    const index = students.findIndex(s => s.id === id);

    if (index !== -1) {
      students.splice(index, 1);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Student deleted" }));
      logRequest(req, "Deleted student");
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Student not found" }));
      logRequest(req, "Delete failed");
    }
  }


  else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
    logRequest(req, "Invalid route");
  }
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
