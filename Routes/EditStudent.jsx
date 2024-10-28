// TODO: answer here

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/Navbar";

const EditStudent = () => {
    // TODO: answer here
    const navigate = useNavigate();

    let { id } = useParams();
    const [student, setStudent] = useState([]);
    const [fullName, setFullName] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [gender, setGender] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [programStudy, setProgramStudy] = useState("");
    const [faculty, setFaculty] = useState("");

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (
        programStudy === "Ekonomi" ||
        programStudy === "Manajemen" ||
        programStudy === "Akuntansi"
        ) {
        setFaculty("Fakultas Ekonomi");
        } else if (
        programStudy === "Administrasi Publik" ||
        programStudy === "Administrasi Bisnis" ||
        programStudy === "Hubungan Internasional"
        ) {
        setFaculty("Fakultas Ilmu Sosial dan Politik");
        } else if (
        programStudy === "Teknik Sipil" ||
        programStudy === "Arsitektur"
        ) {
        setFaculty("Fakultas Teknik");
        } else if (
        programStudy === "Matematika" ||
        programStudy === "Fisika" ||
        programStudy === "Informatika"
        ) {
        setFaculty("Fakultas Teknologi Informasi dan Sains");
        }
    }, [programStudy]);

    useEffect(() => {
        fetch(`http://localhost:3001/student/${id}`)
          .then((response) => response.json())
          .then((data) => setStudent(data))
          .then(() => setIsLoading(false))
          .catch((error) => console.error("Error:", error));
        },[id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const editedStudent = {
            fullname: fullName,
            address: address,
            phoneNumber: phoneNumber,
            birthDate: birthDate,
            gender: gender,
            faculty: faculty,
            programStudy: programStudy,
        };

        fetch(`http://localhost:3001/student/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(editedStudent),
        })
         .then((response) => response.json())
         .then(() => {
            console.log("Student edited successfully");
            navigate(`/student`);
          })
          .catch((error) => console.error("Error:", error));
        }


    if (isLoading) {
      return <p>Loading ...</p>;
    }

    return (
      <div>
        <NavBar />
        <img src={student.profilePicture} alt={student.fullName} />
        <form id="form-student" onSubmit={handleSubmit}>
          <label htmlFor="input-name">Fullname</label>
          <input
            type="text"
            data-testid="name"
            value={student.fullname || ""}
            onChange={(e) => setFullName(e.target.value)}
          />
          <br />

          <label htmlFor="input-address">Address</label>
          <input
            type="text"
            data-testid="address"
            value={student.address||""}
            onChange={(e) => setAddress(e.target.value)}
          />

          <label htmlFor="input-number">Phone Number</label>
          <input
            type="text"
            data-testid="phoneNumber"
            value={student.phoneNumber||""}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <br />

          <label htmlFor="input-date">Birth Date</label>
          <input
            type="date"
            data-testid="date"
            value={student.birthDate||""}
            onChange={(e) => setBirthDate(e.target.value)}
          />

          <label htmlFor="input-gender">Gender</label>
          <select
            data-testid="gender"
            value={student.gender||""}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <label htmlFor="input-prody">Program Study</label>
          <select
            data-testid="prody"
            value={student.programStudy||""}
            onChange={(e) => setProgramStudy(e.target.value)}
          >
            <option value="Ekonomi">Ekonomi</option>
            <option value="Manajemen">Manajemen</option>
            <option value="Akuntansi">Akuntansi</option>
            <option value="Administrasi Publik">Administrasi Publik</option>
            <option value="Administrasi Bisnis">Administrasi Bisnis</option>
            <option value="Hubungan Internasional">
              Hubungan Internasional
            </option>
            <option value="Teknik Sipil">Teknik Sipil</option>
            <option value="Arsitektur">Arsitektur</option>
            <option value="Matematika">Matematika</option>
            <option value="Fisika">Fisika</option>
            <option value="Informatika">Informatika</option>
          </select>

          <button type="submit" data-testid="edit-btn">
            Add student
          </button>
        </form>
      </div>
    );
};

export default EditStudent;
