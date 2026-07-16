import {Link, useLocation} from 'react-router-dom'

import {FaGraduationCap} from 'react-icons/fa'

import './index.css'

const Navbar = () => {
  const location = useLocation()

  return (
    <nav className="navbar">

      <div className="logo-container">

        <FaGraduationCap className="logo-icon"/>

        <h2 className="logo">
          StudentHub
        </h2>

      </div>

      <ul className="nav-links">

        <li>
          <Link
            to="/"
            className={
              location.pathname === '/'
                ? 'nav-link active'
                : 'nav-link'
            }
          >
            Home
          </Link>
        </li>

        <li>
          <Link
            to="/dashboard"
            className={
              location.pathname === '/dashboard'
                ? 'nav-link active'
                : 'nav-link'
            }
          >
            Dashboard
          </Link>
        </li>

        <li>
          <Link
            to="/about"
            className={
              location.pathname === '/about'
                ? 'nav-link active'
                : 'nav-link'
            }
          >
            About
          </Link>
        </li>

      </ul>

      <button
        type="button"
        className="github-btn"
      >
        GitHub
      </button>

    </nav>
  )
}

export default Navbar