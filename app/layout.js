import "./globals.css";
import Layout from "./components/layout/Layout";

export const metadata = {
  title: "HappyParent",
  description: "A parenting journey.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Layout>{children}</Layout>
    </html>
  );
}
