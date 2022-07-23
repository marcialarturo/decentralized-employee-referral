import './App.css'
import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom'
import CreateEmploymentReference from './components/create-employment-reference/CreateEmploymentReference'
import Companies from './components/companies/Companies'
import EmploymentLetterProfile from './components/employment-letter-profile/EmploymentLetterProfile'
import XmtpChat from './components/xmtp-chat/XmtpChat'
import Apartment from './components/apartment/Apartment'
import Navbar from './components/navbar/Navbar'
import PostApartment from './components/post-apartment/PostApartment'
import CovalentGetNfts from './components/covalent-get-nfts/CovalentGetNfts'
import AwardNfts from './components/award-nfts/AwardNfts'
import EmploymentLetterDocument from './components/employment-letter-document/EmploymentLetterDocument'

import { ABI } from './config'
import { sequence } from '0xsequence'
const { ethers } = require('ethers')

// pick  slide for presentation,   sponsors & judges presentations, bouties goes directly to their
function App() {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState('')
  const [contract, setContract] = useState('')
  const [employmentLetters, setEmploymentLetters] = useState('')
  console.log('Mycontract ***', contract)
  const [providerSave, setProviderSave] = useState('')
  const [balance, setBalance] = useState('')
  const [currentAccount, setCurrentAccount] = useState('')
  const [chainId, setChainId] = useState(0)
  const [chainname, setChainName] = useState('')
  const [currentApt, setCurrentApt] = useState('')
  const [sequenceWallet, setSequenceWallet] = useState('')
  const [signer, setSigner] = useState('')
  const [sequenceProvider, setSequenceProvider] = useState('')
  let provider

  useEffect(() => {
    if (!currentAccount || !ethers.utils.isAddress(currentAccount)) return

    //client side code
    if (!window.ethereum) return
    provider = new ethers.providers.Web3Provider(window.ethereum)
    provider.getBalance(currentAccount).then((result) => {
      setBalance(ethers.utils.formatEther(result))
    })
    provider.getNetwork().then((result) => {
      setChainId(result.chainId)
      setChainName(result.name)
    })
  }, [currentAccount])

  const connectSequence = async () => {
    const wallet = new sequence.Wallet('polygon')
    const connectDetails = await wallet.connect()

    console.log('=> connected?', connectDetails.connected)
    const walletAddress = await wallet.getAddress()

    console.log('walletAddress', walletAddress)

    wallet.openWallet()

    setSequenceWallet(walletAddress)
  }

  const onClickConnect = async () => {
    if (!window.ethereum) {
      console.log('please install MetaMask')
      return
    }
    provider = new ethers.providers.Web3Provider(window.ethereum)
    setProviderSave(provider)
    const { chainId } = await provider.getNetwork()
    console.log('chainId', chainId)
    const deployedMaticContract = '0xA266e466FbAF783006758Ee7b5d91ec1E121233C'
    const deployedSkaleContract =
      '0x16d7be29ebc6db2e9c92E0Bf1dE5c1cfe6b1ADsdd2a'
    const deployedOptimismContract =
      '0x5D89f9bFe805C45787ECd69d14d6198E61c9f8d2'
    const deployedRinkebyContract = '0xa2dDc7AB9820DC0bffeA988E85B7239E4191106f'
    const signer = provider.getSigner()
    setSigner(signer)
    let contract = new ethers.Contract(deployedOptimismContract, ABI, signer)
    setContract(contract)

    // if (chainId == '1085866509') {
    //   let contract = new ethers.Contract(deployedSkaleContract, ABI, signer)
    //   setContract(contract)
    // } else if (chainId == '80001') {
    //   let contract = new ethers.Contract(deployedMaticContract, ABI, signer)
    //   setContract(contract)
    // } else if (chainId == '69') {
    //   let contract = new ethers.Contract(deployedOptimismContract, ABI, signer)
    //   setContract(contract)
    // }
    // MetaMask requires requesting permission to connect users accounts
    provider
      .send('eth_requestAccounts', [])
      .then((accounts) => {
        if (accounts.length > 0) setCurrentAccount(accounts[0])
      })
      .catch((e) => console.log(e))
  }

  const onClickDisconnect = () => {
    setBalance(undefined)
    setCurrentAccount(undefined)
  }

  return (
    <BrowserRouter>
      <div className="cl">
        <Navbar
          currentAccount={currentAccount}
          onClickDisconnect={onClickDisconnect}
          onClickConnect={onClickConnect}
          balance={balance}
          providerSave={providerSave}
          connectSequence={connectSequence}
          sequenceWallet={sequenceWallet}
        />

        <Routes>
          <Route
            path="/"
            element={
              <Companies
                setCurrentApt={setCurrentApt}
                currentAccount={currentAccount}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <EmploymentLetterProfile
                currentApt={currentApt}
                signer={signer}
                currentAccount={currentAccount}
                employmentLetters={employmentLetters}
              />
            }
          />
          <Route
            path="/document"
            element={
              <EmploymentLetterDocument
                currentApt={currentApt}
                signer={signer}
                currentAccount={currentAccount}
                employmentLetters={employmentLetters}
              />
            }
          />
          <Route
            path="/apartment/:id"
            element={
              <Apartment
                currentApt={currentApt}
                signer={signer}
                currentAccount={currentAccount}
              />
            }
          />

          <Route
            path="/recommendation"
            element={
              <CreateEmploymentReference
                currentApt={currentApt}
                signer={signer}
                currentAccount={currentAccount}
              />
            }
          />

          <Route
            path="/chat"
            element={
              <XmtpChat
                currentApt={currentApt}
                signer={signer}
                currentAccount={currentAccount}
              />
            }
          />

          <Route path="/post-apartment" element={<PostApartment />} />
          <Route
            path="/search"
            element={<CovalentGetNfts providerSave={providerSave} />}
          />

          <Route path="/award" element={<AwardNfts />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
