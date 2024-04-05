import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import numberWithCommas from "../../util/covertPrice";
import Helmet from "../../components/Hemet";
import CartItem from "../../components/CartItem";
import Button from "../../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import formatterPrice from "../../helpers/convertPrice";
function Cart() {
  const cartItems = useSelector((state) => state.cartItems.value);
  console.log(cartItems);
  const [totalProduct, setTotalProduct] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const updateQuantity = (type) => {
    if (type === "+") {
      setQuantity(quantity + 1);
    }
    if (type === "-") {
      setQuantity(quantity - 1);
    }
  };
  useEffect(() => {
    setTotalProduct(
      cartItems.reduce((total, item) => total + Number(item.quantity), 0)
    );
    setTotalPrice(
      cartItems.reduce(
        (total, item) => total + Number(item.quantity) * Number(item.price),
        0
      )
    );
  }, [cartItems]);
  return (
    <Helmet title="Giỏ hàng">
      <div className="cart">
        <div className="cart__info">
          <div className="cart__info__txt">
            <p>Bạn đang có {totalProduct} sản phẩm trong giỏ hàng</p>
            <div className="cart__info__txt__price">
              <span>Thành tiền:</span>
              <span>{numberWithCommas(Number(totalPrice))}</span>
            </div>
          </div>
          <div className="cart__info__btn">
            <Button primary>Đặt hàng</Button>
            <Button primary to={"/catalog"}>
              Tiếp tục mua hàng
            </Button>
          </div>
        </div>
        <div className="cart__list">
          <Table aria-label="Example table with dynamic content">
            <TableHeader>
              <TableColumn>STT</TableColumn>
              <TableColumn> Tên sản phẩm</TableColumn>
              <TableColumn> Kích cỡ</TableColumn>
              <TableColumn> Màu sắc</TableColumn>
              <TableColumn> Hình ảnh</TableColumn>
              <TableColumn> Số lượng</TableColumn>
              <TableColumn> Giá tiền</TableColumn>
              <TableColumn>Hành động</TableColumn>
            </TableHeader>
            <TableBody>
              {cartItems.map((item, index) => (
                <TableRow key={item.key}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <Link to={`/catalog/${item.slug}`}>
                      <div className="">{item.title}</div>
                    </Link>
                  </TableCell>
                  <TableCell>{item.size}</TableCell>
                  <TableCell>{item.color}</TableCell>
                  <TableCell>
                    <img
                      className="h-[100px] w-[150px]"
                      src={item.image}
                      alt=""
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div
                        className="product__info__item__quantity__btn"
                        onClick={() => updateQuantity("-")}
                      >
                        <i className="bx bx-minus"></i>
                      </div>
                      <div className="product__info__item__quantity__input">
                        {quantity}
                      </div>
                      <div
                        className="product__info__item__quantity__btn"
                        onClick={() => updateQuantity("+")}
                      >
                        <i className="bx bx-plus"></i>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {formatterPrice.format(item.price * item.quantity)}
                  </TableCell>
                  <TableCell>
                    {/* {formatterPrice.format(item.price * item.quantity)} */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Helmet>
  );
}

export default Cart;
