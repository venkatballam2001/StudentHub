import {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import './index.css'

class StudentDashboard extends Component {

    state = {
        name : '',
        course : '',
        age : '',
        students : [],
        editingId : null,
        searchInput : '',
        nameError : false,
        courseError : false,
        ageError : false
    }

componentDidMount() {
  this.getStudents()
}

getStudents = async () => {
  const response = await axios.get(
    'https://studenthub-backend-4m51.onrender.com/students',
  )

  this.setState({
    students: response.data,
  })
}

    onChangeName = event => {
      this.setState({
        name : event.target.value,
        nameError : false
      })
    }

    onChangeCourse = event => {
      this.setState({
        course : event.target.value,
        courseError : false
      })
    }

    onChangeAge = event => {
      this.setState({
        age : event.target.value,
        ageError : false
      })
    }

    onClickAddStudent = async() =>{

      const {name, course, age, editingId} = this.state

      const nameError = name.trim() === ''
      const courseError = course.trim() === ''
      const ageError = age.toString().trim() === ''

      if (nameError || courseError || ageError) {
        this.setState({
          nameError : nameError,
          courseError : courseError,
          ageError : ageError,
        })

        return
      }

      if (editingId === null) {
        const newStudent = {
          name,
          course,
          age,
        }
      
        await axios.post(
          'https://studenthub-backend-4m51.onrender.com/students',
          newStudent,
        )
      
        await this.getStudents()
      
        this.setState({
          name: '',
          course: '',
          age: '',
        })
      }
      else {
        const updatedStudent = {
          name,
          course,
          age,
        }
      
        await axios.put(
          `https://studenthub-backend-4m51.onrender.com/students/${editingId}`,
          updatedStudent,
        )
      
        await this.getStudents()
      
        this.setState({
          name: '',
          course: '',
          age: '',
          editingId: null,
        })
      }
    }

onClickDeleteStudent = async id => {
  const isConfirmed = window.confirm(
    'Are you sure you want to delete this student?',
  )

  if (!isConfirmed) {
    return
  }

  await axios.delete(
    `https://studenthub-backend-4m51.onrender.com/students/${id}`,
  )

  await this.getStudents()
}

    onClickEditStudent = id => {
      const {students} = this.state
      const selectedStudent = students.find(student => student.id === id)
      
      if (!selectedStudent) {
         return
      }
      
      this.setState({
        name: selectedStudent.name,
        course: selectedStudent.course,
        age: selectedStudent.age,
        editingId: id,
      })
    }

    onChangeSearch = (event) => {
      this.setState({
        searchInput : event.target.value,
      }) 
    }

      onClickCancelEdit = () => {
      this.setState({
        name: '',
        course: '',
        age: '',
        editingId: null,
      })
    }

      onClickSortStudents = () => {
        const {students} = this.state
        const sortedStudents = [...students]

        sortedStudents.sort((a, b) => {
          return a.name.localeCompare(b.name)
        })

        this.setState({
          students : sortedStudents
        })
      }

  render(){
    const {students, searchInput} = this.state
    const totalStudents = students.length

    const filteredStudents = students.filter(student => {
      return student.name.toLowerCase().includes(searchInput.toLocaleLowerCase())
    })

    return (
  <div className="dashboard-page">

    <div className="dashboard-title-section">
      <h1>Student Dashboard</h1>
      <p>Manage, search and organize your students efficiently.</p>
    </div>

    <div className="dashboard-wrapper">

      {/* LEFT PANEL */}

      <div className="left-panel">

        <div className="form-card">

          <h2>
            {this.state.editingId ? "Edit Student" : "Add Student"}
          </h2>

          <div className="input-group">
            <label>Name</label>

            <input
              id="name"
              type="text"
              placeholder="Student Name"
              value={this.state.name}
              onChange={this.onChangeName}
            />

            {this.state.nameError && (
              <p className="error-msg">Required*</p>
            )}
          </div>

          <div className="input-group">
            <label>Course</label>

            <input
              id="course"
              type="text"
              placeholder="Course Name"
              value={this.state.course}
              onChange={this.onChangeCourse}
            />

            {this.state.courseError && (
              <p className="error-msg">Required*</p>
            )}
          </div>

          <div className="input-group">
            <label>Age</label>

            <input
              id="age"
              type="number"
              placeholder="Age"
              value={this.state.age}
              onChange={this.onChangeAge}
            />

            {this.state.ageError && (
              <p className="error-msg">Required*</p>
            )}
          </div>

          <button
            className="add-btn"
            onClick={this.onClickAddStudent}
          >
            {this.state.editingId
              ? "Update Student"
              : "Add Student"}
          </button>

          {this.state.editingId && (
            <button
              className="cancel-btn"
              onClick={this.onClickCancelEdit}
            >
              Cancel
            </button>
          )}

        </div>

      </div>

      {/* RIGHT PANEL */}

      <div className="right-panel">

        <div className="toolbar">

          <div>
            <h2>Students</h2>
            <span>{totalStudents} Students</span>
          </div>

          <button
            className="sort-btn"
            onClick={this.onClickSortStudents}
          >
            Sort A → Z
          </button>

        </div>

        <input
          type="search"
          className="modern-search"
          placeholder="🔍 Search Student..."
          value={searchInput}
          onChange={this.onChangeSearch}
        />
      
      <div className="students-scroll">
              
        <div className="students-grid">
              
          {filteredStudents.map(student => (
          
            <div
              className="student-card"
              key={student.id}
            >
            
              <div className="student-info">
          
                <Link
                  to={`/students/${student.id}`}
                  className="student-name"
                >
                  {student.name}
                </Link>
          
                <span className="student-course">
                  {student.course}
                </span>
          
                <span className="student-age">
                  {student.age} yrs
                </span>
          
              </div>
          
              <div className="student-actions">
          
                <button
                  className="edit-btn"
                  onClick={() =>
                    this.onClickEditStudent(student.id)
                  }
                >
                  ✏ Edit
                </button>
                
                <button
                  className="delete-btn"
                  onClick={() =>
                    this.onClickDeleteStudent(student.id)
                  }
                >
                  🗑 Delete
                </button>
                
              </div>
                
            </div>
      
          ))}
      
        </div>
        
      </div>

      </div>

    </div>

  </div>
);
  }
}

export default StudentDashboard;