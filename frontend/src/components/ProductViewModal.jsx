import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import ProductView from "./ProductView";

import Button from "./Button";

import { remove } from "../redux/product-modal/productModalSlice";

// import productData from '../assets/fake-data/products'
import * as productService from "../service/productService";

const ProductViewModal = () => {
  const productSlug = useSelector((state) => state.productModal.value);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login.currentUser);
  const accessToken = user?.accessToken;
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  useEffect(() => {
    (async () => {
      const res = await productService.getBySlug(
        productSlug,
        dispatch,
        navigate,
        accessToken
      );
      setProduct(res.data.product);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productSlug]);
  return (
    <div className={`product-view__modal ${product === null ? "" : "active"}`}>
      <div className="product-view__modal__content">
        <ProductView product={product} />
        <div className="product-view__modal__content__close">
          <Button size="sm" onClick={() => dispatch(remove())}>
            Đóng
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductViewModal;
