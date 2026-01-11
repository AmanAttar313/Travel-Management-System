import React from 'react'
import { Col } from 'reactstrap'
import ServicesCard from './ServicesCard'

import weatherImg from '../assets/images/weather.png'
import guideImg from '../assets/images/guide.png'
import customizationImg from '../assets/images/customization.png'

const servicesData = [
  {
    imgUrl: weatherImg,
    title: "Calculate Weather",
    desc: "Get real-time weather updates to plan your trip better.",
  },
  {
    imgUrl: guideImg,
    title: "Best Tour Guide",
    desc: "Professional guides to make your journey memorable.",
  },
  {
    imgUrl: customizationImg,
    title: "Customization",
    desc: "Personalized travel plans tailored to your needs.",
  },
]

const ServicesList = () => {
  return (
    <>
      {servicesData.map((item, index) => (
        <Col lg="3" md="6" sm="12" key={index}>
          <ServicesCard item={item} />
        </Col>
      ))}
    </>
  )
}

export default ServicesList
