import React from "react";
import HeroSection from "../../components/homePageAllComponent/HeroSection";
import FeaturedSection from "../../components/homePageAllComponent/FeaturedSection";
import Testimonials from "../../components/homePageAllComponent/Testimonials";
import WhyChooseUs from "../../components/homePageAllComponent/WhyChooseUs";
import ContactUs from "../../components/homePageAllComponent/ContactUs";

const Home = () => {
  return (
    <div>
      <HeroSection></HeroSection>
      <FeaturedSection></FeaturedSection>
      <Testimonials></Testimonials>
      <WhyChooseUs></WhyChooseUs>
      <ContactUs></ContactUs>
    </div>
  );
};

export default Home;
