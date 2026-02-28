import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const lastScrollY = useRef(window.scrollY);

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
      const scrollY = easeInOutQuad(timeElapsed, startPosition, distance, duration);
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

  const closeMobileMenu = () => {
    if (isClosing) return;
    setIsClosing(true);
    setMobileMenuOpen(false);
    setTimeout(() => setIsClosing(false), 380);
  };

  const toggleMobileMenu = () => {
    if (isClosing) return;
    if (mobileMenuOpen) {
      closeMobileMenu();
    } else {
      setMobileMenuOpen(true);
    }
  };

  // ESC key to close menu
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e) => { if (e.key === "Escape") closeMobileMenu(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileMenuOpen]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
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

  const mobileOverlay = (mobileMenuOpen || isClosing) ? createPortal(
    <div
      className={`mobile-overlay ${mobileMenuOpen ? "active" : ""} ${
        isClosing ? "closing" : ""
      }`}
      onClick={closeMobileMenu}
      aria-hidden={!mobileMenuOpen}
    >
      <div
        className="mobile-panel"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="mobile-panel-header">
          <span className="mobile-panel-label">Menu</span>
          <button
            className="mobile-panel-close"
            onClick={closeMobileMenu}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <nav className="mobile-nav-links">
          <a href={`/${currentLang}/#home`} onClick={(e) => smoothScrollToSection(e, "home")}>
            {t("Home")}
          </a>
          <a href={`/${currentLang}/#about`} onClick={(e) => smoothScrollToSection(e, "about")}>
            {t("nav_what_i_build")}
          </a>
          <a href={`/${currentLang}/#reviews`} onClick={(e) => smoothScrollToSection(e, "reviews")}>
            {t("nav_reviews")}
          </a>
          <a href={`/${currentLang}/#whyus`} onClick={(e) => smoothScrollToSection(e, "whyus")}>
            {t("nav_why_choose")}
          </a>
          <a href={`/${currentLang}/#contact`} onClick={(e) => smoothScrollToSection(e, "contact")}>
            {t("Contact")}
          </a>
        </nav>

        <div className="mobile-panel-lang">
          <div className="mobile-lang-divider" />
          <div className="mobile-lang-switch">
            <button
              className={`mobile-lang-btn ${currentLang === "en" ? "mobile-lang-active" : ""}`}
              onClick={() => changeLanguage("en")}
            >
              EN
            </button>
            <button
              className={`mobile-lang-btn ${currentLang === "hr" ? "mobile-lang-active" : ""}`}
              onClick={() => changeLanguage("hr")}
            >
              HR
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  ) : null;

  return (
    <>
      <header
        className={`navbar ${isScrolled ? "scrolled" : ""} ${!showNav ? "is-hidden" : ""}`}
      >
        <div className="navbar-container">
          <div className="navbar-logo">
            <a
              href={`/${currentLang}/#home`}
              onClick={(e) => smoothScrollToSection(e, "home")}
            >
              <img src={logo} alt="LeMatech - Digital Logo" width="150" height="50" />
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
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>

          {/* Desktop nav */}
          <nav className="main-nav">
            <a href={`/${currentLang}/#about`} onClick={(e) => smoothScrollToSection(e, "about")}>
              {t("About")}
            </a>
            <a href={`/${currentLang}/#whyus`} onClick={(e) => smoothScrollToSection(e, "whyus")}>
              {t("Why Us")}
            </a>
            <a href={`/${currentLang}/#projects`} onClick={(e) => smoothScrollToSection(e, "projects")}>
              {t("Projects")}
            </a>
            <a href={`/${currentLang}/#contact`} onClick={(e) => smoothScrollToSection(e, "contact")}>
              {t("Contact")}
            </a>
          </nav>

          {/* Desktop language button */}
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
      {mobileOverlay}
    </>
  );
};

export default Navbar;
