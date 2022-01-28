function Reviews({ reviews }) {
  return (
    <section id="reviews" className="pb-5">
      <h3>
        <i className="bi bi-chat-square-quote"></i>Reviews
      </h3>
      <ul className="list-group">
        {/* {course && */}
        {reviews.map((review) => {
          return (
            <li className="list-group-item" key={review.id}>
              <p style={{ display: "block" }}>review owner: {review.owner}</p>
              <p style={{ display: "block" }}>review rating: {review.rating}</p>
              <p style={{ display: "block" }}>review content: {review.content}</p>
            </li>
          )
        })}
        <li className="list-group-item">
          Text input and submit button for reviews
        </li>
      </ul>
      <p className="btn btn-primary mt-3 mb-3">Leave a review</p>
    </section>
  )
}

export default Reviews