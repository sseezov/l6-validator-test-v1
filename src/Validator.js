import GradeSchema from "./GradeSchema.js";
import LessonDataSchema from "./LessonDataSchema.js";

export default class Validator {
  grade(){
    return new GradeSchema()
  }
  lessonData(){
    return new LessonDataSchema()
  }
}