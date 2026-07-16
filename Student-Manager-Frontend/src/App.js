import {Component} from 'react'
import {Routes, Route} from 'react-router-dom'

import Navbar from './components/Navbar'
import Home from './components/Home'
import Dashboard from './components/Dashboard'
import About from './components/About'
import StudentDetails from './components/StudentDetails'
import NotFound from './components/NotFound'

class App extends Component {
  render() {
    return (
      <>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/about" element={<About />} />

          <Route
            path="/students/:id"
            element={<StudentDetails />}
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </>
    )
  }
}

export default App