import React, { useState, useEffect } from "react";
import logo from "../image/logo.png";
interface StudentFormProps {
  initialValues: {
    name: string;
    address: string;
    mobile: string;
  };
}
const faculties = [
  "วิศวกรรมศาสตร์",
  "วิทยาศาสตร์",
  "บริหารธุรกิจ",
  "ครุศาสตร์",
  "แพทย์ศาสตร์",
  "สถาปัตยกรรมศาสตร์",
  "เทคโนโลยีสารสนเทศฯ",
  "ศิลปกรรมศาสตร์",
  "บัญชี",
  "นิติศาสตร์",
  "เศรษฐศาสตร์",
  "อักษรศาสตร์",
  "นิเทศศาสตร์",
];
function StudentForm({ initialValues }: StudentFormProps) {
  const [formValues, setFormValues] = useState({
    name: initialValues?.name || "",
    address: initialValues?.address || "",
    mobile: initialValues?.mobile || "",
  });

  useEffect(() => {
    console.log("Received initialValues:", initialValues);
    console.log("form value:", formValues);
    setFormValues({
      name: initialValues?.name || "",
      address: initialValues?.address || "",
      mobile: initialValues?.mobile || "",
    });
  }, [initialValues]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add logic to handle form submission, e.g., sending data to the server
    console.log("Form submitted:", formValues);
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  return (
    <div>
      <div className="flex justify-center mt-4 mb-4">
        <img src={logo} alt="logo" width={120} height={120} />
      </div>
      <div className="text-3xl font-bold ">Student Form</div>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <div id="fName" className="flex flex-row mb-2">
          <label htmlFor="name" className="px-3 py-2">
            Name:{" "}
          </label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={formValues.name}
            className="border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div id="address" className="flex flex-row">
          <label htmlFor="address" className="px-3 py-2">
            address:{" "}
          </label>
          <select
            name="address"
            value={formValues.address}
            className="px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          >
            <option value="" disabled>
              Select address
            </option>
            {faculties.map((address, index) => (
              <option key={index} value={address}>
                {address}
              </option>
            ))}
          </select>
        </div>
        <div id="mobile-number" className="flex flex-row my-2">
          <label htmlFor="mobile" className="px-3 py-2">
            Telemobile:{" "}
          </label>
          <input
            type="tel"
            name="mobile"
            pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
            placeholder="0XXXXXXXXX"
            onChange={handleChange}
            value={formValues.mobile}
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
