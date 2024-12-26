const fs = require("fs");
const path = require("path");
const http = require("http");

const booksFilePath = path.join(__dirname, "db", "books.json");
const authorsFilePath = path.join(__dirname, "db", "authors.json");
const logFilePath = path.join(__dirname, "logs", "activity.log");
const readDataFromFile = (filePath) => {
  if (!fs.existsSync(filePath)) {
    return []; // Nếu file không tồn tại, trả về mảng rỗng
  }
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data || "[]");
};

const writeDataToFile = (data, filePath) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

const logActivity = (message) =>
  fs.appendFileSync(logFilePath, `[${new Date().toISOString()}] ${message}\n`);

const server = http.createServer((req, res) => {
  const { method, url } = req;
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });
  req.on("end", () => {
    if (url.startsWith("/authors")) {
      const authors = readDataFromFile(authorsFilePath);
      if (method === "GET") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(authors));
      }
      if (method === "POST") {
        const newAuthor = JSON.parse(body);
        newAuthor.id = authors.length ? authors[authors.length - 1].id + 1 : 1;
        authors.push(newAuthor);
        writeDataToFile(authors, authorsFilePath);
        logActivity(`New author created: ${newAuthor.name}`);
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(newAuthor));
      }
      if (method === "PUT") {
        const authorId = parseInt(url.split("/")[2]);
        const updatedAuthor = JSON.parse(body);
        const index = authors.findIndex((author) => author.id === authorId);

        if (index !== -1) {
          authors[index] = { ...authors[index], ...updatedAuthor };
          writeDataToFile(authors, authorsFilePath);
          logActivity(`Author updated: ${updatedAuthor.name}`);
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(authors[index]));
        } else {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Author not found" }));
        }
      }
      if (method === "DELETE") {
        const authorId = parseInt(url.split("/")[2]);
        const updatedAuthors = authors.filter(
          (author) => author.id !== authorId
        );

        if (updatedAuthors.lenght !== authors.length) {
          writeDataToFile(updatedAuthors, authorsFilePath);
          logActivity(`Author deleted: ${authorId}`);
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Author deleted" }));
        } else {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Author not found" }));
        }
      }
    } else if (url.startsWith("/books")) {
      const books = readDataFromFile(booksFilePath);
      const authors = readDataFromFile(authorsFilePath);
      if (method === "GET") {
        const booksWithAuthors = books.map((book) => ({
          ...book,
          authors: authors.find((author) => author.id === book.authorId) || null,
        }));
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(booksWithAuthors));
      }
      if (method === "POST") {
        const newBook = JSON.parse(body);
        newBook.id = books.length ? books[books.length - 1].id + 1 : 1;
        books.push(newBook);
        writeDataToFile(books, booksFilePath);
        logActivity(`New book created: ${newBook.title}`);
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(newBook));
      }
      if (method === "PUT") {
        const bookID = parseInt(url.split("/")[2]);
        const updatedBook = JSON.parse(body);
        const index = books.findIndex((book) => book.id === bookID);

        if (index !== -1) {
          books[index] = { ...books[index], ...updatedBook };
          writeDataToFile(books, booksFilePath);
          logActivity(`Book updated: ${updatedBook.title}`);
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(books[index]));
        } else {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Book not found" }));
        }
      }
      if (method === "DELETE") {
        const bookID = parseInt(url.split("/")[2]);
        const updatedBooks = books.filter((book) => book.id !== bookID);
        if (updatedBooks.length !== books.length) {
          writeDataToFile(updatedBooks, booksFilePath);
          logActivity(`Book deleted: ${bookID}`);
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Book deleted" }));
        } else {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Book not found" }));
        }
      }
    } else if (url.startsWith("/search")) {
      const books = readDataFromFile(booksFilePath);
      const authors = readDataFromFile(authorsFilePath);
      const query = new URLSearchParams(url.split("?")[1]);
      const keyword = query.get("q")?.toLowerCase();

      const result = books.filter(
        (book) =>
          book.title.toLowerCase().includes(keyword) ||
          authors
            .find((author) => author.id === book.authorId)
            ?.name.toLowerCase()
            .includes(keyword)
      );
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(result));
    }
  });
});
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
