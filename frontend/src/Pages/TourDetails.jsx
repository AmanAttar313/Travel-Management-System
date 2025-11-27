import React, { useRef, useState } from 'react';
import '../styles/tour-details.css';
import { Container, Row, Col, Form, ListGroup } from 'reactstrap';
import { useParams } from 'react-router-dom';
import tourData from '../assets/data/tours';
import calculateAvgRating from '../utils/AvgRating';
import avatar from '../assets/images/avatar.jpg';
import Booking from '../components/Booking/Booking';
import NewsLetter from '../shared/NewsLetter';

const TourDetails = () => {
  const { id } = useParams(); // get tour id from URL
  const reviewMsgRef = useRef(null);
  const [tourRating, setTourRating] = useState(null);

  const tour = tourData.find(tour => tour.id === id); // find tour by id
  if (!tour) return <h2>Tour not found!</h2>;

  const { photo, title, desc, price, reviews, city, distance, maxGroupSize, address } = tour;
  const { totalRating, avgRating } = calculateAvgRating(reviews);

  const options = { day: 'numeric', month: 'long', year: 'numeric' };

  // Submit review
  const submitHandler = e => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;
    if (!tourRating) {
      alert('Please select a rating before submitting.');
      return;
    }
    alert(`Review: ${reviewText}\nRating: ${tourRating}`);
    reviewMsgRef.current.value = ''; // clear input
    setTourRating(null); // reset rating
    // TODO: call API to save review
  };

  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg='8'>
              <div className="tour__content">
                <img src={photo} alt={title} />

                <div className="tour__info">
                  <h2>{title}</h2>
                  <div className='d-flex align-items-center gap-5'>
                    <span className="tour__rating d-flex align-items-center gap-1">
                      <i className="ri-star-fill" style={{ color: "var(--secondary-color)" }}></i>
                      {avgRating === 0 ? 'Not rated' : avgRating.toFixed(1)}
                      {totalRating > 0 && <span>({reviews.length})</span>}
                    </span>

                    <span>
                      <i className="ri-map-pin-user-fill"></i>{address}
                    </span>
                  </div>

                  <div className="tour__extra-details">
                    <span><i className="ri-map-pin-line"></i>{city}</span>
                    <span><i className="ri-money-dollar-circle-line"></i>${price} per person</span>
                    <span><i className="ri-map-pin-time-line"></i>{distance} k/m</span>
                    <span><i className="ri-group-line"></i>{maxGroupSize} People</span>
                  </div>

                  <h5>Description</h5>
                  <p>{desc}</p>
                </div>

                {/* ========== Tour Reviews Section ========== */}
                <div className="tour__reviews mt-4">
                  <h4>Reviews ({reviews?.length})</h4>
                  <Form onSubmit={submitHandler}>
                    <div className='d-flex align-items-center gap-3 mb-4 rating__group'>
                      {[1, 2, 3, 4, 5].map(num => (
                        <span key={num} onClick={() => setTourRating(num)}>
                          {num} <i className="ri-star-s-fill" style={{ color: tourRating >= num ? 'orange' : '#ccc' }}></i>
                        </span>
                      ))}
                    </div>

                    <div className="reviews__input">
                      <input type="text" ref={reviewMsgRef} placeholder='Share your thoughts' required />
                      <button className="btn primary__btn text-white" type='submit'>Submit</button>
                    </div>
                  </Form>

                  <ListGroup className='user__reviews'>
                    {reviews?.map((review, index) => (
                      <div key={index} className="reviews__item">
                        <img src={avatar} alt="user avatar" />
                        <div className="w-100">
                          <div className="d-flex align-items-center justify-content-between">
                            <div>
                              <h5>{review.username || 'Anonymous'}</h5>
                              <p>{new Date(review.date).toLocaleDateString('en-US', options)}</p>
                            </div>
                            <span className='d-flex align-items-center'>
                              {review.rating} <i className="ri-star-s-fill"></i>
                            </span>
                          </div>
                          <h6>{review.text}</h6>
                        </div>
                      </div>
                    ))}
                  </ListGroup>
                </div>
                {/* ========== Tour Reviews Section End ========== */}
              </div>
            </Col>

            <Col lg='4'>
              <Booking tour={tour} avgRating={avgRating} />
            </Col>
          </Row>
        </Container>
      </section>

      <NewsLetter />
    </>
  );
};

export default TourDetails;
