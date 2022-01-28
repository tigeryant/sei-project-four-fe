function Instructor({ image, name, bio}) {
  return (
    <section id="instructor" className="pb-5">
      {/* <div className="container px-4">
        <div className="row gx-4 justify-content-center">
          <div className="col-lg-10"> */}
            <h2><i className="bi bi-person"></i>Instructor</h2>
            <p>Instructor name: {name}</p>
            <p>Instructor image: {image}</p>
            <p className="lead">{bio}</p>
    </section>
  )
}

export default Instructor