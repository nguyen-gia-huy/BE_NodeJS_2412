import express, { Request, Response } from "express";

const app = express();

const PORT = 4000;

app.post("/api/author", (req: Request, res: Response) => {
  res.json({
    message: "lay danh sach tac gia",
  });
});
app.get("/api/author", (req: Request, res: Response) => {
  res.json({
    message: "lay danh sach tac gia",
  });
});
app.put("/api/author/:id", (req: Request, res: Response) => {
  res.json({
    message: "sua tac gia",
  });
});
app.delete("/api/author/:id", (req: Request, res: Response) => {
  res.json({
    message: "xoa tac gia",
  });
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
