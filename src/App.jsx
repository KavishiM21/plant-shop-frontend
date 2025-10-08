import "./App.css";
import Header from "./components/header";
import ProductCard from "./components/productCard";

function App() {
  return (
    // <>
    //   <Header />
    //   <ProductCard
    //     name="Snake Plant / සෙරපත් පැල (Sansevieria) 60cm"
    //     price="1,000.00"
    //     image="https://plantme.lk/wp-content/uploads/2022/12/snake-plant-indoorplant-1-1-1024x683.jpg"
    //   />
    //   <ProductCard
    //     name="ZZ Plant / සීසී පැල (Zamioculcas zamiifolia) 60cm"
    //     price="1,000.00"
    //     image="https://plantme.lk/wp-content/uploads/2022/12/zz-plant.jpg"
    //   />
    //   <ProductCard
    //     name="Peace Lily / සාම සිංහ (Spathiphyllum) 40cm"
    //     price="800.00"
    //     image="https://plantme.lk/wp-content/uploads/2022/12/Peace-Lily-Vastu-benefits-direction-plant-care-and-maintenance.jpg"
    //   />
    //   <ProductCard
    //     name="Money Plant / මනි පැල / (Pothos / Epipremnum aureum)"
    //     price="500.00"
    //     image="https://plantme.lk/wp-content/uploads/2022/12/Pothos-houseplant.webp"
    //   />
    //   <ProductCard
    //     name="Heartleaf Philodendron / හෘද කොළ පැල"
    //     price="600.00"
    //     image="https://plantme.lk/wp-content/uploads/2022/12/Philodendron-1024x680.jpg"
    //   />
    //   <ProductCard
    //     name="Ficus Benjamina / Weeping Fig / බෙන්ජමින් ෆිග්"
    //     price="800.00"
    //     image="https://plantme.lk/wp-content/uploads/2022/12/ficus-indoor-plant.jpg"
    //   />
    //   <ProductCard
    //     name="Jade Plant / Crassula ovata / Money Tree / ජේඩ් පැල"
    //     price="600.00"
    //     image="https://plantme.lk/wp-content/uploads/2022/12/jade-plant.jpg"
    //   />
    //   <ProductCard
    //     name="Rubber Plant / රබර් පැල (Ficus elastica)"
    //     price="750.00"
    //     image="https://plantme.lk/wp-content/uploads/2022/12/rubber-plant-indoor.jpg"
    //   />
    //   <ProductCard
    //     name="English ivy / අංගේරියානු අයිවි (Hedera helix)"
    //     price="500.00"
    //     image="https://plantme.lk/wp-content/uploads/2022/12/english-ivy-foliage-plants.webp"
    //   />
    // </>
    <div className="border w-[600px] h-[600px] bg-gray-400 relative">
      <div className="w-[500px] h-[500px] bg-yellow-400 flex flex-col justify-center items-center">
        <div className="w-[100px] h-[100px] bg-red-400 flex fixed left-[550px] top-[550px]"></div>
        <div className="w-[100px] h-[100px] bg-blue-400 flex absolute right-[100px] bottom-[100px]"></div>
        <div className="w-[100px] h-[100px] bg-green-400 flex"></div>
      </div>
    </div>
  );
}

export default App;
