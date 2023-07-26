import { Link } from "react-router-dom";
import Logo from "../assets/images/Logo-2.png";

const footerAboutLinks = [
  { display: "Giới thiệu", path: "/about" },
  { display: "Liên hệ", path: "/about" },
  { display: "Tin tức", path: "/about" },
  { display: "Tuyển dụng", path: "/about" },
  { display: "Hệ thống cửa hàng", path: "/about" },
];
const footerCustomerLinks = [
  { display: "Chính sách đổi trả", path: "/about" },
  { display: "Chính sách hoàn tiền", path: "/about" },
  { display: "Chính sách bảo hành", path: "/about" },
];

function Footer() {
  return (
    <footer className="footer gird flex">
      <div className="container grid grid-col-4 ">
        <div className="box">
          <div className="footer__tille font-bold">Tổng đài hỗ trợ</div>
          <div className="footer__content">
            <p>
              Liên hệ đặt hàng <strong>0325610016</strong>
            </p>
            <p>
              Thắc mắc đơn hàng<strong>0325610016</strong>
            </p>
            <p>
              Góp ý thiếu nại <strong>0325610016</strong>
            </p>
          </div>
        </div>
        <div className="box">
          <div className="footer__tille font-bold">Về Yolo</div>
          <div className="footer__content">
            {footerAboutLinks.map((item, index) => (
              <p key={index}>
                <Link to={item.path}>{item.display}</Link>
              </p>
            ))}
          </div>
        </div>
        <div className="box">
          <div className="footer__content">
            {footerCustomerLinks.map((item, index) => (
              <p key={index}>
                <Link to={item.path}>{item.display}</Link>
              </p>
            ))}
          </div>
        </div>
        <div className="footer__logo">
          <p>
            <Link to="/">
              <img src={Logo} alt="" className="footer__logo" />
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
