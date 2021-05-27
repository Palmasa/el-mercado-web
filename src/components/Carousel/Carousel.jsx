import { BsChevronRight, BsChevronLeft } from 'react-icons/bs'
import './Carousel.scss'

const Carousel = ({ children }) => {
  const next = () => {

  }
  
  return (
    <>
      <button className="button-arrow-slider" onClick={next()}><BsChevronLeft /></button>
      <div className="slider-carousel mx-4">
        {children}
      </div>
      <button className="button-arrow-slider" onClick={next()}><BsChevronRight /></button>
    </>
  )
}

export default Carousel
