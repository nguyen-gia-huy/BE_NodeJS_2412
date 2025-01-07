// Bài tập 2: Quản lý tài khoản ngân hàng (viết theo mô hình API hoặc mô hình MVC, nếu viết theo mô hình MVC thì thêm phần giao diện).


import { Request, Response } from "express";
import { BankAccount } from "../dto/bankAccount.dto";
import { v4 as uuidv4 } from "uuid";
import { bankAccounts } from "../models/bankAccount.models";

export const addBankAccounts = (req: Request, res: Response)=>{
    const {accountNumber, accountHolder, balance} = req.body

    const newBankAccount : BankAccount ={
        
        accountNumber: uuidv4(),
        accountHolder,
        balance
    }
    bankAccounts.push(newBankAccount)
    res.status(201).json({
        data: newBankAccount
    })
}
export const getBankAccounts = (req: Request, res:Response)=>{
    res.status(200).json({
        data: bankAccounts
    })
}
export const getBankAccountByAccountNumber = (req: Request, res: Response)=>{
    const {accountNumber} =  req.params
    const bankAccount = bankAccounts.find((e)=> e.accountNumber == accountNumber)

    if(bankAccount){
        res.status(200).json({
            data: bankAccount
        })
    }else{
        res.status(404).json({
            message:"khong tim thay bank account phu hop"
        })
    }
}
export const deleteBankAccountByAccountNumber = (req: Request, res: Response)=>{
    const {accountNumber} = req.params
    const index = bankAccounts.findIndex((e)=> e.accountNumber == accountNumber)
    if(index !== -1){
         bankAccounts.splice(index, 1);
         res.status(200).json({
            message: "xoa bank account thanh cong"
         })
    }else {
        res.status(404).json({
          message: "Không tìm thấy bank account phù hợp",
        });
      }
}
//"/api/v1/bankAccounts/AccountNumber/depositAmonut"
export const depositMoneyToBankAccountByAccountNumber = (req: Request, res: Response)=>{
    const {accountNumber} = req.params
    const {depositAmonut} = req.body

    const bankAccount = bankAccounts.find((e)=> e.accountNumber == accountNumber)

    if(!bankAccount){
         res.status(404).json({
            message: "khong tim thay bank account phu hop"
        })
        return
    }
    if(depositAmonut <= 0){
         res.status(404).json({
            message: "so tien nap phai lon hon 0"
        })
        return
    }
    bankAccount.balance += depositAmonut
    res.status(200).json({
        message:'nap tien thanh cong',
        data: bankAccount,
    })
}
export const withDrawMoneyToBankAccountByAccountNumber = (req: Request, res: Response)=>{
    const { accountNumber } = req.params;
    const { withdrawAmount } = req.body;

    const bankAccount = bankAccounts.find((e) => e.accountNumber === accountNumber);

    if(!bankAccount){
         res.status(404).json({
            message: "khong tim thay bank account phu hop"
        })
        return
    }
    if(bankAccount.balance < withdrawAmount){
         res.status(400).json({
            message: " so du khong du de thuc hien giao dich"
        })
        return
    }
    bankAccount.balance -= withdrawAmount;
    res.status(200).json({
        message: "rut tien thanh",
        data: bankAccount,
    });
}