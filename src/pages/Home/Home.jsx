
import Banner from '../../components/Hero/Banner';
import PopularContests from './PopularContests/PopularContests';
import WinnerAdvertisement from './WinnerAdvertisement/WinnerAdvertisement';
import WhyChooseUs from './WhyChooseUs/WhyChooseUs';
import FAQ from './FAQ/FAQ';


const Home = () => {
    return (
      <div className="">
        <Banner />
        <PopularContests />
        <WinnerAdvertisement />
        <WhyChooseUs />
        <FAQ/>
      </div>
    );
};

export default Home;