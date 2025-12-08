import React from "react";
import Banner from "./Banner";
import AvailableLoans from "./AvailableLoans";
import HowItWorks from "./HowItWorks";
import FeedBack from "./FeedBack";
import Faq from "./Faq";
import NewsLetter from "./NewsLetter";

const Home = () => {
  return (
    <div>
      <Banner />
      <AvailableLoans />
      <HowItWorks />
      <FeedBack />
      <Faq />
      <NewsLetter />
    </div>
  );
};

export default Home;
