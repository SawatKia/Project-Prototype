import React, { useState } from "react";
import StudentForm from "./StudentForm";

interface Student {
    id: number;
    firstName: string;
    surname: string;
    faculty: string;
    phone?: string; // Assuming phone is optional
  }

function StudentTable() {
  const students:Student[] = [
    {
      id: 61011085,
      firstName: "สวรรษ",
      surname: "ลาภประเสริฐล้ำ",
      faculty: "วิศวกรรมศาสตร์",
      phone: "0982624677",
    },
    {
      id: 61011086,
      firstName: "ณัฐกนก",
      surname: "ทวีศิริ",
      faculty: "เภสัชศาสตร์",
    },
    {
      id: 61011087,
      firstName: "กัญญ์ภัค",
      surname: "วงศ์สายชล",
      faculty: "วิทยาการคอมพิวเตอร์",
    },
    {
      id: 61011088,
      firstName: "ธนพล",
      surname: "แก้วมณี",
      faculty: "วิศวกรรมสำรวจ",
    },
    {
      id: 61011089,
      firstName: "นฤวรรณ",
      surname: "สังข์ทอง",
      faculty: "นิติศาสตร์",
    },
  ];
  const [editStudent, setEditStudent] = useState(false);
  const handleEditClick = (student: Student) => {
    console.log("edit clicked on ID :" + student.id);
    setEditStudent(true);
  };

  return (
    <div>
      StudentTable
      <table className="w-full text-sm text-left">
        <thead className="text-gray-700 uppercase bg-gray-50">
          <th className="px-6 py-3">Student id</th>
          <th className="px-6 py-3">First name</th>
          <th className="px-6 py-3">Surname</th>
          <th className="px-6 py-3">Faculty</th>
          <th className="px-6 py-3">Phone number</th>
          <th className="px-6 py-3">Action</th>
        </thead>
        <tbody>
          {students.map((S, index) => (
            <tr
              key={index}
              className="odd:bg-white  even:bg-gray-100  border-b-2 dark:border-gray-700"
            >
              <td className="px-8 py-3">{S.id}</td>
              <td className="px-20 py-3">{S.firstName}</td>
              <td className="px-10 py-3">{S.surname}</td>
              <td className="px-4 py-3">{S.faculty}</td>
              <td className="px-12 py-3">{S.phone}</td>
              <td className="px-8 py-3 flex flex-row ">
                <button
                  className="rounded-md px-2 mx-1 bg-yellow-300 active:bg-yellow-600"
                  onClick={() => handleEditClick(S)}
                >
                  Edit
                </button>
                <button className="rounded-md px-2 mx-1 bg-red-300 active:bg-red-600">
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editStudent && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-md">
            <h2 className="text-xl font-bold mb-4">Edit Student</h2>
            <StudentForm/>
            <div className="flex justify-center">
            <button
              className="rounded-md px-4 py-2 my-2 bg-red-500 text-white"
              onClick={() => setEditStudent(false)}
            >
              Cancel
            </button>
            <div></div>
            
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentTable;
