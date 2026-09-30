import React from "react";

export interface FeatureProps {
  title: string;
  status: string;
}

export const Feature: React.FC<FeatureProps> = ({ title, status }) => {
  return (
    <div style={{ padding: "16px", border: "1px solid #e2e4dc", borderRadius: "8px", background: "#ffffff" }}>
      <h3 style={{ margin: "0 0 8px 0", color: "#1f2421" }}>{title}</h3>
      <span style={{ fontSize: "12px", background: "#e8f3ef", color: "#145e4d", padding: "4px 8px", borderRadius: "4px" }}>
        {status}
      </span>
    </div>
  );
};
