import express from "express"
import productRoutes from "./modules/store/routes/product.route"
const app = express();
app.use(express.json())
const PORT = 5000

app.use("/api/v1/products", productRoutes)
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})