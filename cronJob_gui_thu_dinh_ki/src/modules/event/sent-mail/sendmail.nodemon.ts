import nodemailer from "nodemailer";

// Cấu hình transporter của nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nguyenhuy3112005@gmail.com", // Email
    pass: "rsljpyigxeedrmdf", // Mật khẩu ứng dụng
  },
});

// Hàm gửi email
export const sendReminderEmail = async (
  email: string,
  eventName: string,
  eventTime: Date
) => {
  try {
    const formattedTime = eventTime.toLocaleString(); // Định dạng thời gian
    const info = await transporter.sendMail({
      from: `"Hệ thống nhắc nhở" <nguyenhuy3112005@gmail.com>`,
      to: email,
      subject: `Nhắc nhở sự kiện: ${eventName}`,
      text: `Xin chào, đây là nhắc nhở về sự kiện "${eventName}" của bạn. 
      Sự kiện sẽ diễn ra vào lúc ${formattedTime}. Hãy chuẩn bị sẵn sàng!`,
    });

    console.log(`Email nhắc nhở đã gửi đến ${email}: %s`, info.messageId);
  } catch (error) {
    console.error(`Lỗi khi gửi email nhắc nhở đến ${email}:`, error);
  }
};
