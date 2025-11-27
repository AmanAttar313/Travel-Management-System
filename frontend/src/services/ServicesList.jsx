import React from 'react'
import ServicesCard from './ServicesCard'
import { Col } from 'reactstrap'
import weatherImg from '../assets/images/weather.png'
import guideImg from '../assets/images/guide.png'
import customizationImg from '../assets/images/customization.png'

const servicesData = [


    {

        imgUrl: weatherImg,

        title: "Calculate Weather",

        desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",

    },

    {

        imgUrl: guideImg,

        title: "Best Tour Guide",
        desc:"lorejknjkcnkadnaskdnmaskdamndaklda"


    },
    {

imgUrl: customizationImg,

title: "Customization",

desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    }


]
const ServicesList = () => {
    return (
       
        <>
         {
        servicesData.map((item,index)=><Col lg='3' key={index}><ServicesCard item={item}/></Col>)
        }
        </>
    
    )
}

export default ServicesList