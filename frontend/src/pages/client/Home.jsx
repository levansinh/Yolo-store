import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Grid from "../../components/Grid";
import Section, { SectionBody, SectionTitle } from "../../components/Section";
import ProductCart from "../../components/ProductCart";
import Helmet from "../../components/Hemet";
import * as productService from "../../service/productService";
import { getProducts } from "../../util/product";
import Slider from "../../components/Slide";
import { heroSliderData } from "../../assets/slider";
import PolicyCard from "../../components/PolicyCard";
const Wrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
`;

function Home() {
  const [productList, setProductList] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await productService.getAllProduct();
      setProductList(res.data.product);
    })();
  }, []);

  const policy = [
    {
      name: "Miễn phí giao hàng",
      description: "Miễn phí ship với đơn hàng > 239K",
      icon: "bx bx-shopping-bag",
    },
    {
      name: "Thanh toán COD",
      description: "Thanh toán khi nhận hàng (COD)",
      icon: "bx bx-credit-card",
    },
    {
      name: "Khách hàng VIP",
      description: "Ưu đãi dành cho khách hàng VIP",
      icon: "bx bx-diamond",
    },
    {
      name: "Hỗ trợ bảo hành",
      description: "Đổi, sửa đồ tại tất cả store",
      icon: "bx bx-donate-heart",
    },
  ];

  return (
    <div>
      <Helmet title="Trang Chủ ">
        <Slider
          data={heroSliderData}
          control={true}
          auto={false}
          timeOut={5000}
        />
        <Section>
          <SectionBody>
            <Grid col={4} mdCol={2} smCol={1} gap={20}>
              {policy.map((item, index) => (
                <Link key={index} to="/policy">
                  <PolicyCard
                    name={item.name}
                    description={item.description}
                    icon={item.icon}
                  />
                </Link>
              ))}
            </Grid>
          </SectionBody>
        </Section>
        <Wrapper>
          <Section>
            <SectionTitle>Sản phẩm bán chạy</SectionTitle>
            <SectionBody>
              <div className="flex align-items-center">
                {getProducts(4, productList).map((item, index) => (
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
        </Wrapper>
        {/* new arrival section */}
        <Section>
          <SectionTitle>sản phẩm mới</SectionTitle>
          <SectionBody>
            <div className="flex items-center justify-between">
              {getProducts(8, productList).map((item, index) => (
                <ProductCart
                  key={index}
                  image={item.image}
                  name={item.title}
                  price={Number(item.price)}
                  slug={item.slug}
                />
              ))}
            </div>
          </SectionBody>
        </Section>
      </Helmet>
    </div>
  );
}

export default Home;
