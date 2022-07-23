import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './PostApartment.css'
import { NFTStorage, File } from 'nft.storage'
import { apiKey } from '../APIKEYS'

function PostApartment() {
  const navigate = useNavigate()
  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(false)
  const [company, setCompany] = useState('Google')
  const [companySite, setCompanySite] = useState('Google')
  const [description, setDescription] = useState(
    'LLC is an American multinational technology company that focuses on artificial intelligence, search engine technology, online advertising, cloud computing, computer software, quantum computing, e-commerce, and consumer electronics.',
  )
  const [address, setAddress] = useState('1 Palo Alto California 50024')
  const [imageName, setImageName] = useState('')
  const [imageType, setImageType] = useState('')

  const handleImage = (event) => {
    setImage(event.target.files[0])
    setImageName(event.target.files[0].name)
    setImageType(event.target.files[0].type)
  }

  const checkHeightWidth = ({ target: img }) => {
    const { offsetHeight, offsetWidth } = img
    if (Math.abs(offsetHeight - offsetWidth) > 20) {
      alert(
        'The image should have the same height and width, please try again!',
      )
      window.location.reload()
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log('company', address, company, companySite, description)
    try {
      setLoading(true)
      const client = new NFTStorage({ token: apiKey })
      const metadata = await client.store({
        name: company,
        description: `${description},$, ${address},$,${companySite}`,
        image: new File([image], imageName, { type: imageType }),
      })
      if (metadata) {
        navigate('/')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="container">
      <div className="mb-3 text-center">
        <br />
        <h2>Register your company</h2>
        {image ? (
          <img
            src={URL.createObjectURL(image)}
            onLoad={checkHeightWidth}
            alt="pet"
            className="img-preview"
          />
        ) : (
          ''
        )}
      </div>

      <div className="content-form">
        <div className="card" style={{ width: '55%' }}>
          <form action="" className="form-inline" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">
                Image
                <span className="text-small"> *should be square</span>
              </label>
              <input
                className="form-control"
                type="file"
                id="formFile"
                defaultValue={image}
                onChange={handleImage}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="company" className="form-label">
                Company Name
              </label>
              <input
                type="text"
                className="form-control"
                id="company"
                placeholder="Google"
                defaultValue={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                placeholder="Palo Alto California"
                defaultValue={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="website" className="form-label">
                Website
              </label>
              <input
                type="text"
                className="form-control"
                id="website"
                placeholder="google.com"
                onChange={(e) => setCompanySite(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Description
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                placeholder=""
                defaultValue={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* loading icons */}
            <div className="mb-3">
              {loading ? (
                <div>
                  <h3>Posting...</h3>
                  <div className="spinner-grow text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <div className="spinner-grow text-secondary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <div className="spinner-grow text-success" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <div className="spinner-grow text-danger" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <div className="spinner-grow text-warning" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <div className="spinner-grow text-info" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <div className="spinner-grow text-light" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <div className="spinner-grow text-dark" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  {/* <button className="btn btn-primary" type="button" disabled>
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>{' '}
                    Posting...
                  </button> */}
                </div>
              ) : (
                ''
              )}
            </div>

            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PostApartment
