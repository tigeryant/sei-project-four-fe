// import altnav, prereqcard
// import bootstrap from 'bootstrap'
import React from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { getSingleCourse } from '../../lib/api'

function CourseShow() {
  // make an api call here, 'getSingleCourse' to display the information

  const { courseId } = useParams()
  const [course, setCourse] = React.useState(null)
  const [prereqs, setPrereqs] = React.useState([])

  // simplify this later, it can be done with one hook
  const fetchCourse = React.useCallback(() => {
    const getData = async () => {
      try {
        const res = await getSingleCourse(courseId)
        console.log('res.data from course:', res.data)
        setCourse(res.data)
      } catch {
        // setIsError(true)
        console.log('error fetching course data')
        console.log('courseId: ', courseId)
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
        console.log('res.data from prereq', res.data)
        setPrereqs(prereqs.push(res.data))
      } catch (err) {
        // setIsError(true)
        console.log('error fetching prereq data')
      }
    }
    if (course) {
      course.prerequisites.map(prerequisiteId => {
        getPrereqData(prerequisiteId)
        console.log('prereqs in useeffect: ', prereqs)
      })
    }
  }, [course])

  return (
    <>
      {/* remember to wrap everything in a section */}
      <h1>This is the course show page</h1>
      <p>breadcrumb goes here</p>
      <p>splash image url: {course && course.image}</p>
      <p>course name: {course && course.name}</p>
      <p>instructor name: {course && course.instructorName}</p>
      <p>instructor image url: {course && course.instructorImage}</p>
      <p>length of course: {course && course.length} weeks</p>
      <p>enroll now button (triggers an &apos;enrol&apos; modal)</p>
      <h3>alternative navbar</h3>
      <h2>Overview</h2>
      <p>overview content: {course && course.overview}</p>
      <h2>Prerequisites</h2>
      <p>Links to prereq cards go here, insert a carousel</p>
      {/* <p>Prerequisite ids: {prereqs &&
        prereqs.map(prerequisite => {
          return `id: ${prerequisite.id}, `
        })}</p> */}
        <p>{prereqs && console.log('prereqs in JSX: ', prereqs)}</p>
      <p>carousel</p>
      <h2>Instructor</h2>
      <p>instructor profile image: {course && course.instructorImage}, instructor bio: {course && course.instructorBio}, instructor name: {course && course.instructorName}</p>
      <h2>Syllabus</h2>
      <p>Accordion with mini description of each weekly syllabus goes here</p>
      <p><strong>Syllabuses</strong> {course &&
        course.weeklySyllabuses.map(syllabus => {
          return `description: ${syllabus.description}, link`
        })}
      </p>
      {course &&
        <Link to={`/courses/${course.id}/full-syllabus`}>
          <p>see full syllabus button
          </p>
        </Link>
      }
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