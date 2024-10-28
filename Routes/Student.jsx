// TODO: answer here

import { useEffect, useState } from "react";
import { Link, Outlet } from'react-router-dom';
import Navbar from '../components/Navbar'

const Student = () => {
    // TODO: answer here
    const [students, setStudents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        getStudents();
    }, []);

    const getStudents = () => {
        setIsLoading(true);
        fetch("http://localhost:3001/student")
            .then((response) => response.json())
            .then((data) => {
            setStudents(data);
            setFilteredStudents(data);
            setIsLoading(false);
            })
            .catch((error) => {
            console.error("Error:", error);
            setError(error);
            setIsLoading(false);
            });
    };

    const filterStudent = (e) => {
        const selectedValue = e.target.value;
        const filteredData = students.filter((student) => student.faculty === selectedValue);
        setFilteredStudents(selectedValue === "All" ? students : filteredData);
    };

    const deleteStudent = (id) => {
      // TODO: answer here
        fetch(`http://localhost:3001/student/${id}`, {
            method: "DELETE",
        })
            .then((response) => response.json())
            .then(() => getStudents())
            .catch((error) => console.error(error));
    };

    if (isLoading) return <p>Loading ...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
      <div>
        <Navbar />
        <div>
          <select data-testid="filter" onChange={filterStudent}>
            <option value="All">All</option>
            <option value="Fakultas Ekonomi">Fakultas Ekonomi</option>
            <option value="Fakultas Ilmu Sosial dan Politik">
              Fakultas Ilmu Sosial dan Politik
            </option>
            <option value="Fakultas Teknik">Fakultas Teknik</option>
            <option value="Fakultas Teknologi Informasi dan Sains">
              Fakultas Teknologi Informasi dan Sains
            </option>
          </select>{" "}
          <table id="table-student">
            <thead>
              <tr>
                <th>No</th>
                <th>Full Name</th>
                <th>Faculty</th>
                <th>Program Study</th>
                <th>Option</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents?.map((student, index) => (
                <tr key={student.id} className="student-data-row">
                  <td>{index + 1}</td>
                  <td>
                    <Link to={`${student.id}`}>{student.fullname}</Link>
                  </td>
                  <td>{student.faculty}</td>
                  <td>{student.programStudy}</td>
                  <td>
                    <button
                      data-testid={`delete-${student.id}`}
                      onClick={() => deleteStudent(student.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* <Outlet /> */}
      </div>
    );
};

export default Student;
