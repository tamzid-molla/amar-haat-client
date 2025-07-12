import { Link } from "react-router";

const ProductCard = ({ product }) => {
  console.log(product);
  const { product_image, market, created_at, pricePerUnit, itemName } = product;
  const date = new Date(created_at).toLocaleDateString();
  return (
    <div className="bg-bgSecondary rounded-lg shadow-lg relative p-4 max-w-sm">
      <div className="flex absolute top-4 justify-between items-center mb-2">
        <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded">HOT</span>
      </div>
      <div className="text-center">
        <img src={product_image} alt="Product Image" className="object-cover w-full h-60 mb-2" />
        <h3 className="text-lg font-bold">{market}</h3>
        <p className="text-sm text-gray-500">
          {itemName} - ${pricePerUnit}/kg
        </p>
              <p className="text-gray-600">{date}</p>
              <Link to={`/product/${product?._id}`}>
        <button className="mt-4 w-full bg-accent text-white py-2 rounded">View</button>
              </Link>
      </div>
    </div>
  );
};

export default ProductCard;
