import { Link } from "react-router-dom";

export default function ProductCard(props) {
  const product = props.product;

  return (
    <div className="w-[260px] h-[400px] rounded-xl bg-primary shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden m-4 cursor-pointer relative">
      <div className="w-full h-[260px] relative group overflow-hidden bg-gray-50">
        <img
          src={product.images[1]}
          className="w-full h-full object-cover absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        />
        <img
          src={product.images[0]}
          className="w-full h-full object-cover absolute inset-0 transition-opacity duration-300 primary-image opacity-100 group-hover:opacity-0"
        />
      </div>

      <div className="relative group">
        <div className="py-3 px-3 flex flex-col items-center text-center">
          <h1 className="font-semibold text-xl text-secondary mt-2 mb-1 line-clamp-2">
            {product.name}
          </h1>

          <div className="flex flex-col items-center">
            {product.labelledPrice > product.price && (
              <h2 className="text-secondary line-through decoration-secondary/40 decoration-2 mb-1">
                LKR. {product.labelledPrice.toFixed(2)}
              </h2>
            )}

            <h2 className="text-green-600 font-bold text-xl">
              LKR. {product.price.toFixed(2)}
            </h2>
          </div>
        </div>

        <div className="w-full h-[120px] bottom-0 opacity-0 group-hover:opacity-100 absolute buttons bg-primary transition-opacity duration-300 flex flex-row justify-center items-center gap-4">
          <Link
            to={"/overview/" + product.productID}
            className="h-[50px] w-[150px] flex justify-center items-center border-2 border-secondary px-2 py-2 bg-secondary/70 text-center text-primary rounded-lg hover:bg-secondary transition-colors duration-300"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
