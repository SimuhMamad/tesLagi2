import { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";


const NavBar = () => {
  const navigate = useNavigate();
  const [path, setPath] = useState(null);

  useEffect (() => {
    if (path) {
    navigate(path);
    }
  }, [path, navigate]);
  
  const handleNavigation = (newPath) => {
    setPath(newPath);
  };

  return (
    <header>
    <h1 onClick={() => handleNavigation("/")} data-testid="home-page">
    Student Portal
    </h1>
      <section>
        <button
          onClick={() => handleNavigation("/student")}
          data-testid="student-page">
          All Student
        </button>
        <button onClick={() => handleNavigation("/add")} data-testid="add-page">
          Add Student
        </button>
      </section>
    </header>
    );
};
export default NavBar;
