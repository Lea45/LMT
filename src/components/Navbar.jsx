import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo2.webp";
import hrFlag from "../assets/icons/flag.webp";
import enFlag from "../assets/icons/united-kingdom.webp";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const mobileNavRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const lastScrollY = useRef(window.scrollY);
  const [fadeInOnLoad, setFadeInOnLoad] = useState(false);

  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment !== "");
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
      } else {
        console.error(`${sectionId} section not found!`);
      }
      return;
    }

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

    const smoothScroll = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const scrollY = easeInOutQuad(
        timeElapsed,
        startPosition,
        distance,
        duration
      );
      window.scrollTo(0, scrollY);

      if (timeElapsed < duration) {
        requestAnimationFrame(smoothScroll);
      } else {
        window.scrollTo(0, targetPosition);
      }
    };

    requestAnimationFrame(smoothScroll);

    navigate(`/${currentLang}/#${sectionId}`, { replace: true });
    setMobileMenuOpen(false);
  };

  const changeLanguage = (lang) => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
      localStorage.setItem("language", lang);
    }

    const currentHash = window.location.hash;
    navigate(`/${lang}${currentHash}`, { replace: true });
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    if (isClosing) return;

    if (mobileMenuOpen) {
      setMobileMenuOpen(false);

      setIsClosing(true);

      setTimeout(() => {
        setIsClosing(false);
      }, 400);
    } else {
      setMobileMenuOpen(true);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuOpen &&
        mobileNavRef.current &&
        !mobileNavRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      setIsScrolled(currentY > 150);

      if (window.innerWidth <= 1024) {
        if (currentY > lastScrollY.current && currentY > 100) {
          setShowNav(false);
        } else {
          setShowNav(true);
        }
      } else {
        setShowNav(true);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFadeInOnLoad(true);
    }, 2500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <header
      className={`navbar ${isScrolled ? "scrolled" : ""} ${
        showNav ? "" : "hidden"
      } ${fadeInOnLoad ? "navbar-fade-in" : ""}`}
    >
      {" "}
      <div className="navbar-container">
        <div className="navbar-logo">
          <a
            href={`/${currentLang}/#home`}
            onClick={(e) => smoothScrollToSection(e, "home")}
          >
            <img
              src={logo}
              alt="LeMatech - Digital Logo"
              width="150"
              height="50"
            />
          </a>
          <a
            href={`/${currentLang}/#home`}
            className="navbar-brand"
            onClick={(e) => smoothScrollToSection(e, "home")}
          >
            {t("LeMatech - Digital")}
          </a>
        </div>

        <div
          className={`hamburger ${mobileMenuOpen ? "active" : ""}`}
          onMouseDown={(e) => e.stopPropagation()}
          onClick={toggleMobileMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <nav
          ref={mobileNavRef}
          className={`mobile-nav ${mobileMenuOpen ? "active" : ""} ${
            isClosing ? "closing" : ""
          }`}
        >
          <a
            href={`/${currentLang}/#about`}
            onClick={(e) => smoothScrollToSection(e, "about")}
          >
            {t("About")}
          </a>
          <a
            href={`/${currentLang}/#whyus`}
            onClick={(e) => smoothScrollToSection(e, "whyus")}
          >
            {t("Why Us")}
          </a>
          <a
            href={`/${currentLang}/#projects`}
            onClick={(e) => smoothScrollToSection(e, "projects")}
          >
            {t("Projects")}
          </a>
          <a
            href={`/${currentLang}/#contact`}
            onClick={(e) => smoothScrollToSection(e, "contact")}
          >
            {t("Contact")}
          </a>
          <button
            onClick={() => changeLanguage(currentLang === "hr" ? "en" : "hr")}
            className="language-button"
          >
            <img
              src={currentLang === "hr" ? enFlag : hrFlag}
              alt=""
              className="language-button__flag"
            />
            <span className="language-button__text">
              {currentLang === "hr" ? "EN" : "HR"}
            </span>
          </button>
        </nav>

        <nav className="main-nav">
          <a
            href={`/${currentLang}/#about`}
            onClick={(e) => smoothScrollToSection(e, "about")}
          >
            {t("About")}
          </a>
          <a
            href={`/${currentLang}/#whyus`}
            onClick={(e) => smoothScrollToSection(e, "whyus")}
          >
            {t("Why Us")}
          </a>
          <a
            href={`/${currentLang}/#projects`}
            onClick={(e) => smoothScrollToSection(e, "projects")}
          >
            {t("Projects")}
          </a>
          <a
            href={`/${currentLang}/#contact`}
            onClick={(e) => smoothScrollToSection(e, "contact")}
          >
            {t("Contact")}
          </a>
        </nav>

        <button
          onClick={() => changeLanguage(currentLang === "hr" ? "en" : "hr")}
          className="language-button"
        >
          <img
            src={currentLang === "hr" ? enFlag : hrFlag}
            alt=""
            className="language-button__flag"
          />
          <span className="language-button__text">
            {currentLang === "hr" ? "EN" : "HR"}
          </span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
