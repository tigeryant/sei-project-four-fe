import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
// import axios from 'axios'

// import home, courseindex, courseshow, fullsyllabus, login, register, enrol
// nav, footer
import Home from './components/common/Home'

// coursecard and prereqcard not necessary here, maybe fullsyllabus is not necessary here?

function App() {
  //   React.useEffect(() => {
  //     const getData = async () => {
  //       const res = await axios.get('/api/courses')
  //       console.log(res)
  //     }
  //     getData()
  //   })

  return (
    <BrowserRouter>
      {/* <Nav /> */}
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        {/* <Route path="/courses/:courseId/full-syllabus">
          <FullSyllabus />
        </Route>
        <Route path="/courses/:courseId">
          <CourseShow />
        </Route>
        <Route path="/courses">
          <CourseIndex />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route> */}

      </Switch>
      {/* <Footer /> */}
    </BrowserRouter>
  )
}

export default App
