import { Container, Row, Col } from "react-bootstrap";
import "./Disgust.css";

import { Link } from "react-router-dom";
import { getProduct } from "./dataDisgust";
import '../BottomNavbar.css';

import foto from "../teh.jpg";

const FoodMenusDisgust = () => {
  let product = getProduct();
  let currentType = "";

  return (
    <>
    <h2 className="header-disgust container-fluid mt-4 fw-bold">Recomended Foods</h2>
      {product.map((product, index) => {
        if (product.type !== currentType) {
          currentType = product.type;
          return (
            <Container fluid className="menu__box-disgust" key={currentType}>
              <h3 className="type-menu-disgust">{product.type}</h3>
              <h4 className="dash-disgust"></h4>
              <Link to={`/food-details-disgust/${product.number}`} key={product.number}>
                <Row className="list-menu-disgust">
                  <Col md={10} xs={8}>
                    <h5 className="code-name-disgust">{product.name}</h5>
                    <small className="status">
                      <i className="bi bi-hand-thumbs-up me-2"></i>
                      {product.highlight}
                    </small>
                    <p>{product.ings}</p>
                    <p className="fw-bold">Rp28.000</p>
                  </Col>

                  <Col md={2} xs={4} className="mt-3">
                    <div className="position-relative" style={{ height: "88px" }}>
                      <img src={foto} width={"88px"} height={"88px"} className="float-end" style={{ borderRadius: "20px" }}></img>
                    </div>
                  </Col>
                </Row>
              </Link>
              <div className="half-circle"></div>
            </Container>
          );
        } else {
          return (
            <Container fluid className="menu__box-disgust" style={{ boxShadow: "0 !important", marginTop: "-11px", zIndex: "10" }}>
              {index !== 0 && <h4 className="dash-disgust"></h4>}
              <Link to={`/food-details-disgust/${product.number}`} key={product.number}>
                <Row className="list-menu-disgust" key={product.number}>
                  <Col md={10} xs={8}>
                    <h5 className="code-name-disgust">{product.name}</h5>
                    <small className="status">
                      <i className="bi bi-hand-thumbs-up me-2"></i>
                      {product.highlight}
                    </small>
                    <p>{product.ings}</p>
                    <p className="fw-bold">Rp28.000</p>
                  </Col>

                  <Col md={2} xs={4} className="mt-3">
                    <div className="position-relative" style={{ height: "88px" }}>
                      <img src={foto} width={"88px"} height={"88px"} className="float-end" style={{ borderRadius: "20px" }}></img>
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

export default FoodMenusDisgust;