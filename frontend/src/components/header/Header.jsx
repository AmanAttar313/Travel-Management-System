import  { useRef, useEffect } from "react";
import { Container, Row, Button } from "reactstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import "./header.css";
import { useAuth } from "../../contexts/AuthContext";

const nav_links = [
  { path: "/home", display: "Home" },
  { path: "/about", display: "About" },
  { path: "/tours", display: "Tours" },
];



const Header = () => {
  const { isAuthenticated  , logout , username , email} = useAuth(); 

  console.log(isAuthenticated  , username  , email);

  const headerRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/home'); // Redirect to home after logout
  };

  // Sticky Header Logic
  useEffect(() => {
    const handleScroll = () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav_wrapper d-flex align-items-center justify-content-between">
            {/* ============ LOGO ============ */}
            <div className="logo">
              <Link to="/home">
                <img src={Logo} alt="Logo" />
              </Link>
            </div>

            {/* ============ MENU ============ */}
            <div className="navigation">
              <ul className="menu d-flex align-items-center gap-5">
                {nav_links.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "active__link" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* ============ RIGHT SIDE (Auth & Mobile) ============ */}
            <div className="nav__right d-flex align-items-center gap-4">
              <div className="nav__btns d-flex align-items-center gap-4">
                
                {isAuthenticated ? (
                  /* === LOGGED IN VIEW === */
                  <div className="user__profile d-flex align-items-center gap-3">
                    <div
                    onClick={()=>{
                      navigate(`/profile/${email}`)
                    }}
                    className="d-flex align-items-center gap-3">
                       <div className="profile__img">
                      <img
                        src={"/profile.png"} 
                        alt="profile"
                      />
                      {/* <p>{"J"}</p> */}
                      
                    </div>
                    <h5 className="mb-0 fw-bold">{ username || "User"}</h5>

                    </div>
                    <Button className="btn primary__btn logout__btn"  onClick={ ()=>{
                      handleLogout()
                    }} >
                      Logout
                    </Button>
                  </div>
                ) : (
                  /* === GUEST VIEW === */
                  <>
                    <Button className="btn secondary__btn">
                      <Link to="/login">Login</Link>
                    </Button>
                    <Button className="btn primary__btn">
                      <Link to="/register">Register</Link>
                    </Button>
                  </>
                )}
              </div>

              {/* Mobile Menu Icon */}
              <span className="mobile__menu">
                <i className="ri-menu-line"></i>
              </span>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;

