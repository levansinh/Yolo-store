import Header from "../components/Header";
import Footer from "../components/Footer";
import classNames from "classnames/bind";
import styles from '../sass/modules/Layout.module.scss';
import ProductViewModal from "../components/ProductViewModal";
const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
  return (
    <div >
      <Header className={cx('header')}/>  
      <div className={cx("wrapper")}>
        <div className="container">{children}</div>
      </div>
      <Footer className={cx('footer')}/>
      <ProductViewModal/>
    </div>
  );
}

export default DefaultLayout;
