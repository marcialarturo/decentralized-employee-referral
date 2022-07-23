import React from 'react'
import './Card.css'
import { Link } from 'react-router-dom'
import { createAvatar } from '@dicebear/avatars'
import * as style from '@dicebear/avatars-avataaars-sprites'

const avatar = [
  'https://i.imgur.com/7D7I6dI.png',
  'https://i.imgur.com/darLoxZ.png',
  'https://i.imgur.com/WborSIe.png',
  'https://i.imgur.com/4offfap.png',
  'https://i.imgur.com/4offfap.png',
  'https://i.imgur.com/mSoNd4c.png',
  'https://i.imgur.com/J7xHwcv.png',
  'https://i.imgur.com/FcWKydL.png',
  'https://i.imgur.com/4cob6aZ.jpeg',
  'https://i.imgur.com/m2O0ykv.jpeg',
  'https://i.imgur.com/WYpIaBW.jpeg',
  'https://i.imgur.com/k7XVwpB.jpeg',
  'https://i.imgur.com/uk725Tt.jpeg',
  'https://i.imgur.com/7emQHOb.jpeg',
  'https://i.imgur.com/fGZphec.jpeg',
  'https://i.imgur.com/Uy5keuJ.jpeg',
  'https://i.imgur.com/ERzejw3.jpeg',
  'https://i.imgur.com/TTZQxYv.jpeg',
  'https://i.imgur.com/62G0yQ0.jpeg',
  'https://i.imgur.com/7D7I6dI.png',
]

export default function MyCard({ apt, details }) {
  return (
    <li onClick={() => details(apt)} className="card">
      <img src={apt.image} class="card__image" alt="" />
      <div class="card__overlay">
        <div class="card__header">
          <svg class="card__arc" xmlns="http://www.w3.org/2000/svg">
            <path />
          </svg>
          <img
            class="card__thumb"
            src={avatar[Math.floor(Math.random() * avatar.length)]}
            alt=""
          />

          <div class="card__header-text">
            <h3 class="card__title">{apt.name}</h3>
          </div>
        </div>
        <p class="card__description">{apt.description}</p>
      </div>
    </li>
  )
}
