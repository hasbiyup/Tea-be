import "./App.css";
import "../components/loginPage/LoginPage.css";

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Axios from "axios";
import { Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import Orbit2 from "../components/loginPage/img/orbit-cover.svg";
import Mascot2 from "../components/loginPage/img/MascotHappy2.png";
import Logo from "../components/loginPage/img/Logo.svg";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem("rememberedEmail");
    const storedPassword = localStorage.getItem("rememberedPassword");
    const storedRememberMe = localStorage.getItem("rememberMe");

    if (storedEmail && storedPassword && storedRememberMe) {
      setEmail(storedEmail);
      setPassword(storedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = () => {
    Axios.post("http://localhost:5000/login", {
      email: email,
      password: password,
    }).then((response) => {
      console.log(response.data);
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
        localStorage.setItem("rememberedPassword", password);
        localStorage.setItem("rememberMe", true);
      } else {
        localStorage.removeItem("rememberedEmail");
        localStorage.removeItem("rememberedPassword");
        localStorage.removeItem("rememberMe");
      }
      const id = response.data.id;
      const name = response.data.name;
      const role = response.data.role;
      localStorage.setItem("id", id);
      localStorage.setItem("name", name);
      localStorage.setItem("role", role);
      console.log(localStorage.getItem("id", id))
      console.log(localStorage.getItem("name", name))
      console.log(localStorage.getItem("role", role))
      navigate("/dashboard");
    })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin();
  };
  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <div className="box">
      <Row>
        <Col md={6}>
          <img src={Orbit2} alt="bg-cover" className="bg-cover"></img>
          <img src={Mascot2} alt="mascot-cover" className="mascot-cover"></img>
        </Col>
        <Col md={6}>
          <img className="logo float-end" src={Logo} alt="logo-teanology" />
          <div className="login-box float-end">
            <p className="heading">Welcome Back..</p>
            <p className="sub">Please enter your email and password!</p>
            <Form onSubmit={handleSubmit}>

            <Form.Label>Email</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text className="form-icon" id="basic-addon1"><i class="bi bi-person fs-5 text-muted"></i></InputGroup.Text>
                <Form.Control className="login-form"
                placeholder="Enter your email" 
                aria-label="Email" 
                aria-describedby="basic-addon1" 
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}/>
              </InputGroup>

              <Form.Label>Password</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text className="form-icon" id="basic-addon1"><i class="bi bi-lock fs-5 text-muted"></i></InputGroup.Text>
                <Form.Control className="login-form"
                placeholder="Enter your password"
                aria-label="Password"
                aria-describedby="basic-addon1"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}/>
              </InputGroup>

              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                  className="remember-me"
                  type="checkbox"
                  label="Remember me"
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                />
              </Form.Group>
                <button className="button2 fw-bold" type="submit">
                  Sign In
                </button>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default LoginPage;