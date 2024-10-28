import React from 'react'
import{ Link } from 'react-router-dom'

const NavBar = () => {
    return (
      <div>
        <ul>
          <li>
            <Link to="/" data-testid="home-page">
              Student Portal
            </Link>
          </li>
          <li>
            <Link to="/student" data-testid="student-page">
              All Student
            </Link>
          </li>
          <li>
            <Link to="/add" data-testid="add-page">
              Add Student
            </Link>
          </li>
        </ul>
      </div>
    );
};

export default NavBar;
