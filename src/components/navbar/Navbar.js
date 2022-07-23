import React, { useState } from 'react'
import './Navbar.css'
import logo from '../../images/mylogo.png'
import UAuth from '@uauth/js'
import Web3Modal from 'web3modal'
import Button from '@material-ui/core/Button'
import VerifiedUserSharpIcon from '@material-ui/icons/VerifiedUserSharp'

function Navbar({
  currentAccount,
  onClickDisconnect,
  onClickConnect,
  balance,
  providerSave,
  connectSequence,
  sequenceWallet,
}) {
  // var provider = new ethers.providers.Web3Provider(ethereum)
  // ENS functionality is provided directly on the core provider object.
  const [udUser, setudUser] = useState('')

  const uauth = new UAuth({
    clientID: '69c407cc-4663-48af-af8a-4f90592ba307',
    redirectUri: 'http://localhost:3000',
  })
  const loginUD = async (e) => {
    e.preventDefault()
    try {
      const authorization = await uauth.loginWithPopup()
      const currentUser = authorization.idToken.sub
      setudUser(currentUser)
    } catch (error) {
      console.error(error)
    }
  }
  const unstoppableDomainsLogout = () => {
    console.log('logging out!')
    uauth.logout().catch((error) => {
      console.error('profile error:', error)
    })
    setudUser('')
  }

  const search = async (e) => {
    e.preventDefault()
    // takes in  ensDomain & returns the wallet address
    var result = await providerSave.resolveName('albert.eth')
  }

  return (
    <div className="">
      <nav className="navbar navbar-expand-lg navbar-dark my-navbar">
        <div className="container-fluid">
          <a href="#" className="navbar-brand">
            <img src={logo} alt="logo" className="logo" />
          </a>
          <button
            type="button"
            className="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse2"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse2">
            <div className="navbar-nav">
              <a href="/" className="nav-item nav-link active my-nav">
                Employment-Reference
              </a>
              <a
                href="/post-apartment"
                className="nav-item nav-link active my-nav"
              >
                Register
              </a>
              <a
                href="/recommendation"
                className="nav-item nav-link active my-nav"
              >
                Recommend
              </a>
              <a href="/award" className="nav-item nav-link active my-nav">
                Award-NFT
              </a>
              <a href="/profile" className="nav-item nav-link active my-nav">
                Profile
              </a>

              <a href="/chat" className="nav-item nav-link active my-nav">
                Conversations
              </a>
            </div>

            <div className="d-flex ms-auto">
              {sequenceWallet ? (
                <Button
                  variant="contained"
                  color="secondary"
                  endIcon={<VerifiedUserSharpIcon />}
                >
                  {sequenceWallet.substring(0, 8)}...
                  {sequenceWallet.substring(38)}
                </Button>
              ) : (
                ''
              )}

              {/* {currentAccount ? (
                <>
                  <Button
                    variant="contained"
                    color="secondary"
                    // className="connected-btn"
                    endIcon={<VerifiedUserSharpIcon />}
                  >
                    {currentAccount.substring(0, 8)}...
                    {currentAccount.substring(38)}
                  </Button>
                  <Button
                    style={{ color: 'white' }}
                    to="/"
                    onClick={onClickDisconnect}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="contained"
                    className="connect-wallet-btn"
                    onClick={onClickConnect}
                  >
                    Connect Wallet
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={connectSequence}
                  >
                    Connect Wallet
                  </Button>
                </>
              )} */}

              {currentAccount ? (
                <>
                  <Button
                    variant="contained"
                    color="secondary"
                    endIcon={<VerifiedUserSharpIcon />}
                  >
                    {currentAccount.substring(0, 8)}...
                    {currentAccount.substring(38)}
                  </Button>
                  <Button
                    style={{ color: 'white' }}
                    to="/"
                    onClick={onClickDisconnect}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="contained"
                    className="connect-wallet-btn"
                    onClick={onClickConnect}
                  >
                    Connect Wallet
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={connectSequence}
                  >
                    Connect Wallet
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      <div>
        {currentAccount ? (
          <div className="display-flex">
            <p>Welcome back 🤗 </p>
            <p>Your balance is: {balance}</p>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}

export default Navbar
