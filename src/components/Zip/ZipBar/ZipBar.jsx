import React from 'react'
import { GrLocation } from 'react-icons/gr'
import { BiChevronDown } from 'react-icons/bi'
import './ZipBar.scss'
const ZipBar = () => {
  return (
    <button className="ZipBar">
      <GrLocation />
      <p style={{margin: 0}}>Envío a Madrid - 28109</p>
      <BiChevronDown />
    </button>
  )
}

export default ZipBar
