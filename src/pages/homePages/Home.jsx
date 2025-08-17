import React, { useEffect } from 'react';
import Hero from '../../components/home/hero/Hero';
import TopProducts from '../../components/home/topProducts/TopProducts';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import PageLoader from '../../components/shared/pageLoader/PageLoader';
import HighlightsAdd from './HighlightsAdd';
import HowItWorks from './HowItWorks';
import WhyChooseUs from '../../components/home/WhyChooseUs/WhyChooseUs';
import Testimonials from './Testimonials';
import BestSelling from './BestSelling';

const Home = () => {
    const {data:products =[],isLoading, } = useQuery({
        queryKey: ["topProduct"],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_baseURL}/products`);
            return res.data
        },
    })

    useEffect(() => {
        document.title = "AmarHaat";
      }, []);

    if(isLoading) return <PageLoader></PageLoader>

    return (
        <div className='pt-14'>
            <Hero></Hero>
            <TopProducts products={products}></TopProducts>
            <BestSelling></BestSelling>
            <HighlightsAdd></HighlightsAdd>
            <HowItWorks></HowItWorks>
            <Testimonials></Testimonials>
            <WhyChooseUs></WhyChooseUs>
        </div>
    );
};

export default Home;