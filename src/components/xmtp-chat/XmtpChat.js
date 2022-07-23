import React, { useState, useEffect } from 'react'
import { Client } from '@xmtp/xmtp-js'
import { Wallet } from 'ethers'
import { Button } from '@mui/material'
import './XmtpChat.css'
import userChatImage from '../../images/you.png'
import companyChatImage from '../../images/logo1.png'
import { async } from '@firebase/util'

export default function XmtpChat({ signer, currentAccount, currentApt }) {
  const [message, setMessage] = useState('')
  const [xmtpconnection, setXmtpconnection] = useState('')
  const [chatMessages, setChatMessages] = useState('')
  console.log('chatMessages', chatMessages)
  console.log('currentApt, signer, currentAccount ', typeof currentAccount)

  //  Employer writes a recomendation letter saves that to tableland than disply it on employee profile

  //  every employee should have their own table then Employer can write on it.
  const writeToTableLand = async () => {
    //  wallet: 0001
    //  tableId: tableland+number:
    //  we save it on the contract
    //   table:
    // tableId: userWallet
  }

  const date = new Date().toJSON().slice(0, 10).split('-').reverse().join('-')
  useEffect(() => {
    // loadXmtpClient()
  }, [])

  // For employees connect to tableLand, checkTableExist, pass employeeWallet to employeer and request letter.
  // const connectTableLandRequestLetter = async () => {}

  // const loadXmtpClient = async () => {
  //   const xmtp = await Client.create(signer)
  //   console.log('🚀 myXmtp', xmtp)

  //   // Start a conversation with Vitalik
  //   const conversation = await xmtp.conversations.newConversation(
  //     '0x9A336B8D86aC70aaDC0D93e94242B1C13F640877',
  //   )
  //   console.log('🚀 conversation', conversation)
  //   // Load all messages in the conversation
  //   const messages = await conversation.messages()
  //   console.log('🚀messages', messages)

  //   // gets all conversations that have had 1 or more messages
  //   const allConversations = await xmtp.conversations.list()
  //   console.log('🚀 allConversations', allConversations)

  //   // Listen for new messages in the conversation
  //   console.log('messages')
  //   for await (const message of await conversation.streamMessages()) {
  //     console.log(`[${message.senderAddress}]: ${message.text}`)
  //   }
  // }

  const connectXmtpClient = async () => {
    const xmtp = await Client.create(signer)
    setXmtpconnection(xmtp)

    // Demo wallet 0xf4eA652F5B7b55f1493631Ea4aFAA63Fe0acc27C
    // Start conversation with Company
    const conversation = await xmtp.conversations.newConversation(
      '0x11Afb8521CbF03C3508378E41d4C5b7e2C90b233',
    )
    // Load all messages in the conversation
    const messages = await conversation.messages()
    console.log('🚀messages', messages)

    // gets all conversations that have had 1 or more messages
    const allConversations = await xmtp.conversations.list()
    // Send a message
    // await conversation.send('Hi, dear manager! I was an employee during 2018 to 2020 and Im writing to request a employment reference letter, please sent it to my address: 0xf4eA652F5B7b55f1493631Ea4aFAA63Fe0acc27C  thank you!')
    // Listen for new messages in the conversation
    console.log('messages')
    const tempMsgs = []
    for (let msg of messages) {
      if (
        msg.recipientAddress == '0x11Afb8521CbF03C3508378E41d4C5b7e2C90b233' &&
        msg.senderAddress == '0xf4eA652F5B7b55f1493631Ea4aFAA63Fe0acc27C'
      ) {
        // console.log('should only display msg from these wallets', msg)
        // console.log('msg', msg.content)
        tempMsgs.push(msg)
      }
      // console.log('msg', msg.senderAddress)
    }
    setChatMessages(tempMsgs)

    for await (const message of await conversation.streamMessages()) {
      console.log(`[${message.senderAddress}]: ${message.text}`)
    }
  }

  const populateRequestEmployementLet = async () => {
    setMessage(
      'Hi, dear manager! I was an employee during 2018 to 2020 and Im writing to request a employment reference letter, please sent it to my address: 0xf4eA652F5B7b55f1493631Ea4aFAA63Fe0acc27C  thank you!',
    )
    const xmtp = await Client.create(signer)

    // Demo wallet 0xf4eA652F5B7b55f1493631Ea4aFAA63Fe0acc27C
    // Start conversation with Company
    const conversation = await xmtp.conversations.newConversation(
      '0x11Afb8521CbF03C3508378E41d4C5b7e2C90b233',
    )
    // Send a message
    const send = await conversation.send(
      'Hi, dear manager! I was an employee during 2018 to 2020 and Im writing to request a employment reference letter, please sent it to my address: 0xf4eA652F5B7b55f1493631Ea4aFAA63Fe0acc27C  thank you!',
    )

    console.log('send', send)
    const messages = await conversation.messages()
    console.log('🚀messages', messages)
  }

  const you = (
    <div class="first">
      <div class="avt">
        <img src={userChatImage} alt="avatar" className="userChatImage" />
      </div>
      <div class="message">
        <p className="message">Hello! Anyone available?</p>
      </div>
    </div>
  )

  const company = (
    <div class="second">
      <div class="message">
        <p className="message">Yes, how can I help? Here is a few options.</p>

        <button
          onClick={populateRequestEmployementLet}
          type="button"
          className="btn btn-sm btn-info"
        >
          Request Employment Letter
        </button>
        <br />
        <br />
        <button
          onClick={populateRequestEmployementLet}
          type="button"
          className="btn btn-sm btn-warning"
        >
          Make an appoitment
        </button>
      </div>
      <div class="avt">
        <img
          src="https://i.postimg.cc/8zVFGCfR/Contact-Name.png"
          alt="avatar"
        />
      </div>
    </div>
  )

  const thirdMesg = (
    <div class="first">
      <div class="avt">
        <img src={userChatImage} alt="avatar" className="userChatImage" />
      </div>
      <div class="message">
        <p className="message third-msg">
          Hi, dear manager! I was an employee during 2018 to 2020 and Im writing
          to request a employment reference letter, please sent it to my
          address: 0xf4eA652F5B7b55f1493631Ea4aFAA63Fe0acc27C thank you!
        </p>
      </div>
    </div>
  )

  return (
    <div className="xmtpchat-body">
      {xmtpconnection ? (
        <div class="wrapper">
          <div class="left">
            <div class="left-container">
              <div class="left-card">
                <div class="left-card-container">
                  {/* this should take 575px */}
                  <div className="item1">
                    <div class="left-header">
                      <div class="left-header-container">
                        <div>
                          <div class="arrow"></div>
                          <span class="header-bold">{currentApt.name}</span>
                        </div>
                        <div class="kebab-menu">
                          <img
                            src="https://i.postimg.cc/mk2w8wBr/Dots.png"
                            alt="kebab-menu"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="today">{date}</div>
                    <div class="left-body">
                      <div class="left-body-container">
                        {you}
                        {/* <div class="first">
                        <div class="avt">
                          <img
                            src="https://i.postimg.cc/8zVFGCfR/Contact-Name.png"
                            alt="avatar"
                          />
                        </div>
                        <div class="message">
                          <p className="message">Here goes the message</p>
                        </div>
                      </div> */}

                        {company}
                        <br />
                        {currentAccount ===
                        '0x11afb8521cbf03c3508378e41d4c5b7e2c90b233'
                          ? thirdMesg
                          : ''}
                        {/* <div class="second">
                        <div class="message">
                          <p className="message">Here goes the message</p>
                        </div>
                        <div class="avt">
                          <img
                            src="https://i.postimg.cc/8zVFGCfR/Contact-Name.png"
                            alt="avatar"
                          />
                        </div>
                      </div> */}

                        <div class="fourth">
                          <img
                            src="https://i.postimg.cc/PxgHD2DB/Group-39.png"
                            alt="third-avt"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="item2">
                    <div class="left-footer">
                      <div class="left-footer-container">
                        <div class="input-group">
                          <div class="input-container">
                            <div>
                              <div class="share">
                                <img
                                  src="https://i.postimg.cc/5ysmGkmr/Attachment.png"
                                  alt="share"
                                />
                              </div>
                              <div class="inp">
                                <input
                                  type="text"
                                  placeholder="Type something..."
                                  value={message}
                                />
                              </div>
                            </div>
                            <div class="emoji">
                              <img
                                src="https://i.postimg.cc/76x0knbr/Smiley.png"
                                alt="emoji"
                              />
                            </div>
                          </div>
                        </div>
                        <div class="btn-container">
                          <button>
                            <img
                              src="https://i.postimg.cc/5t4hhvd2/Union-1.png"
                              alt="send"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- left-end -->

      <!-- right-start --> */}
          <div class="right">
            <div class="right-container">
              <div class="right-card">
                <div class="right-card-container">
                  <h3 class="card__title">{currentApt.name}</h3>
                  <p class="card__description">{currentApt.description}</p>
                  <img
                    src={currentApt.image ? currentApt.image : ''}
                    class="xmtpchat-card__image"
                    alt=""
                  />
                  <br />
                  <br />
                  <br />
                  <div class="right-card-header">
                    <span class="header-bold">My Contact List</span>
                    <div>
                      <img
                        src="https://i.postimg.cc/65dRS4fS/Dots-1.png"
                        alt="kebab"
                      />
                    </div>
                  </div>
                  <div class="right-card-body">
                    <div class="right-card-body-container">
                      <div class="card">
                        <div class="profile">
                          <div>
                            <img
                              src="https://i.postimg.cc/PJMXbH16/Icon.png
                            "
                              alt="profile"
                            />
                          </div>
                          <div class="profile-info">
                            <span class="name-font">Neelesh Chaudhary</span>
                            <span class="job-font">UI / UX Designer</span>
                          </div>
                        </div>
                        <div class="icons">
                          <div>
                            <img
                              src="https://i.postimg.cc/Jnv6TH50/Message.png"
                              alt="message"
                            />
                          </div>
                          <div>
                            <img
                              src="https://i.postimg.cc/9XwND1c7/Phone.png"
                              alt="phone"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="card">
                        <div class="profile">
                          <div>
                            <img
                              src="https://i.postimg.cc/yN5tGGV7/Icon-1.png
                            "
                              alt="profile"
                            />
                          </div>
                          <div class="profile-info">
                            <span class="name-font">Guy Fisher</span>
                            <span class="job-font">Business Analyst</span>
                          </div>
                        </div>
                        <div class="icons">
                          <div>
                            <img
                              src="https://i.postimg.cc/Jnv6TH50/Message.png"
                              alt="message"
                            />
                          </div>
                          <div>
                            <img
                              src="https://i.postimg.cc/9XwND1c7/Phone.png"
                              alt="phone"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="card">
                        <div class="profile">
                          <div>
                            <img
                              src="https://i.postimg.cc/1tGBK7XC/Icon-2.png"
                              alt="profile"
                            />
                          </div>
                          <div class="profile-info">
                            <span class="name-font">Diane Hawkins</span>
                            <span class="job-font">Blockchain Expert</span>
                          </div>
                        </div>
                        <div class="icons">
                          <div>
                            <img
                              src="https://i.postimg.cc/Jnv6TH50/Message.png"
                              alt="message"
                            />
                          </div>
                          <div>
                            <img
                              src="https://i.postimg.cc/9XwND1c7/Phone.png"
                              alt="phone"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="card">
                        <div class="profile">
                          <div>
                            <img
                              src="https://i.postimg.cc/CKDsFrGh/Icon-3.png
                            "
                              alt="profile"
                            />
                          </div>
                          <div class="profile-info">
                            <span class="name-font">Dustin Mccoy</span>
                            <span class="job-font">Product Designer</span>
                          </div>
                        </div>
                        <div class="icons">
                          <div>
                            <img
                              src="https://i.postimg.cc/Jnv6TH50/Message.png"
                              alt="message"
                            />
                          </div>
                          <div>
                            <img
                              src="https://i.postimg.cc/9XwND1c7/Phone.png"
                              alt="phone"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="card">
                        <div class="profile">
                          <div>
                            <img
                              src="https://i.postimg.cc/K83nNpsP/Icon-4.png
                            "
                              alt="profile"
                            />
                          </div>
                          <div class="profile-info">
                            <span class="name-font">Philip Cooper</span>
                            <span class="job-font">Quality Assurance</span>
                          </div>
                        </div>
                        <div class="icons">
                          <div>
                            <img
                              src="https://i.postimg.cc/Jnv6TH50/Message.png"
                              alt="message"
                            />
                          </div>
                          <div>
                            <img
                              src="https://i.postimg.cc/9XwND1c7/Phone.png"
                              alt="phone"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="card">
                        <div class="profile">
                          <div>
                            <img
                              src="https://i.postimg.cc/JnYnSMsG/Icon-5.png
                            "
                              alt="profile"
                            />
                          </div>
                          <div class="profile-info">
                            <span class="name-font">Scarlett Murphy</span>
                            <span class="job-font">Researcher</span>
                          </div>
                        </div>
                        <div class="icons">
                          <div>
                            <img
                              src="https://i.postimg.cc/Jnv6TH50/Message.png"
                              alt="message"
                            />
                          </div>
                          <div>
                            <img
                              src="https://i.postimg.cc/9XwND1c7/Phone.png"
                              alt="phone"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Button variant="contained" color="primary" onClick={connectXmtpClient}>
          Connect to Xmtp Client
        </Button>
      )}
    </div>
  )
}
