const fs = require("fs");
const path = require("path");
const http = require("http");

const dataFilePath = path.join(__dirname, "db.json");

const readDataFromFile = () => {
  const data = fs.readFileSync(dataFilePath, "utf8");
  return JSON.parse(data || "[]");
};
const writeDataToFile = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};
server = http.createServer((req, res) => {
  const { method, url } = req;
  let body = "";
  if (url.startsWith("/users")) {
    req.on("data", (data) => {
      body += data.toString();
    });
  }
  req.on("end", () => {
    if (method === "GET") {
      const users = readDataFromFile();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(users));
    }
    if (method === "POST") {
    }
    if (method === "PUT") {
    }
    if (method === "DELETE") {
    }
  });
});
const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
