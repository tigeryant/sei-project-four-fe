// import altnav, prereqcard
// import bootstrap from 'bootstrap'
import React from 'react'
import { useParams } from 'react-router'
// import { Link } from 'react-router-dom'
import { getSingleCourse } from '../../lib/api'

import BreadCrumb from './courseShowChildren/BreadCrumb'
import Hero from './courseShowChildren/Hero'
import AltNavbar from './courseShowChildren/AltNavbar'
import Overview from './courseShowChildren/Overview'
import Skills from './courseShowChildren/Skills'
// import Prerequisites from './courseShowChildren/Prerequisites'
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
          <Overview overview={course.overview} />
          <Skills />
        </>
      }

      <section id="instructor"></section>
      <section id="prerequisites">
        <div className="container">
          <h2><i className="bi bi-person"></i>Prerequisites</h2>
          <div
            id="carouselExampleCaptions"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>

            <div className="carousel-inner">
              {prereqs &&
                prereqs.map((prerequisite, index) => (
                  // the active class is dynamic - it is set conditionally, according to the (boolean) value of prerequisite.isFirstSlide
                  <div
                    key={`${prerequisite.toString()}-${index}`}
                    className={`carousel-item ${prerequisite.isFirstSlide ? 'active' : ''
                      }`}
                  >
                    {/* insert the prerequisite.image in the src */}
                    <img
                      src={prerequisite.image}
                      className="d-block w-100"
                      alt={prerequisite.name}
                    />
                    <div className="carousel-caption d-none d-md-block">
                      <h5>{prerequisite.name}</h5>
                      <p>
                        Some representative placeholder content for the first
                        slide.
                      </p>
                    </div>
                  </div>
                ))}

              {/* <div className="carousel-item active">
                <img src="https://i.imgur.com/XO1eXAM.jpg" className="d-block w-100" alt="..." />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Second slide label</h5>
                  <p>Some representative placeholder content for the second slide.</p>
                </div>
              </div> */}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </section>

      {/* <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="..." className="d-block w-100" alt="..."/>
          </div>
          <div className="carousel-item">
            <img src="..." className="d-block w-100" alt="..."/>
          </div>
          <div className="carousel-item">
            <img src="..." className="d-block w-100" alt="..."/>
          </div>
        </div>
      </div> */}

      {course && (
        <>
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
        </>
      )}

      <p>enroll now button (triggers an &aposenrol&apos modal)</p>
      <p>
        Prerequisite ids:{' '}
        {prereqs &&
          prereqs.map((prerequisite) => {
            return `id: ${prerequisite.id}, prerequisite image: ${prerequisite.image}, prerequisite name: ${prerequisite.name} `
          })}
      </p>
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
