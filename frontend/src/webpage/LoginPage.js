import "./App.css";
import "../components/loginPage/LoginPage.css";

import React from "react";
import { Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import Orbit2 from "../components/loginPage/img/orbit-cover.svg";
import Mascot2 from "../components/loginPage/img/MascotHappy2.png";
import Logo from "../components/loginPage/img/Logo.svg";

function LoginPage() {
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
            <p className="sub">Please enter your username and password!</p>
            <Form>
            <Form.Label>Username</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text className="form-icon" id="basic-addon1"><i class="bi bi-person fs-5 text-muted"></i></InputGroup.Text>
                <Form.Control className="login-form" placeholder="Enter your username" aria-label="Username" aria-describedby="basic-addon1" />
              </InputGroup>
              <Form.Label>Password</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text className="form-icon" id="basic-addon1"><i class="bi bi-lock fs-5 text-muted"></i></InputGroup.Text>
                <Form.Control className="login-form" placeholder="Enter your password" aria-label="Password" aria-describedby="basic-addon1" />
              </InputGroup>

              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check className="remember-me" type="checkbox" label="Remember me" />
              </Form.Group>
              <a href="dashboard">
                <button className="button2 fw-bold" type="submit">
                  Sign In
                </button>
              </a>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default LoginPage;