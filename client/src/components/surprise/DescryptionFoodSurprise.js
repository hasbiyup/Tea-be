import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import "./Surprise.css";

import { useParams } from "react-router-dom";
import { getProducts } from "./dataSurprise";

const DescryptionFoodSurprise = () => {
  let params = useParams();
  let products = getProducts(parseInt(params.surpriseId, 10));
  return (
    <div className="desc-box">
      <Card className="shadow-none desc-body">
        <Card.Body>
          <div className="mx-1">
            <Badge className="badge-custom-surprise fw-normal ms-2">{products.type}</Badge>
            <Badge className="badge-custom-surprise fw-normal ms-2">{products.ings[0]}</Badge>
            <Badge className="badge-custom-surprise fw-normal ms-2">Surprise</Badge>
          </div>

          <h2 className="ms-2 mt-2 fw-bold">{products.name}</h2>

          <div className="ms-2">
            <span className="type">{products.highlight}</span>
          </div>

          <hr></hr>
          <p className="ms-2">{products.highlight}</p>
          <p className="ms-2">{products.desc}</p><br></br><br></br>
        </Card.Body>
      </Card>
      <div className="half-circle"></div>
    </div>
  );
}

export default DescryptionFoodSurprise;