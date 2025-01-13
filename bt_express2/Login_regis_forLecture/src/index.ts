import express from 'express';
import lectureRouter from './modules/lecture/route/lecture.routes';
const app = express();
app.use(express.json());
app.use('/api/v1/lectures', lectureRouter);
const PORT = 1234
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});