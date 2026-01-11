
import './newsletter.css'
import { Container,Row,Col } from 'reactstrap'
import maleTourist from '../assets/images/male-tourist.png'
const NewsLetter = () => {
  return <>
   <section className='newsletter'>
  <Container className='newsletter'>
    <Row>
      <Col lg='6'>
        <div className="newsletter__content">
          <h2>
            Subscribe Now to get useful travelling information.
          </h2>
          <div className="newsletter__input">
            <input type="email" placeholder='Enter your Email' />
            <button className='btn newsletter__btn'>Subscribe</button>
          </div>
          <p>
            Get the latest travel tips, exclusive offers, and destination guides
            delivered straight to your inbox.
          </p>
        </div>
      </Col>

      <Col g='6'>
        <div className="newsletter__img">
          <img src={maleTourist} alt="" />
        </div>
      </Col>
    </Row>
  </Container>
</section>

    </>
  
}

export default NewsLetter