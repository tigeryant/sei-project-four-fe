import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar navbar-expand-md navbar-light">
      <div className="container-xxl">
        <span className="navbar-brand">
          <Link to="/">
            🔐 Navbar
          </Link>
        </span>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main-nav" aria-controls="main-nav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end align-center" id="main-nav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/courses">Courses</Link>
            </li>
            {/* add list items here that trigger the register and login links */}
          </ul>
        </div>
      </div>
    </nav >
  )
}

export default Navbar