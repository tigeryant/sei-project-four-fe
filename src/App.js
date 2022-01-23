import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

// import home, courseindex, courseshow, fullsyllabus, login, register, enrol
// nav, footer
import Navbar from './components/common/Navbar'
import Home from './components/common/Home'
import FullSyllabus from './components/courses/FullSyllabus'
import CourseShow from './components/courses/CourseShow'
import CourseIndex from './components/courses/CourseIndex'
import Footer from './components/common/Footer'

// coursecard and prereqcard not necessary here, maybe fullsyllabus is not necessary here?

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/courses/:courseId/full-syllabus">
          <FullSyllabus />
        </Route>
        <Route path="/courses/:courseId">
          <CourseShow />
        </Route>
        <Route path="/courses">
          <CourseIndex />
        </Route>
        {/* <Route path="/register">
          <Register />
        </Route> */}
        {/* <Route path="/login">
          <Login />
        </Route> */}

      </Switch>
      <Footer />
    </BrowserRouter>
  )
}

export default App
