import { useEffect, useState } from 'react'
import './Companies.css'
import { apiKey } from '../APIKEYS'
import { useNavigate } from 'react-router-dom'
import MyCard from '../card/Card'
import { Grid, Typography } from '@material-ui/core'

function Companies({ setCurrentApt, currentAccount }) {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const loadsData = async () => {
      try {
        setLoading(true)
        let cids = await fetch('https://api.nft.storage', {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        })
        cids = await cids.json()
        const temp = []
        for (let cid of cids.value) {
          if (cid?.cid) {
            let data = await fetch(
              `https://ipfs.io/ipfs/${cid.cid}/metadata.json`,
            )
            data = await data.json()
            let descriptionArr = data.description.split(',$,')

            const getImage = (ipfsURL) => {
              if (!ipfsURL) return
              ipfsURL = ipfsURL.split('://')
              return 'https://ipfs.io/ipfs/' + ipfsURL[1]
            }
            data.image = await getImage(data.image)
            data.info = descriptionArr[0]
            data.company = descriptionArr[1]
            data.status = descriptionArr[2]
            data.cid = cid.cid
            data.created = cid.created
            temp.push(data)
          }
        }
        setData(temp)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
    loadsData()
  }, [])

  const details = (curApt) => {
    setCurrentApt(curApt)
    navigate('/apartment/1')
  }

  return (
    <div className="cointainer-companies">
      <p className=" small strong">Registered Companies > All </p>
      <div className="display-flex">
        <Typography variant="h6" gutterBottom component="div">
          Ask for an employment reference, rate your job companyand get
          rewarded.
        </Typography>
        <p className="small">Sort:Recommended ⌄</p>
      </div>
      <p className="very-small">
        <strong>Results</strong>
      </p>

      <div className="m-3">
        <Grid container spacing={1}>
          {data.length ? (
            data.map((apt, index) => (
              <Grid
                item
                xs={6}
                sm={3}
                key={index}
                style={{ paddingBottom: '2rem', listStyleType: 'none' }}
              >
                <MyCard apt={apt} key={index} details={details} />
              </Grid>
            ))
          ) : (
            <h2>No Data Yet...</h2>
          )}
        </Grid>
      </div>
    </div>
  )
}

export default Companies
