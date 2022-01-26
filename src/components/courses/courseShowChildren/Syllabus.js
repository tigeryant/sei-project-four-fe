import { Link } from 'react-router-dom'

function Syllabus({ weeklySyllabuses, id }) {
  return (
    <section id="syllabus">
      <div className="container-lg">
        <h3><i className="bi bi-book"></i>Syllabus</h3>
        <div className="accordion" id="accordionExample">
          {/* {course && */}
          {weeklySyllabuses.map(syllabus => {
            return (
              <div className="accordion-item" key={syllabus.week}>
                {/* make the id dynamic */}
                <h2 className="accordion-header" id={`heading-${syllabus.week}`}>
                  <button
                    // add collapsed if syllabus.isFirstWeek is false
                    className={`accordion-button ${syllabus.isFirstWeek ? '' : 'collapsed'}`}
                    type="button" data-bs-toggle="collapse"
                    // make this dynamic
                    data-bs-target={`#collapse-${syllabus.week}`}
                    // make this dynamic
                    aria-expanded={`${syllabus.isFirstWeek ? 'true' : 'false'}`}
                    // make this dynamic
                    aria-controls={`collapse-${syllabus.week}`}>
                    Week {syllabus.week}
                  </button>
                </h2>
                {/* make id dynamic, make the show class dynamic */}
                <div id={`collapse-${syllabus.week}`}
                  className={`accordion-collapse collapse ${syllabus.isFirstWeek ? 'show' : ''}`}
                  // make this dynamic
                  aria-labelledby={`heading-${syllabus.week}`} data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    {syllabus.description}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        {/* {course && */}
        <Link
          to={`/courses/${id}/full-syllabus`}>
          See full syllabus
        </Link>
        {/* } */}
      </div>
    </section>
  )
}

export default Syllabus