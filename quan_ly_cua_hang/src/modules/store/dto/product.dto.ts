// Bài tập 1: Quản lý sản phẩm trong cửa hàng (viết theo mô hình API hoặc mô hình MVC, nếu viết theo mô hình MVC thì thêm phần giao diện).
// - Đối tượng Product chứa các thông tin sau:
// id: mã sản phẩm (kiểu số).
// name: tên sản phẩm (kiểu chuỗi).
// price: giá sản phẩm (kiểu số).
// category: danh mục sản phẩm (kiểu chuỗi).
enum CATEGORY {
  NOVEL = "PAPER",
  SCIENCE = "PENCIL",
  EDUCATION = "BOOK",
}
export interface Product {
  id?: number | string;
  name: string;
  price: number;
  category: CATEGORY;
}
