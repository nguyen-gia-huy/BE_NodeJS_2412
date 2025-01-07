// - Đối tượng BankAccount chứa các thông tin sau:
// accountNumber: số tài khoản (kiểu số).
// accountHolder: tên chủ tài khoản (kiểu chuỗi).
// balance: số dư tài khoản (kiểu số, mặc định là 0).

export interface BankAccount {
  accountNumber: number | string;
  accountHolder: string;
  balance: number;
}
