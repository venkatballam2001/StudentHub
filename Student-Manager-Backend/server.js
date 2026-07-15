const express = require('express')
const cors = require('cors')
const path = require('path')

const {open} = require('sqlite')
const sqlite3 = require('sqlite3')

const app = express()

const dbPath = path.join(__dirname, 'app.db')
let db = null

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })

    const createTableQuery = `
  CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    course TEXT NOT NULL,
    age INTEGER NOT NULL
  );
`

await db.exec(createTableQuery)
    app.listen(3001, () => {
      console.log('Server Running at http://localhost:3001')
    })
  } catch (error) {
    console.log(`DB Error: ${error.message}`)
    process.exit(1)
  }
}

app.use(cors())
app.use(express.json())

app.get('/', (request, response) => {
  response.send('🚀 Student Manager Backend is Running...')
})

app.post('/students', async (request, response) => {
  const {name, course, age} = request.body

  const insertStudentQuery = `
    INSERT INTO students (name, course, age)
    VALUES (?, ?, ?);
  `

  const result = await db.run(insertStudentQuery, [
    name,
    course,
    age,
  ])

  response.send({
    message: 'Student Added Successfully',
    studentId: result.lastID,
  })
})

app.get('/students', async (request, response) => {
  const getStudentsQuery = `
    SELECT *
    FROM students
    ORDER BY id DESC;
  `

  const students = await db.all(getStudentsQuery)

  response.send(students)
})

app.get('/stats', async (request, response) => {
  const query = `
    SELECT COUNT(*) AS totalStudents
    FROM students;
  `

  const result = await db.get(query)

  response.send(result)
})

app.delete('/students/:id', async (request, response) => {
  const {id} = request.params

  const deleteStudentQuery = `
    DELETE FROM students
    WHERE id = ?;
  `

  await db.run(deleteStudentQuery, [id])

  response.send({
    message: 'Student Deleted Successfully',
  })
})

app.put('/students/:id', async (request, response) => {
  const {id} = request.params
  const {name, course, age} = request.body

  const updateStudentQuery = `
    UPDATE students
    SET
      name = ?,
      course = ?,
      age = ?
    WHERE id = ?;
  `

  await db.run(updateStudentQuery, [
    name,
    course,
    age,
    id,
  ])

  response.send({
    message: 'Student Updated Successfully',
  })
})

initializeDBAndServer()