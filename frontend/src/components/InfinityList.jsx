import { useEffect, useRef, useState } from "react";
import ProductCart from "../components/ProductCart";
import PropTypes from "prop-types";
import Grid from "./Grid";
function InfinityList(props) {
  const perLoad = 6; // items each load

  const listRef = useRef(null);

  const [data, setData] = useState([]);

  const [load, setLoad] = useState(true);

  const [index, setIndex] = useState(0);
  useEffect(() => {
    setData(props.data.slice(0, perLoad));
    setIndex(1);
  }, [props.data]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
        if (listRef && listRef.current) {
          if (
            window.scrollY + window.innerHeight >=
            listRef.current.clientHeight + listRef.current.offsetTop + 200
          ) {
            setLoad(true);
          }
        }
    });
  }, [listRef]);

  useEffect(() => {
    const getItems = () => {
      const pages = Math.floor(props.data.length / perLoad);
      const maxIndex = props.data.length % perLoad === 0 ? pages : pages + 1;

      if (load && index <= maxIndex) {
        const start = perLoad * index;
        const end = start + perLoad;

        setData(data.concat(props.data.slice(start, end)));
        setIndex(index + 1);
      }
    };
    getItems();
    setLoad(false);
  }, [load, index, data, props.data]);
  return (
    <div className="catalog__content" ref={listRef}>
      <div className="">
        <Grid
        col={3}
        mdCol={2}
        smCol={1}
        gap={20}
        >
        {data.map((item, index) => (
            <ProductCart
            key={index}
              image={item.image}
              title={item.title}
              slug={item.slug}
              price={Number(item.price)}
            />
            ))}
            </Grid >
      </div>
    </div>
  );
}
InfinityList.prototype = {
  data: PropTypes.array.isRequired,
};
export default InfinityList;
