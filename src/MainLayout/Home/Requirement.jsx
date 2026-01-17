import React from "react";
import {
  FaUserCheck,
  FaIdCard,
  FaFileAlt,
  FaMoneyCheckAlt,
  FaHome,
  FaPhoneAlt,
  FaCheckCircle,
} from "react-icons/fa";

const RequirementCard = ({ icon: Icon, title, items, index }) => {
  const bgColor = index % 2 === 0 ? "bg-primary" : "bg-secondary";
  const iconBgColors = [
    "bg-blue-100",
    "bg-purple-100",
    "bg-pink-100",
    "bg-green-100",
  ];
  const iconBgColor = iconBgColors[index % iconBgColors.length];

  return (
    <div className="bg-base-200 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
      <div className={`${iconBgColor} rounded-2xl p-5 inline-block mb-6`}>
        <Icon className="text-4xl text-gray-700" />
      </div>

      <h3 className="text-xl font-bold  mb-4">{title}</h3>

      <ul className="space-y-3">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <FaCheckCircle
              className={`${bgColor.replace(
                "bg-",
                "text-"
              )} text-lg mt-0.5 flex-shrink-0`}
            />
            <span className=" text-sm leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const EligibilitySection = () => {
  const eligibilityData = [
    {
      icon: FaUserCheck,
      title: "Age Requirement",
      items: [
        "Must be 21 to 65 years old",
        "Valid government-issued ID required",
        "Bangladeshi citizen or permanent resident",
        "Legal capacity to enter into a loan agreement",
      ],
    },
    {
      icon: FaMoneyCheckAlt,
      title: "Income Criteria",
      items: [
        "Minimum monthly income of ৳15,000",
        "Proof of stable income source",
        "Employment letter or business registration",
        "Bank statement for last 3 months",
      ],
    },
    {
      icon: FaFileAlt,
      title: "Documentation",
      items: [
        "National ID Card (NID) or Passport",
        "Recent utility bill (electricity/gas/water)",
        "2 passport-size photographs",
        "Income certificate or salary slip",
      ],
    },
    {
      icon: FaHome,
      title: "Additional Info",
      items: [
        "Permanent or current address proof",
        "Phone number and email address",
        "Reference contact information",
        "No existing loan defaults",
      ],
    },
  ];

  const benefits = [
    "Quick approval within 24-48 hours",
    "No hidden charges or fees",
    "Flexible repayment options",
    "Minimal documentation required",
    "No collateral needed for micro loans",
    "Online application process",
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-primary text-sm font-semibold tracking-wider uppercase mb-2">
            REQUIREMENTS
          </p>
          <h2 className="text-4xl font-bold text-primary mb-4">
            Eligibility & Requirements
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Simple and transparent requirements to help you get started with
            your loan application
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {eligibilityData.map((item, index) => (
            <RequirementCard key={index} {...item} index={index} />
          ))}
        </div>

        <div className="bg-gradient-to-r from-primary to-primary/50 rounded-2xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold  mb-3">
              Why Choose Our Loan Services?
            </h3>
            <p className="text-white text-opacity-90">
              We make borrowing simple, fast, and hassle-free
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-base-200 bg-opacity-10 rounded-lg p-4 backdrop-blur-sm"
              >
                <FaCheckCircle className="text-xl flex-shrink-0" />
                <span className=" font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EligibilitySection;
