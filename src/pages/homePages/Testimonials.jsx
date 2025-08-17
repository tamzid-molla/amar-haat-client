import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import {motion} from "framer-motion"

const Testimonials = () => {


    const {data:testimonials =[],isLoading, } = useQuery({
        queryKey: ["reviewData"],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_baseURL}/reviewData`);
            return res.data
        },
    })

    return (
         <section className="mt-28 w-11/12 mx-auto">
      <div className=" mx-auto">
        <h2 className="text-3xl font-bold mb-7">
          What Our Customers Say
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
              <motion.div
                  initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0, scale: 1.01 }}
            transition={{ duration: 0.8 }}
              key={t._id}
              className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition"
            >
              {/* User Info */}
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={t?.userPhoto || "https://i.ibb.co/9kW3szMD/vector-flat-illustration-grayscale-avatar-600nw-2264922221.webp"}
                  alt={t?.userName}
                  className="w-14 h-14 rounded-full border-2 border-accent object-cover"
                />
                <div>
                  <h3 className="font-semibold text-lg">{t.userName}</h3>
                  <p className="text-gray-500 text-sm">
                    {new Date(t.date).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={`${
                      star <= t.rating ? "text-yellow-400" : "text-gray-300"
                    } w-5 h-5`}
                  />
                ))}
              </div>

              {/* Review */}
              <p className="text-gray-700 leading-relaxed">"{t.review}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    );
};

export default Testimonials;