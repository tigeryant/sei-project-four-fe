function Overview({ overview }) {
  return (
    <section id="overview">
      <div className="container px-4">
        <div className="row gx-4 justify-content-center">
          <div className="col-lg-10">
            <h2><i className="bi bi-file-earmark-text"></i>Overview</h2>
            <p className="lead">{overview}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Overview