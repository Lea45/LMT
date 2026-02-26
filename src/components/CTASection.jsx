import "./CTASection.css";

const steps = [
  {
    num: "01",
    titleKey: "Understand Your Business",
    descKey: "We go through how you currently manage bookings, clients and daily operations.",
  },
  {
    num: "02",
    titleKey: "Build the System",
    descKey: "I design and develop a digital solution tailored to your workflow.",
  },
  {
    num: "03",
    titleKey: "Launch and Improve",
    descKey: "After launch, the system is refined based on real usage and feedback.",
  },
];

export default function CTASection({ t, smoothScrollToSection }) {
  return (
    <section className="cta-section animate-on-scroll" data-threshold="0.5">
      <div className="cta-content">
        <h2 className="cta-title">{t("cta_title")}</h2>
        <div className="cta-steps">
          {steps.map((step, i) => (
            <div key={i} className="cta-step">
              <span className="cta-step-number">{step.num}</span>
              <div className="cta-step-body">
                <h3>{t(step.titleKey)}</h3>
                <p>{t(step.descKey)}</p>
              </div>
            </div>
          ))}
        </div>
        <button
          className="cta-button"
          onClick={() => smoothScrollToSection("contact")}
        >
          {t("cta_button")}
        </button>
      </div>
    </section>
  );
}
