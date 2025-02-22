import { useParams } from "react-router-dom";

const Aboutus = () => {
    const { name } = useParams();
  return (
    <>
    <h1>Aboutus</h1>
    <p>This is about us page</p>
    <p>Hello {name}</p>
    </>
  )
}

export default Aboutus