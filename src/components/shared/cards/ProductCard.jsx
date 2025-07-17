import { Link } from "react-router";
import { motion } from "framer-motion";

const ProductCard = ({ product }) => {
  const { product_image, market, created_at, pricePerUnit, itemName } = product;
  const date = new Date(created_at).toLocaleDateString();
  return (
    <motion.div
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0, scale: 1.01 }}
      transition={{ duration: 0.8 }}
      className="bg-bgSecondary rounded-lg shadow-lg relative p-4 w-full max-w-sm">
      <div className="flex absolute top-4 justify-between items-center mb-2">
        <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded">HOT</span>
      </div>
      <div className="text-center overflow-hidden">
        <img
          src={product_image}
          alt="Product Image"
          className="object-cover w-full h-60 mb-2 hover:scale-104 transition-all duration-500"
        />
        <h3 className="text-lg font-bold">{market}</h3>
        <p className="text-sm text-gray-500">
          {itemName} - ${pricePerUnit}/kg
        </p>
        <p className="text-gray-600">{date}</p>
        <Link to={`/product/${product?._id}`}>
          <button className="mt-4 w-full bg-accent text-white py-2 cursor-pointer rounded">View</button>
        </Link>
      </div>
    </motion.div>
  );
};

export default ProductCard;
