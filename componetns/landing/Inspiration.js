﻿"use client";
import { useState } from "react";
import styles from "../../styles/FrontPage.module.scss";
import insp from "../../public/insp.jpg";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";

const hotspots = [
  { id: 1, url: "https://example.com/page1", top: "50%", left: "50%" },
  { id: 2, url: "https://example.com/page2", top: "20%", left: "40%" },
  { id: 3, url: "https://example.com/page3", top: "50%", left: "20%" },
  { id: 4, url: "https://example.com/page3", top: "60%", left: "30%" },
  // Add more hotspot objects as needed
];

export default function Inspiration() {
  const [activeSpot, setActiveSpot] = useState(null);

  const handleSpotHover = (spotId) => {
    setActiveSpot(spotId);
  };

  const handleSpotLeave = () => {
    setActiveSpot(null);
  };

  const handleClosePopup = () => {
    setActiveSpot(null);
  };

  return (
    <div className={styles.insp}>
      <h2>GET INSPIRED</h2>
      <div className={styles.spots}>
        <Image className={styles.imageSec} src={insp} sizes="50vw" alt="Picture of the author" />
        {hotspots.map((hotspot) => (
          <div
            key={hotspot.id}
            className={`${styles.spot} ${activeSpot === hotspot.id ? styles.activeSpot : ""}`}
            style={{
              top: hotspot.top,
              left: hotspot.left,
            }}
            onMouseEnter={() => handleSpotHover(hotspot.id)}
            onMouseLeave={handleSpotLeave}
          >
            {activeSpot === hotspot.id && (
              <div className={`${styles.popup} ${styles.fadeIn}`}>
                <div className={styles.popupContent}>
                  <span className={styles.title}>Product Title</span>
                  <span className={styles.price}>$99.99</span>
                </div>
                <button className={styles.showProductBtn}>Show Product</button>
                <button className={styles.closeButton} onClick={handleClosePopup}>
                  dd
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
