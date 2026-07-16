import {useParams} from 'react-router-dom'
import './index.css'

const StudentDetails = () => {
  const {id} = useParams()

  const students = JSON.parse(localStorage.getItem('students')) || []

  const student = students.find(eachStudent => eachStudent.id === id)

  if (!student) {
    return (
      <div className="app-container">
        <h1>Student Not Found</h1>
      </div>
    )
  }

  return (
    <div className="app-container">
      <div className="student-details-container">
        <h1>Student Details</h1>

        <hr />

        <p>
          <strong>Name :</strong> {student.name}
        </p>

        <p>
          <strong>Course :</strong> {student.course}
        </p>

        <p>
          <strong>Age :</strong> {student.age}
        </p>
      </div>
    </div>
  )
}

export default StudentDetails