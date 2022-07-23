import React from 'react'
import './EmploymentLetterDocument.css'
export default function EmploymentLetterDocument() {
  return (
    <div className="container">
      <br />
      <div className="left">
        <button type="button" className="btn btn-lg btn-warning">
          Print
        </button>
        <button type="button" className="btn btn-lg btn-info">
          Email
        </button>
      </div>

      <div className="mycontainer">
        <div className="header">
          <div className="item">John Lee</div>
          <div className="item">Manager</div>
          <div className="item">Spootify</div>
          <div className="item">john.lee@spootify.com</div>
          <div className="item">123 Business Road Business City, NY 54321</div>
          <div className="about">
            <br />
            <br />
            <p>To Whom it May Concern:</p>
            <div className="recommendation">
              <p>
                I highly recommend Joe as a candidate for employment. Joe was
                employed by Acme Retail as an Administrative Assistant from 2018
                to 2021. Joe was responsible for office support, including word
                processing, scheduling appointments, and creating brochures,
                newsletters, and other office literature.
              </p>

              <p>
                Joe has excellent communication skills. In addition, she is
                extremely organized, reliable, and computer literate. Joe can
                work independently and is able to follow through to ensure that
                the job gets done. She is flexible and willing to work on any
                project that is assigned to her. Joe was quick to volunteer to
                assist in other areas of company operations, as well.
              </p>

              <p>
                Joe would be a tremendous asset to your company and has my
                highest recommendation. If you have any further questions
                regarding her background or qualifications, please do not
                hesitate to contact me.
              </p>
            </div>
            <div class="section">
              <div className="section__title">Sincerely,</div>
              <div className="item">John Lee</div>
              <div className="item">Manager</div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
    </div>
  )
}
