import { BsChevronRight, BsChevronLeft } from 'react-icons/bs'
import useWindowDimensions from '../../hooks/useWindow'
import './Carousel.scss'

const Carousel = ({ children, id, larger}) => {
  const { width } = useWindowDimensions()

  const prev = () => {
    document.getElementById(`${id}789`).scrollLeft -= 250
  }

  const next = () => {
    document.getElementById(`${id}789`).scrollLeft += 250
  }
  
  return (
    <>
      { width > 670 && <button className="button-arrow-slider" onClick={prev}><BsChevronLeft /></button>}
      <div id={`${id}789`} className="slider-carousel mx-4" style={larger && {maxWidth: 1200}}>
        {children}
      </div>
      { width > 670 && <button className="button-arrow-slider" onClick={next}><BsChevronRight /></button>}
    </>
  )
}

export default Carousel
