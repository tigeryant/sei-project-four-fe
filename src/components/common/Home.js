// import link and courseindex component

import { Link } from 'react-router-dom'
// import CourseIndex from "../courses/CourseIndex"

function Home() {
  return (
    <>
      <section>
        <div style={{ backgroundImage: "url(../../assets/raphael-school-of-athens.jpeg)", height: "100vh" }} className="hero text-light">
          <h1>CryptoAcademy</h1>
          <button type="button" className="btn btn-primary">
            <Link to="/courses" className="text-light">Browse Courses
            </Link>
          </button>
        </div>
      </section>
    </>
  )
}

export default Home