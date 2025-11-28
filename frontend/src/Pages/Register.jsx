
import React,{useState} from 'react'
import { Container,Row,Col,Form,FormGroup,Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import '../styles/login.css'
import registerImg from '../assets/images/register.png'
import userIcon from '../assets/images/user.png'
import { useNavigate } from "react-router-dom"
import { axiosInstance } from '../config/axiosInstances'



const Register = () => {
 
 const navigation = useNavigate();


   const [ credentials , setCredentials]=useState({
         username:undefined,
        email:undefined,
        password:undefined
      })
  
    
  
       const handleChange = e => {
          setCredentials(prev=>({...prev,[e.target.id]:e.target.value}))
       };

       const handleClick=async(e)=>{
        e.preventDefault();
       try {

        const reponse = await axiosInstance.post("/users/register" , credentials);

        console.log("response : " , reponse.data);

        //navigate
         navigation("/login");

       } catch (error) {
        console.log("error : " , error);
        alert("user register failed!")
       }

       }

  return (
    <section>
      <Container>
        <Row>
          <Col lg='8' className='m-auto'>
          <div className="login__container d-flex justify-content-between">
            <div className="login__img">
              <img src={registerImg} alt="" srcset="" />
            </div>
            <div className="login__form">
              <div className="user">
                <img src={userIcon} alt="" />
              </div>
              <h2>Register</h2>
              <Form onSubmit={handleClick}>
                <FormGroup>
                  <input type="text" placeholder='Username' required id='username' onChange={handleChange} />
                </FormGroup>
                 <FormGroup>
                  <input type="text" placeholder='Email' required id='email' onChange={handleChange} />
                </FormGroup>
                  <FormGroup>
                  <input type="password" placeholder='Password' required id='password' onChange={handleChange} />
                </FormGroup>
                <Button className='btn secondary__btn auth__btn button' type='submit'>Create</Button>
              </Form>
              <p>Already have an account? <Link to='/login'>Login</Link></p>
            </div>

          </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

  


export default Register;