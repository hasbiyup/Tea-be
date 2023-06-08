import "../components/dashboard/dashboard.css";

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card } from "react-bootstrap";
import Sidebar from "../components/dashboard/Sidebar.js";
import Food from "../components/dashboard/Food.svg";
import FoodPairing from "../components/dashboard/FoodPairing.svg";
import Staff from "../components/dashboard/Staff.svg";
import Tea from "../components/dashboard/Tea.svg";

const Dashboard = () => {
  const userRole = localStorage.getItem("role");

  return (
    <Sidebar>
      <Row className="d-flex justify-content-between align-items-center" style={{ marginTop: "24px" }}>
        <Col md={9}>
          <h3 className="topbar-dashboard fw-bold margin-topbar-dashboard">
            Dashboard Teanology
          </h3>
        </Col>
        <Col md={3}>
          <p className="topbar-dashboard float-end margin-admin-topbar">
            <i class="bi bi-person-circle me-2"></i>{userRole}
          </p>
        </Col>
        <p className="text-muted teanology-menu-update">
          Teanology menu update. <a href="/home" style={{ color: '#539e6d' }}>Back to home page.</a>
        </p>
      </Row>
      {/* <Container className="box-con">
        <Card className="box-dashboard">
          <Card.Body>
            <Row>
              <Col xs={4}>
                <div className="oval-icon">
                  <img className="icon" src={Tea} />
                </div>
              </Col>
              <Col xs={8}>
                <h4 className="text-total">Total Tea Menu</h4>
                <h3 className="total">10</h3>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Card className="box-dashboard">
          <Card.Body>
            <Row>
              <Col xs={4}>
                <div className="oval-icon">
                  <img className="icon" src={Food} />
                </div>
              </Col>
              <Col xs={8}>
                <h4 className="text-total">Total Food Menu</h4>
                <h3 className="total">10</h3>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>

      <Container className="box-con">
        <Card className="box-dashboard">
          <Card.Body>
            <Row>
              <Col xs={4}>
                <div className="oval-icon">
                  <img className="icon" src={FoodPairing} />
                </div>
              </Col>
              <Col xs={8}>
                <h4 className="text-total">Total FoodPairing</h4>
                <h3 className="total">10</h3>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Card className="box-dashboard">
          <Card.Body>
            <Row>
              <Col xs={4}>
                <div className="oval-icon">
                  <img className="icon" src={Staff} />
                </div>
              </Col>
              <Col xs={8}>
                <h4 className="text-total">Total Staff</h4>
                <h3 className="total">10</h3>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container> */}

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
                <h4 className="text-total">Total Tea Menu</h4>
                <h3 className="total">10</h3>
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
                <h3 className="total">10</h3>
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
                <h3 className="total">10</h3>
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
                <h3 className="total">10</h3>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
    </Sidebar>
  );
};

export default Dashboard;
