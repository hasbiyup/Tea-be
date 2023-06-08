import Carousel from 'react-bootstrap/Carousel';
import './Angry.css';

import gbr1 from './img/1.jpg';
import gbr2 from './img/2.jpg';
import gbr3 from './img/3.jpg';

const Carousel2 = () => {
  return (
    <>
    <Carousel className='carousel'>
      <Carousel.Item>
        <img
          className="w-100"
          src={gbr1}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="w-100"
          src={gbr2}
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="w-100"
          src={gbr3}
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
    <div className="half-circle"></div>
    </>
  );
}

export default Carousel2;