import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import logo from "../assets/logo2.png";
import "./Footer.css";

const Footer = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const currentLang = ["en", "hr", "it", "de"].includes(pathSegments[0])
    ? pathSegments[0]
    : "en";

  const smoothScrollToSection = (event, sectionId) => {
    event.preventDefault();
    const targetElement = document.getElementById(sectionId);
    if (!targetElement) {
      if (location.pathname !== `/${currentLang}/`) {
        navigate(`/${currentLang}/`);
        setTimeout(() => {
          document
            .getElementById(sectionId)
            ?.scrollIntoView({ behavior: "smooth" });
        }, 500);
      }
    } else {
      const targetPosition = targetElement.offsetTop - 10;
      const startPosition = window.scrollY;
      const distance = targetPosition - startPosition;
      const duration = Math.abs(distance) > 1000 ? 1600 : 800;
      let startTime = null;
      const easeInOutQuad = (t, b, c, d) => {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
      };
      const scroll = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const next = easeInOutQuad(
          timeElapsed,
          startPosition,
          distance,
          duration
        );
        window.scrollTo(0, next);
        if (timeElapsed < duration) requestAnimationFrame(scroll);
        else window.scrollTo(0, targetPosition);
      };
      requestAnimationFrame(scroll);
      navigate(`/${currentLang}/#${sectionId}`, { replace: true });
    }
  };

  return (
    <footer className="footer">
      <div className="footer-top">
        <div
          className="brand-nav animate-on-scroll fade-in"
          style={{ "--delay-order": "0.2s" }}
          data-threshold="0.8"
        >
          <a
            href={`/${currentLang}/#home`}
            onClick={(e) => smoothScrollToSection(e, "home")}
            className="brand-link"
          >
            <img
              src={logo}
              alt="LeMatech - Digital Logo"
              className="footer-logo"
            />
            <span className="brand-name">{t("LeMatech - Digital")}</span>
          </a>
        </div>

        <nav
          className="footer-nav animate-on-scroll fade-in"
          style={{ "--delay-order": "0.4s" }}
        >
          <Link to="/terms-conditions">{t("Terms & Conditions")}</Link>
          <Link to="/privacy-policy">{t("Privacy Policy")}</Link>
        </nav>
        <div
          className="social-links animate-on-scroll fade-in"
          style={{ "--delay-order": "0.6s" }}
        >
          <a
            href="https://www.facebook.com/people/LeMatech-Digital/61575004322467/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit our Facebook page"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://www.instagram.com/lematechcode/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit our Instagram page"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.linkedin.com/in/lea-var%C5%BEi%C4%87-71a731324/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit our LinkedIn profile"
          >
            <FaLinkedinIn />
          </a>
        </div>
      </div>

      <div
        className="footer-bottom animate-on-scroll fade-in"
        style={{ "--delay-order": "0.8s" }}
      >
        <p>
          {t("© 2025 Powered by: LeMatech – Digital | All Rights Reserved")}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
