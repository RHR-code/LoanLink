import React from "react";
import Banner from "./Banner";
import AvailableLoans from "./AvailableLoans";
import HowItWorks from "./HowItWorks";
import FeedBack from "./FeedBack";
import Faq from "./Faq";
import NewsLetter from "./NewsLetter";
import Statistics from "./Statistics";
import ServicesSection from "./Services";
import EligibilitySection from "./Requirement";

const Home = () => {
  return (
    <div>
      <Banner />
      <AvailableLoans />
      <HowItWorks />
      <FeedBack />
      <Faq />
      <Statistics />
      <ServicesSection />
      <EligibilitySection />
      <NewsLetter />
    </div>
  );
};

export default Home;
