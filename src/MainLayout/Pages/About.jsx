import {
  FaHandshake,
  FaBullseye,
  FaShieldAlt,
  FaUsers,
  FaMoneyCheckAlt,
} from "react-icons/fa";

const About = () => {
  return (
    <div className="min-h-screen bg-base-100 px-6 py-12">
      {/* Header */}
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          About <span className="text-primary">LoanLink</span>
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          LoanLink is a trusted digital platform providing fast, secure, and
          transparent loan services to empower individuals and small businesses.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 mb-16">
        <div className="bg-base-200 p-6 rounded-2xl shadow-sm">
          <FaBullseye className="text-primary text-3xl mb-4" />
          <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
          <p className="text-gray-600">
            To simplify access to financial support by offering fast loan
            approvals, fair interest rates, and a seamless digital experience.
          </p>
        </div>

        <div className="bg-base-200 p-6 rounded-2xl shadow-sm">
          <FaUsers className="text-primary text-3xl mb-4" />
          <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
          <p className="text-gray-600">
            To become the most trusted online loan platform that empowers
            communities and fuels economic growth.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Why Choose Us</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-base-200 p-6 rounded-2xl shadow-sm">
            <FaMoneyCheckAlt className="text-primary text-3xl mb-3" />
            <h4 className="font-semibold text-lg mb-2">Quick Approval</h4>
            <p className="text-gray-600">
              Apply online and get your loan approved within minutes.
            </p>
          </div>

          <div className="bg-base-200 p-6 rounded-2xl shadow-sm">
            <FaShieldAlt className="text-primary text-3xl mb-3" />
            <h4 className="font-semibold text-lg mb-2">Secure Payments</h4>
            <p className="text-gray-600">
              All transactions are protected with industry-grade security.
            </p>
          </div>

          <div className="bg-base-200 p-6 rounded-2xl shadow-sm">
            <FaHandshake className="text-primary text-3xl mb-3" />
            <h4 className="font-semibold text-lg mb-2">Trusted Platform</h4>
            <p className="text-gray-600">
              Transparent terms, no hidden fees, and customer-first approach.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
