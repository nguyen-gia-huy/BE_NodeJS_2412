import express, { Application } from "express";
import eventRoutes from "./modules/event/routes/event.route";
import cron from "node-cron";
import { checkAndSendReminders } from "./modules/event/cronjob/event.cronjob";
const app: Application = express();

app.use(express.json());

const PORT = 8088;

app.use("/api/v1/event", eventRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
cron.schedule("*/1 *  * * *", () => {
  console.log("Kiểm tra và gửi nhắc nhở...");
  checkAndSendReminders();
});
