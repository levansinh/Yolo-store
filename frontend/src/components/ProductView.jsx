import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// import numberWithCommas from "../util/covertPrice";
import Button from "./Button";
import { addItem } from "../redux/shopping-cart/cartItemSlice";
import { useNavigate } from "react-router-dom";
import { remove } from "../redux/product-modal/productModalSlice";
import { toast } from "react-toastify";
import formatterPrice from "../helpers/convertPrice";
function ProductView(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let product = props.product;

  if (product === null)
    product = {
      title: "",
      price: "",
      image: "",
      categorySlug: "",
      colors: [],
      slug: "",
      size: [],
      description: "",
    };
  const image01 =
    "https://ecdn.game4v.com/g4v-content/uploads/2022/09/25083529/Gojo-2-game4v-1664069728-55.jpg";
  const image02 =
    "https://gamek.mediacdn.vn/133514250583805952/2023/4/29/base64-168248213986223902709-1682739310913-1682739310994845185640-1682769136989-168276913770467484367.png";
  const [previewImg, setPerviewImg] = useState(product?.image);
  const [color, setColor] = useState(undefined);
  const [size, setSize] = useState(undefined);
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState(false);
  const updateQuantity = (type) => {
    if (type === "inc") {
      setQuantity(quantity + 1);
    } else {
      setQuantity(quantity - 1 < 1 ? 0 : quantity - 1);
    }
  };
  const check = () => {
    if (size === undefined) {
      toast.warning("Bạn chưa chọn kích cỡ");
      return false;
    }
    if (color === undefined) {
      toast.warning("Bạn chưa chọn màu");
      return false;
    }
    return true;
  };
  const addToCart = () => {
    if (check()) {
      let newItem = {
        title: product.title,
        slug: product.slug,
        color: color,
        size: size,
        image: previewImg,
        price: product.price,
        quantity: quantity,
      };
      if (dispatch(addItem(newItem))) {
        toast.success("Thêm vào giỏ hàng thành công");
      } else {
        toast.error("Thêm vào giỏ hàng thất bại");
      }
    }
  };

  const goToCart = () => {
    if (check()) {
      let newItem = {
        title: product.title,
        slug: product.slug,
        color: color,
        size: size,
        price: product.price,
        quantity: quantity,
      };
      if (dispatch(addItem(newItem))) {
        // dispatch(remove())
        navigate("/cart");
      } else {
        alert("Fail");
      }
    }
  };

  useEffect(() => {
    setPerviewImg(product?.image);
    setColor(undefined);
    setQuantity(1);
    setSize(undefined);
  }, [product]);
  return (
    <div className="product">
      <div className="product__image">
        <div className="product__image__list">
          <div
            className="product__image__list__item"
            onClick={() => setPerviewImg(image01)}
          >
            <img src={image01} alt="" />
          </div>
          <div
            className="product__image__list__item"
            onClick={() => setPerviewImg(image02)}
          >
            <img src={image02} alt="" />
          </div>
        </div>
        <div className="product__image__main">
          <img src={previewImg} alt="" />
        </div>
        <div className={`product-description ${description ? "expand" : ""}`}>
          <div className="product-description__title">Chi tiết sản phẩm</div>
          <div
            className="product-description__content"
            dangerouslySetInnerHTML={{ __html: product?.description }}
          ></div>
          <div className="product-description__toggle">
            <Button primary onClick={() => setDescription(!description)}>
              {description ? "Thu gọn" : "Xem thêm"}
            </Button>
          </div>
        </div>
      </div>
      <div className="product__info">
        <h1 className="product__info__title">{product?.title}</h1>
        <div className="product__info__item">
          <span className="product__info__item__price">
            {formatterPrice.format(product?.price)}
          </span>
        </div>
        <div className="product__info__item">
          <div className="product__info__item__title">Kích cỡ</div>
          <div className="product__info__item__list">
            {product?.size?.map((item, index) => (
              <div
                key={index}
                className={`product__info__item__list__item ${
                  size === item ? "active" : ""
                }`}
                onClick={() => setSize(item)}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="product__info__item">
          <div className="product__info__item__title">Màu sắc</div>
          <div className="product__info__item__list">
            {product?.colors?.map((item, index) => (
              <div
                key={index}
                style={{ backgroundColor: `${item}` }}
                className={`product__info__item__list__item ${
                  color === item ? "active" : ""
                }`}
                onClick={() => setColor(item)}
              ></div>
            ))}
          </div>
        </div>
        <div className="product__info__item">
          <div className="product__info__item__title">Số lượng</div>
          <div className="product__info__item__quantity">
            <div
              className="product__info__item__quantity__btn"
              onClick={() => {
                updateQuantity("dec");
              }}
            >
              -
            </div>
            <div className="product__info__item__quantity__input">
              {quantity}
            </div>
            <div
              className="product__info__item__quantity__btn"
              onClick={() => {
                updateQuantity("inc");
              }}
            >
              +
            </div>
          </div>
        </div>
        <div className="product__info__item">
          <div className="product__info__item__title">Đặt hàng</div>
          <div className="flex items-center ">
            <Button
              primary
              onClick={() => {
                addToCart();
                dispatch(remove());
              }}
            >
              Thêm vào giỏ hàng
            </Button>
            <Button
              primary
              onClick={() => {
                goToCart();
                dispatch(remove());
              }}
            >
              Mua sản phẩm
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductView;
