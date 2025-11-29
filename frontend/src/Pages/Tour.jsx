import {useEffect,useState} from 'react'
import CommonSection from '../shared/CommonSection'
import '../styles/tour.css'
import tourData from '../assets/data/tours'
import TourCard from '../shared/TourCard'
import SearchBar from '../shared/SearchBar'
import NewsLetter from '../shared/NewsLetter'
import { Col, Container, Form, Row , FormGroup } from 'reactstrap'
import Aos from 'aos'




const Tour = () => {

    useEffect(() => {
        Aos.init({
          duration: 1000, 
          once: true, 
        });
        Aos.refresh(); 
      }, []);


      
  const [pageCount,setPageCount]=useState(0);
  const [page,setPage]=useState(0);
  const[location , setLocation] = useState("");
  const[distance , setDistance] = useState(10000000);
  const[people , setPeople] = useState(0);


  // const searchTours = tourData.filter((ele) => 
  //  ele.city?.toLowerCase().includes(location.toLowerCase())
  //  ).filter(ele => ele.distance <= distance).filter(ele => ele.maxGroupSize <= people);
  
   //  Filter by City
let searchTours = tourData.filter((ele) => 
   ele.city?.toLowerCase().includes(location.toLowerCase())
);
searchTours = searchTours.filter(ele => ele.distance <= distance);
searchTours = searchTours.filter(ele => ele.maxGroupSize >= people);



useEffect(() => {
  const pages = Math.ceil(tourData.length / 4);
  setPageCount(pages);
}, []);  


  console.log("data : " , tourData);
  console.log("data search : " , searchTours);
  

  return (
    <>
    <CommonSection title={'All Tours'}/>
    <section>
      <Container>
        <Row>
         {/* <SearchBar/> */}
          <Col lg="12">
      <div className="search__bar">
        <Form className="d-flex align-items-center gap-4">
          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span>
              <i className="ri-map-pin-line"></i>
            </span>
            <div>
              <h6>Location</h6>
              <input
                type="text"
                placeholder="Where are you going?"
                onChange={e => {
                  setLocation(e.target.value);
                }}
              />
            </div>
          </FormGroup>

          {location && 
             <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span>
              <i className="ri-map-pin-time-line"></i>
            </span>
            <div>
              <h6>Distance</h6>
              <input
                type="number"
                placeholder="Distance (km)"
               onChange={e => {setDistance(e.target.value);
                }
               }
              />
            </div>
          </FormGroup>
          }

          {
            location &&  <FormGroup className="d-flex gap-3 form__group form__group-last">
            <span>
              <i className="ri-group-line"></i>
            </span>
            <div>
              <h6>Max People</h6>
              <input type="number" placeholder="0"  onChange={e => {
                setPeople(e.target.value);
              }} />
            </div>
          </FormGroup>
          }

          {/* <span className="search__icon">
            <i className="ri-search-line"></i>
          </span> */}


        </Form>
      </div>
    </Col>
        </Row>
      </Container>
    </section>

    <section>
      <Container>
        <Row>
          {
            searchTours?.map((tour , index)=><Col lg='3'
               className="mb-4" key={tour.id}
               data-aos="fade-down" 
             data-aos-delay={`${index * 50}`} 
            ><TourCard tour={tour}/></Col>)
          }
          <Col lg='12'>
          <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
            {[...Array(pageCount).keys()].map(number=>(
              <span key={number} onClick={() => setPage(number)}
              className={page===number ? 'active__page' : ""}
              >
                {number+1}
              </span>
            ))}
          </div>
          </Col>
        </Row>
      </Container>
    </section>
    <NewsLetter/>
    </>
  )
}

export default Tour