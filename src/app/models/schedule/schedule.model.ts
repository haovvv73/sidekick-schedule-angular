import Course from "./course.mdoel";

export default interface Schedule{
    ID: number,
    name : string,
    courses: Course[],
}