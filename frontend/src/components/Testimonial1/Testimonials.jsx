
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ava01 from "../../assets/images/ava-1.jpg";
import ava02 from "../../assets/images/ava-2.jpg";
import ava03 from "../../assets/images/ava-3.jpg";
// import Slider from "react-slick";
// import { Slider } from "react-slick";
import slick from "react-slick";
const Slider = slick.default || slick;

const Testimonials = () => {

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 3000,
    swipeToSlide: true,
    autoplaySpeed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,

    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };





  return (
   
<Slider {...settings}>
    
    {/* Slide 1 */}
    <div>
      <div className="testimonial py-4 px-3">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <div className="d-flex align-items-center gap-3 mt-3">
          <img src={ava01} className="h-25 w-25 rounded-2" alt="" />
          <div>
            <h5 className="mb-0 mt-3">John Doe</h5>
            <p>Customer</p>
          </div>
        </div>
      </div>
    </div>

    {/* Slide 2 */}
    <div>
      <div className="testimonial py-4 px-3">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>

        <div className="d-flex align-items-center gap-3 mt-3">
          <img src={ava02} className="h-25 w-25 rounded-2" alt="" />
          <div>
            <h5 className="mb-0 mt-3">Jorden Jojo</h5>
            <p>Customer</p>
          </div>
        </div>
      </div>
    </div>

    {/* Slide 3 */}
    <div>
      <div className="testimonial py-4 px-3">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>

        <div className="d-flex align-items-center gap-3 mt-3">
          <img src={ava03} className="h-25 w-25 rounded-2" alt="" />
          <div>
            <h5 className="mb-0 mt-3">Alex Smith</h5>
            <p>Customer</p>
          </div>
        </div>
      </div>
    </div>

    {/* Slide 4 */}
    <div>
      <div className="testimonial py-4 px-3">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>

        <div className="d-flex align-items-center gap-3 mt-3">
          <img src={ava03} className="h-25 w-25 rounded-2" alt="" />
          <div>
            <h5 className="mb-0 mt-3">Alex Smith</h5>
            <p>Customer</p>
          </div>
        </div>
      </div>
    </div>

    {/* Slide 5 */}
   <div>
      <div className="testimonial py-4 px-3">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>

        <div className="d-flex align-items-center gap-3 mt-3">
          <img src={ava02} className="h-25 w-25 rounded-2" alt="" />
          <div>
            <h5 className="mb-0 mt-3">Jorden Jojo</h5>
            <p>Customer</p>
          </div>
        </div>
      </div>
    </div>

</Slider>
  );
};

export default Testimonials;






