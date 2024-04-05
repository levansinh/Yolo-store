import { Link } from "react-router-dom";
import numberWithCommas from "../util/covertPrice";
import Button from "./Button";
import { set } from "../redux/product-modal/productModalSlice";
import { useDispatch } from "react-redux";
function ProductCart(props) {
  const dispatch = useDispatch();
  return (
    <div className="product-cart">
      <Link to={`/catalog/${props.slug}`}>
        <div className="product-cart__image">
          <img src={props.image} alt="" />
        </div>
        <h3 className="product-cart__name">{props.title}</h3>
        <div className="product-cart__price">
          {numberWithCommas(props.price)}
          <div className="product-cart__price__old">
            <del>{numberWithCommas(390000)}</del>
          </div>
        </div>
      </Link>
      <div className="flex items-center justify-between">
        <Button primary onClick={() => dispatch(set(props.slug))}>
          Chọn mua
        </Button>
        <Link to={`/catalog/${props.slug}`}>
          <Button primary>Xem chi tiết</Button>
        </Link>
      </div>
    </div>
  );
}

export default ProductCart;
