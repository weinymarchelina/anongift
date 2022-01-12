import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav>
      <div className="logo">
        <img src="/icon1.png" alt="logo" />
      </div>
      <div className="links">
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/addNote">
            <a>Create</a>
          </Link>
        </li>
      </div>
    </nav>
  );
};

export default Navbar;
