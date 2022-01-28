import React from 'react'
import Slider from 'react-slick'

const Prerequisites = ({ slides }) => {
  const settings = {
    arrows: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }
  return (
    <section id="prerequisites" className="pb-5">
      {/* give this div a className and manipulate it through the stylesheet */}
      <h2><i className="bi bi-person"></i>Prerequisites</h2>
      <div>
        <Slider {...settings}>
          {slides.map((slide) => (
            <div key={slide.id} className="slide-container" >
              <img src={slide.image} alt="" />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  )
}

export default Prerequisites