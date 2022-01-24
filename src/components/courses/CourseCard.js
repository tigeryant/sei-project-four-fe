import { Link } from 'react-router-dom'

function CourseCard({ courseId, image, name, length }) {
  return (
    <>
      <div className="col-sm-6 col-lg-4">
        <Link to={`/courses/${courseId}`}>
          <div className="card p-4 m-1" >
            <img src={image} className="card-img-top" style={{ objectFit: "cover" }} alt={'image of ', name}></img>
            <div className="card-body">
              <h5 className="card-title">{name}</h5>
              <p className="card-text">{length} weeks</p>
            </div>
          </div>
        </Link>
      </div>
    </>
  )
}

export default CourseCard