import React, { useState, useEffect, useRef } from "react";
import validator from "validator";
import "./Home.css";
import "../components/Contact.css";
import CTASection from "../components/CTASection.jsx";
import webdevIcon from "../assets/services/webdev.webp";
import mobappIcon from "../assets/services/appdev.webp";
import onepageIcon from "../assets/services/onepage.webp";
import seoIcon from "../assets/services/seoOpt.webp";
import portfolioIcon from "../assets/services/portfolio.webp";
import maintenanceIcon from "../assets/services/maintenance.webp";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaShareAlt,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";

import buddyImg from "../assets/bitebuddy.webp";
import warsImg from "../assets/starwars.webp";
import hubImg from "../assets/github.webp";
import styleImg from "../assets/smartstyle.webp";
import IvanaImg from "../assets/ivana.webp";

import collabIcon from "../assets/icons/collaboration.webp";
import efficientIcon from "../assets/icons/efficient.webp";
import scalableIcon from "../assets/icons/scalable.webp";
import mobileIcon from "../assets/icons/mobile.webp";
import seo2Icon from "../assets/icons/seo.webp";
import partnerIcon from "../assets/icons/partnership.webp";

const Home = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    gdprConsent: false,
  });

  const [alert, setAlert] = useState({ message: "", type: "" });

  const elementRefs = useRef([]);

  useEffect(() => {
    setTimeout(() => {
      document.querySelector(".hero-text")?.classList.add("animate");
      document.querySelector(".hero-image")?.classList.add("animate");
    }, 100);
  }, []);

  useEffect(() => {
    const observerOptions = { threshold: 0.2 };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    // Observe each element
    elementRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

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
    const { name, email, phone, subject, message, gdprConsent } = formData;

    if (!name || !email || !phone || !subject || !message) {
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

    const phoneRegex = /^\+?[0-9\s\-()]{6,20}$/;
    if (!phoneRegex.test(phone)) {
      setAlert({
        message: "Please enter a valid phone number.",
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
        console.log("✅ Email sent successfully!");
        setAlert({
          message: "Your message has been sent successfully!",
          type: "success",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          gdprConsent: false,
        });
      } else {
        console.error("❌ Email sending failed:", result);
        setAlert({
          message: "There was an error sending your message. Please try again.",
          type: "error",
        });
      }
    } catch (error) {
      console.error("🚨 Unexpected error in form submission:", error);
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
        <div className="hero-container">
          <div className="hero-text">
            <h1 className="hero-title">
              {t("Build Fast. Rank Higher. Grow Exponentially.")}
            </h1>

            <h2 className="hero-subtitle">
              {t(
                "From pixel-perfect web design to SEO that drives traffic, LeMatech-Digital helps your business stand out online."
              )}
            </h2>

            <div className="hero-buttons">
              <button
                onClick={() => smoothScrollToSection("contact")}
                className="cta-button"
              >
                {t("Contact us")}
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
              icon: webdevIcon,
              title: t("Web Development"),
              desc: t(
                "Custom, responsive websites built for speed, performance, and scalability."
              ),
            },
            {
              icon: mobappIcon,
              title: t("Mobile App Development"),
              desc: t(
                "Cross-platform mobile apps built for intuitive user experience and seamless performance."
              ),
            },
            {
              icon: onepageIcon,
              title: t("One-Page Websites"),
              desc: t(
                "Sleek landing pages with fast load times and clean design – perfect for portfolios, products or services."
              ),
            },
            {
              icon: seoIcon,
              title: t("SEO Optimization"),
              desc: t(
                "From keywords to technical improvements – we help you rank higher and get more traffic."
              ),
            },
            {
              icon: portfolioIcon,
              title: t("Portfolio Design"),
              desc: t(
                "Custom portfolio pages designed to present your work with clarity and impact."
              ),
            },
            {
              icon: maintenanceIcon,
              title: t("Website Maintenance"),
              desc: t(
                "Ongoing support, updates and optimizations – so your site stays fast and secure."
              ),
            },
          ].map((item, index) => (
            <div
              key={index}
              className="service-card animate-on-scroll slide-up-delayed"
              style={{ "--delay-order": `${index * 0.15}s` }}
              data-threshold="0.15"
            >
              <div className="icon-wrapper">
                <img src={item.icon} alt={item.title} />
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>

        <CTASection t={t} smoothScrollToSection={smoothScrollToSection} />
      </section>

      <section id="whyus" className="why-us-section">
        <h2 className="animate-on-scroll fade-in">
          {t("Why Work With")} <br /> {t("LeMatech-Digital?")}
        </h2>

        <p className="why-us-intro animate-on-scroll slide-up">
          {" "}
          {t(
            "We bring the precision of a developer with the mindset of a digital strategist. Here's what makes us the right fit for your next project:"
          )}
        </p>

        <div className="why-us-grid">
          {[
            {
              icon: collabIcon,
              title: t("Personal Collaboration"),
              desc: t(
                "You work directly with the developer – fast decisions, clear communication, and full project control."
              ),
            },
            {
              icon: efficientIcon,
              title: t("Efficient & Reliable Delivery"),
              desc: t(
                "Projects are delivered on time, built with care and focus, without unnecessary delays."
              ),
            },
            {
              icon: scalableIcon,
              title: t("Clean, Scalable Code"),
              desc: t(
                "We write code that's built to last – maintainable, modular, and ready to grow with your business."
              ),
            },
            {
              icon: mobileIcon,
              title: t("Mobile-First, User-Centered"),
              desc: t(
                "Every website and app we create is designed for performance across all devices and screen sizes."
              ),
            },
            {
              icon: seo2Icon,
              title: t("SEO-Focused from Day One"),
              desc: t(
                "We apply smart, clean structure and metadata that helps you rank – no extra costs, no later fixes."
              ),
            },
            {
              icon: partnerIcon,
              title: t("Long-Term Partnership"),
              desc: t(
                "Beyond launch, we’re here for updates, support, and helping your digital presence evolve."
              ),
            },
          ].map((item, index) => (
            <div
              className="why-card animate-on-scroll slide-up-delayed"
              style={{ "--delay-order": `${index * 0.15}s` }}
              data-threshold="0.25"
              key={index}
            >
              <img src={item.icon} alt={item.title} className="why-icon" />
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="projects" className="projects">
        <h2
          className="animate-on-scroll fade-in"
          style={{ "--delay-order": "1s" }}
        >
          {t("Projects in Action")}
        </h2>

        <p
          className="projects-intro animate-on-scroll slide-up"
          style={{ "--delay-order": "1.4s" }}
        >
          {t(
            "A collection of live projects - from concept to deployment. More case studies coming soon as LeMatech-Digital continues to grow."
          )}
        </p>

        <div
          className="project-container animate-on-scroll"
          style={{ "--delay-order": "2s" }}
          data-threshold="0.2"
        >
          <div className="project-grid no-card-layout">
            {[
              {
                href: "https://bbuddy-ya89.vercel.app/",
                src: buddyImg,
                alt: "Bite Buddy App",
              },
              {
                href: "https://star-wars-phi-green.vercel.app/",
                src: warsImg,
                alt: "Star Wars Fan App",
              },
              {
                href: "https://git-hub-user-info-iota.vercel.app/",
                src: hubImg,
                alt: "GitHub User Info App",
              },
              {
                href: "https://smartstyleecom.vercel.app/",
                src: styleImg,
                alt: "Smart Style App",
              },
            ].map((project, index) => (
              <a
                key={index}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="animate-on-scroll fade-in"
                style={{ "--delay-order": "1s" }}
              >
                <img
                  src={project.src}
                  alt={project.alt}
                  className="project-image"
                  loading="lazy"
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="contact-wrapper">
          {/* LEFT SIDE */}
          <div className="contact-info">
            <h2
              className="animate-on-scroll fade-in"
              style={{ "--delay-order": "0.5s" }}
            >
              {t("It's time to build something exciting!")}
            </h2>
            <p
              className="animate-on-scroll slide-up"
              style={{ "--delay-order": "0.5s" }}
            >
              {t(
                "Let’s turn your ideas into real digital solutions — whether it’s a new site, app, or a bold redesign. We’re ready when you are."
              )}
            </p>

            <div
              className="testimonial-box animate-on-scroll slide-in-left"
              style={{ "--delay-order": "0.6s" }}
            >
              <div className="stars">★★★★★</div>
              <p className="quote">
                {t(
                  "Working with LeMatech-Digital was seamless. Our new site not only looks amazing, but it’s lightning-fast and already ranking better on Google. Everything just works, and we finally feel in control."
                )}
              </p>

              <div className="author">
                <img src={IvanaImg} alt="Ivana Kovač" />
                <div>
                  <strong>Ivana Kovač</strong>
                  <span>{t("Small Business Owner")}</span>
                </div>
              </div>
            </div>
          </div>
          <div
            className="form-wrapper animate-on-scroll slide-in-right"
            style={{ "--delay-order": "0.4s" }}
          >
            <form
              className="contact-form"
              onSubmit={handleSubmit}
              action="https://formsubmit.co/info@lematech-digital.com"
              method="POST"
            >
              <h3 className="form-title">{t("Get a free quote")}</h3>
              <p className="form-desc">
                {t(
                  "Tell us a bit about your project or idea - we're here to listen and will get back to you shortly with next steps."
                )}
              </p>

              <div className="form-grid">
                <div className="form-row">
                  <input
                    type="text"
                    name="name"
                    placeholder={t("Your name")}
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder={t("Email address")}
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <input
                  type="text"
                  name="phone"
                  placeholder={t("Phone number")}
                  value={formData.phone}
                  onChange={handleChange}
                />

                <input
                  type="text"
                  name="subject"
                  placeholder={t("Subject")}
                  value={formData.subject}
                  onChange={handleChange}
                />

                <textarea
                  name="message"
                  placeholder={t("Project brief")}
                  rows="3"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="gdpr-wrapper">
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
              </div>

              <button type="submit" className="submit-btn">
                {t("Get Free Quote")}
              </button>

              {alert.message && (
                <div className={`alert ${alert.type}`}>{alert.message}</div>
              )}
            </form>
          </div>
        </div>
        <div className="contact-alt">
          <div className="contact-alt-wrapper">
            <div className="reach-options">
              <div
                className="reach-options animate-on-scroll slide-in-left"
                style={{ "--delay-order": "0.7s" }}
              >
                <div className="reach-box combined">
                  <div className="reach-row">
                    <FaEnvelope className="reach-icon" />
                    <div className="reach-content">
                      <span className="reach-label">{t("E-mail")}</span>
                      <a href="mailto:info@lematech-digital.com">
                        info@lematech-digital.com
                      </a>
                    </div>
                  </div>

                  <div className="reach-divider" />

                  <div className="reach-row">
                    <FaPhoneAlt className="reach-icon" />
                    <div className="reach-content">
                      <span className="reach-label">{t("Phone")}</span>
                      <a href="tel:+385911529422">+385 91 152 9422</a>
                    </div>
                  </div>

                  <div className="reach-divider" />

                  <div className="reach-row">
                    <FaShareAlt className="reach-icon" />
                    <div className="reach-content">
                      <span className="reach-label">{t("Socials")}</span>
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
            <div className="contact-alt-text">
              <h2
                className="animate-on-scroll fade-in"
                style={{ "--delay-order": "0.5s" }}
              >
                {t("Not a fan of forms?")} <br />
                {t("No problem!")}
              </h2>
              <p
                className="animate-on-scroll slide-up"
                style={{ "--delay-order": "0.9s" }}
              >
                {t(
                  "We get it — sometimes it's easier to just talk. Whether you prefer email, phone or a quick DM, we’re here and happy to connect however works best for you."
                )}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
