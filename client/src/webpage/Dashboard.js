import "../components/dashboard/dashboard.css";

import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";
import Sidebar from "../components/dashboard/Sidebar.js";
import Food from "../components/dashboard/Food.svg";
import FoodPairing from "../components/dashboard/FoodPairing.svg";
import Staff from "../components/dashboard/Staff.svg";
import Tea from "../components/dashboard/Tea.svg";


const Dashboard = () => {
  const userRole = localStorage.getItem("role");
  const userName = localStorage.getItem("name");
  const [foods, setTotalFoods] = useState([]);
  const [staff, setTotalStaff] = useState([]);
  const [bevs, setTotalBevs] = useState([]);
  const [foodpairing, setTotalFP] = useState([]);

  // Mengambil data makanan dari backend
  useEffect(() => {
    Axios.get("http://localhost:5000/foods")
      .then(response => {
        setTotalFoods(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  const totalFoodData = foods.length;

  // Mengambil data staff dari backend
  useEffect(() => {
    Axios.get("http://localhost:5000/users")
      .then(response => {
        setTotalStaff(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  const totalStaffData = staff.length;

  // Mengambil data FP dari backend
  useEffect(() => {
    Axios.get("http://localhost:5000/bevs")
      .then(response => {
        setTotalBevs(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  const totalBevsData = bevs.length;

  // Mengambil data FP dari backend
  useEffect(() => {
    Axios.get("http://localhost:5000/foodpairings")
      .then(response => {
        setTotalFP(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  const totalFPData = foodpairing.length;

  return (
    <Sidebar>
      <Container fluid>
        <Row  style={{ marginTop: "24px" }}>
          <Col md={7} xs={12}>
            <h3 className="topbar-dashboard fw-bold margin-topbar-dashboard">Dashboard Teanolgy</h3>
            <p className="text-muted teanology-menu-update">
              Teanology menu update.{" "}
              <a href="/home" style={{ color: "#539e6d" }}>
                Back to home page.
              </a>
            </p>
          </Col>
          <Col md={5} xs={12} className="user-admin d-flex justify-content-end align-items-center">
            <p className="topbar-dashboard margin-admin-topbar" style={{ marginBottom: '10%' }}>
              <i className="bi bi-person-circle me-2"></i>
              <span className="fw-bold">{userRole}</span> | {userName}
            </p>
          </Col>
        </Row>
      </Container>
      
      <div className="flex-containerrr">
        <Card className="box-dashboard2">
          <Card.Body>
            <Row>
              <Col xs={4}>
                <div className="oval-icon">
                  <img className="icon" alt="oval-tea" src={Tea} />
                </div>
              </Col>
              <Col xs={8}>
                <h4 className="text-total">Total Beverage Menu</h4>
                <h3 className="total">{totalBevsData}</h3>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Card className="box-dashboard2">
          <Card.Body>
            <Row>
              <Col xs={4}>
                <div className="oval-icon">
                  <img className="icon" alt="oval-food" src={Food} />
                </div>
              </Col>
              <Col xs={8}>
                <h4 className="text-total">Total Food Menu</h4>
                <h3 className="total">{totalFoodData}</h3>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Card className="box-dashboard2">
          <Card.Body>
            <Row>
              <Col xs={4}>
                <div className="oval-icon">
                  <img className="icon" alt="oval-foodpairing" src={FoodPairing} />
                </div>
              </Col>
              <Col xs={8}>
                <h4 className="text-total">Total Food Pairing</h4>
                <h3 className="total">{totalFPData}</h3>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Card className="box-dashboard2">
          <Card.Body>
            <Row>
              <Col xs={4}>
                <div className="oval-icon">
                  <img className="icon" alt="oval-staff" src={Staff} />
                </div>
              </Col>
              <Col xs={8}>
                <h4 className="text-total">Total Staff</h4>
                <h3 className="total">{totalStaffData}</h3>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
    </Sidebar>
  );
};

export default Dashboard;