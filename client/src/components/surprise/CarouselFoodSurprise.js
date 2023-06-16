import Carousel from "react-bootstrap/Carousel";
import "./Surprise.css";

import gbr1 from "./img/1.jpg";
import gbr2 from "./img/2.jpg";
import gbr3 from "./img/3.jpg";

const CarouselFoodSurprise = () => {
  return (
    <>
      <Carousel className="carousel">
        <Carousel.Item>
          <img 
          className="w-100 cropped-image"
          style={{ height: '480px' }}
          src={gbr1} alt="First slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img 
          className="w-100 cropped-image"
          style={{ height: '480px' }}
          src={gbr2} alt="Second slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img 
          className="w-100 cropped-image"
          style={{ height: '480px' }}
          src={gbr3} alt="Third slide" />
        </Carousel.Item>
      </Carousel>
      <div className="half-circle"></div>
      
    </>
  );
};

export default CarouselFoodSurprise;