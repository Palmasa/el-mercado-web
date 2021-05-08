import React from "react"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import ProductCard from '../Products/ProductCard'
import "./ProdsInSupp.scss"

const ProdsInSupp = ({ prods }) => {
  const [sliderRef] = useKeenSlider({
    loop: true,
    rtl: true,
    slidesPerView: 3,
    spacing: 10,
  })

  return (
    <div ref={sliderRef} className="keen-slider ">
    {
        prods?.map((product) => (
          <div key={product.id} className="keen-slider__slide">
            <ProductCard
            product= {product}
            />
          </div>
        ))
    }
    </div>
  )
}

export default ProdsInSupp
