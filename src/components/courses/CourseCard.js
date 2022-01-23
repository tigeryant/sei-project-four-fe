import { Link } from 'react-router-dom'

function CourseCard({ image, name, length }) {
  return (
    <>
      <h4>This is a course card</h4>
      <p>image url: {image}</p>
      <p>name: {name}</p>
      <p>length: {length}</p>
    </>
  )
}

export default CourseCard