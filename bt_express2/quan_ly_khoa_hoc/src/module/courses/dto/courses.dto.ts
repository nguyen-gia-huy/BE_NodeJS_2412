import { Review } from "./reviews.dto"

enum COURSE {
    JAVASRIPT = 'JAVASCRIPT',
    HTML = 'HTML',
    CSS = 'CSS',
    REACTJS = 'REACTJS',
    NODEJS = 'NODEJS',
}

export interface Course {
    courseId: string
    course: COURSE
   
    description: string
    teacherEmail: string
    timeStart: Date
    timeEnd: Date
    reviews: Review[]
}