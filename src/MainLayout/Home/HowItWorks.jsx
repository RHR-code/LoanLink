import React from "react";
import Img1 from "../../assets/loan-choose.jpg";
import Img2 from "../../assets/loan-form.jpg";
import Img3 from "../../assets/loan-approve.jpg";
const HowItWorks = () => {
  const Infos = [
    {
      step: 1,
      title: "Choose Your Loan",
      img: Img1,
      description:
        "Browse available loan options and select the one that fits your needs.",
    },
    {
      step: 2,
      title: "Fill Basic Information",
      img: Img2,
      description:
        "Provide your essential details so we can verify your eligibility quickly.",
    },
    {
      step: 3,
      title: "Instant Eligibility Check",
      img: Img3,
      description:
        "Our system evaluates your profile and displays your loan eligibility instantly.",
    },
  ];

  return (
    <div className="mt-24 ">
      <h1 className="text-3xl md:text-5xl font-bold text-center pb-10 text-primary">
        How It Works
      </h1>
      <div className="bg-primary p-5 md:p-10">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2  lg:grid-cols-3">
          {Infos.map((info) => (
            <div className="card bg-white/40 backdrop-blur-2xl pb-5  shadow-sm">
              <div className="card-body">
                <h2 className="card-title">{info.title}</h2>
                <p>{info.description}</p>
              </div>
              <figure>
                <img
                  className="h-[300px] w-[90%]  rounded-2xl md:px-0 object-cover "
                  src={info.img}
                  alt="loan-image"
                />
              </figure>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
