import React from 'react'
import './Reviews.css'

function Reviews() {
  return (
    <div>
      Reviews
      <div className="card p-2 text-start">
        <div className="row">
          <div className="col-md-3">
            <img
              src="https://s3-media0.fl.yelpcdn.com/bphoto/6RBGesGTGfzEqm6AYd78qQ/ls.jpg"
              alt=""
            />
          </div>
          <div className="col">
            <p className="title">0xf4eA652F5B7b55f1493631Ea4aFAA63Fe0acc27C</p>
            <div className="d-flex justify-content-between align-items-center">
              <div className="ratings">
                <i className="fa fa-star rating-color"></i>
                <i className="fa fa-star rating-color"></i>
                <i className="fa fa-star rating-color"></i>
                <i className="fa fa-star rating-color"></i>
                <i className="fa fa-star"></i>
              </div>
              <p className="">Useful Review</p>
            </div>
            <p>
              <i class="fa fa-check-square"></i> Verified
            </p>
            This company was great and spacious. The building management was
            always responsive and effective during our time living there. 100 %
            reccomedable!
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reviews
