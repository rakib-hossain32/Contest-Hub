import React from 'react';
import { FaGithub, FaLinkedin, FaGlobe, FaUserCircle } from 'react-icons/fa';
import Banner from '../../components/Hero/Banner';
import PopularContests from './PopularContests/PopularContests';
import WinnerAdvertisement from './WinnerAdvertisement/WinnerAdvertisement';
import WhyChooseUs from './WhyChooseUs/WhyChooseUs';


const Home = () => {
    return (
      <div className="mx-auto max-w-7xl">
        <Banner />
        <PopularContests />
        <WinnerAdvertisement />
        <WhyChooseUs/>
      </div>
    );
};

export default Home;