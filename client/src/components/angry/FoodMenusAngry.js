import "./Angry.css";
import '../BottomNavbar.css';

import { Container, Row, Col } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

const FoodMenusAngry = () => {
  const [foodList, setFoodList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:5000/foods").then((response) => {
      //console.log(response.data);
      setFoodList(response.data);
    })
    .catch((error) => {
      console.error(error);
      console.log(error.response);
      console.log(error.message);
    });
  }, []);
  let currentType = "";


  return (
    <>
    <h2 className="header-angry container-fluid mt-4 fw-bold">Recomended Foods</h2>
      {foodList.map((product, index) => {
        if (product.type !== currentType) {
          currentType = product.type;
          return (
            <Container fluid className="menu__box-angry" key={currentType}>
              <h3 className="type-menu-angry">{product.type}</h3>
              <h4 className="dash-angry"></h4>
              <Link to={`/food-details-angry/${product.id}`}>
                <Row className="list-menu-angry" key={product.id}>
                  <Col md={10} xs={8}>
                    <h5 className="code-name-angry">{product.name}</h5>
                    <small className="status">
                      <i className="bi bi-hand-thumbs-up me-2"></i>
                      {product.highlight}
                    </small>
                    <p>{product.ings}</p>
                    <p className="fw-bold">Rp28.000</p>
                  </Col>

                  <Col md={2} xs={4} className="mt-3">
                    <div className="position-relative" style={{ height: "88px" }}>
                    <img alt={product.name} src={`/img/${product.img1}`} width={"88px"} height={"88px"} className="float-end" style={{ borderRadius: "20px" }}></img>
                    </div>
                  </Col>
                </Row>
              </Link>
              <div className="half-circle"></div>
            </Container>
          );
        } else {
          return (
            <Container fluid className="menu__box-angry" style={{ boxShadow: "0 !important", marginTop: "-11px", zIndex: "10" }}>
              {index !== 0 && <h4 className="dash-angry"></h4>}
              <Link to={`/food-details-angry/${product.id}`} key={product.id}>
                <Row className="list-menu-angry" key={product.id}>
                  <Col md={10} xs={8}>
                    <h5 className="code-name-angry">{product.name}</h5>
                    <small className="status">
                      <i className="bi bi-hand-thumbs-up me-2"></i>
                      {product.highlight}
                    </small>
                    <p>{product.ings}</p>
                    <p className="fw-bold">Rp{product.price}</p>
                  </Col>

                  <Col md={2} xs={4} className="mt-3">
                    <div className="position-relative" style={{ height: "88px" }}>
                    <img alt={product.name} src={`/img/${product.img1}`} width={"88px"} height={"88px"} className="float-end" style={{ borderRadius: "20px" }}></img>
                    </div>
                  </Col>
                </Row>
              </Link>
              <div className="half-circle"></div>
            </Container>
          );
        }
      })}
    </>
  );
};

export default FoodMenusAngry;