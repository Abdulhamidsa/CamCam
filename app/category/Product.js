﻿"use client";
import Link from "next/link";
import { useState } from "react";
import styles from "../../styles/Category.module.scss";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";

const colorData = [
  { color: "", image: "/ass.jpg", alt: "pattern1" },
  { color: "", image: "/ass.jpg", alt: "pattern2" },
  { color: "", image: "/ass.jpg", alt: "pattern3" },
  { color: "", image: "/ass.jpg", alt: "pattern4" },
  // { color: "#ff00ff", image: "/ass.jpg" },
];

export default function Product(props) {
  const products = props.products;
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedColors, setSelectedColors] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSortingOpen, setIsSortingOpen] = useState(false); // Add isSortingOpen state
  const [sortingOption, setSortingOption] = useState("");
  const [isDropdownActive, setIsDropdownActive] = useState(false);

  const colors = new Set();

  // Iterate over the products to collect available colors
  products.forEach((product) => {
    if (product.colors) {
      if (typeof product.colors === "string") {
        colors.add(product.colors);
      } else if (Array.isArray(product.colors)) {
        product.colors.forEach((color) => colors.add(color));
      }
    }
  });

  const filterProductsByColor = (color) => {
    const updatedColors = [...selectedColors];
    if (updatedColors.includes(color)) {
      const index = updatedColors.indexOf(color);
      updatedColors.splice(index, 1);
    } else {
      updatedColors.push(color);
    }
    setSelectedColors(updatedColors);
  };

  const applyFilters = () => {
    const filteredProducts = products.filter((product) => {
      if (typeof product.colors === "string") {
        return selectedColors.includes(product.colors);
      } else if (Array.isArray(product.colors)) {
        return product.colors.some((color) => selectedColors.includes(color));
      }
      return false;
    });
    setFilteredProducts(filteredProducts);
    toggleMenu();
  };

  const clearFilters = () => {
    setSelectedColors([]);
    setFilteredProducts(products);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const toggleSorting = () => {
    setIsSortingOpen((prevState) => !prevState); // Update the state to isSortingOpen
  };

  const handleSortingOption = (option) => {
    setSortingOption(option);
    // Apply sorting logic based on the selected option
    let sortedProducts = [...filteredProducts];
    if (option === "A - Z") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (option === "Z - A") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    setFilteredProducts(sortedProducts);
    toggleSorting();
  };

  return (
    <>
      <h2>{props.category}</h2>
      <div className={styles.productListContainer}>
        <div className={styles.filterMenu}>
          <button className={styles.filterButton} onClick={toggleMenu}>
            Filter
          </button>
          <div className={`${styles.sortingDropdown} ${isSortingOpen ? styles.open : ""}`}>
            <button className={styles.filterButton} onClick={toggleSorting}>
              {sortingOption ? `Sorting: ${sortingOption}` : "Sorting"}
            </button>
            {isSortingOpen && (
              <div className={styles.sortingOptions}>
                <div className={styles.sortButtons} onClick={() => handleSortingOption("A - Z")}>
                  A - Z
                </div>
                <div className={styles.sortButtons} onClick={() => handleSortingOption("Z - A")}>
                  Z - A
                </div>
              </div>
            )}
          </div>
          {isMenuOpen && (
            <div className={styles.menuOverlay}>
              <div className={styles.allFilterOptions}>
                <div className={styles.colorFilterContainer}>
                  <button className={styles.toggleButton} onClick={() => setIsDropdownActive(!isDropdownActive)}>
                    Toggle Dropdown
                    {isDropdownActive ? <FiChevronUp className={styles.chevronIcon} /> : <FiChevronDown className={styles.chevronIcon} />}
                  </button>
                  <div className={`${styles.dropdownContent} ${isDropdownActive ? styles.active : ""}`}>
                    {selectedColors.length > 0 && (
                      <div className={styles.selectedColors}>
                        {selectedColors.map((color) => (
                          <div key={uuidv4()} className={styles.selectedColor}>
                            <span>{color}</span>
                            <button className={styles.removeColor} onClick={() => filterProductsByColor(color)}>
                              X
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    {Array.from(colors).map((colorOption) => (
                      <div key={uuidv4()} className={styles.alignColorsFilter}>
                        <div className={styles.colorName}>{colorOption}</div>
                        <div className={styles.colorOptions} onClick={() => isDropdownActive && filterProductsByColor(colorOption)}>
                          <Image className={styles.colorContainer} src={"/ass.jpg"} width={50} height={50} alt={colorOption} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className={styles.menuActions}>
                <button className={styles.applyButton} onClick={applyFilters}>
                  Apply
                </button>
                <button className={styles.closeButton} onClick={toggleMenu}>
                  X
                </button>
                <button className={styles.resetButton} onClick={clearFilters}>
                  Reset Filter
                </button>
              </div>
            </div>
          )}
        </div>
        <section className={styles.ProductContainer}>
          {filteredProducts
            .filter((product) => product.imgurl)
            .map((product) => (
              <div key={uuidv4()} className={styles.productCard}>
                <Link href={`/product/${product.id}`} legacyBehavior>
                  <div className={styles.imageContainer}>
                    <Image className={styles.productImage} src={product.imgurl} alt={product.name} sizes="50vw" width={10} height={10} />
                  </div>
                </Link>
                <div className={styles.favoriteContainer}>
                  <Image className={styles.iconsHeart} src={"/basket.svg"} width={50} height={50} alt="heart icon" />
                </div>
                <div className={styles.productHead}>
                  <p className={styles.productName}>{product.name}</p>
                  <p className={styles.productPrice}>{product.price}DKK</p>
                  <div className={styles.productTileContainer}>
                    <div className={styles.productTile}>
                      <div className={styles.colorPicker}>
                        {colorData.map((colorOption) => (
                          <div className={styles.colorOption} style={{ backgroundColor: colorOption.color }} key={uuidv4()}>
                            <Image className={styles.colorContainerTile} src={colorOption.image} width={50} height={50} alt={colorOption.alt} />
                          </div>
                        ))}
                      </div>
                      <div className={styles.iconsContainer}>
                        <Image className={styles.icons} src={"/shopping-cart.svg"} width={50} height={50} alt="add to cart" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </section>
      </div>
    </>
  );
}
