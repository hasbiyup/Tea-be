import './Fear.css';

import React, { useState, useEffect } from "react";
import Axios from "axios";
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useParams } from "react-router-dom";

function BodyOnlyExample() {
  const { id } = useParams();
  const [val, setVal] = useState({id});
  
  useEffect(() => {
    Axios.get(`http://localhost:5000/bevs/${val.id}`).then((response) => {
      //console.log(response.data);
      setVal(response.data);
    });
  }, [id]);
  return (
    <div className='desc-box'>
    <Card className='shadow-none desc-body'>
      <Card.Body>
        <div className='mx-1'>
          <Badge className='badge-custom-fear fw-normal ms-2'>
            {val.type}
          </Badge>
          <Badge className='badge-custom-fear fw-normal ms-2'>
            {val.ings}
          </Badge>
          <Badge className='badge-custom-fear fw-normal ms-2'>
            Fear
          </Badge>
        </div>

        <h2 className='ms-2 mt-2 fw-bold'>{val.name}</h2>
        
        <div className="ms-2">
          <span className="type">{val.highlight}</span>
        </div>

        <Container fluid>
        <Row className='ings mt-3'>
          <ul className=' d-flex justify-content-between'>
            <li>
              <i className="bi bi-database me-2"></i>
              {val.tsp} Teaspoon ({val.tspg}g)
            </li>
            <li>
              <i className="bi bi-cup-straw me-2"></i>
              {val.water} Ml
            </li>
            <li>
              <i className="bi bi-thermometer-half me-2"></i>
              {val.temp} °C
            </li>
            <li>
              <i className="bi bi-hourglass-bottom me-2"></i>
              {val.time} Mins
            </li>
          </ul>
        </Row>
        </Container>
        <hr></hr>
        <p className='ms-2'>{val.highlight}</p>
        <p className='ms-2'>{val.desc}</p>
        <a href="/food-pairing-fear">
          <button className="btn btn-pairing-fear">Get Some Food</button>
          </a>
      </Card.Body>
    </Card>
    <div className="half-circle"></div>
    </div>
  );
}

export default BodyOnlyExample;