import express from "express";
import blogsRoutes from "./modules/blog/routes/blog.routes";
const app = express();
const port = 3000;
app.use(express.json());
app.use("/api/v1/blogs", blogsRoutes);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
