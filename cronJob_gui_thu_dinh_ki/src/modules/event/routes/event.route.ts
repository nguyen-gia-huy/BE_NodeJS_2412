import express from 'express';
import { addEvent, deleteEvent, getEvent, getEvents, updateEvent } from '../controllers/event.controllers';
import { sendReminderEmail } from '../sent-mail/sendmail.nodemon';

const router = express.Router()

router.post('/', addEvent)
router.get('/', getEvents)
router.get('/:id', getEvent)
router.put('/:id', updateEvent)
router.delete('/:id', deleteEvent)

export default router