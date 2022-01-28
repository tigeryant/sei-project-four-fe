import { Link } from 'react-router-dom'

function Syllabus({ weeklySyllabuses, id }) {
  return (
    <section id="syllabus" className="pb-5">
        <h3><i className="bi bi-book"></i>Syllabus</h3>
        <div className="accordion" id="accordionExample">
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
        <Link
          to={`/courses/${id}/full-syllabus`}>
          See full syllabus
        </Link>
    </section>
  )
}

export default Syllabus