import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaStar } from "react-icons/fa";

const FeedBack = () => {
  const feedbacks = [
    {
      id: 1,
      name: "Ayesha Rahman",
      avatar: "https://i.pravatar.cc/150?img=47",
      rating: 5,
      message:
        "The loan process was super smooth and fast. I got approval within minutes! Highly recommended.",
    },
    {
      id: 2,
      name: "Md. Tanvir Hasan",
      avatar: "https://i.pravatar.cc/150?img=12",
      rating: 4,
      message:
        "Great service! The EMI options were flexible and easy to manage. Customer support was very helpful.",
    },
    {
      id: 3,
      name: "Shahin Akter",
      avatar: "https://i.pravatar.cc/150?img=32",
      rating: 5,
      message:
        "Secure and trustworthy platform. The interest rates are reasonable and transparent.",
    },
    {
      id: 4,
      name: "Rafiul Islam",
      avatar: "https://i.pravatar.cc/150?img=8",
      rating: 4,
      message:
        "I loved the user-friendly interface. The whole process took less than 10 minutes!",
    },
    {
      id: 5,
      name: "Norton Edward",
      avatar: "https://i.pravatar.cc/150?img=56",
      rating: 5,
      message:
        "Excellent customer service! They explained everything clearly. Highly satisfied.",
    },
    {
      id: 6,
      name: "Mahmudul Karim",
      avatar: "https://i.pravatar.cc/150?img=18",
      rating: 4,
      message:
        "Fast processing and easy documentation. I’m definitely using this service again.",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="mt-24">
      <h1 className="text-3xl md:text-5xl font-bold text-center pb-10 text-primary">
        Customer Feedback
      </h1>
      <div className="slider-container ">
        <Slider {...settings} className="[&_.slick-slide]:px-5">
          {feedbacks.map((feed) => (
            <div className="bg-base-200 h-[220px] md:p-10 text-center space-y-2 relative my-10 ">
              <img
                className=" w-20 absolute z-10 -top-10 left-[50%] translate-x-[-50%]   rounded-full"
                src={feed.avatar}
                alt=""
              />
              <p className="pt-14 text-sm px-2 md:pt-5">{feed.message}</p>
              <h3 className="font-semibold">{feed.name}</h3>
              <h5>{"⭐".repeat(feed.rating)}</h5>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default FeedBack;
