// import altnav, prereqcard
// import bootstrap from 'bootstrap'
import React from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { getSingleCourse } from '../../lib/api';

import Hero from './courseShowChildren/Hero';
import Overview from './courseShowChildren/Overview';
// import Skills from './courseShowChildren/Skills'
// import Prerequisites from './courseShowChildren/Prerequisites'
// import Instructor from './courseShowChildren/Instructor'
import Syllabus from './courseShowChildren/Syllabus';
// import Reviews from './courseShowChildren/Reviews'

function CourseShow() {
  const { courseId } = useParams();
  const [course, setCourse] = React.useState(null);
  const [prereqs, setPrereqs] = React.useState([]);

  // FETCH COURSE DATA

  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await getSingleCourse(courseId);

        res.data.weeklySyllabuses.map((syllabus) => {
          if (syllabus.week === 1) {
            syllabus.isFirstWeek = true;
          } else {
            syllabus.isFirstWeek = false;
          }
        });
        setCourse(res.data);
      } catch {
        console.error('error fetching course data');
      }
    };
    getData();
  }, [courseId]);

  // FETCH COURSE PREREQUISITES
  React.useEffect(() => {
    if (course) {
      const promises = course.prerequisites.map((id) => getSingleCourse(id));
      Promise.all([...promises])
        .then((values) => values.map((value) => value.data))
        .then((data) =>
          data.map((course, index) =>
            index === 0
              ? { ...course, isFirstSlide: true }
              : { ...course, isFirstSlide: false }
          )
        )
        .then((data) => setPrereqs(data));
    }
  }, [course]);

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/courses">Courses</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {course && course.name}
          </li>
        </ol>
      </nav>

      {course && <Hero image={course.image} name={course.name}></Hero>}

      <nav
        className="navbar navbar-expand-md navbar-dark bg-dark"
        aria-label="Fourth navbar example"
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Expand at md
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarsExample04"
            aria-controls="navbarsExample04"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarsExample04">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#overview">
                  Overview
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#prerequisites">
                  Prerequisites
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#instructor">
                  Instructor
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#syllabus">
                  Syllabus
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#reviews">
                  Reviews
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled">Disabled</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {course && <Overview overview={course.overview} />}

      <h3>skills, prereqs and instructor go here</h3>

      <section id="skills"></section>
      <section id="instructor"></section>

      <section id="prerequisites">
        <div className="container">
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
                    className={`carousel-item ${
                      prerequisite.isFirstSlide ? 'active' : ''
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
        <Syllabus weeklySyllabuses={course.weeklySyllabuses} id={course.id} />
      )}

      <h5>Insert a see full syllabus button here</h5>

      <section id="reviews">
        <div className="container-md">
          <h3>
            <i className="bi bi-chat-square-quote"></i>Reviews
          </h3>
          <ul className="list-group">
            {course &&
              course.reviews.map((review) => {
                return (
                  <li className="list-group-item" key={review.id}>
                    review owner: {review.owner}
                    review rating: {review.rating}
                    review content: {review.content}
                  </li>
                );
              })}
            <li className="list-group-item">
              Text input and submit button for reviews
            </li>
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
      <p>
        Prerequisite ids:{' '}
        {prereqs &&
          prereqs.map((prerequisite) => {
            return `id: ${prerequisite.id}, prerequisite image: ${prerequisite.image}, prerequisite name: ${prerequisite.name} `;
          })}
      </p>
      {/* <p>{prereqs && console.log('prereqs in JSX: ', prereqs, 'type of prereqs: ', typeof prereqs)}</p> */}
      <p>carousel</p>
      <h2>Instructor</h2>
      <p>
        instructor profile image: {course && course.instructorImage}, instructor
        bio: {course && course.instructorBio}, instructor name:{' '}
        {course && course.instructorName}
      </p>
      <h2>Reviews</h2>
      <p>list group of reviews</p>
      <h4>
        {course &&
          course.reviews.map((review) => {
            return (
              <p key={review.id}>
                review owner: {review.owner}
                <br />
                review rating: {review.rating}
                <br />
                review content: {review.content}
                <br />
              </p>
            );
          })}
      </h4>
      <p>the final element of the list group is a review form (textbox)</p>
      <p>if not logged in, &apos;log in to leave a review&apos;</p>
    </>
  );
}

export default CourseShow;
