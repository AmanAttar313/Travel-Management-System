import React,{useState} from 'react'
import { Container,Row,Col,Form,FormGroup,Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import '../styles/login.css'
import loginImg from '../assets/images/login.png'
import userIcon from '../assets/images/user.png'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from "react-router-dom"
import { axiosInstance } from '../config/axiosInstances'

const Login = () => {
  const navigate = useNavigate();

  // ⭐ Login credentials
  const [credentials,setCredentials]=useState({
    email: "",
    password: ""
  });

  // ⭐ Login mode → user / admin
  const [loginType, setLoginType] = useState("user");

  const { login } = useAuth();

  const handleChange = e => {
    setCredentials(prev=>({...prev,[e.target.id]:e.target.value}))
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/users/login" , credentials);

      console.log("response : " , response.data);

      const role = loginType === "admin" ? "admin" : "user";

      // Save login info in Context
      login(
        response.data?.username,
        response.data?.email,
        role,
        response.data?.token
      );

      // Redirect based on role
      if(role === "admin"){
        navigate("/admin/dashboard");
      }else{
        navigate("/");
      }

    } catch (error) {
      console.log("error : ", error);
      alert(error.response?.data?.message || "Login failed!");
    }
  }

  return (
    <section>
      <Container>
        <Row>
          <Col lg='8' className='m-auto'>
            <div className="login__container d-flex justify-content-between">
              
              <div className="login__img">
                <img src={loginImg} alt="" />
              </div>

              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>

                <h2>{loginType === "admin" ? "Admin Login" : "Login"}</h2>

                {/* ⭐ Login Mode Buttons */}
                <div className="mb-3 d-flex gap-2">
                  <Button
                    className={`btn btn-sm ${loginType === "user" ? "btn-primary" : "btn-outline-primary"}`}
                    onClick={() => setLoginType("user")}
                  >
                    User
                  </Button>

                  <Button
                    className={`btn btn-sm ${loginType === "admin" ? "btn-danger" : "btn-outline-danger"}`}
                    onClick={() => setLoginType("admin")}
                  >
                    Admin
                  </Button>
                </div>

                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <input type="email" placeholder='Email' required id='email' onChange={handleChange} />
                  </FormGroup>
                  <FormGroup>
                    <input type="password" placeholder='Password' required id='password' onChange={handleChange} />
                  </FormGroup>

                  <Button className='btn secondary__btn auth__btn' type='submit'>
                    {loginType === "admin" ? "Login as Admin" : "Login"}
                  </Button>
                </Form>

                {loginType === "user" && (
                  <p>Don’t have an account? <Link to='/register'>Create</Link></p>
                )}

              </div>

            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Login
