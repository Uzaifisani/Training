import React, { useState } from "react";
import DisplayInfo from "./DisplayInfo";
interface IFormData{
    firstName: string;
    lastName: string;  
    age: number;
    gender: string;
    skills: string;
    email: string;
    phoneNumber: number;
    address: string;
}

interface IFormProps {
    formData: IFormData;
    setFormData: React.Dispatch<React.SetStateAction<IFormData>>;
}

const Form = ({ formData, setFormData }: IFormProps) => {
    const [showDisplayInfo, setShowDisplayInfo] = useState(false);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert("Form submitted");
        setShowDisplayInfo(true);
  };
    return (
    <>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange}/>
      </div>
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange}/>
      </div>
      <div>
        <label htmlFor="age">Age:</label>
        <input type="number" id="age" name="age" value={formData.age} onChange={handleChange}/>
      </div>
      <div>
        <label>Gender:</label>
        <div>
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={formData.gender === 'male'}
              onChange={handleChange}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formData.gender === 'female'}
              onChange={handleChange}
            />
            Female
          </label>
        </div>
      </div>
      <div>
        <label htmlFor="skills">Skills:</label>
        <select id="skills" name="skills" value={formData.skills} onChange={handleChange}>
          <option value="">Select a skill</option>
          <option value="javascript">JavaScript</option>
          <option value="react">React</option>
          <option value="node">Node.js</option>
        </select>
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange}/>
      </div>
      <div>
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange}/>
      </div>
      <div>
        <label htmlFor="address">Address:</label>
        <textarea id="address" name="address" value={formData.address} onChange={handleChange}></textarea>
          </div>
           <button type="submit">Submit</button>
      </form>
            {showDisplayInfo && <DisplayInfo formData={formData} />}
    </>
  )
}

export default Form