import React from "react";

const Faq = () => {
  const faqs = [
    {
      id: 1,
      title: "Who is eligible for a micro loan?",
      description:
        "Anyone above 18 years old with a valid ID and a bank account can apply for a micro loan. Employment status and credit history may affect approval.",
    },
    {
      id: 2,
      title: "How much can I borrow?",
      description:
        "Our micro loans range from $100 to $5,000 depending on your profile, repayment history, and chosen loan plan.",
    },
    {
      id: 3,
      title: "What is the interest rate?",
      description:
        "Interest rates vary depending on the loan type and tenure. They typically range between 5% to 15% annually.",
    },
    {
      id: 4,
      title: "How long does approval take?",
      description:
        "Most applications are reviewed and approved within 24–48 hours. Some cases may require additional verification.",
    },
    {
      id: 5,
      title: "Can I repay my loan early?",
      description:
        "Yes! Early repayment is allowed without any penalty. You will only pay interest for the days the loan was active.",
    },
    {
      id: 6,
      title: "What happens if I miss a payment?",
      description:
        "Missing a payment may incur late fees and could affect your credit score. We recommend contacting support immediately for assistance.",
    },
  ];

  return (
    <div className="mt-24 px-5 md:px-10">
      <h1 className="text-3xl md:text-5xl font-bold text-center pb-10 text-primary">
        Frequently Asked Questions
      </h1>
      {faqs.map((faq) => (
        <div className="collapse collapse-arrow bg-base-200 border border-base-300 my-2">
          <input type="radio" name="my-accordion-2" defaultChecked />
          <div className="collapse-title font-semibold">{faq.title}</div>
          <div className="collapse-content text-sm">{faq.description}</div>
        </div>
      ))}
    </div>
  );
};

export default Faq;
