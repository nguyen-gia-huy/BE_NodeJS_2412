// - Các api cần có:
// products (POST): Thêm một sản phẩm mới vào danh sách sản phẩm.
// products (GET): Liệt kê tất cả các sản phẩm hiện có.
// products/:id (PUT): Cập nhật thông tin sản phẩm dựa theo mã sản phẩm.
// products/:id (DELETE): Xóa sản phẩm khỏi danh sách dựa trên mã sản phẩm.
// products/:id (GET): Lấy thông tin sản phẩm dựa trên mã sản phẩm.
// - Lưu ý:
// Đảm bảo các phương thức kiểm tra và xử lý lỗi khi sản phẩm không tồn tại.
// Các phương thức và thuộc tính cần được định nghĩa rõ ràng, có chú thích và giải thích các tham số, giá trị trả về.
import express from 'express';
import { addProduct, deleteProduct, getProduct, getProducts, updateProduct } from '../controllers/product.controller';
const router = express.Router();

router.post('/', addProduct)
router.get('/', getProducts)
router.get('/:id', getProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router