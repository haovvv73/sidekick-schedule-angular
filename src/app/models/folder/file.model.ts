import { statusFile } from "src/app/enums/statusFile.enum";
import { DataStudent } from "./dataStudent.model";
import { DataLesson } from "./dataLesson.model";

export interface File{
    ID:number,
    nameFile : string,
    statusFile :statusFile | null,
    data: DataStudent[] | DataLesson[]
}