import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaPaperPlane,
} from "react-icons/fa";

const Contact = () => {
  return (
    <div className="min-h-screen bg-base-100 px-6 py-12">
      {/* Header */}
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Contact <span className="text-primary">Us</span>
        </h1>
        <p className="text-gray-600">
          Have questions or need support? We’re here to help you.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="flex items-center gap-4 bg-base-200 p-5 rounded-2xl">
            <FaEnvelope className="text-primary text-2xl" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">support@loanlink.com</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-base-200 p-5 rounded-2xl">
            <FaPhoneAlt className="text-primary text-2xl" />
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium">+880 1234 567 890</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-base-200 p-5 rounded-2xl">
            <FaMapMarkerAlt className="text-primary text-2xl" />
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-medium">Dhaka, Bangladesh</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form className="bg-base-200 p-8 rounded-2xl shadow-sm space-y-5">
          <div>
            <label className="label">
              <span className="label-text">Your Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Email Address</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Message</span>
            </label>
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Write your message..."
            ></textarea>
          </div>

          <button className="btn btn-primary w-full flex items-center gap-2">
            <FaPaperPlane />
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
