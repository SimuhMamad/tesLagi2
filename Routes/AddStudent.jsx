// TODO: answer here
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/Navbar";


const AddStudent = () => {
    // TODO: answer here
    const navigate = useNavigate();

    const [fullName, setFullName] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [gender, setGender] = useState("Male");
    const [programStudy, setProgramStudy] = useState("Ekonomi");
    const [faculty, setFaculty] = useState("Fakultas Ekonomi");
    const [profilePicture, setProfilePicture] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

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


    const addStudent = (student) => {
      // TODO: answer here
      fetch("http://localhost:3001/student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(student),
      })
       .then((response) => response.json())
       .then(() => {
          console.log("Student added successfully");
        })
       .catch((error) => console.error(error));
    };


    const handleSubmit = async (event) => {
      event.preventDefault();

      const newStudent = {
        fullname: fullName,
        profilePicture: profilePicture,
        address: address,
        phoneNumber: phoneNumber,
        birthDate: birthDate,
        gender: gender,
        faculty: faculty,
        programStudy: programStudy,
      };

      await addStudent(newStudent);

      setFullName("");
      setBirthDate("");
      setGender("Male");
      setProgramStudy("Ekonomi");
      setFaculty("Fakultas Ekonomi");

      navigate('/student')
    };

    return (
      <div>
        <NavBar/>
        <form id="form-student" onSubmit={handleSubmit}>
          <label htmlFor="input-name">Fullname</label>
          <input
            type="text"
            data-testid="name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <label htmlFor="input-pp">Profile Picture</label>
          <input 
            type="text"
            data-testid="profilePicture"
            value={profilePicture}
            onChange={(e) => setProfilePicture(e.target.value)}
          />
          <br />

          <label htmlFor="input-address">Address</label>
          <input 
            type="text"
            data-testid="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
           />

          <label htmlFor="input-number">Phone Number</label>
          <input 
            type="text"
            data-testid="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <br />

          <label htmlFor="input-date">Birth Date</label>
          <input
            type="date"
            data-testid="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />

          <label htmlFor="input-gender">Gender</label>
          <select
            data-testid="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <label htmlFor="input-prody">Program Study</label>
          <select
            data-testid="prody"
            value={programStudy}
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

          <button type="submit" data-testid="add-btn">
            Add student
          </button>
        </form>
      </div>
    );
};

export default AddStudent;
