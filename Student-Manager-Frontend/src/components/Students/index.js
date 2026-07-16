import {useState} from 'react'
import {useNavigate} from 'react-router-dom'

const Students = ({students, deleteStudent, sortStudents}) => {
  const [searchInput, setSearchInput] = useState('')

  const navigate = useNavigate()

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchInput.toLowerCase()),
  )

  return (
    <div className="app-container">
      <h1>Students</h1>

      <div className="students-container">
        <div className="students-header">
          <h2 className="headingh2">
            Students {filteredStudents.length}
          </h2>

          <div className="search-container">
            <input
              type="search"
              className="search-input"
              placeholder="Search Student..."
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
            />

            <button
              type="button"
              className="sort-btn"
              onClick={sortStudents}
            >
              Sort A → Z
            </button>
          </div>
        </div>

        {filteredStudents.map(student => (
          <div className="student-card" key={student.id}>
            <p className="student-name">{student.name}</p>

            <p className="student-course">{student.course}</p>

            <p className="student-age">{student.age}</p>

            <button
              className="styleBtn"
              type="button"
              onClick={() => navigate(`/add-student/${student.id}`)}
            >
              Edit
            </button>

            <button
              className="styleBtn"
              type="button"
              onClick={() => deleteStudent(student.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Students