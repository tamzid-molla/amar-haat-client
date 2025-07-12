import React from 'react';
import ProductCard from '../../shared/cards/ProductCard';
import { Link } from 'react-router';

const TopProducts = ({products}) => {
    return (
        <section className='w-11/12 mx-auto mt-28'>
            <div className="flex items-center justify-between mb-5">
                <h3 className='text-3xl font-bold text-textPrimary'>Featured Products</h3>
                <Link to="/allProducts" className='border-b-2 border-accent text-lg font-medium'>All Products</Link>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 xl:grid-cols-4 2xl:grid-cols-6 '>
                {
                    products.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))
                }
            </div>
        </section>
    );
};

export default TopProducts;