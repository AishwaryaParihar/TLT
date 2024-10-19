import React from 'react'
import Slider from './content/Slider'
import Breadcrumbs from "./utiliti/breadcrumbs/Breadcrumbs";


const Gallery = () => {
  return (
    <div className=''>
      <Breadcrumbs   heading={'Gallery'}>
      <Slider/>
      </Breadcrumbs>
    </div>
  )
}

export default Gallery
