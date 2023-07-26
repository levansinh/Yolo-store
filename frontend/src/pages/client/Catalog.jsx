import { useState, useEffect, useCallback, useRef } from "react";
import Checkbox from "../../components/Checkbox";
import Button from "../../components/Button";
import InfinityList from "../../components/InfinityList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import Helmet from '../../components/Hemet'

// service 
import * as productService from "../../service/productService";
import * as categoryService from "../../service/categoryService";

function Catelog() {
  const initFilter = {
    category: [],
    color: [],
    size: [],
  };

  const Color = [
    {display:'Hồng',color:'pink'},
    {display:'Đỏ',color:'red'},
    {display:'Vàng',color:'yellow'},
    {display:'Trắng',color:'white'},
    {display:'Cam',color:'orange'},
    {display:'Xanh dương',color:'blue'},
]

const Size = [
  {display:'S',size:'s'},
  {display:'M',size:'m'},
  {display:'L',size:'L'},
  {display:'XL',size:'xl'},
  {display:'XXL',size:'xxl'},
]

const filterRef = useRef()
const [filter, setFilter] = useState(initFilter);
const [productList ,setProductList] = useState([])
const [products, setProduct] = useState(productList);
const [categoryList ,setCategoryList] =useState([])

useEffect(()=>{
  (async() => {
    const res = await productService.getAllProduct()
    setProductList(res.data.product)
  })()
},[])
useEffect(()=>{
  (async() => {
    const res = await categoryService.getAllCategory()
    setCategoryList(res.data.data)
  })()
},[categoryList])

  const filterSelect = (type, checked, item) => {
    if (checked) {
      switch (type) {
        case "CATEGORY":
          setFilter({
            ...filter,
            category: [...filter.category, item.categorySlug],
          });
          break;
        case "COLOR":
          setFilter({ ...filter, color: [...filter.color, item.color] });
          break;
        case "SIZE":
          setFilter({ ...filter, size: [...filter.size, item.size] });
          break;
        default:
      }
    } else {
      switch (type) {
        case "CATEGORY":
          const newCategory = filter.category.filter(
            (e) => e !== item.categorySlug
          );
          setFilter({ ...filter, category: newCategory });
          break;
        case "COLOR":
          const newColor = filter.color.filter((e) => e !== item.color);
          setFilter({ ...filter, color: newColor });
          break;
        case "SIZE":
          const newSize = filter.size.filter((e) => e !== item.size);
          setFilter({ ...filter, size: newSize });
          break;
        default:
      }
    }
  };
  const clearFilter = () => setFilter(initFilter);
  const updateProduct = useCallback(() => {
    let temp = productList;

    if (filter.category.length > 0) {
      temp = temp.filter((e) => filter.category.includes(e.categorySlug));
    }

    if (filter.color.length > 0) {
      temp = temp.filter((e) => {
        const check = e.colors.find((color) => filter.color.includes(color));
        return check !== undefined;
      });
    }

    if (filter.size.length > 0) {
      temp = temp.filter((e) => {
        const check = e.size.find((size) => filter.size.includes(size));
        return check !== undefined;
      });
    }
    setProduct(temp);
  }, [filter, productList]);
  useEffect(() => {
    updateProduct();
  }, [updateProduct]);

  const toggleFilter = () => filterRef.current.classList.toggle('active')
  return (
    <Helmet title="Catalog">
      <div className="catalog">
        <div className="catalog__fillter " ref={filterRef}>
          <div className="catalog__filter__close">
            <FontAwesomeIcon icon={faClose} onClick={toggleFilter}/>
          </div>
          <div className="catalog__fillter__widget">
            <div className="catalog__fillter__widget__title">
              Danh mục sản phẩm
            </div>
            <div className="catalog__fillter__widget__content">
              {categoryList.map((item, index) => (
                <div key={index}>
                  <Checkbox
                    lable={item.category_name}
                    onChange={(input) =>
                      filterSelect("CATEGORY", input.checked, item)
                    }
                    checked={filter.category.includes(item.categorySlug)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="catalog__fillter__widget">
            <div className="catalog__fillter__widget__title">Màu sắc</div>
            <div className="catalog__fillter__widget__content">
              {Color.map((item, index) => (
                <div key={index}>
                  <Checkbox
                    lable={item.display}
                    onChange={(input) =>
                      filterSelect("COLOR", input.checked, item)
                    }
                    checked={filter.color.includes(item.color)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="catalog__fillter__widget">
            <div className="catalog__fillter__widget__title">Kích thước</div>
            <div className="catalog__fillter__widget__content">
              {Size.map((item, index) => (
                <div key={index}>
                  <Checkbox
                    lable={item.display}
                    onChange={(input) =>
                      filterSelect("SIZE", input.checked, item)
                    }
                    checked={filter.size.includes(item.size)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="catalog__fillter__widget">
            <div className="catalog__fillter__widget__content">
              <Button primary onClick={clearFilter}>
                Xóa bộ lọc
              </Button>
            </div>
          </div>

        </div>
          <div className="catalog__fillter__toggle">
            <Button primary onClick={() => {toggleFilter()}}>Bộ lọc</Button>  
          </div>
          <InfinityList data={products} />
      </div>
    </Helmet>
  );
}

export default Catelog;
