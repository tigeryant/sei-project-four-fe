function Reviews({ reviews }) {
  return (
    <section id="reviews">
      <div className="container-md">
        <h3>
          <i className="bi bi-chat-square-quote"></i>Reviews
        </h3>
        <ul className="list-group">
          {/* {course && */}
          {reviews.map((review) => {
            return (
              <li className="list-group-item" key={review.id}>
                review owner: {review.owner}
                review rating: {review.rating}
                review content: {review.content}
              </li>
            )
          })}
          <li className="list-group-item">
            Text input and submit button for reviews
          </li>
        </ul>
      </div>
      <p>Leave a review</p>
    </section>
  )
}

export default Reviews