// import altnav, prereqcard
// import bootstrap from 'bootstrap'

function CourseShow() {
  return (
    <>
      {/* remember to wrap everything in a section */}
      <h1>This is the course show page</h1>
      <p>breadcrumb goes here</p>
      <p>splash image</p>
      <p>course title</p>
      <p>instructor name and image</p>
      <p>length of course</p>
      <p>enroll now button (triggers an &apos;enrol&apos; modal)</p>
      <h3>alternative navbar</h3>
      <h2>Overview</h2>
      <p>text goes here</p>
      <h2>Prerequisites</h2>
      <p>Insert prereq cards here</p>
      <h2>Instructor</h2>
      <p>instructor profile image and info</p>
      <h2>Syllabus</h2>
      <p>Accordion with mini description of each weekly syllabus goes here</p>
      <p>see full syllabus button, links to &apos;courses/:courseId/full-syllabus&apos;</p>
      <h2>Reviews</h2>
      <p>list group of reviews</p>
      <p>the final element of the list group is a review form (textbox)</p>
      <p>if not logged in, &apos;log in to leave a review&apos;</p>
    </>
  )
}

export default CourseShow