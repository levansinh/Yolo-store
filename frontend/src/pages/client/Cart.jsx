import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import numberWithCommas from "../../util/covertPrice";
import Helmet from "../../components/Hemet";
import CartItem from "../../components/CartItem";
import Button from "../../components/Button";
function Cart() {
  const cartItems = useSelector((state) => state.cartItems.value);
  console.log(cartItems);
  const [totalProduct, setTotalProduct] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
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
          <div class="relative overflow-x-auto">
            <table class="w-full text-sm text-left text-[#333] ">
              <thead class="text-xs w-full uppercase bg-[#5054b4] text-white">
                <tr >
                  <th scope="col" class="px-6 py-3 ">
                    Tên sản phẩm
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Kích cỡ
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Màu sắc
                  </th>
                  <th scope="col" class="px-6 py-3">
                   Hình ảnh
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Số lượng
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Giá tiền
                  </th>
                  <th scope="col" class="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody >
               
                  {cartItems.map((item, index) => (
                    <CartItem key={index} item={item} />
                  ))}
                
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Helmet>
  );
}

export default Cart;
