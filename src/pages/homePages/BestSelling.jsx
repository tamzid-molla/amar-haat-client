import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import BestSellingCard from '../../components/shared/cards/BestSellingCard';

const BestSelling = () => {

    const {data:products =[],isLoading, } = useQuery({
        queryKey: ["reviews"],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_baseURL}/reviews`);
            return res.data
        },
    })

    return (
        <section className="w-11/12 mx-auto mt-28">
        <h3 className="text-3xl font-bold text-textPrimary mb-7">Best Selling Products</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 xl:grid-cols-4 2xl:grid-cols-6 ">
        {products?.map((product) => (
            <div key={product._id} className="flex justify-center items-center">
                <BestSellingCard  product={product} />
          </div>
        ))}
      </div>
    </section>
    );
};

export default BestSelling;