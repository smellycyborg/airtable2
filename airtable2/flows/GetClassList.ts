import { Record } from "airtable";
import { ClassFields, StudentFields } from "../types";

export type Class = {
  Name: string;
  Students: string[];
};

export default function* GetClassList() {
  const student: string = yield { ref: "student" };
  const [studentRecord]: Record<StudentFields>[] = yield {
    query: {
      table: "Students",
      fields: ["Name", "Classes"],
      filterByFormula: `{Name}='${student}'`
    }
  };
  const result: Class[] = [];
  if (!studentRecord) return result;

  const classRecords: Record<ClassFields>[] = yield {
    query: {
      table: "Classes",
      fields: ["Name", "Students"],
      recordIds: studentRecord.get("Classes")
    }
  };
  const studentIds = new Map();
  classRecords.forEach((classRecord) => {});
}

function* GetStudentName(studentId: string) {
  const [studentRecord]: Record<StudentFields>[] = yield {
    query: { table: "Students", fields: ["Name"], recordIds: [studentId] }
  };
  return studentRecord.get("Name");
}

function* GetClassInfo(classId: string) {
  const [classRecord]: Record<ClassFields>[] = yield {
    query: {
      table: "Classes",
      fields: ["Name", "Students"],
      recordIds: [classId]
    }
  };

  const studentNames: string[] = yield {
    all: classRecord
      .get("Students")
      .map((studentId) => GetStudentName(studentId))
  };

  const result: Class = {
    Name: classRecord.get("Name"),
    Students: studentNames
  };

  return result;
}