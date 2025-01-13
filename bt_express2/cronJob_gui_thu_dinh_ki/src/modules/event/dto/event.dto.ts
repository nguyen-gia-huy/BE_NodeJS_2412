export interface Event {
    id: string;
    eventName: string;
    description: string;
    eventTime: Date;
    peopleJoin: string[]; // Danh sách email
    reminderSent?: boolean; // Đã gửi email nhắc nhở hay chưa
  }
  