import { useState } from 'react'
import { MdClose } from 'react-icons/md'
import './PopUpShopper.scss'

const PopUpShopper = ({ setClose }) => {
  const [ helped, setHelped ] = useState(false)
  const [ loading, setLoading ] = useState(false)

  return (
    <div className="overlayShopper">
      <div className="popupShoper container p-3 px-5">
        <div className="row justify-content-end closeMD">
          <button onClick={() => setClose(false)}><MdClose/></button>
        </div>
        <div className="row">
          <form>
            
          </form>
        </div>
      </div>
    </div>
  )
}

export default PopUpShopper
