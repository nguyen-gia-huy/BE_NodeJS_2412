// - Các api cần có:
// create-account: Tạo một tài khoản mới và thêm vào danh sách tài khoản.       v
// close-account: Đóng một tài khoản bằng cách xóa tài khoản khỏi danh sách.    v
// get-account-by-number: Lấy thông tin tài khoản dựa trên số tài khoản.        v
// list-all-accounts: Liệt kê tất cả các tài khoản hiện có.                     v
// deposit: Nạp tiền vào tài khoản dựa trên số tài khoản và số tiền.            
// with-draw: Rút tiền từ tài khoản dựa trên số tài khoản và số tiền.
// - Lưu ý:
// Đảm bảo các phương thức nạp tiền và rút tiền kiểm tra số dư tài khoản để tránh tình trạng rút quá số dư.
// Viết các phương thức xử lý lỗi khi tài khoản không tồn tại hoặc số tiền rút lớn hơn số dư.
// Các phương thức và thuộc tính cần được định nghĩa rõ ràng, có chú thích và giải thích các tham số, giá trị trả về.
import express from "express";
import {
  addBankAccounts,
  deleteBankAccountByAccountNumber,
  
  depositMoneyToBankAccountByAccountNumber,
  
  getBankAccountByAccountNumber,
  getBankAccounts,
  withDrawMoneyToBankAccountByAccountNumber,
  
} from "../controllers/bank.controllers";
const router = express.Router();
router.post("/", addBankAccounts);
router.get("/", getBankAccounts);
router.get("/:accountNumber", getBankAccountByAccountNumber);
router.delete("/:accountNumber", deleteBankAccountByAccountNumber)
router.post("/:accountNumer/deposit", depositMoneyToBankAccountByAccountNumber)
router.post("/:accountNumer/withdraw", withDrawMoneyToBankAccountByAccountNumber)
export default router;
