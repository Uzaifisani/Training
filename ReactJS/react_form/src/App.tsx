import './App.css'
import Form from './Components/Form'
import { useState } from 'react';

interface IFormData {
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  skills: string;
  email: string;
  phoneNumber: number;
  address: string;
}

function App() {
  const FormData: IFormData = {
    firstName: '',
    lastName: '',
    age: 0,
    gender: '',
    skills: '',
    email: '',
    phoneNumber: 0,
    address: ''
  };
  let [formData, setFormData] = useState(FormData);
  return (
    <>
      <Form formData={formData} setFormData={setFormData} />
    </>
  );
}

export default App;
