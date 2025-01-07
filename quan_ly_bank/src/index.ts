import express from "express";
import bankAccountRoutes from "./modules/bank/route/bankAccount.route"
const app = express();
app.use(express.json());
const PORT = 4002;
app.use("/api/v1/bankAccounts", bankAccountRoutes)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
