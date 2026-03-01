import Banner from '../../components/Hero/Banner';
import PopularContests from './PopularContests/PopularContests';
import WinnerAdvertisement from './WinnerAdvertisement/WinnerAdvertisement';
import WhyChooseUs from './WhyChooseUs/WhyChooseUs';
import FAQ from './FAQ/FAQ';
import Features from './Features/Features';
import Stats from './Stats/Stats';
import Categories from './Categories/Categories';
import Testimonials from './Testimonials/Testimonials';
import Newsletter from './Newsletter/Newsletter';
import CTA from './CTA/CTA';
import HowItWorks from './HowItWorks/HowItWorks';
import ShowcaseGallery from './ShowcaseGallery/ShowcaseGallery';

const Home = () => {
  return (
    <div className="overflow-hidden">
      <Banner />
      <HowItWorks />
      <Categories />
      <PopularContests />
      <ShowcaseGallery />
      <Features />
      <WinnerAdvertisement />
      <Stats />
      <WhyChooseUs />
      <Testimonials />
      <FAQ />
      <Newsletter />

    </div>
  );
};

export default Home;