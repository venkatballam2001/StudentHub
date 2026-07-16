import {Component} from 'react'

class AddStudent extends Component {
  state = {
    name: '',
    course: '',
    age: '',
    nameError: false,
    courseError: false,
    ageError: false,
  }

  onChangeName = event => {
    this.setState({
      name: event.target.value,
      nameError: false,
    })
  }

  onChangeCourse = event => {
    this.setState({
      course: event.target.value,
      courseError: false,
    })
  }

  onChangeAge = event => {
    this.setState({
      age: event.target.value,
      ageError: false,
    })
  }

  onClickAddStudent = () => {
    const {name, course, age} = this.state

    const nameError = name.trim() === ''
    const courseError = course.trim() === ''
    const ageError = age.trim() === ''

    if (nameError || courseError || ageError) {
      this.setState({
        nameError,
        courseError,
        ageError,
      })
      return
    }

    this.props.addStudent({
      name,
      course,
      age,
    })

    this.setState({
      name: '',
      course: '',
      age: '',
    })
  }

  render() {
    const {
      name,
      course,
      age,
      nameError,
      courseError,
      ageError,
    } = this.state

    return (
      <div className="app-container">
        <h1>Add Student</h1>

        <div className="form-container">
          <label htmlFor="name">Name</label>

          <input
            id="name"
            type="text"
            placeholder="Enter Your Name"
            value={name}
            onChange={this.onChangeName}
          />

          {nameError && <p className="error-msg">Required*</p>}

          <label htmlFor="course">Course</label>

          <input
            id="course"
            type="text"
            placeholder="Enter Your Course"
            value={course}
            onChange={this.onChangeCourse}
          />

          {courseError && <p className="error-msg">Required*</p>}

          <label htmlFor="age">Age</label>

          <input
            id="age"
            type="number"
            placeholder="Enter Your Age"
            value={age}
            onChange={this.onChangeAge}
          />

          {ageError && <p className="error-msg">Required*</p>}

          <button
            type="button"
            onClick={this.onClickAddStudent}
          >
            Add Student
          </button>
        </div>
      </div>
    )
  }
}

export default AddStudent