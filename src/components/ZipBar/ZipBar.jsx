import { GrLocation } from 'react-icons/gr'
import { BiChevronDown } from 'react-icons/bi'
import { ZipContext } from '../../contexts/ZipContext'
import { useContext, useState } from 'react'
import './ZipBar.scss'
import ZipPopUp from '../ZipPopUp/ZipPopUp'

const ZipBar = () => {
  const { stateZip } = useContext(ZipContext)
  const [ zipSquare, setZipSquare ] = useState(false)

  const showSquare = () => {
    setZipSquare(true)
  }

  return (
    <>
    <button onClick={showSquare} className="ZipBar">
      <GrLocation />
      {
        stateZip ? (<p style={{margin: 0}}>Envío a - {stateZip}</p>) : <p>Introduce un código postal</p>
      }
      <BiChevronDown />
    </button>
    {
      zipSquare && <ZipPopUp closeSquare={setZipSquare}/>
    }
    </>
  )
}

export default ZipBar
