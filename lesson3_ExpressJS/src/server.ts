import { error } from "console";
import express, {Request, Response} from "express";

const app = express();
app.use(express.json())
const PORT = 8080;

app.post('/api/v1/auth/register',(req: Request, res: Response)=>{
    const {username, email, password}= req.body
    //kiem tra xem input co rong khong
        if(!username || !email || !password){
            return res.status(400).json({
                error:'vui long nhap day du'
            })
        }
        if()
   
})

app.post('/api/v1/auth/login',(req: Request, res: Response)=>{
    const body = req.body

    res.status(200).json({
        message:'login thanh cong'
    })
})
app.listen(PORT, () => {
   console.log("server is running on port", PORT);
});
