import React,{useState} from 'react'
import { Container,Row,Col,Form,FormGroup,Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import '../styles/login.css'
import loginImg from '../assets/images/login.png'
import userIcon from '../assets/images/user.png'
import { useAuth } from '../contexts/AuthContext'
import{useNavigate} from "react-router-dom"
import { axiosInstance } from '../config/axiosInstances'


const Login = () => {
  const naviagte = useNavigate();
   const [credentials,setCredentials]=useState({
        email:undefined,
        password:undefined
      })
  
      const { login } = useAuth(); // Assuming 'logout' and 'user' exist in context
      
  
       const handleChange = e => {
          setCredentials(prev=>({...prev,[e.target.id]:e.target.value}))
       };


        const handleClick=async(e)=>{
              e.preventDefault();
             try {
      
              const reponse = await axiosInstance.post("/users/login" , credentials);
      
              console.log("response : " , reponse.data);
      
              //save in state
              login(reponse.data?.username , reponse.data?.email, "user" , reponse.data?.token);
              
              //navigate
               naviagte("/");
      
             } catch (error) {
                console.log("error : ", error);

                // Use ?. to safely access nested properties
                alert(error.response?.data?.message || "Something went wrong!");
             }
      
             }



  return (
    <section>
      <Container>
        <Row>
          <Col lg='8' className='m-auto'>
          <div className="login__container d-flex justify-content-between">
            <div className="login__img">
              <img src={loginImg} alt="" srcset="" />
            </div>
            <div className="login__form">
              <div className="user">
                <img src={userIcon} alt="" />
              </div>
              <h2>Login</h2>
              <Form onSubmit={handleClick}>
                <FormGroup>
                  <input type="email" placeholder='Email' required id='email' onChange={handleChange} />
                </FormGroup>
                  <FormGroup>
                  <input type="password" placeholder='Password' required id='password' onChange={handleChange} />
                </FormGroup>
                <Button className='btn secondary__btn auth__btn' type='submit'>Login</Button>
              </Form>
              <p>Dont have an account? <Link to='/register'>Create</Link></p>
            </div>

          </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Login