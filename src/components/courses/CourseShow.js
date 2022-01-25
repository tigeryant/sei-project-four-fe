// import altnav, prereqcard
// import bootstrap from 'bootstrap'
import React from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { getSingleCourse } from '../../lib/api'

import FullSyllabus from './FullSyllabus'

function CourseShow() {
  // make an api call here, 'getSingleCourse' to display the information

  const { courseId } = useParams()
  const [course, setCourse] = React.useState(null)
  const [prereqs, setPrereqs] = React.useState([])

  // assign to each of the course.weeklySyllabuses a boolean that is True if
  // week === 1 and false otherwise

  // simplify this later, it can be done with one hook
  const fetchCourse = React.useCallback(() => {
    const getData = async () => {
      try {
        const res = await getSingleCourse(courseId)
        console.log('res.data from course:', res.data)

        res.data.weeklySyllabuses.map(syllabus => {
          if (syllabus.week === 1) {
            syllabus.isFirstWeek = true
          } else {
            syllabus.isFirstWeek = false
          }
        })

        setCourse(res.data)
      } catch {
        // setIsError(true)
        console.log('error fetching course data')
      }
    }
    getData()
  }, [courseId])

  React.useEffect(() => {
    fetchCourse()
  }, [courseId, fetchCourse])

  React.useEffect(() => {
    const getPrereqData = async (prerequisiteId) => {
      try {
        const res = await getSingleCourse(prerequisiteId)
        setPrereqs(prevPrereqs => [...prevPrereqs, res.data])
        console.log('prereqs: ', prereqs)
      } catch (err) {
        // setIsError(true)
        console.log('error fetching prereq data')
      }
    }
    if (course) {
      course.prerequisites.map(prerequisiteId => {
        getPrereqData(prerequisiteId)
      })
    }
  }, [course])

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/courses">Courses</Link></li>
          <li className="breadcrumb-item active" aria-current="page">
            {course && course.name}
          </li>
        </ol>
      </nav>

      <section className="show-hero">
        <div className="container col-xxl-8 px-4 py-5">
          <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
            <div className="col-10 col-sm-8 col-lg-6">
              {course &&
                <img src={course.image} className="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy" />
              }
            </div>
            <div className="col-lg-6">
              {course &&
                <h1 className="display-5 fw-bold lh-1 mb-3">{course.name}</h1>
              }
              <p className="lead">Instructor image, name, length</p>
              <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                <button type="button" className="btn btn-primary btn-lg px-4 me-md-2">Enrol now</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <nav className="navbar navbar-expand-md navbar-dark bg-dark" aria-label="Fourth navbar example">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Expand at md</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarsExample04">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#overview">Overview</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#prerequisites">Prerequisites</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#instructor">Instructor</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#syllabus">Syllabus</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#reviews">Reviews</a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled">Disabled</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <section id="overview">
        <div className="container px-4">
          <div className="row gx-4 justify-content-center">
            <div className="col-lg-8">
              <h2><i className="bi bi-file-earmark-text"></i>Overview</h2>
              {course &&
                <p className="lead">{course.overview}</p>
              }
              <ul>
                <li>Clickable nav links that smooth scroll to page sections</li>
                <li>Responsive behavior when clicking nav links perfect for a one page website</li>
                <li>Bootstrap's scrollspy feature which highlights which section of the page you're on in the navbar</li>
                <li>Minimal custom CSS so you are free to explore your own unique design options</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <h3>skills, prereqs and instructor go here</h3>

      <section id="skills"></section>
      <section id="instructor"></section>

      <section id="prerequisites">
        <div className="container">
          <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>

            <div className="carousel-inner">
              {prereqs && prereqs.map(prerequisite => {
                {/* make the active part dynamic*/ }
                // active
                <div className="carousel-item">
                  {/* insert the prerequisite.image in the src */}
                  <img src={prerequisite.image} className="d-block w-100" alt={prerequisite.name} />
                  <div className="carousel-caption d-none d-md-block">
                    <h5>{prerequisite.name}</h5>
                    <p>Some representative placeholder content for the first slide.</p>
                  </div>
                </div>
              })}

              <div className="carousel-item active">
                <img src="https://i.imgur.com/XO1eXAM.jpg" className="d-block w-100" alt="..." />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Second slide label</h5>
                  <p>Some representative placeholder content for the second slide.</p>
                </div>
              </div>

            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
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

      <section id="syllabus">
        <div className="container-lg">
          <h3><i className="bi bi-book"></i>Syllabus</h3>
          <div className="accordion" id="accordionExample">
            {course &&
              course.weeklySyllabuses.map(syllabus => {
                // if syllabus.isFirstWeek,
                // render the first component
                // else, render the second
                // this will still require a little dynamic rendering

                return (
                  <div className="accordion-item" key={syllabus.week}>
                    {/* make the id dynamic */}
                    <h2 className="accordion-header" id={`heading-${syllabus.week}`}>
                      <button
                        // add collapsed if syllabus.isFirstWeek is false
                        className={`accordion-button ${syllabus.isFirstWeek ? '' : 'collapsed'}`}
                        type="button" data-bs-toggle="collapse"
                        // make this dynamic
                        data-bs-target={`#collapse-${syllabus.week}`}
                        // make this dynamic
                        aria-expanded={`${syllabus.isFirstWeek ? 'true' : 'false'}`}
                        // make this dynamic
                        aria-controls={`collapse-${syllabus.week}`}>
                        Week {syllabus.week}
                      </button>
                    </h2>
                    {/* make id dynamic, make the show class dynamic */}
                    <div id={`collapse-${syllabus.week}`}
                      className={`accordion-collapse collapse ${syllabus.isFirstWeek ? 'show' : ''}`}
                      // make this dynamic
                      aria-labelledby={`heading-${syllabus.week}`} data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        {syllabus.description}
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
          {course &&
            <Link
              to={`/courses/${course.id}/full-syllabus`}>
              See full syllabus
            </Link>
          }
        </div>
      </section>

      <h5>Insert a see full syllabus button here</h5>


      <section id="reviews">
        <div className="container-md">
          <h3><i className="bi bi-chat-square-quote"></i>Reviews</h3>
          <ul className="list-group">
            {course &&
              course.reviews.map(review => {
                return (<li className="list-group-item" key={review.id}>
                  review owner: {review.owner}
                  review rating: {review.rating}
                  review content: {review.content}
                </li>
                )
              })
            }
            <li className="list-group-item">Text input and submit button for reviews</li>
          </ul>
        </div>
        <p>Leave a review</p>
      </section>

      <p>instructor name: {course && course.instructorName}</p>
      <p>instructor image url: {course && course.instructorImage}</p>
      <p>length of course: {course && course.length} weeks</p>
      <p>enroll now button (triggers an &apos;enrol&apos; modal)</p>
      <h3>alternative navbar (delete this)</h3>
      <h2>Prerequisites</h2>
      <p>Links to prereq cards go here, insert a carousel</p>
      <p>Prerequisite ids: {prereqs &&
        prereqs.map(prerequisite => {
          return (
            `id: ${prerequisite.id}, prerequisite image: ${prerequisite.image}, prerequisite name: ${prerequisite.name}`
          )
        })}</p>
      {/* <p>{prereqs && console.log('prereqs in JSX: ', prereqs, 'type of prereqs: ', typeof prereqs)}</p> */}
      <p>carousel</p>
      <h2>Instructor</h2>
      <p>instructor profile image: {course && course.instructorImage}, instructor bio: {course && course.instructorBio}, instructor name: {course && course.instructorName}</p>
      <h2>Reviews</h2>
      <p>list group of reviews</p>
      <h4>{course &&
        course.reviews.map(review => {
          return (
            <p key={review.id}>
              review owner: {review.owner}<br />
              review rating: {review.rating}<br />
              review content: {review.content}<br />
            </p>
          )
        })}
      </h4>
      <p>the final element of the list group is a review form (textbox)</p>
      <p>if not logged in, &apos;log in to leave a review&apos;</p>
    </>
  )
}

export default CourseShow