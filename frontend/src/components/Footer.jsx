import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaSquareXTwitter,
  FaSquareInstagram,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa6";

const Footer = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  return (
   <>
  <footer className="footer">
    {/* Logo & About */}
    <div className="footer-section brand-section">
      <div className="footer-logo-container">
  <img src="/logo.png" alt="logo" className="footer-logo" />
</div>
      <p>
        Find your dream job and connect with top companies worldwide.
        Build your future with us.
      </p>
    </div>

    {/* Support */}
    <div className="footer-section">
      <h4>Support</h4>
      <ul>
        <li>Chennai, Tamil Nadu, India</li>
        <li>support@easyjob.com</li>
        <li>+91 9876543210</li>
      </ul>
    </div>

    {/* Quick Links */}
    <div className="footer-section">
      <h4>Quick Links</h4>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/jobs">Jobs</Link>
        </li>

        {isAuthenticated && (
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        )}
      </ul>
    </div>

    {/* Social Links */}
    <div className="footer-section">
      <h4>Follow Us</h4>

      <ul className="social-links">
        <li>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
          >
            <span>
              <FaSquareXTwitter />
            </span>
            <span>Twitter (X)</span>
          </a>
        </li>

        <li>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
          >
            <span>
              <FaSquareInstagram />
            </span>
            <span>Instagram</span>
          </a>
        </li>

        <li>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noreferrer"
          >
            <span>
              <FaYoutube />
            </span>
            <span>YouTube</span>
          </a>
        </li>

        <li>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
          >
            <span>
              <FaLinkedin />
            </span>
            <span>LinkedIn</span>
          </a>
        </li>
      </ul>
    </div>
  </footer>

  {/* Copyright */}
  <div className="copyright">
    © 2026 EasyJob. All Rights Reserved.
  </div>
</>
  );
};

export default Footer;