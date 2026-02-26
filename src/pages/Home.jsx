import { useState, useEffect } from "react";
import validator from "validator";
import "./Home.css";
import "../components/Contact.css";
import CTASection from "../components/CTASection.jsx";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaShareAlt,
  FaCalendarAlt,
  FaTachometerAlt,
  FaBell,
  FaSearch,
  FaGoogle,
  FaHandshake,
  FaBolt,
  FaMobileAlt,
  FaShieldAlt,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";

import mgInterijerImg from "../assets/mg-interijeri.jpeg";
import gioiaImg from "../assets/gioia .jpeg";
import markoCakanImg from "../assets/markocakan.jpeg";


const Home = () => {
  const { t } = useTranslation();

  const [expandedReviews, setExpandedReviews] = useState({});
  const toggleReview = (i) =>
    setExpandedReviews((prev) => ({ ...prev, [i]: !prev[i] }));

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    gdprConsent: false,
  });

  const [alert, setAlert] = useState({ message: "", type: "" });


  // Typewriter effect for hero title line 2
  const fullText = t("hero_title_2");
  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    setTypedText("");
    const startDelay = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setTypedText(fullText.slice(0, i));
        if (i >= fullText.length) {
          clearInterval(interval);
          setTimeout(() => setShowCursor(false), 1500);
        }
      }, 65);
      return () => clearInterval(interval);
    }, 700);
    return () => clearTimeout(startDelay);
  }, [fullText]);


  const smoothScrollToSection = (sectionId) => {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      const targetPosition = targetElement.offsetTop - 10;
      const startPosition = window.scrollY;
      const distance = targetPosition - startPosition;

      // Calculate duration based on distance
      const duration = Math.abs(distance) > 1000 ? 1400 : 800;

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
    } else {
      console.error(`${sectionId} section not found!`);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    const { name, email, message, gdprConsent } = formData;

    if (!name || !email || !message) {
      setAlert({ message: "Please fill out all fields.", type: "error" });
      return false;
    }

    if (!validator.isEmail(email)) {
      setAlert({
        message: "Please enter a valid email address.",
        type: "error",
      });
      return false;
    }

    if (!gdprConsent) {
      setAlert({
        message: "You must consent to the GDPR terms.",
        type: "error",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/info@lematech-digital.com",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            _captcha: "true",
            _subject: "New Project Inquiry from Website",
          }),
        }
      );

      const result = await response.json();

      if (result.success) {
        setAlert({
          message: "Your message has been sent successfully!",
          type: "success",
        });
        setFormData({
          name: "",
          email: "",
          message: "",
          gdprConsent: false,
        });
      } else {
        setAlert({
          message: "There was an error sending your message. Please try again.",
          type: "error",
        });
      }
    } catch (error) {
      setAlert({
        message: "An error occurred. Please try again later.",
        type: "error",
      });
    }

    setTimeout(() => {
      setAlert({ message: "", type: "" });
    }, 5000);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = parseFloat(
              entry.target.style.getPropertyValue("--delay-order") || "0"
            );
            setTimeout(() => {
              entry.target.classList.add("animate-visible");
            }, delay * 600);
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    const elements = document.querySelectorAll(".animate-on-scroll");

    elements.forEach((el) => {
      const customThreshold = parseFloat(el.dataset.threshold || "0.6");
      const individualObserver = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const delay = parseFloat(
                entry.target.style.getPropertyValue("--delay-order") || "0"
              );
              setTimeout(() => {
                entry.target.classList.add("animate-visible");
              }, delay * 600);
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: customThreshold }
      );
      individualObserver.observe(el);
    });

    return () => observer.disconnect();
  }, []);



  return (
    <div>
<section id="home" className="hero">
  <div className="hero-bubbles" aria-hidden="true">
    <span className="bubble b1"></span>
    <span className="bubble b2"></span>
    <span className="bubble b3"></span>
    <span className="bubble b4"></span>
    <span className="bubble b5"></span>
  </div>

  <div className="hero-container">

    {/* HERO KICKER */}
    <p className="hero-kicker">{t("hero_kicker")}</p>

    {/* HERO CARD */}
    <div className="hero-text">
      <h1 className="hero-title">
        {t("hero_title_1")} <br />
        <span className="hero-line2">
          {typedText}
          {showCursor && <span className="typing-cursor">|</span>}
        </span>
      </h1>

      <h2 className="hero-subtitle">
        {t("hero_subtitle")}
      </h2>

      <div className="hero-buttons">
        <button
          onClick={() => smoothScrollToSection("contact")}
          className="cta-button"
        >
          {t("hero_cta_primary")}
        </button>
        <button
          onClick={() => smoothScrollToSection("how-it-works")}
          className="cta-button-secondary"
        >
          {t("hero_cta_secondary")}
        </button>
      </div>
    </div>

  </div>
</section>




      <section id="about" className="about">
        <h2 className="animate-on-scroll fade-in">{t("What We Do")}</h2>

        <p className="about-intro animate-on-scroll slide-up">
          {t("Digital solutions designed for performance, growth and impact.")}
        </p>

        <div className="services-grid">
          {[
            {
              icon: <FaCalendarAlt />,
              num: "01",
              title: t("Online Booking"),
              desc: t("Clients can book appointments online in seconds. No back and forth messages."),
            },
            {
              icon: <FaTachometerAlt />,
              num: "02",
              title: t("Admin Control"),
              desc: t("Manage schedules, clients and attendance from one simple dashboard."),
            },
            {
              icon: <FaBell />,
              num: "03",
              title: t("Waitlist and Notifications"),
              desc: t("Automatically notify clients when a spot becomes available and keep your schedule full."),
            },
            {
              icon: <FaSearch />,
              num: "04",
              title: t("SEO Websites"),
              desc: t("Fast and modern websites built to increase visibility and bring more inquiries."),
            },
          ].map((item, index) => (
            <div
              key={index}
              className="service-card animate-on-scroll slide-up-delayed"
              style={{ "--delay-order": `${index * 0.15}s` }}
              data-threshold="0.15"
            >
              <span className="service-card-number">{item.num}</span>
              <div className="icon-wrapper">
                {item.icon}
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>

      </section>

      <section id="how-it-works" className="how-it-works-section">
        <div className="how-it-works-header animate-on-scroll fade-in">
          <h2>{t("how_it_works_title")}</h2>
          <p className="how-it-works-intro">{t("how_it_works_intro")}</p>
        </div>

        <div className="how-steps">
          {[
            {
              num: "01",
              title: t("Understand Your Workflow"),
              desc: t("We go through how your business currently operates and identify where digital tools can simplify your process."),
            },
            {
              num: "02",
              title: t("Build the Right System"),
              desc: t("I design and develop a solution tailored to your specific needs, whether it is a booking system or a full web application."),
            },
            {
              num: "03",
              title: t("Launch and Improve"),
              desc: t("After launch, we refine and adjust the system to make sure it supports your growth long term."),
            },
          ].map((step, i) => (
            <div
              key={i}
              className="how-step animate-on-scroll slide-up-delayed"
              style={{ "--delay-order": `${i * 0.18}` }}
              data-threshold="0.2"
            >
              <div className="how-step-number">{step.num}</div>
              <div className="how-step-content">
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="reviews-section">
        <div className="reviews-header animate-on-scroll fade-in">
          <div className="reviews-google-badge">
            <FaGoogle className="google-icon-badge" />
            <span>Google Reviews</span>
          </div>
          <h2>{t("reviews_title")}</h2>
        </div>

        <div className="reviews-grid">
          {[
            {
              name: "M.G. Interijeri",
              role: t("Interior Design Studio"),
              text: t("review_1_text"),
              avatar: mgInterijerImg,
            },
            {
              name: "Gioia Reformer Pilates Studio",
              role: t("Pilates Studio"),
              text: t("review_2_text"),
              avatar: gioiaImg,
            },
            {
              name: "Marko Čakan",
              role: t("Physiotherapist"),
              text: t("review_3_text"),
              avatar: markoCakanImg,
            },
          ].map((review, i) => {
            const paragraphs = review.text.split("\n\n");
            const isLong = paragraphs.length > 1;
            const isExpanded = !!expandedReviews[i];
            const displayed = isLong && !isExpanded ? [paragraphs[0]] : paragraphs;
            return (
              <div
                key={i}
                className="review-card animate-on-scroll slide-up-delayed"
                style={{ "--delay-order": `${i * 0.15}s` }}
                data-threshold="0.15"
              >
                <div className="review-card-top">
                  <div className="reviewer-avatar">
                    <img src={review.avatar} alt={review.name} />
                  </div>
                  <div className="reviewer-meta">
                    <span className="reviewer-name">{review.name}</span>
                    <span className="reviewer-role">{review.role}</span>
                  </div>
                  <FaGoogle className="review-g-icon" />
                </div>
                <div className="review-stars">★★★★★</div>
                <div className="review-body">
                  {displayed.map((para, j) => (
                    <p key={j}>{para}</p>
                  ))}
                  {isLong && (
                    <button
                      className="read-more-toggle"
                      onClick={() => toggleReview(i)}
                    >
                      {isExpanded ? t("Read less") : t("Read more")}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section id="whyus" className="why-us-section">
        <h2 className="animate-on-scroll fade-in">
          {t("Why Businesses Choose LeMatech Digital")}
        </h2>

        <p className="why-us-tagline animate-on-scroll slide-up">
          {t("You don’t need a big agency. You need the right developer.")}
        </p>

        <div className="why-us-grid">
          {[
            {
              icon: <FaHandshake />,
              title: t("Direct Collaboration"),
              desc: t(
                "No account managers. No delays. You work directly with the developer building your product: faster decisions, clearer communication, better results."
              ),
            },
            {
              icon: <FaBolt />,
              title: t("Built to Convert"),
              desc: t(
                "Your website isn’t just something that looks good. It’s strategically structured to generate inquiries and turn visitors into paying clients."
              ),
            },
            {
              icon: <FaMobileAlt />,
              title: t("App-Level Experience"),
              desc: t(
                "When needed, your website is built as a Progressive Web App: lightning-fast, installable on mobile, and designed to feel like a real application."
              ),
            },
            {
              icon: <FaShieldAlt />,
              title: t("Long-Term Partnership"),
              desc: t(
                "Launching your website is just the beginning. I stay involved to help you improve, scale and adapt as your business grows."
              ),
            },
          ].map((item, index) => (
            <div
              className="why-card animate-on-scroll slide-up-delayed"
              style={{ "--delay-order": `${index * 0.15}s` }}
              data-threshold="0.2"
              key={index}
            >
              <div className="why-icon-wrapper">
                {item.icon}
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="meet-dev-section">
        <div className="meet-dev-container">
          <div className="meet-dev-image animate-on-scroll fade-in">
            <span className="meet-dev-placeholder">{t("Photo coming soon")}</span>
          </div>
          <div className="meet-dev-content animate-on-scroll slide-in-right">
            <h2>{t("Meet the Developer")}</h2>
            <p>{t("I'm the developer behind LeMatech Digital.")}</p>
            <p>{t("I work directly with service-based businesses to design and build digital systems that simplify daily operations and support long-term growth.")}</p>
            <p>{t("My focus is not just on how things look, but on how they function. Every system is built around the real workflow of your business.")}</p>
            <p>{t("You'll work directly with me from the first idea to launch.")}</p>
          </div>
        </div>
      </section>


      <section id="contact" className="contact-section">
        <div className="contact-header animate-on-scroll fade-in">
          <h2>{t("Let’s talk about your booking system")}</h2>
          <p>{t("Tell me how you currently manage bookings and clients. I’ll reply with next steps and a simple plan.")}</p>
        </div>

        <div className="contact-cards">
          <div
            className="contact-form-card animate-on-scroll slide-up"
            data-threshold="0.15"
            style={{ "--delay-order": "0.1s" }}
          >
            <h3 className="contact-card-title">{t("Send a Message")}</h3>
            <form className="contact-form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder={t("Name")}
                value={formData.name}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder={t("Email")}
                value={formData.email}
                onChange={handleChange}
              />
              <textarea
                name="message"
                placeholder={t("Tell me a bit about your business and what you need")}
                rows="4"
                value={formData.message}
                onChange={handleChange}
              />
              <div className="gdpr-consent">
                <input
                  type="checkbox"
                  id="gdpr"
                  name="gdprConsent"
                  checked={formData.gdprConsent}
                  onChange={handleChange}
                />
                <label htmlFor="gdpr">
                  {t("I consent to the")}&nbsp;
                  <a href="/privacy-policy" target="_blank">
                    {t("GDPR Terms")}
                  </a>
                </label>
              </div>
              <button type="submit" className="submit-btn">
                {t("Send Message")}
              </button>
              <p className="reply-time">{t("I usually reply within 24 to 48 hours.")}</p>
              {alert.message && (
                <div className={`alert ${alert.type}`}>{alert.message}</div>
              )}
            </form>
          </div>

          <div
            className="contact-direct-card animate-on-scroll slide-up"
            data-threshold="0.15"
            style={{ "--delay-order": "0.25s" }}
          >
            <h3 className="contact-card-title">{t("Prefer direct contact?")}</h3>
            <div className="contact-direct-rows">
              <div className="contact-direct-row">
                <FaEnvelope className="contact-direct-icon" />
                <div className="contact-direct-content">
                  <span className="contact-direct-label">{t("E-mail")}</span>
                  <a href="mailto:info@lematech-digital.com">
                    info@lematech-digital.com
                  </a>
                </div>
              </div>
              <div className="contact-direct-divider" />
              <div className="contact-direct-row">
                <FaPhoneAlt className="contact-direct-icon" />
                <div className="contact-direct-content">
                  <span className="contact-direct-label">{t("Phone")}</span>
                  <a href="tel:+385911529422">+385 91 152 9422</a>
                </div>
              </div>
              <div className="contact-direct-divider" />
              <div className="contact-direct-row">
                <FaShareAlt className="contact-direct-icon" />
                <div className="contact-direct-content">
                  <span className="contact-direct-label">{t("Socials")}</span>
                  <div className="social-links">
                    <a
                      href="https://www.facebook.com/people/LeMatech-Digital/61575004322467/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaFacebookF /> Facebook
                    </a>
                    <a
                      href="https://www.instagram.com/lematechcode/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaInstagram /> Instagram
                    </a>
                    <a
                      href="https://www.linkedin.com/in/lea-var%C5%BEi%C4%87-71a731324/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaLinkedinIn /> LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
