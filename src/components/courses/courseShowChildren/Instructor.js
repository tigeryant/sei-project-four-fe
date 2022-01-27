function Instructor({ image, name, bio}) {
  return (
    <section id="instructor">
      <div className="container px-4">
        <div className="row gx-4 justify-content-center">
          <div className="col-lg-10">
            <h2><i className="bi bi-person"></i>Instructor</h2>
            <p>Instructor name: {name}</p>
            <p>Instructor image: {image}</p>
            <p className="lead">{bio}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Instructor