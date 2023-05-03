import "./globals.css";
async function getData() {
  const res = await fetch("https://kea-alt-del.dk/t7/api/products/1163");

  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  const data = await getData();

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
