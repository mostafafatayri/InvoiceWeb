import React from "react";
import { useOutletContext } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Subscription.scss";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const Subscription: React.FC = () => {
  const { isSidebarOpen } = useOutletContext<{ isSidebarOpen: boolean }>();
  const { t } = useTranslation();

  const plans = [
    {
      name: t("subscription.plans.basic.name"),
      price: t("subscription.plans.basic.price"),
      features: t("subscription.plans.basic.features", { returnObjects: true }) as string[],
      recommended: false,
    },
    {
      name: t("subscription.plans.pro.name"),
      price: t("subscription.plans.pro.price"),
      features: t("subscription.plans.pro.features", { returnObjects: true }) as string[],
      recommended: true,
    },
    {
      name: t("subscription.plans.enterprise.name"),
      price: t("subscription.plans.enterprise.price"),
      features: t("subscription.plans.enterprise.features", { returnObjects: true }) as string[],
      recommended: false,
    },
  ];

  return (
    <div className={`subscription-page ${isSidebarOpen ? "" : "expanded"}`}>
      <h2>{t("subscription.title")}</h2>
      <p>{t("subscription.subtitle")}</p>

      <div className="plans-container">
        {plans.map((plan, index) => (
          <div className={`plan-card ${plan.recommended ? "highlighted" : ""}`} key={index}>
            {plan.recommended && <span className="recommended">{t("subscription.mostPopular")}</span>}
            <h3>{plan.name}</h3>
            <h4>{plan.price}</h4>
            <ul>
              {plan.features.map((feature: string, i: number) => (
                <li key={i}>
                  {feature.toLowerCase().includes("no") || feature.includes("لا") ? (
                    <FaTimesCircle className="cross-icon" />
                  ) : (
                    <FaCheckCircle className="check-icon" />
                  )}
                  {feature}
                </li>
              ))}
            </ul>
            <button className="subscribe-btn">{t("subscription.subscribe")}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscription;
