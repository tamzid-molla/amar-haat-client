import React, { useEffect } from 'react';
import Hero from '../../components/home/hero/Hero';
import TopProducts from '../../components/home/topProducts/TopProducts';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import PageLoader from '../../components/shared/pageLoader/PageLoader';
import HighlightsAdd from './HighlightsAdd';
import HowItWorks from './HowItWorks';
import WhyChooseUs from '../../components/home/WhyChooseUs/WhyChooseUs';

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
        <div>
            <Hero></Hero>
            <TopProducts products={products}></TopProducts>
            <HighlightsAdd></HighlightsAdd>
            <HowItWorks></HowItWorks>
            <WhyChooseUs></WhyChooseUs>
        </div>
    );
};

export default Home;