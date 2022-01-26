function Overview({ overview }) {
  return (
    <section id="overview">
      <div className="container px-4">
        <div className="row gx-4 justify-content-center">
          <div className="col-lg-8">
            <h2><i className="bi bi-file-earmark-text"></i>Overview</h2>
            {/* {course && */}
              <p className="lead">{overview}</p>
            {/* } */}
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
  )
}

export default Overview