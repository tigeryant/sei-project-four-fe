function Hero({ image, name}){
  return(
    <section className="show-hero">
      <div className="container col-xxl-8 px-4 py-5">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-10 col-sm-8 col-lg-6">
            {/* {course && */}
              <img src={image} className="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy" />
            {/* // } */}
          </div>
          <div className="col-lg-6">
            {/* {course && */}
              <h1 className="display-5 fw-bold lh-1 mb-3">{name}</h1>
            {/* } */}
            {/* <p className="lead">Instructor image, name, length</p> */}
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              <button type="button" className="btn btn-primary btn-lg px-4 me-md-2">Enrol now</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero