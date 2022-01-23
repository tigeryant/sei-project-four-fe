import React from 'react'
import { getAllCourses } from '../../lib/api'
import CourseCard from './CourseCard'

function CourseIndex() {
  const [courses, setCourses] = React.useState(null)

  // put a useEffect here that makes an API call
  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await getAllCourses()
        setCourses(res.data)
      } catch (err) {
        // setIsError(true)
        console.log('error fetching course data')
      }
    }
    getData()
  }, [])

  return (
    <>
      <h1>This is the course index page</h1>
      <p>course cards go here</p>
      {/* wrap the cards in a container */}
      {courses &&
      courses.map(course => (
        <CourseCard
        key={course.id}
        image={course.image}
        name={course.name}
        length={course.length}
        />
      ))}
    </>
  )
}

export default CourseIndex