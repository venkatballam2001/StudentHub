import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

import {
  FaArrowRight,
  FaUsers,
  FaSearch,
  FaDatabase,
} from 'react-icons/fa'

import './index.css'

const Home = () => {
  const [totalStudents, setTotalStudents] = useState(0)

  useEffect(() => {
    getStats()
  }, [])

  const getStats = async () => {
    try {
      const response = await axios.get(
        'https://studenthub-backend-4m51.onrender.com/stats',
      )

      setTotalStudents(response.data.totalStudents)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="home-container">

      <div className="hero-section">

        <div className="hero-left">

          <span className="hero-badge">
            🚀 Modern React Student Dashboard
          </span>

          <h1 className="hero-title">
            Manage Students
            <br />
            <span>Without The Chaos.</span>
          </h1>

          <p className="hero-description">
            Organize student records with a beautiful dashboard built
            using React, React Router, CRUD Operations,
            SQLite Database, REST APIs and modern UI design.
          </p>

          <div className="hero-buttons">

            <Link to="/dashboard" className='link-button'>
              <button
                type="button"
                className="primary-btn"
              >
                Open Dashboard
                <FaArrowRight />
              </button>
            </Link>

          </div>

        </div>

        <div className="hero-right">

          <div className="dashboard-preview">

            <div className="dashboard-header">

              <div className="circle red"></div>
              <div className="circle yellow"></div>
              <div className="circle green"></div>

            </div>

            <div className="preview-card">

              <FaUsers className="preview-icon"/>

              <div>

                <h2>{totalStudents}</h2>

                <p>Total Students</p>

              </div>

            </div>

            <div className="preview-card">

              <FaSearch className="preview-icon"/>

              <div>

                <h2>Fast Search</h2>

                <p>Find any student instantly.</p>

              </div>

            </div>

            <div className="preview-card">

              <FaDatabase className="preview-icon"/>

              <div>

                <h2>SQLite + API</h2>

                <p>Live data from backend.</p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Home