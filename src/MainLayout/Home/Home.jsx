import React from "react";
import Banner from "./Banner";
import AvailableLoans from "./AvailableLoans";
import HowItWorks from "./HowItWorks";
import FeedBack from "./FeedBack";
import Faq from "./Faq";

const Home = () => {
  return (
    <div>
      <Banner />
      <AvailableLoans />
      <HowItWorks />
      <FeedBack />
      <Faq />
    </div>
  );
};

export default Home;
