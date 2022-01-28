import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <>
      {/* <nav className="navbar navbar-expand-md navbar-light">
        <div className="container-xxl">
          <span className="navbar-brand">
            <Link to="/">
              🔐 Logo
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
              <li className="nav-item">Register</li>
              <li className="nav-item">Login</li> */}
              {/* add list items here that trigger the register and login links */}
            {/* </ul>
          </div>
        </div>
      </nav > */}

      <nav className="navbar navbar-expand-md navbar-dark bg-dark" aria-label="Fourth navbar example">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">CryptoAcademy</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarsExample04">
            <ul className="navbar-nav ms-auto mb-2 mb-md-0">
              {/* <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li> */}
              <li>
                <a className="nav-link btn" href="#">Register</a>
              </li>
              <li>
                {/*   btn btn-primary text-light */}
                <a className="nav-link" href="#">Login</a> 
              </li>
            </ul>
            {/* <form>
              <input className="form-control" type="text" placeholder="Search" aria-label="Search" />
            </form> */}
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar