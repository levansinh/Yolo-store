import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import numberWithCommas from "../util/covertPrice";
import { useDispatch } from "react-redux";
import { updateItem, removeItem } from "../redux/shopping-cart/cartItemSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
function CartItem(props) {
  const dispatch = useDispatch();
  const [item, setItem] = useState(props.item);
  const [quantity, setQuantity] = useState(props.item.quantity);
  const updateQuantity = (type) => {
    if (type === "+") {
      dispatch(updateItem({ ...item, quantity: quantity + 1 }));
    }
    if (type === "-") {
      dispatch(
        updateItem({ ...item, quantity: quantity - 1 === 0 ? 0 : quantity - 1 })
      );
    }
  };
  useEffect(() => {
    setItem(props.item);
    setQuantity(props.item.quantity);
  }, [props.item]);
  const removeCartItem = () => {
    dispatch(removeItem(item));
  };
  return (
    <tr className="">
      <th
        scope="row"
        class="px-6 w-[150px] py-4 font-medium text-[#333] whitespace-nowrap underline"
      >
        <Link to={`/catalog/${item.slug}`}>
          <div className="">{item.title}</div>
        </Link>
      </th>
      <td class="px-6 py-4 w-[100px]">{item.size}</td>
      <td class="px-6 py-4 w-[100px]">{item.color}</td>
      <td class="px-6 py-4 w-[200px]"><img src={item.image} alt="" /></td>
      <td class="px-6 py-4 flex mt-[20px]">
        <div
          className="product__info__item__quantity__btn"
          onClick={() => updateQuantity("-")}
        >
          <i className="bx bx-minus"></i>
        </div>
        <div className="product__info__item__quantity__input">{quantity}</div>
        <div
          className="product__info__item__quantity__btn"
          onClick={() => updateQuantity("+")}
        >
          <i className="bx bx-plus"></i>
        </div>
      </td>
      <td className="w-[100px]"> {numberWithCommas(item.price)}</td>
      <td>
        <FontAwesomeIcon
          icon={faTrash}
          className="text-xl cursor-pointer"
          onClick={() => removeCartItem()}
        ></FontAwesomeIcon>
      </td>
    </tr>
  );
}

export default CartItem;
