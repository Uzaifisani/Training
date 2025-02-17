interface DisplayInfoProps {
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  skills: string;
  email: string;
  phoneNumber: number;
  address: string;
}

const DisplayInfo = ({ formData }: { formData: DisplayInfoProps }) => {
  return (
      <>
      <div className="display-info ">
      <h2>Display Info</h2>
      <div>
        <label>First Name:</label>
        <span>{formData.firstName}</span>
      </div>
      <div>
        <label>Last Name:</label>
        <span>{formData.lastName}</span>
      </div>
      <div>
        <label>Age:</label>
        <span>{formData.age}</span>
      </div>
      <div>
        <label>Gender:</label>
        <span>{formData.gender}</span>
      </div>
      <div>
        <label>Skills:</label>
        <span>{formData.skills}</span>
      </div>
      <div>
        <label>Email:</label>
        <span>{formData.email}</span>
      </div>
      <div>
        <label>Phone Number:</label>
        <span>{formData.phoneNumber}</span>
      </div>
      <div>
        <label>Address:</label>
        <span>{formData.address}</span>
      </div>
    </div>
    </>
  );
};

export default DisplayInfo;