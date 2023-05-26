import { SwiperSlide } from 'swiper/react'

import { Swiper } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import SwiperCore, { Navigation } from 'swiper'


SwiperCore.use([Navigation])

const SwiperContainer = ({ assets, id }) => {

  return (
    <Swiper
      // direction='horizontal'
      className='swiper-container'
      key={id}
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }}
      slidesPerView={1}
      spaceBetween={0}
      effect={'fade'}
      loop={true}
      speed={900}
      modules={[Navigation]}
    >
      {assets.map(asset => (
        <SwiperSlide key={asset.url}>
            <img src={asset.url} alt={asset.description} />
        </SwiperSlide>
      ))}
      <div className='swiper-buttons'>
        <button className='swiper-button-prev'>Previous</button>
        <button className='swiper-button-next'>Next</button>
      </div>
    </Swiper>
  )
}

export default SwiperContainer