import "./App.css";
import ProductCard from "./components/productCard";

function App() {
  return (
    <>
      <ProductCard name="Laptop" price="100,000.00" image="https://cdn.mos.cms.futurecdn.net/VJLFPMRL3dCwWWJPRgfTUH.jpg"/>
      <ProductCard name="Phone" price="80,000.00" image="https://luckymobile.lk/wp-content/uploads/2025/07/Xiaomi-Redmi-13-500x500-1.jpg"/>
      <ProductCard name="Watch" price="10,000.00" image="https://5.imimg.com/data5/SELLER/Default/2020/12/KN/WP/OI/5388819/t500-smartwatch-500x500.jpg"/>
    </>
  );
}

export default App;
