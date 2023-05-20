// "use client";
// import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
// import getProducts from "../util/getProducts";

// async function getData() {
//   const client = new ApolloClient({
//     uri: "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clh6ai0n46o6601taehrigvqq/master",
//     ///delete cache when navigate away from the page
//     cache: new InMemoryCache(),
//   });

//   const { data } = await client.query({
//     query: gql`
//       query PageHome {
//         page(where: { slug: "home" }) {
//           id
//           name
//           heroLink
//           heroText
//           heroTitle
//           heroBackground {
//             url
//             width
//             height
//           }
//         }
//       }
//     `,
//     ///// add an age for the cache age, here it will delete cache after 10 min
//     // merge(existing, incoming, { mergeObjects, readField }) {
//     //   return mergeObjects(existing, incoming, { maxAge: 600 });
//     // },
//   });

//   return data.page;
// }
// async function getData() {
//   const client = new ApolloClient({
//     uri: "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clh6ai0n46o6601taehrigvqq/master",
//     cache: new InMemoryCache(),
//   });

//   const pageQuery = gql`
//     query PageHome {
//       page(where: { slug: "home" }) {
//         id
//         name
//         heroLink
//         heroText
//         heroTitle
//         heroBackground {
//           url
//           width
//           height
//         }
//       }
//     }
//   `;

//   const productsQuery = gql`
//     query ProductsList {
//       products(first: 10) {
//         name
//         price
//         slug
//         id
//         image {
//           url
//           width
//           height
//         }
//       }
//     }
//   `;

//   const [pageData, productsData] = await Promise.all([client.query({ query: pageQuery }), client.query({ query: productsQuery })]);
//   return {
//     pageData: pageData.data.page,
//     productsData: productsData.data.products,
//   };
// }
"use client";
import styles from "../styles/FrontPage.module.scss";
import vid from "../public/vid.mp4";
import Section from "../componetns/landing/Section";
import Inspiration from "../componetns/landing/Inspiration";
import Categories from "../componetns/landing/Categories";
import Loading from "./loading";
import { useState, useEffect } from "react";
import { Suspense } from "react";
import Gallery from "@/componetns/landing/Gallery";
export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timeout);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  // const productsData = await getData();
  // const product = await getProducts();
  // console.log(product);

  //   const productsData = await getData();
  // const [isMenuOpen, setIsMenuOpen] = useState(false);

  // const handleMenuToggle = () => {
  //   setIsMenuOpen(!isMenuOpen);
  // };

  return (
    <>
      <div className={styles.margin}>
        <div className={styles.vidBg}>
          {/* <video className={styles.vid} autoPlay>
          <source src="https://res.cloudinary.com/dtaceicn1/video/upload/v1684410419/samples/elephants.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video> */}
        </div>
        <Section section="section1" />
        <Inspiration />
        <Categories inspCat="patterns" />
        <Categories inspCat="categories" />
        <Section section="section2" />
        <Gallery />
        {/* <Gallery /> */}
      </div>
    </>
  );
}
