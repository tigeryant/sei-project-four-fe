import React from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router'

import { getSingleCourse } from '../../lib/api'

function FullSyllabus() {
  const { courseId } = useParams()
  const [course, setCourse] = React.useState(null)

  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await getSingleCourse(courseId)
        setCourse(res.data)
      } catch (err) {
        // setIsError(true)
        console.log('error fetching course data')
      }
    }
    getData()
  }, [])

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/courses">Courses</Link></li>
          <li className="breadcrumb-item">
            {course && <Link to={`/courses/${course.id}`}>{course && course.name}</Link>}
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Full Syllabus
          </li>
        </ol>
      </nav>

      <section>
        <div className="container-md py-5" style={{ marginBottom: "20vh" }}>
          <ul className="list-group">
            {course &&
              course.weeklySyllabuses.map(syllabus => {
                return (
                <li className="list-group-item" key={syllabus.week}>
                    <h5>Week: {syllabus.week}</h5>
                    {/* <p className="lead">hello</p> */}
                    <p>{syllabus.content}</p>
                </li>
                )
              })
            }
          </ul>
        </div>
      </section>
    </>
  )
}

export default FullSyllabus