import React, { useState, useEffect } from 'react'
import {
  Button,
  StylesProvider,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
} from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { useParams, useLocation } from 'react-router-dom'
import './CovalentGetNfts.css'

function CovalentGetNfts({ account, providerSave }) {
  const { recipeId } = useParams()
  const [loading, setLoading] = useState(false)
  const userWallet = '0xAF67cbD8fb00759C3b4667beAcfBB3600e25476A'
  const [nfts, setNfts] = useState({})
  const [items, setItems] = useState([])
  const [insideItems, setInsideItems] = useState([])
  console.log('insideItems', insideItems)
  const [data, setData] = useState({})
  const [ensNameInput, setEnsNameInput] = useState('albert.eth')
  const { state = {} } = useLocation()

  const search = async (e) => {
    e.preventDefault()

    // takes in  ensDomain & returns the wallet address
    var result = await providerSave.resolveName(ensNameInput)
    console.log('🚀result', result)
  }

  const covalentNfts = async () => {
    // let ENSName = await providerSave.resolveName(ensNameInput)
    let ENSName = '0xf4eA652F5B7b55f1493631Ea4aFAA63Fe0acc27C'
    if (!ENSName) {
    }
    const covalentAPI = 'ckey_d4115699196e4d238fa138e180c'

    try {
      const nfts = await fetch(
        `https://api.covalenthq.com/v1/137/address/${ENSName}/balances_v2/?quote-currency=USD&format=JSON&nft=true&no-nft-fetch=false&key=${covalentAPI}`,
      )
      const allNFTS = await nfts.json()

      if (allNFTS) {
        setNfts(allNFTS)
        setItems(allNFTS?.data?.items)
        // console.log('allNFTS?.data?.items', allNFTS?.data?.items)
        const nftsGateway = allNFTS?.data?.items[0]?.nft_data
        console.log(
          '🚀 ~ file: CovalentGetNfts.js ~ line 61 ~ covalentNfts ~ nftsGateway',
          nftsGateway,
        )
        const temp = []
        if (nftsGateway.length !== 0) {
          for (let i = 0; i < nftsGateway.length; i++) {
            let ipfsURL = nftsGateway[i].token_url
            if (!ipfsURL) return
            ipfsURL = ipfsURL.split('://')
            ipfsURL = ipfsURL[1]
            const res = await fetch(
              `https://cloudflare-ipfs.com/ipfs/${ipfsURL}`,
            )
            const data = await res.json()
            temp.push(data)
          }
        }
        setInsideItems(temp)
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setLoading(true)
    covalentNfts()
  }, [])

  useEffect(() => {
    const getImage = (ipfsURL) => {
      if (!ipfsURL) return
      ipfsURL = ipfsURL.split('://')
      return 'https://ipfs.io/ipfs/' + ipfsURL[1]
    }

    const getMetadata = async () => {
      let data = await fetch(`https://ipfs.io/ipfs/${recipeId}/metadata.json`)
      data = await data.json()
      const dataArray = data.description.split(',')
      data.creator = dataArray[0]
      data.type = dataArray[1]
      data.intro = dataArray[2]
      data.image = getImage(data.image)
      setData(data)
    }
    if (recipeId) {
      getMetadata()
      getImage()
    }
  }, [recipeId, account])

  return (
    <StylesProvider injectFirst>
      <Container style={{ paddingTop: '2.4rem', paddingBottom: '4rem' }}>
        {loading ? (
          <h1 className="text-center ">Fetching Nfts...</h1>
        ) : (
          <div>
            {nfts && nfts?.data ? (
              <div>
                <h3 className="text-center">
                  Company's Transactions Tokens
                </h3>
                <br />
                <p className="text-center">
                  We keep our reviews and awards very transparent by providing
                  our users a transaction id and importan metadata information
                  open and accessible to everyone. <br />
                  <strong>Powered by Covalent.</strong>
                </p>
                <br />
                <p className="info">
                  <strong>Last update: 07-23-2022 </strong>
                </p>
                <p>
                  <strong className="info">Total Count: 2</strong>
                </p>
              </div>
            ) : (
              <h2>No data</h2>
            )}
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Logo</TableCell>
                    <TableCell>Id</TableCell>
                    <TableCell>Contract name</TableCell>
                    <TableCell>Contract address</TableCell>
                    <TableCell>Contract symbol</TableCell>
                    <TableCell>Contract decimals</TableCell>
                    <TableCell>Logo url</TableCell>
                    <TableCell>View Details</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items &&
                    items.map((legislator, key) => {
                      let overallRating, overallBlkRating
                      if (legislator.AverageRating) {
                        overallRating = legislator.overallRating
                      }
                      if (legislator.AverageBLKRating) {
                        overallBlkRating = legislator.overallBlkRating
                      }
                      return (
                        <TableRow key={key}>
                          <TableCell>
                            <Avatar alt="nft logo" src={legislator.logo_url} />
                          </TableCell>
                          <TableCell>{legislator.token_id}</TableCell>
                          <TableCell>{legislator.contract_name}</TableCell>
                          <TableCell className="line-break">
                            {legislator.contract_address}
                          </TableCell>
                          <TableCell>
                            {legislator.contract_ticker_symbol}
                          </TableCell>
                          <TableCell>{legislator.contract_decimals}</TableCell>
                          <TableCell className="line-break">
                            {legislator.logo_url}
                          </TableCell>
                          <TableCell align="center">
                            <a
                              href={`https://mumbai.polygonscan.com/address/${legislator.contract_address}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ChevronRightIcon
                                fontSize="large"
                                style={{ color: 'blue' }}
                              />
                            </a>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}

        <br />
        <br />

        {loading ? (
          <h1 className="text-center ">Fetching Nfts...</h1>
        ) : (
          <div>
            {insideItems ? (
              <div>
                <h3 className="text-center">
                  Company's NFTs and Awards Provided
                </h3>

                <br />
                <p className="info">
                  <strong>Last update: </strong> 07-23-2022
                </p>
                <p>
                  <strong className="info">
                    Total Count: {insideItems?.length}
                  </strong>
                </p>
              </div>
            ) : (
              <h2>No data</h2>
            )}
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Contract Name</TableCell>
                    <TableCell>Contract symbol</TableCell>
                    <TableCell>NFT Image</TableCell>
                    <TableCell>NFT Name</TableCell>
                    <TableCell>NFT Description</TableCell>
                    <TableCell>Decimals</TableCell>
                    <TableCell>View Details</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* description: "Type your NFT description here"
image: "https://ipfs.io/ipfs/bafybeidfac2lweyvcxnsni6ljd64fvzhrfvmwmzq3mszc5ecwdicw54he4"
name: "Type your NFT name here" */}
                  {insideItems &&
                    insideItems.map((legislator, key) => {
                      let overallRating, overallBlkRating
                      if (legislator.AverageRating) {
                        overallRating = legislator.overallRating
                      }
                      if (legislator.AverageBLKRating) {
                        overallBlkRating = legislator.overallBlkRating
                      }
                      return (
                        <TableRow key={key}>
                          <TableCell>Employment References</TableCell>
                          <TableCell>ERL</TableCell>
                          <TableCell>
                            <img
                              src={legislator.image}
                              alt="m"
                              className="nft_image"
                            />
                          </TableCell>
                          <TableCell className="line-break">
                            {legislator.name}
                          </TableCell>
                          <TableCell>{legislator.description}</TableCell>
                          <TableCell>8 decimals</TableCell>
                          <TableCell className="line-break">
                            {legislator.logo_url}
                          </TableCell>
                          <TableCell align="center">
                            <a
                              href={`https://mumbai.polygonscan.com/address/${legislator.contract_address}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ChevronRightIcon
                                fontSize="large"
                                style={{ color: 'blue' }}
                              />
                            </a>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </Container>
    </StylesProvider>
  )
}

export default CovalentGetNfts
