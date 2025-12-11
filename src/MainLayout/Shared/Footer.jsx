import React from "react";
import Logo from "../../components/Logo";
import { FaFacebook, FaXTwitter, FaYoutube } from "react-icons/fa6";

const Footer = () => {
  return (
    <div>
      <footer className="footer sm:footer-horizontal bg-base-300  p-10">
        <aside>
          <Logo />
          <p>
            Loan Providing Agency
            <br />
            Fast and flexible micro-loans designed to support your everyday
            needs.
          </p>
        </aside>
        <nav>
          <h6 className="footer-title">Social</h6>
          <div className="grid grid-flow-col gap-4">
            <a>
              <FaXTwitter size={25} />
            </a>
            <a>
              <FaYoutube size={25} />
            </a>
            <a>
              <FaFacebook size={25} />
            </a>
          </div>
        </nav>
      </footer>
      <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by
            LoanLink
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
