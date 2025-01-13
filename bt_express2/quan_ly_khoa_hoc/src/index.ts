// Bài tập 2: API quản lý khóa học với validation, gửi thông báo và tìm kiếm nâng cao
// Yêu Cầu:
// Tạo một API quản lý khóa học với các route:
// GET /courses: Lấy danh sách khóa học với khả năng tìm kiếm (theo tên khóa học) và phân trang.
// Ví dụ: GET /courses?search=JavaScript&limit=10&page=1.
// POST /courses: Thêm khóa học mới (tên khóa học, mô tả, giảng viên, thời gian bắt đầu, thời gian kết thúc).
// PUT /courses/:id: Cập nhật thông tin khóa học dựa trên ID.
// DELETE /courses/:id: Xóa khóa học theo ID.
// Trong route POST, thực hiện các bước sau:
// Kiểm tra tính hợp lệ của dữ liệu đầu vào (sử dụng express-validator).
// Gửi thông báo qua email đến giảng viên thông báo khóa học mới được thêm vào.
// Gợi ý:
// Cài đặt phân trang cho route GET bằng cách sử dụng query parameters.
// Sử dụng Nodemailer để gửi thông báo email sau khi thêm sản phẩm thành công

import coursesRoutes from "./module/courses/routes/courses.route";
import express from "express";
const app = express();
app.use(express.json());
const PORT = 3000;
app.use("/api/v1/courses", coursesRoutes);
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
