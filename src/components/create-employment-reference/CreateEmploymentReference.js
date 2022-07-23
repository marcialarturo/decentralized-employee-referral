import React, { useState, useEffect } from 'react'
import { connect } from '@tableland/sdk'
import { useNavigate } from 'react-router-dom'
import { db } from '../config-firebase'
import { collection, doc, updateDoc, getDocs, addDoc } from 'firebase/firestore'

export default function CreateEmploymentReference() {
  const usersCollectionRef = collection(db, 'references')
  const navigate = useNavigate()
  const [tableland, setTableland] = useState('')
  const [employeeName, setEmployeeName] = useState('')
  const [company, setCompany] = useState('Jhon Lee')
  const [email, setEmail] = useState('JhonLee@Spootify.com')
  const [position, setPosition] = useState('Manager')
  const [companySite, setCompanySite] = useState('Google')
  const [recommendation, setRecommendation] = useState(
    'Joe was a terrific employee! I definitely recomment him for your company.',
  )
  const [address, setAddress] = useState('1 Palo Alto California 50024')
  const [nftImageCompanyLink, setNftImageCompanyLink] = useState('')
  const [employeeWalletAddress, setEmployeeWalletAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const [tableName, setTableName] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log(
      'all info',
      employeeName,
      company,
      companySite,
      recommendation,
      address,
      nftImageCompanyLink,
      employeeWalletAddress,
    )

    try {
      setLoading(true)
      // 1. connect to tableLand
      connectTableLand()
      // 2. check if tableLand exist
      // 3. then insert/write to the table
      // 4.  check if was saved it successfully

      // const client = new NFTStorage({ token: apiKey })
      // const metadata = await client.store({
      //   name: company,
      //   description: `${description},$, ${address},$,${companySite}`,
      //   image: new File([image], imageName, { type: imageType }),
      // })
      // if (metadata) {
      //   navigate('/')
      // }
    } catch (error) {
      console.log(error)
    }
  }
  //  i need to do this

  // 1. connect to table
  // 2.  check if table exist contract
  //     if no table then create
  //     else we read data from tableland
  //  save it on firebase

  const connectTableLand = async () => {
    console.log('connectTableLand')
    // Connect Tableland testnet Goerli returns a connection to access the Tableland
    const tableland = await connect({ chain: 'optimism-kovan' })
    console.log('tableland', tableland)
    setTableland(tableland)
  }

  const isTableLandExist = async () => {
    console.log('isTableLandExist')
    const tableList = await tableland.list()
    console.log('tableList', tableList)
    console.log('tableList', tableList.length)

    // if (tableList.length === 0) {
    //   const { name } = await tableland.create(
    //     `employeeName text,
    //     companyName text,
    //     companySite text,
    //     recommendation text,
    //     companyAddress text,
    //     employeeWalletAddress text,
    //     id int, primary key (id)`, // Table schema definition
    //     `myReferralsTable`, // Optional `prefix` used to define a human-readable string
    //   )
    //   setTableName(name)
    // } else {
    //   const myTables = await tableland.list()
    //   console.log('myTables 1 ', myTables)
    //   const myTableReferralsName = myTables[0].name
    //   console.log('myTableReferralsName', myTableReferralsName)
    //   setTableName(myTableReferralsName)
    // }
  }

  // employeer should getStudentTable first & then writeToTableLand
  const getStudentTable = async () => {
    const studentWallet = '0xf4eA652F5B7b55f1493631Ea4aFAA63Fe0acc27C'
    const res = await fetch(
      `${tableland.options.host}/chain/${tableland.options.chainId}/tables/controller/${studentWallet}`,
    ).then((r) => r.json())
    console.log(' myres', res)
  }

  const readFromTableLand = async () => {
    // Perform a read query, requesting all rows from the table
    console.log('tableName', tableName)
    const readRes = await tableland.read(`SELECT * FROM ${tableName};`)
    console.log('readRes', readRes)

    //  readRes returns [ objects, col: [name, website]  ]
  }

  const writeToTableLand = async () => {
    const writeRes = await tableland.write(
      `INSERT INTO ${tableName} (employeeName, companyName, companySite, recommendation, companyAddress, employeeWalletAddress, id) VALUES ('Joe Smith',
      'Google',
      'Google.com',
      'To Whom it May Concern:

      I highly recommend Joe as a candidate for employment. Joe was employed by our companyl as an Administrative Assistant from 2018 to 2021. Joe was responsible for office support, including word processing, scheduling appointments, and creating brochures, newsletters, and other office literature.

      Joe has excellent communication skills. In addition, she is extremely organized, reliable, and computer literate. Joe can work independently and is able to follow through to ensure that the job gets done. She is flexible and willing to work on any project that is assigned to her. Joe was quick to volunteer to assist in other areas of company operations, as well.

    Joe would be a tremendous asset to your company and has my highest recommendation. If you have any further questions regarding her background or qualifications, please do not hesitate to contact me.

      Sincerely,
      John Lee
      Manager',
      '1600 Amphitheatre Parkway Mountain View, CA 94043',
      '0xf4eA652F5B7b55f1493631Ea4aFAA63Fe0acc27C',
     0);`,
    )
    console.log(' writeRes', writeRes)
  }

  // here I need to save to firebase
  const save = async (e) => {
    e.preventDefault()
    console.log('insert555')
    await addDoc(usersCollectionRef, {
      employeeName: 'Vixtor',
      company: 'MyFacebook',
      companySite: 'Facebook.com',
      recommendation: 'Victor was great!',
      address: '345 Seaseme Street 20034',
      nftImageCompanyLink: '',
      employeeWalletAddress: '0xf4eA652F5B7b55f1493631Ea4aFAA63Fe0acc27C',
    })
  }

  //  student request a letter => it creates his table w his wallet
  //  options =>  chainId, host,  userWallet
  //  teacher gives & insert the letter to the student table

  return (
    <div className="container">
      {/* <div className="mb-3 text-center">
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
      </div> */}

      <div className="content-form">
        <div className="card" style={{ width: '55%' }}>
          <form action="" className="form-inline" onSubmit={save}>
            <div className="mb-3">
              <label htmlFor="company" className="form-label">
                Your Name
              </label>
              <input
                type="text"
                className="form-control"
                id="company"
                placeholder="Jhon Lee"
                defaultValue={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Company's Address
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
                Your Email
              </label>
              <input
                type="text"
                className="form-control"
                id="website"
                placeholder="google.com"
                defaultValue={email}
                onChange={(e) => setCompanySite(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="website" className="form-label">
                Your Tittle / Position
              </label>
              <input
                type="text"
                className="form-control"
                id="website"
                placeholder="Manager"
                defaultValue={position}
                onChange={(e) => setCompanySite(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Add your recommendation
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                placeholder=""
                defaultValue={recommendation}
                onChange={(e) => setRecommendation(e.target.value)}
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

          <button
            onClick={connectTableLand}
            type="button"
            className="btn btn-lg btn-warning"
          >
            Connect Table Land
          </button>
          <br />
          <button
            onClick={isTableLandExist}
            type="button"
            className="btn btn-lg btn-success"
          >
            isTableLandExist
          </button>
          <br />
          <button
            onClick={readFromTableLand}
            type="button"
            className="btn btn-lg btn-info"
          >
            readFromTableLand
          </button>
          <br />
          <button
            onClick={writeToTableLand}
            type="button"
            className="btn btn-lg btn-warning"
          >
            writeToTableLand
          </button>
          <br />
          <button
            onClick={getStudentTable}
            type="button"
            className="btn btn-lg btn-info"
          >
            getStudentTable
          </button>
        </div>
      </div>
    </div>
  )
}
