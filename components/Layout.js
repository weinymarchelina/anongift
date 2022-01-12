import Head from "next/head";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="content">
      <Head>
        <title>Thanksage</title>
        <meta
          name="description"
          content="Send your thankful message to anyone secretly!"
        />
        <link rel="icon" href="/mini.png" />
      </Head>
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
