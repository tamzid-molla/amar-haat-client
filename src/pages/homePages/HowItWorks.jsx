import { motion } from "framer-motion";
import { FaUserPlus, FaUpload, FaChartLine, FaShoppingCart } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaUserPlus className="text-4xl text-green-600" />,
      title: "Sign Up / Login",
      description: "Create an account or login to access price tracking and more features.",
    },
    {
      icon: <FaUpload className="text-4xl text-blue-600" />,
      title: "Vendors Update Prices",
      description: "Vendors submit daily price updates for local market products.",
    },
    {
      icon: <FaChartLine className="text-4xl text-orange-600" />,
      title: "Track & Compare Prices",
      description: "Users track price changes and compare prices across markets over time.",
    },
    {
      icon: <FaShoppingCart className="text-4xl text-purple-600" />,
      title: "Buy Products",
      description: "Buy products directly through the platform using secure payments.",
    },
  ];

  return (
    <section className="w-11/12 mx-auto py-6 mt-28">
      <h2 className="text-3xl font-bold text-textSecondary mb-5">How It Works</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((s, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0, scale: 1.01 }}
      transition={{ duration: 0.8 }}
            key={idx} className="bg-bgSecondary p-4 rounded-xl shadow-xl">
                <div  className="flex flex-col bg-bgSecondary items-center text-center p-4 border rounded-lg transition-shadow duration-300">
            <div className="mb-4">{s?.icon}</div>
            <h3 className="text-xl font-medium mb-2">{s?.title}</h3>
            <p className="text-gray-600">{s?.description}</p>
          </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
