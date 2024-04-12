import { useEffect, useState } from "react";
import Helmet from "../../components/Hemet";
import { useParams } from "react-router-dom";
import Section, { SectionBody, SectionTitle } from "../../components/Section";
import Grid from "../../components/Grid";
import ProductCart from "../../components/ProductCart";
import ProductView from "../../components/ProductView";
import * as productService from "../../service/productService";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
function Product(props) {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login.currentUser);
  const accessToken = user.accessToken;

  const [productList, setProductList] = useState([]);
  const [product, setProduct] = useState({});

  useEffect(() => {
    (async () => {
      const res = await productService.getAllProduct();
      setProductList(res.data.product);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const res = await productService.getBySlug(
        params.slug,
        dispatch,
        navigate,
        accessToken
      );
      setProduct(res.data.product);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Helmet title={product?.title}>
      <Section>
        <SectionBody>
          <ProductView product={product} />
        </SectionBody>
      </Section>
      <Section>
        <SectionTitle>Khám phá thêm</SectionTitle>
        <SectionBody>
          <div className="flex items-center justify-between">
            {productList.map((item, index) => (
              <ProductCart
                key={index}
                image={item.image}
                title={item.title}
                slug={item.slug}
                price={Number(item.price)}
              />
            ))}
          </div>
        </SectionBody>
      </Section>
    </Helmet>
  );
}

export default Product;
