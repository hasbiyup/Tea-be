import './App.css';
import '../components/BottomNavbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import BottomNavbar from '../components/disgust/BottomNavbarDisgust';
import Konten1 from '../components/disgust/CarouselFoodDisgust';
import Konten2 from '../components/disgust/DescryptionFoodDisgust';
import TopBar from '../components/TopBar2';
import Breadcrumbs from '../components/BreadCrumbs';

const DetailFoodDisgust = () => {

  const items = [
    { label: 'Home', link: '/' },
    { label: 'Mood Disgust', link: '/disgust' },
    { label: 'Product Details', link: 'detail-product-disgust'},
  ];

  return (
    <div className="App mt-4" style={{ marginBottom:'100px' }}>
        <BottomNavbar />
        <TopBar />
        <Breadcrumbs items={items} />
        <Konten1 />
        <Konten2 />
    </div>
  );
}

export default DetailFoodDisgust;