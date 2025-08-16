import storyImg from "../../assets/banner/image2.jpg"
import visionImg from "../../assets/banner/image1.jpg"
import { FaLeaf, FaUsers, FaShoppingBasket, FaHandshake } from "react-icons/fa";

const AboutUs = () => {
    return (
        <div className="pt-28">
      {/* Hero Section */}
      <section className="relative bg-accent text-white py-20 px-6 text-center w-11/12 mx-auto rounded-lg">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About Amar Haat</h1>
        <p className="max-w-2xl mx-auto text-lg opacity-90">
          Bringing fresh vegetables and fruits from local vendors straight to your doorstep.
        </p>
      </section>

      {/* Our Story */}
      <section className="bg-bgSecondary mt-20 rounded-lg w-11/12 mx-auto py-16 px-4 md:px-16 grid md:grid-cols-2 md:gap-10 gap-4 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">🌿 Our Story</h2>
          <p className="text-gray-600 leading-relaxed">
            Amar Haat was born from a simple idea: making fresh market shopping easy,
            affordable, and accessible. We connect local farmers and vendors directly 
            with customers, ensuring fair prices and fresh products without middlemen. 
          </p>
        </div>
        <div className="">
          <img src={storyImg} alt="Story Image" className="max-h-96 rounded-lg"/>
        </div>
      </section>

      {/* What We Do */}
      <section className="bg-white py-16 px-6 mt-20 w-11/12 mx-auto rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-12">🛒 What We Do</h2>
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-lg transition">
            <FaShoppingBasket className="text-green-600 text-4xl mb-4" />
            <h3 className="font-semibold text-lg mb-2">Fresh Products</h3>
            <p className="text-gray-600">Daily fresh vegetables, fruits, and groceries.</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-lg transition">
            <FaUsers className="text-green-600 text-4xl mb-4" />
            <h3 className="font-semibold text-lg mb-2">Vendor Freedom</h3>
            <p className="text-gray-600">Vendors set their own prices and sell directly.</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-lg transition">
            <FaHandshake className="text-green-600 text-4xl mb-4" />
            <h3 className="font-semibold text-lg mb-2">Fair Pricing</h3>
            <p className="text-gray-600">No hidden costs, just real market rates.</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-lg transition">
            <FaLeaf className="text-green-600 text-4xl mb-4" />
            <h3 className="font-semibold text-lg mb-2">Sustainable Future</h3>
            <p className="text-gray-600">Supporting local farmers & eco-friendly markets.</p>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="w-11/12 mt-20 bg-bgSecondary rounded-lg mx-auto py-16 px-4 md:px-16 grid md:grid-cols-2 md:gap-10 gap-4 items-center">
        <div className="rounded-2xl order-last md:order-first">
          <img src={visionImg} alt="Story Image" className="max-h-96 rounded-lg"/>
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4">🌍 Our Vision</h2>
          <p className="text-gray-600 leading-relaxed">
            We dream of a Bangladesh where every family can shop fresh and healthy products
            from home. Amar Haat is more than just a marketplace – it’s a bridge of trust
            between vendors and buyers, building a strong community together.
          </p>
        </div>
      </section>

      {/* Footer Section */}
      <section className="bg-accent w-11/12 mx-auto text-white py-12 px-4 mt-20 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-2">Amar Haat – Your Market, Your Way</h2>
        <p className="opacity-90">Freshness you can trust, straight to your home.</p>
      </section>
    </div>
    );
};

export default AboutUs;