import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import './Disgust.css';

import { useParams } from "react-router-dom";
import { getProducts } from "./dataDisgust";

function BodyOnlyExample() {
  let params = useParams();
  let products = getProducts(parseInt(params.disgustId, 10));
  return (
    <div className='desc-box'>
    <Card className='shadow-none desc-body'>
      <Card.Body>
        <div className='mx-1'>
          <Badge className='badge-custom-disgust fw-normal ms-2'>
            {products.type}
          </Badge>
          <Badge className='badge-custom-disgust fw-normal ms-2'>
            {products.ings[0]}
          </Badge>
          <Badge className='badge-custom-disgust fw-normal ms-2'>
            Disgust
          </Badge>
        </div>

        <h2 className='ms-2 mt-2 fw-bold'>{products.name}</h2>
        
        <div className="ms-2">
          <span className="type">{products.highlight}</span>
        </div>

        <Container fluid>
        <Row className='ings mt-3'>
          <ul className=' d-flex justify-content-between'>
            <li>
              <i className="bi bi-database me-2"></i>
              {products.brew[0]}
            </li>
            <li>
              <i className="bi bi-cup-straw me-2"></i>
              {products.brew[1]}
            </li>
            <li>
              <i className="bi bi-thermometer-half me-2"></i>
              {products.brew[2]}
            </li>
            <li>
              <i className="bi bi-hourglass-bottom me-2"></i>
              {products.brew[3]}
            </li>
          </ul>
        </Row>
        </Container>
        <hr></hr>
        <p className='ms-2'>{products.highlight}</p>
        <p className='ms-2'>{products.desc}</p>
      </Card.Body>
    </Card>
    <div className="half-circle"></div>
    </div>
  );
}

export default BodyOnlyExample;