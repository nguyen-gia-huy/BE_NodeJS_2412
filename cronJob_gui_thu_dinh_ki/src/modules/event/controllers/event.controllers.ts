// Bài Tập 4: Hệ thống gửi thư nhắc nhở sự kiện định kỳ với Cronjob
// Yêu Cầu:
// Tạo một API cho phép người dùng tạo sự kiện:
// POST /events: Nhận thông tin sự kiện (tên, mô tả, thời gian, người tham gia).
// Sử dụng Cronjob để tự động gửi email nhắc nhở người tham gia sự kiện trước một khoảng thời gian nhất định (ví dụ: 1 giờ trước khi sự kiện diễn ra).
// Thực hiện các route:

// Gợi ý:
// Sử dụng thư viện node-cron để thực hiện các Cronjob.
// Sử dụng Nodemailer để gửi email nhắc nhở cho người tham gia sự kiện.
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// POST /events: Nhận thông tin sự kiện (tên, mô tả, thời gian, người tham gia).
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { events } from "../models/event.model";
import { Event } from "../dto/event.dto";

export const addEvent = (req: Request, res: Response) => {
  const { eventName, description, eventTime, peopleJoin } = req.body;


  const newEvent: Event = {
    id: uuidv4(),
    eventName,
    description,
    eventTime: new Date(eventTime),
    peopleJoin,
    reminderSent: false,
  };
  events.push(newEvent);
  res.status(201).json({
    message: "them evemt thanh cong",
    data: newEvent,
  });
};
// GET /events/id: Lấy danh sách sự kiện.
export const getEvents = (req: Request, res: Response) => {
  res.status(200).json({
    data: events,
  });
};
// GET /event: Lấy  sự kiện.  cu the
export const getEvent = (req: Request, res: Response) => {
  const { id } = req.params;
  const event = events.find((e) => e.id == id);

  if (event) {
    res.status(200).json({
      data: event,
    });
  } else {
    res.status(400).json({
      error: "khong tim thay su kien phu hop",
    });
  }
};

// PUT /events/:id: Cập nhật thông tin sự kiện.
export const updateEvent = (req: Request, res: Response) => {
  const { id } = req.params;

  const { eventName, description, eventTime, peopleJoin } = req.body;
  const index = events.findIndex((e) => (e.id = id));

  if (index !== -1) {
    const updateEvent = {
      id,
      eventName,
      eventTime,
      description,
      peopleJoin,
    };

    events[index] = updateEvent;

    res.status(200).json({
      data: updateEvent,
    });
  } else {
    res.status(404).json({
      error: "khong tim thay event phu hop",
    });
  }
};
// DELETE /events/:id: Xóa sự kiện theo ID.
export const deleteEvent = (req: Request, res: Response) => {
  const { id } = req.params;
  const index = events.findIndex((e) => (e.id = id));
  if (index !== -1) {
    events.splice(index, 1);
    res.status(200).json({
      message: "Xóa event thành công",
    });
  } else {
    res.status(404).json({
      message: "Không tìm thấy evnet phù hợp",
    });
  }
};
