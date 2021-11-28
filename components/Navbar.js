import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav>
      <div className="logo">
        <Image src="/AnongiftPict.png" width={75} height={75} />
      </div>
      <div className="links">
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/auth">
            <a>Auth</a>
          </Link>
        </li>
        <li>
          <Link href="/status">
            <a>Status</a>
          </Link>
        </li>
      </div>
    </nav>
  );
};

export default Navbar;
