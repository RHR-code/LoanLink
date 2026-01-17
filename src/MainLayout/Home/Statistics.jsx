import React, { useState, useEffect, useRef } from "react";
import {
  FaUsers,
  FaMoneyBillWave,
  FaHandshake,
  FaChartLine,
} from "react-icons/fa";

const StatCard = ({
  icon: Icon,
  value,
  label,
  suffix = "",
  prefix = "",
  index,
}) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  const bgColor = index % 2 === 0 ? "bg-primary" : "bg-secondary";

  return (
    <div
      ref={cardRef}
      className=" rounded-xl shadow-lg p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
    >
      <div className="flex flex-col items-center text-center">
        <div className={`${bgColor} rounded-full p-4 mb-4`}>
          <Icon className="text-white text-3xl" />
        </div>
        <div className="text-4xl font-bold  mb-2">
          {prefix}
          {count.toLocaleString()}
          {suffix}
        </div>
        <div className="text-gray-600 font-medium">{label}</div>
      </div>
    </div>
  );
};

const Statistics = () => {
  const stats = [
    {
      icon: FaUsers,
      value: 50000,
      label: "Active Borrowers",
      suffix: "+",
    },
    {
      icon: FaMoneyBillWave,
      value: 25,
      label: "Million Disbursed",
      prefix: "$",
    },
    {
      icon: FaHandshake,
      value: 98,
      label: "Approval Rate",
      suffix: "%",
    },
    {
      icon: FaChartLine,
      value: 15000,
      label: "Loans Completed",
      suffix: "+",
    },
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary mb-4">
            Our Impact in Numbers
          </h2>
          <p className="text-xl  max-w-2xl mx-auto">
            Empowering communities with accessible financial solutions and
            building trust through transparency
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
              prefix={stat.prefix}
              index={index}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            Updated in real-time • Trusted by thousands of entrepreneurs
          </p>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
