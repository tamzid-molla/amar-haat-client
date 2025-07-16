import { FaClock, FaUserCheck, FaChartBar, FaShieldAlt } from "react-icons/fa";
import {motion} from "framer-motion"

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaClock className="text-3xl text-green-600" />,
      title: "Live Price Updates",
      description:
        "Our platform provides daily updated prices straight from verified vendors. Stay ahead by checking current rates before you shop — no surprises, only transparency.",
    },
    {
      icon: <FaUserCheck className="text-3xl text-blue-600" />,
      title: "Trusted Vendors",
      description:
        "We only allow approved and verified vendors to submit product data. This ensures the prices and product details you see are reliable and accurate every day.",
    },
    {
      icon: <FaChartBar className="text-3xl text-orange-600" />,
      title: "Compare Prices",
      description:
        "Easily compare item prices across different local markets. Our platform helps you make smarter shopping decisions by showing price trends and differences visually.",
    },
    {
      icon: <FaShieldAlt className="text-3xl text-purple-600" />,
      title: "Secure Platform",
      description:
        "Your data and activities are protected using JWT-based authentication and secure role management. Whether you're a buyer, seller, or admin — your access is fully controlled.",
    },
  ];

  return (
    <section className="w-11/12 mx-auto px-4 mt-28">
      <h2 className="text-3xl font-bold mb-5">Why Choose AmarHaat?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
        {features.map((f, i) => (
          <motion.div
            initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0, scale: 1.01 }}
            transition={{ duration: 0.8 }}
            key={i} className="bg-bgSecondary p-3 rounded-xl shadow-xl">
                <div
          
            className="p-6 border rounded-xl transition duration-300"
          >
            <div className="mb-4 flex justify-center">{f.icon}</div>
            <h3 className="text-xl font-semibold mb-3">{f.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{f.description}</p>
          </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
