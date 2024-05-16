import "./index.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="header-container">
      <h1>Product Maagement</h1>
      <Link to="/" className="link-el">
        <p>Home</p>
      </Link>
    </nav>
  );
};

export default Header;
