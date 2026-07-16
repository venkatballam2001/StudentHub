import {
  FaReact,
  FaRoute,
  FaDatabase,
  FaSearch,
  FaSortAlphaDown,
  FaLaptopCode,
} from "react-icons/fa";

import "./index.css";

const About = () => {
  return (
    <div className="about-container">

      <div className="about-top">

        <h1>
          About <span>StudentHub</span>
        </h1>

        <p>
          StudentHub is a modern React application developed to
          practice CRUD Operations, Routing, Local Storage,
          Component Architecture and modern UI design.
        </p>

      </div>

      <div className="skills-grid">

        <div className="skill-card">
          <FaReact />
          <h3>React</h3>
        </div>

        <div className="skill-card">
          <FaRoute />
          <h3>React Router</h3>
        </div>

        <div className="skill-card">
          <FaDatabase />
          <h3>SQLite Database</h3>
        </div>

        <div className="skill-card">
          <FaSearch />
          <h3>Search</h3>
        </div>

        <div className="skill-card">
          <FaSortAlphaDown />
          <h3>Sorting</h3>
        </div>

        <div className="skill-card">
          <FaLaptopCode />
          <h3>Responsive UI</h3>
        </div>

      </div>

      <div className="about-bottom">

        <div className="about-left">

          <h2>About Me</h2>

          <p>
            Hi, I'm <strong>Venkat</strong>.
          </p>

          <p>
            StudentHub is a Full Stack Student Management application built to practice real-world software development. 
            It combines React for the frontend, Express.js for the backend, SQLite for data persistence, and REST APIs for seamless communication. 
            The application includes CRUD operations, routing, search, sorting, and dynamic dashboard statistics with a clean, responsive user interface.
          </p>

        </div>

        <div className="stats-card">

          <h2>Project Stats</h2>

          <div className="stat">
            <span>Components</span>
            <strong>8+</strong>
          </div>

          <div className="stat">
            <span>Features</span>
            <strong>7+</strong>
          </div>

          <div className="stat">
            <span>React</span>
            <strong>100%</strong>
          </div>

          <div className="stat">
            <span>Portfolio</span>
            <strong>Ready</strong>
          </div>

        </div>

      </div>

    </div>
  );
};

export default About;