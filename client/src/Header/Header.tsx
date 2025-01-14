import { Link } from "react-router-dom";
import caddie from "../assets/logo/caddie.png";
import coeur from "../assets/logo/coeur.png";
import facebook from "../assets/logo/facebook.png";
import instagram from "../assets/logo/instagram.png";
import logo from "../assets/logo/logo.png";
import panier from "../assets/logo/panier.png";
import "./Header.css";

const Header = () => {
  return (
    <header>
      <a
        href="https://www.facebook.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img className="fb" src={facebook} alt="Logo Facebook" />
      </a>
      <a
        href="https://www.instagram.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img className="insta" src={instagram} alt="Logo Instagram" />
      </a>
      <Link to="/">
        <img className="stasbouq" src={logo} alt="Logo Strasbouq" />
      </Link>
      <Link to="/Panier">
        <img className="caddie" src={caddie} alt="Logo Caddie" />
      </Link>
      <Link to="/Favoris">
        <img className="coeur" src={coeur} alt="Logo Favoris" />
      </Link>
      <Link to="/Shop">
        <img className="pan" src={panier} alt="Logo Shop" />
      </Link>
    </header>
  );
};

export default Header;
