import React from "react";
import letterImg from "../../assets/newsletter.jpg";
import { motion } from "framer-motion";
const NewsLetter = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col md:flex-row items-center mt-24 px-5 gap-3 md:px-10"
    >
      <div className="flex-1">
        <img src={letterImg} className="rounded-2xl" alt="" />
      </div>
      <div className="flex-1 space-y-5">
        <h1 className="text-3xl md:text-5xl font-black max-w-xl  ">
          Subscribe To Our Newsletter
        </h1>
        <p className="max-w-lg">
          Stay updated with the latest loan offers, financial tips, and
          exclusive updates—delivered straight to your inbox."
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            className="input rounded-full z-0 "
            placeholder="Subscribe To Our Newsletter"
          />
          <button className="btn relative  btn-primary rounded-full">
            Subscribe
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default NewsLetter;
