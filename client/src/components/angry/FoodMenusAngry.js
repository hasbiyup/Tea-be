import "./Angry.css";
import '../BottomNavbar.css';

import { Container, Row, Col } from "react-bootstrap";
import React, { useState, useEffect, useParams } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

const FoodMenusAngry = () => {
  const [foodList, setFoodList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:5000/foodss").then((response) => {
      //console.log(response.data);
      setFoodList(response.data);
    })
    .catch((error) => {
      console.error(error);
      console.log(error.response);
      console.log(error.message);
      console.log(error.result);
    });
  }, []);
  
  return (
    <>
    <h2 className="header-angry container-fluid mt-4 fw-bold">Recomended Foods</h2>
      {foodList.map((product) => {
         console.log(product);
        if (product.bevId == localStorage.getItem("fp")) {
          return (
            <Container fluid className="menu__box-angry">
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