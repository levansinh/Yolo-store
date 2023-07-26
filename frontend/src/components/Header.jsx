import { useRef, useEffect } from "react";
import logo from "../assets/images/Logo-2.png";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Search from "./Search";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../redux/api/apiRequest";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  faBars,
  faBagShopping,
  faUser,
  faArrowLeft,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
const mainNav = [
  { display: "Trang Chủ", path: "/" },
  { display: "Sản Phẩm ", path: "/catalog" },
  { display: "Tin Tức", path: "/blog" },
  { display: "Liên Hệ", path: "/contact" },
];

const Header = () => {
  const currentUser = useSelector((state) => state.auth.login.currentUser);
  const cartItems = useSelector((state) => state.cartItems.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const activeNav = mainNav.findIndex((e) => e.path === pathname);

  const headerRef = useRef(null);

  useEffect(() => {
    const shrink = () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("shrink");
      } else {
        headerRef.current.classList.remove("shrink");
      }
    };
    window.addEventListener("scroll", shrink);
    return () => window.removeEventListener("scroll", shrink);
  }, []);

  const menuLeft = useRef(null);

  const menuToggle = () => menuLeft.current.classList.toggle("active");

  const handleLogout = async () => {
    if (currentUser) {
      // Normal logout
      await logOut(dispatch, navigate);
      toast.success("Đăng xuất thành công");
    }
  };
  return (
    <div className="header" ref={headerRef}>
      <div className="container">
        <div className="header__logo">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>
        <div className="header__menu">
          <div className="header__menu__mobile-toggle" onClick={menuToggle}>
            <FontAwesomeIcon icon={faBars} />
          </div>
          <div className="header__menu__left" ref={menuLeft}>
            <div className="header__menu__left__close" onClick={menuToggle}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </div>
            {mainNav.map((item, index) => (
              <div
                key={index}
                className={`header__menu__item header__menu__left__item ${
                  index === activeNav ? "active" : ""
                }`}
                onClick={menuToggle}
              >
                <Link to={item.path}>
                  <span>{item.display}</span>
                </Link>
              </div>
            ))}
          </div>
          <div className="header__menu__right">
            <div className="header__menu__item header__menu__right__item max-sm:hidden">
              <Search />
            </div>
            <div className="header__menu__item header__menu__right__item">
              <Link to="/cart" className="relative">
                <FontAwesomeIcon icon={faBagShopping} />
                <span className="absolute top-[-3px] right-[-10px] text-lg py-1 px-3 rounded-full bg-[#5054b4] text-white">
                {cartItems.length}
                </span>
              </Link>
            </div>
            <div className="header__menu__item header__menu__right__item">
              {currentUser ? (
                <div onClick={handleLogout}>
                  <FontAwesomeIcon icon={faRightToBracket} />
                </div>
              ) : (
                <Link to={"/auth"}>
                  <FontAwesomeIcon icon={faUser} />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
