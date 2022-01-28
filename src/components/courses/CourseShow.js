// import altnav, prereqcard
// import bootstrap from 'bootstrap'
import React from 'react'
import { useParams } from 'react-router'
import { getSingleCourse } from '../../lib/api'

import BreadCrumb from './courseShowChildren/BreadCrumb'
import Hero from './courseShowChildren/Hero'
import AltNavbar from './courseShowChildren/AltNavbar'
import Overview from './courseShowChildren/Overview'
import Skills from './courseShowChildren/Skills'
import Prerequisites from './courseShowChildren/Prerequisites'
import Instructor from './courseShowChildren/Instructor'
import Syllabus from './courseShowChildren/Syllabus'
import Reviews from './courseShowChildren/Reviews'

function CourseShow() {
  const { courseId } = useParams()
  const [course, setCourse] = React.useState(null)
  const [prereqs, setPrereqs] = React.useState([])

  // FETCH COURSE DATA

  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await getSingleCourse(courseId)

        res.data.weeklySyllabuses.map((syllabus) => {
          if (syllabus.week === 1) {
            syllabus.isFirstWeek = true
          } else {
            syllabus.isFirstWeek = false
          }
        })
        setCourse(res.data)
      } catch {
        console.error('error fetching course data')
      }
    }
    getData()
  }, [courseId])

  // FETCH COURSE PREREQUISITES
  React.useEffect(() => {
    if (course) {
      const promises = course.prerequisites.map((id) => getSingleCourse(id))
      Promise.all([...promises])
        .then((values) => values.map((value) => value.data))
        .then((data) =>
          data.map((course, index) =>
            index === 0
              ? { ...course, isFirstSlide: true }
              : { ...course, isFirstSlide: false }
          )
        )
        .then((data) => setPrereqs(data))
    }
  }, [course])

  return (
    <>
      {course &&
        <>
          <BreadCrumb name={course.name} />
          <Hero image={course.image} name={course.name} />
          <AltNavbar />
        <div className="container-md ">
          <div className="row justify-content-center">
              <div className="col-lg-10 ">
                <Overview overview={course.overview} />
                <Skills />
                <div style={{ width: "100px" }}>
                  <Prerequisites slides={prereqs} />
                </div>
                <Instructor
                  image={course.instructorImage}
                  name={course.instructorName}
                  bio={course.instructorBio}
                />
                <Syllabus
                  weeklySyllabuses={course.weeklySyllabuses}
                  id={course.id}
                />
                <Reviews
                  reviews={course.reviews}
                />
              </div>
            </div>
          </div>
        </>
      }

      <p>enroll now button (triggers an &aposenrol&apos modal)</p>
      <p>
        instructor profile image: {course && course.instructorImage}, instructor
        bio: {course && course.instructorBio}, instructor name:{' '}
        {course && course.instructorName}
      </p>
      <p>the final element of the list group is a review form (textbox)</p>
      <p>if not logged in, &aposlog in to leave a review&apos</p>
    </>
  )
}

export default CourseShow
