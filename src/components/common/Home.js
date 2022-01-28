import { Link } from 'react-router-dom'

function Home() {
  return (
    <>
      <section>
        {/* why is this hero div not wrapping anything? because of the background filter? */}
        <div className="hero">
        </div>
        <div className="row">
          <div className="col-lg-8 backdrop-cover text-light">
            <h1 className="home-title" style={{ marginTop: "-35vh", zIndex: "0" }}>CryptoAcademy</h1>
            <button type="button" className="btn btn-primary hero-button" style={{ zIndex: "0" }}>
              <Link to="/courses" className="bg-light hero-link">Browse Courses
              </Link>
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home