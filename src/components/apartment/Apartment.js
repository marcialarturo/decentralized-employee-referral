import React from 'react'
import './Apartment.css'
import TabsNabvar from './TabsNabvar'
import XmtpChat from '../xmtp-chat/XmtpChat'
import CovalentGetNfts from '../covalent-get-nfts/CovalentGetNfts'
import apt from './apt.png'
import { useNavigate } from 'react-router-dom'

function Apartment({ currentApt, signer, currentAccount }) {
  const navigate = useNavigate()

  const redirectToChat = () => {
    navigate('/chat')
  }

  return (
    <div className="m-4">
      <p>Company / Details</p>
      <header>
        <div className="img-apartment">
          <div
            style={{
              background: `url(${apt}) no-repeat`,
              backgroundPosition: 'center bottom',
              backgroundSize: '100%',
              height: '500px',
              display: 'flex',
              justifyContent: 'space-between',
              color: 'white',
              fontWeight: '600',
            }}
          >
            <div className="apartment-inner">
              <div className="bg-black">
                <h2>{currentApt.name} 's Details </h2>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="ratings">
                    <i className="fa fa-star rating-color"></i>
                    <i className="fa fa-star rating-color"></i>
                    <i className="fa fa-star rating-color"></i>
                    <i className="fa fa-star rating-color"></i>
                    <i className="fa fa-star"></i> 12 Reviews
                  </div>
                </div>
                <p>
                  <p>
                    <i class="fa fa-check-square"></i> Verified Company Agent
                  </p>
                  <p>
                    <i class="fa fa-calendar-check-o" aria-hidden="true"></i>{' '}
                    Available by Appointments
                  </p>
                </p>
              </div>
            </div>
            <div className="apartment-inner2">
              <button type="button" className="btn btn-lg btn-warning">
                Write a review
              </button>
              <button
                type="button"
                className="btn btn-lg btn-primary"
                onClick={redirectToChat}
              >
                Request Reference
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="card p-2">
        <div className="row">
          <div className="col-md-3">
            <img src={currentApt.image} alt="" className="current-apt-img" />
          </div>
          <div className="col-md-9">
            <br />
            <p className="title">{currentApt.name}</p>

            <div className="d-flex justify-content-between align-items-center">
              <div className="ratings">
                <i className="fa fa-star rating-color"></i>
                <i className="fa fa-star rating-color"></i>
                <i className="fa fa-star rating-color"></i>
                <i className="fa fa-star rating-color"></i>
                <i className="fa fa-star"></i>
              </div>
              <p className="">12 Reviews</p>
            </div>
            <p>
              <i class="fa fa-check-square"></i> {currentApt.name} is an
              official and registered company.
            </p>

            <p>
              <i class="fa fa-calendar-check-o" aria-hidden="true"></i> Located
              at {currentApt.company}
            </p>
            <p>
              <i class="fa fa-calendar-check-o" aria-hidden="true"></i> Created{' '}
              {currentApt.created}
            </p>
            <p>
              <i class="fa fa-calendar-check-o" aria-hidden="true"></i> Website{' '}
              <a
                href={`http://${currentApt.status}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {currentApt.status}
              </a>
            </p>

            <p> Description: {currentApt.info}</p>
          </div>
        </div>
      </div>

      {/*TABS  */}
      <TabsNabvar />
      <CovalentGetNfts />
    </div>
  )
}

export default Apartment
