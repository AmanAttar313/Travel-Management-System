import React, { useEffect } from 'react' // <--- ADDED 'useEffect' HERE
import TourCard from '../../shared/TourCard'

import { Col } from 'reactstrap'
import Aos from 'aos'
import 'aos/dist/aos.css'
import useFetch from '../../Hooks/userFetch'
import { BASE_URL } from '../../utils/config'


const FeaturedToursList = () => {

   const { data: featuredTours, loading, error } = useFetch(`${BASE_URL}/tours/search/getFeaturedTours`);

    console.log(featuredTours)
    
    useEffect(() => {
      Aos.init({
        duration: 1000, 
        once: true, 
      });
      Aos.refresh(); 
    }, []);
  

  return (
    <>
    {
      loading && <h4>Loading........</h4>
    }
    {
      error && <h4>{error}</h4>
    }



    {    
     !loading && !error && featuredTours?.map((tour, index) => (
        
        <Col 
          lg='3' 
          className='mb-4' 
          key={tour._id}
          data-aos="fade-up" 
          data-aos-delay={`${index * 100}`} 
        >
          <TourCard tour={tour}></TourCard>
        </Col>
      ))
    }
    </>
  )
}

export default FeaturedToursList