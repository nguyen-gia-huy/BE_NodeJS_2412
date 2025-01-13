import { Event } from "../dto/event.dto";

export const events: Event[] = [
  {
    id: "1",
    eventName: "Họp nhóm dự án",
    description: "Thảo luận tiến độ dự án",
    eventTime: new Date("2025-01-11T15:00:00"),
    peopleJoin: ["example1@gmail.com", "example2@gmail.com"],
    reminderSent: false,
  },
];
