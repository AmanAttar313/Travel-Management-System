import React,{useState} from 'react'
import './booking.css'
import { Form,FormGroup,ListGroup,ListGroupItem,Button } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import { axiosInstance } from '../../config/axiosInstances'



const Booking = ({tour ,avgRating}) => {
      


    const {price,reviews , title}=tour;


    console.log("tour in booking : " , title)
    const navigate=useNavigate()

    const [credentials,setCredentials]=useState({
        fullName:'',
        phone:'',
        guestSize:1,
        bookAt:' '
    })


    const serviceFee=10

    const totalAmount=Number(price)*Number(credentials.guestSize)+Number(serviceFee)

     const handleChange = e => {
        setCredentials(prev=>({...prev,[e.target.id]:e.target.value}))
     };

     //send data to server
     const handleClick=async(e)=>{
        e.preventDefault()


        try {

            const response = await axiosInstance.post("/booking/create" , {
                tourName  : title,
                fullname  : credentials.fullName,
                guestSize : credentials.guestSize ,
                phone  : credentials.phone,
                bookingAt : credentials.bookAt,
                totalAmount : totalAmount
            });


            console.log("response : " , response.data);
        navigate("/thank-you");
        } catch (error) {
            console.log("error : " , error);
            // alert("create booking failed!");
               let errorMessage = "Create booking failed!"; // Default generic message
        if (error.response && error.response.data && error.response.data.message) {
         
            errorMessage = error.response.data.message;
        } else if (error.message) {
            
            errorMessage = error.message;
        } else {
            errorMessage = String(error);
        }
        
        alert(errorMessage);
        }
        
     }
  return (
    <div className='booking'>
        <div className="booking__top d-flex align-items-center justify-content-between">
            <h3>{price}<span>/per person</span></h3>
            <span className="tour__rating  d-flex align-items-center">
                    <i class="ri-star-fill" ></i>
                    {avgRating === 0 ? null : avgRating}({reviews?.length})
                  </span>
        </div>
        {/* ==========booking Form start======== */}
        <div className="booking__form">
            <h5>Information</h5>
            <Form className='booking__info-form' onSubmit={handleClick}>
                <FormGroup>
                    <input type="text" placeholder='Full Name' id='fullName' required onChange={handleChange} />
                    </FormGroup> 
                    <FormGroup>
                    <input type="number" placeholder='Phone' id='phone' required onChange={handleChange} />
                    </FormGroup> 
                    <FormGroup>
                    <input type="date" placeholder='' id='bookAt' required onChange={handleChange} />
                    <input type="number" placeholder='Guest' id='guestSize' required onChange={handleChange} />
                    </FormGroup> 

            </Form>
        </div>
        {/* ==========booking Form end======== */}

        {/* ==============booking bottom============ */}
        <div className="booking__bottom">
            <ListGroup>
                <ListGroupItem className='border-0 px-0'>
                    <h5 className='d-flex align-items-center '>${price}<i class="ri-close-line"></i>1 Person</h5>
                    <span>${price}</span>
                     </ListGroupItem>
                     <ListGroupItem className='border-0 px-0'>
                    <h5>Service Charge</h5>
                    <span>${serviceFee}</span>
                     </ListGroupItem>
                     <ListGroupItem className='border-0 px-0 total'>
                    <h5>Total</h5>
                    <span>${totalAmount}</span>
                     </ListGroupItem>
            </ListGroup>
            <Button className='btn primary__btn w-100 mt-4' onClick={handleClick }>Book Now</Button>
        </div>

    </div>
  )
}

export default Booking