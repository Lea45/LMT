import { useNavigate, useLocation } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import logo from "../assets/logo2.webp";
import "./Footer.css";

const Footer = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const currentLang = ["en", "hr", "it", "de"].includes(pathSegments[0])
    ? pathSegments[0]
    : "en";

  const scrollTo = (e, sectionId) => {
    e.preventDefault();
    const el = document.getElementById(sectionId);
    if (!el) {
      navigate(`/${currentLang}/`);
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      }, 500);
    } else {
      const targetPosition = el.offsetTop - 10;
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
        window.scrollTo(0, easeInOutQuad(timeElapsed, startPosition, distance, duration));
        if (timeElapsed < duration) requestAnimationFrame(scroll);
        else window.scrollTo(0, targetPosition);
      };
      requestAnimationFrame(scroll);
      navigate(`/${currentLang}/#${sectionId}`, { replace: true });
    }
  };

  return (
    <footer className="footer">
      <div className="footer-inner">

        {/* Column 1: Brand */}
        <div className="footer-col">
          <a
            href={`/${currentLang}/#home`}
            onClick={(e) => scrollTo(e, "home")}
            className="footer-logo-link"
          >
            <img src={logo} alt="LeMatech Digital Logo" className="footer-logo" />
            <span className="footer-brand-name">LeMatech Digital</span>
          </a>
          <p className="footer-tagline">
            {t("Digital booking systems and web apps for service businesses.")}
          </p>
        </div>

        {/* Column 2: Links */}
        <div className="footer-col">
          <h4 className="footer-col-heading">{t("Links")}</h4>
          <nav className="footer-nav">
            <a href={`/${currentLang}/#home`} onClick={(e) => scrollTo(e, "home")}>
              {t("Home")}
            </a>
            <a href={`/${currentLang}/#contact`} onClick={(e) => scrollTo(e, "contact")}>
              {t("Contact")}
            </a>
            <Link to="/terms-conditions">{t("Terms & Conditions")}</Link>
            <Link to="/privacy-policy">{t("Privacy Policy")}</Link>
          </nav>
        </div>

        {/* Column 3: Contact */}
        <div className="footer-col">
          <h4 className="footer-col-heading">{t("Contact")}</h4>
          <div className="footer-contact-list">
            <a href="mailto:info@lematech-digital.com">info@lematech-digital.com</a>
            <a href="tel:+385911529422">+385 91 152 9422</a>
          </div>
          <div className="footer-social">
            <a
              href="https://www.facebook.com/people/LeMatech-Digital/61575004322467/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.instagram.com/lematechcode/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com/in/lea-var%C5%BEi%C4%87-71a731324/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p>{t("© 2025 LeMatech Digital. All rights reserved.")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
