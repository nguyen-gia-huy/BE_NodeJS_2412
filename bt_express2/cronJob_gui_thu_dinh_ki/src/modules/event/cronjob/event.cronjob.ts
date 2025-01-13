import cron from "node-cron";
import { events } from "../models/event.model"; // Đảm bảo đúng đường dẫn
import { sendReminderEmail } from "../sent-mail/sendmail.nodemon";

// Hàm kiểm tra và gửi nhắc nhởe
export const checkAndSendReminders = async () => {
  const currentTime = new Date();

  for (const event of events) {
    const reminderTime = new Date(event.eventTime.getTime() - 60 * 60 * 1000); // 1 giờ trước sự kiện

    // Kiểm tra nếu thời gian nhắc nhở đã đến nhưng chưa quá thời gian sự kiện
    if (currentTime >= reminderTime && currentTime < event.eventTime) {
      console.log(`Gửi nhắc nhở cho sự kiện: ${event.eventName}`);

      // Gửi email cho từng người tham gia
      for (const email of event.peopleJoin) {
        try {
          console.log(`Gửi email tới: ${email}`); // Kiểm tra email được truyền vào
          await sendReminderEmail(email, event.eventName, event.eventTime);
        } catch (error) {
          console.error(`Lỗi khi gửi nhắc nhở đến ${email}:`, error);
        }
      }
    }
  }
};

// Lên lịch cron job (chạy mỗi phút để kiểm tra sự kiện)
cron.schedule("*/1 *  * * *", () => {
  console.log("Kiểm tra và gửi nhắc nhở...");
  checkAndSendReminders();
});
