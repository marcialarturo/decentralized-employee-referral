import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './EmploymentLetterProfile.css'
import { db } from '../config-firebase'
import { collection, doc, updateDoc, getDocs, addDoc } from 'firebase/firestore'
import preview from '../../images/preview.png'
import {
  Grid,
  ImageListItem,
  ImageListItemBar,
  IconButton,
  Button,
  Typography,
} from '@material-ui/core'
export default function EmploymentLetterProfile() {
  const [letters, setLetters] = useState([])
  const usersCollectionRef = collection(db, 'references')
  const navigate = useNavigate()

  useEffect(() => {
    firebase()
  }, [])

  const insert = async () => {
    console.log('insert555')
    await addDoc(usersCollectionRef, {
      employeeName: 'Vixtor',
      company: 'Facebook',
      companySite: 'Facebook.com',
      recommendation: 'Victor was great!',
      address: '345 Seaseme Street 20034',
      nftImageCompanyLink: '',
      employeeWalletAddress: '0xf4eA652F5B7b55f1493631Ea4aFAA63Fe0acc27C',
    })
  }

  const firebase = async () => {
    const data = await getDocs(usersCollectionRef)
    let letters = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    setLetters(letters)
  }

  const redirect = () => {
    navigate('/document')
  }

  return (
    <div className="container">
      <p className=" small strong"> Employment > References > All </p>
      <div className="display-flex">
        <Typography variant="h6" gutterBottom component="div">
          Track all your employment references in one place.
        </Typography>
        <p className="small">Sort:Recommended ⌄</p>
      </div>
      <br />
      <p className="very-small">
        <strong>Results</strong>
      </p>
      <Grid container spacing={2}>
        {letters.length ? (
          letters.map((letter, index) => (
            <Grid item xs={6} sm={3} key={index}>
              <ImageListItem style={{ height: '450px', listStyle: 'none' }}>
                <img src={preview} alt="preview" />
                <ImageListItemBar
                  title={letter.company}
                  subtitle={<span>by: {letter.employeeName}</span>}
                  actionIcon={
                    <IconButton
                      aria-label={`info about ${'pet.name'}`}
                      className="icon"
                      onClick={redirect}
                    >
                      <Button
                        variant="contained"
                        size="small"
                        className="view-btn"
                      >
                        View
                      </Button>
                    </IconButton>
                  }
                />
              </ImageListItem>
            </Grid>
          ))
        ) : (
          <h2>No Data Yet...</h2>
        )}
      </Grid>

      {/* <button
          onClick={insert}
          type="button"
          className="btn btn-lg btn-warning"
        >
          insert
        </button>
        <br /> */}

      {/* <div className="mycontainer">

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
      </div> */}
      <br />
      <br />
      <br />
      <br />
    </div>
  )
}
