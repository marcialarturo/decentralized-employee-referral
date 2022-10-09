import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import { Navbar } from './components/layout/navbar/Navbar'
import Footer from './components/layout/footer/Footer'
import HomeGallery from './components/home-container/gallery/HomeGallery'
import Profile from './components/home-container/profile/Profile'
import CreateProfile from './components/create-profile/CreateProfile'
import DonateNFT from './components/donate-nft copy/DonateNFT'
import CreateLinks from './components/create-links/CreateLinks'
import MyProfile from './components/home-container/myprofile/MyProfile'
import Notifications from './components/notifications/Notifications'
import Web3Modal from 'web3modal'
import UAuth from '@uauth/js'
import ABI from './artifacts/contracts/VirtualStudyGroupApp.sol/VirtualStudyGroupApp.json'
import { Web3Auth } from '@web3auth/web3auth'
import { CHAIN_NAMESPACES } from '@web3auth/base'
import RPC from './ethersRPC'
const clientId =
  '5cf524a9082ff99b09269d94e77dab5886b9235732c6b07bd4e9ce8c347af928' // get from https://dashboard.web3auth.io

const { ethers } = require('ethers')

function App() {
  const [currentAccount, setCurrentAccount] = useState('')
  const [contract, setContract] = useState(null)
  const [donateNfts, setDonateNfts] = useState(false)
  const [hasProfile, setHasProfile] = useState('')
  const [allProfiles, setAllProfiles] = useState([])
  const [selectedProfile, setSelectedProfile] = useState('')
  const [image, setImage] = useState('')
  const [title, setTitle] = useState('')
  const [bio, setBio] = useState('')
  const [coverPhoto, setCoverPhoto] = useState('')
  const [userUD, setUserUD] = useState('')
  const [signer, setSigner] = useState(null)
  const [provider, setProvider] = useState(null)
  const [donateStream, setDonateStream] = useState(false)
  const [web3authLogin, setWeb3authLogin] = useState(null)

  const unstoppableInstance = new UAuth({
    clientID: '7848be70-c075-4f7f-af07-67e4e5eab717',
    redirectUri: 'https://pets-found-me.netlify.app/my-profile',
    scope: 'openid wallet',
  })

  const unstoppableLogin = async () => {
    const user = await unstoppableInstance.loginWithPopup()
    const ud = user.idToken.sub
    const walletAdd = user.idToken.wallet_address
    if (walletAdd) {
      setCurrentAccount(walletAdd)
      setUserUD(ud)
    }
  }

  const web3authLoginHandleClick = async () => {
    try {
      const web3auth = new Web3Auth({
        clientId,
        chainConfig: {
          chainNamespace: CHAIN_NAMESPACES.EIP155,
          chainId: '0x1',
          rpcTarget: 'https://rpc.ankr.com/eth', // This is the public RPC we have added, please pass on your own endpoint while creating an app
        },
      })
      setWeb3authLogin(web3auth)
      await web3auth.initModal()
      if (web3auth.provider) {
        setProvider(web3auth.provider)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const userLogOut = () => {
    localStorage.removeItem('user')
    setUserUD('')
  }

  const connectWallet = async () => {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const address = await signer.getAddress()
    console.log('🚀 ~ file: App.js ~ line 62 ~ connectWal ~ address', address)
    setProvider(provider)
    setSigner(signer)
    setCurrentAccount(address)
    let contract = new ethers.Contract(
      '0x65BBF87bC0a26ff089A0012c2eAE94AFF2211a5d',
      ABI.abi,
      signer,
    )
    setContract(contract)
  }

  const disconnectWallet = async () => {
    localStorage.removeItem('currentAccountLocalStorage')
    setCurrentAccount('')
  }

  useEffect(() => {}, [])

  return (
    <Router>
      <div className="cl">
        <Navbar
          unstoppableLogin={unstoppableLogin}
          userUD={userUD}
          connectWallet={connectWallet}
          currentAccount={currentAccount}
          disconnectWallet={disconnectWallet}
          hasProfile={hasProfile}
          web3authLogin={web3authLogin}
          web3authLoginHandleClick={web3authLoginHandleClick}
        />

        <Route exact path="/">
          <HomeGallery
            allProfiles={allProfiles}
            setSelectedProfile={setSelectedProfile}
            contract={contract}
            connectWallet={connectWallet}
          />
        </Route>

        <Route exact path="/donate">
          <DonateNFT
            selectedProfile={selectedProfile}
            contract={contract}
            currentAccount={currentAccount}
            donateNfts={donateNfts}
            provider={provider}
            signer={signer}
            donateStream={donateStream}
          />
        </Route>

        <Switch>
          <Route exact path="/notifications" component={Notifications} />

          <Route path="/create">
            <CreateProfile
              currentAccount={currentAccount}
              contract={contract}
            />
          </Route>

          <Route path="/create-links">
            <CreateLinks
              currentAccount={currentAccount}
              image={image}
              title={title}
              bio={bio}
              coverPhoto={coverPhoto}
            />
          </Route>

          <Route path="/profile/details/:userAddress">
            <Profile
              selectedProfile={selectedProfile}
              currentAccount={currentAccount}
              setDonateNfts={setDonateNfts}
              provider={provider}
              signer={signer}
              setDonateStream={setDonateStream}
            />
          </Route>
          <Route path="/my-profile">
            <MyProfile
              selectedProfile={selectedProfile}
              currentAccount={currentAccount}
            />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  )
}

export default App
