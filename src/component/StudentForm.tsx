import React from "react";

const faculties = [
  "Engineering",
  "Science",
  "Business",
  "Education",
  "Medicine",
  "Architecture",
];
function StudentForm() {
  return (
    <div>
      <div className="text-3xl font-bold ">Student Form</div>
      <form className="flex flex-col">
        <div className="flex flex-row mb-2">
          <label htmlFor="sid" className="px-3 py-2">
            Student ID:{" "}
          </label>
          <input
            type="number"
            name="sid"
            className="border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-row mb-2">
          <label htmlFor="Name" className="px-3 py-2">
            Name:{" "}
          </label>
          <input
            type="text"
            name="Name"
            className="border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-row mb-2">
          <label htmlFor="SName" className="px-3 py-2">
            Surname:{" "}
          </label>
          <input
            type="text"
            name="SName"
            className="px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-row">
          <label htmlFor="faculty" className="px-3 py-2">
            Faculty:{" "}
          </label>
          <select
            name="faculty"
            className="px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          >
            <option value="" disabled>
              Select Faculty
            </option>
            {faculties.map((faculty, index) => (
              <option key={index} value={faculty}>
                {faculty}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-row my-2">
          <label htmlFor="tele" className="px-3 py-2">Telephone: </label>
          <input
            type="tel"
            name="tele"
            pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
            placeholder="0XXXXXXXXX"
            title="please fill in specified format"
            className="px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          ></input>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default StudentForm;
