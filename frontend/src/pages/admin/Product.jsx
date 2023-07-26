import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { toast } from "react-toastify";

import CheckBox from "../../components/Checkbox";
import Button from "../../components/Button";

import * as productService from "../../service/productService";
import * as categoryService from "../../service/categoryService";

function Products() {
  const user = useSelector((state) => state.auth.login.currentUser);
  const accessToken = user.accessToken;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [modalIsOpen, setIsOpen] = useState(false);
  const [isFormUpdate, setIsFormUpdate] = useState(false);
  const [idToUpdate, setIdToUpdate] = useState();
  const [products, setProducts] = useState([]);
  const [category, setCategories] = useState([]);
  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);
  const [formData,setFormData] = useState({
    categorySlug: '',
    title: '',
    price: '',
    image: '',
    size:[],
    colors: [],
    description: '',
  })

  useEffect(() => {
    (async () => {
      const res = await productService.getAllProduct(
        dispatch,
        navigate,
        accessToken
      );
      setProducts(res.data.product);
    })();
   
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalIsOpen]);
  useEffect(() => {
    (async () => {
      const res = await categoryService.getAllCategory(
        dispatch,
        navigate,
        accessToken
      );
      setCategories(res.data.data);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Size = [
    { display: "S", size: "s" },
    { display: "M", size: "m" },
    { display: "L", size: "L" },
    { display: "XL", size: "xl" },
    { display: "XXL", size: "xxl" },
  ];
  const Color = [
    { display: "Hồng", color: "pink" },
    { display: "Đỏ", color: "red" },
    { display: "Vàng", color: "yellow" },
    { display: "Trắng", color: "white" },
    { display: "Cam", color: "orange" },
    { display: "Xanh dương", color: "blue" },
  ];

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      width: "800px",
      transform: "translate(-50%, -50%)",
    },
  };

  const handleCheckSize = (item) => {
    setSize((prev) => {
      const isChecked = size.includes(item.size);
      console.log(isChecked);
      console.log(size);
      if (isChecked) {
        return size.filter((e) => e !== item.size);
      } else {
        return [...prev, item.size];
      }
    });
  };
  const handleCheckColor = (item) => {
    setColor((prev) => {
      const isChecked = color.includes(item.color);
      console.log(isChecked);
      if (isChecked) {
        return color.filter((e) => e !== item.color);
      } else {
        return [...prev, item.color];
      }
    });
  };

  function openModal(category) {
    if (category) {
      const {_id,categorySlug,title,image,price,colors,size,description} = category
      setFormData({categorySlug,title,price,image,size,colors,description})
      setIsFormUpdate(true);
      setIdToUpdate(_id);
    }else {
      setFormData({ categorySlug: '',
      title: '',
      price: '',
      image: '',
      size:[],
      colors: [],
      description: '',})
    }
    setIsOpen(true);
  }
  const handleOnChangeInput =(e) => {
    setFormData(prev => ({...prev,[e.target.name]:e.target.value}))
  }
  function afterOpenModal() {}

  function closeModal() {
    setIsOpen(false);
  }

  const handleDelete = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Bạn có chắc chắn muốn xóa ??? ")) {
      const res = await productService.deleteProduct(id, navigate, accessToken);
      if (res?.status === 200) {
        const newProduct = products.filter((product) => product._id !== id);
        setProducts(newProduct);
        toast.success("Xóa thành công");
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

const handleCreate = (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      console.log(color,size);
      const res = productService.createProduct(
        {...formData,colors:color,size:size},
        navigate,
        accessToken
      );
      if (res.status === 200) {
        closeModal();
        toast.success("Tạo thành công");
      }
      closeModal();
    } catch (error) {
      toast.error("Tạo không thành công");
    }
  };
  const handleUpdate = (e) => {
    e.preventDefault()
    try {
      const res = productService.updateProduct(
        idToUpdate,
        {...formData,colors:color,size:size},
        navigate,
        accessToken
      );
      
      if (res) {
        toast.success("Cập nhật thành công");
        closeModal();
      }
    } catch (error) {
      closeModal();
      toast.success("Cập nhật không thành công");
    }
  }
  return (
    <div className="">
      <div className="flex items-cemter py-7 px-10 justify-between">
        <div className="">
          <h1 className="text-2xl  text-gray-800 font-semibold">Product</h1>
          <p className="text-sm font-medium text-gray-500 ">
            Create your product grow and upload here
          </p>
        </div>
        <Button
          onClick={() => {
            openModal();
            setIsFormUpdate(false);
        }}
          className="inline-flex gap-x-2 items-center px-6 py-2.5 rounded-xl bg-indigo-600 text-white"
        >
          <FontAwesomeIcon className="w-6 h-6 fill-current" icon={faPlus} />
          <span className="text-sm tracking-wide">Create Product</span>
        </Button>
      </div>
      <table className="w-full border-b border-gray-200">
        <thead>
          <tr className="text-sm font-medium text-gray-700 border-b border-gray-200">
            <td className="py-4 px-4 text-center">STT</td>
            <td className="py-4 px-4 text-center">Danh mục</td>
            <td className="py-4 px-4 text-center">Tên sản phẩm </td>
            <td className="py-4 px-4 text-center">Hình ảnh</td>
            <td className="py-4 px-4 text-center">Giá</td>
            <td className="py-4 px-4 text-center">Lượt đánh giá </td>
            <td className="py-4 pr-10 pl-4 text-center"></td>
          </tr>
        </thead>
        <tbody>
          {products.map((item, index) => (
            <tr
              key={index}
              className="hover:bg-gray-100 transition-colors group"
            >
              <td className="font-medium text-center">{index + 1}</td>
              <td className="font-medium text-center">{item.categorySlug}</td>
              <td className="font-medium text-center">{item.title}</td>
              <td className="font-medium text-center"><img src={item.image} alt="" /></td>
              <td className="font-medium text-center">{item.price}</td>
              <td className="font-medium text-center">{item.review_count}</td>
              <td className="flex flex-row items-start justify-start">
                <Button
                  onClick={() => {
                    handleDelete(item._id);
                  }}
                >
                  <FontAwesomeIcon
                    className="h-6 w-6 text-red-600"
                    icon={faTrash}
                  />
                </Button>
                <div className="ml-5">
                  <Button
                    onClick={() => {
                      openModal(item);
                    }}
                  >
                    <FontAwesomeIcon
                      className="h-6 w-6 text-green-600"
                      icon={faEdit}
                    />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <form
          action=""
          className="w-1/2 m-auto bg-white px-10 py-5 mt-10"
        >
          <h1 className="font-bold text-center text-2xl">
            {isFormUpdate === true ? 'Update Product' : 'Add Product'}
          </h1>
          <div className="relative z-0 w-full mb-6 group">
            <label
              htmlFor="countries"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Choose a Category 
            </label>
            <select
              id="countries"
              value={formData.categorySlug}
              onChange={handleOnChangeInput}
              name="categorySlug"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option>Choose a Category</option>
              {category.map((item) => (
                <option key={item._id} value={item.categorySlug}>
                  {item.category_name}
                </option>
              ))}
            </select>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              name="title"
              value={formData.title}
              onChange={handleOnChangeInput}
              className="peer block min-h-[auto] w-full rounded border border-gray-300 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200"
              id="exampleFormControlInput2"
              placeholder="Title"
            />
            {/* {errors.title && <p className="text-red-500">category is valid</p>} */}
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              name="price"
              value={formData.price}
              onChange={handleOnChangeInput}
              className="peer block min-h-[auto] w-full rounded border border-gray-300 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200"
              id="exampleFormControlInput2"
              placeholder="Product"
            />
            {/* {errors.price && <p className="text-red-500">category is valid</p>} */}
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              name="image"
              value={formData.image}
              onChange={handleOnChangeInput}
              className="peer block min-h-[auto] w-full rounded border border-gray-300 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200"
              id="exampleFormControlInput2"
              placeholder="Product"
            />
            {/* {errors.image && <p className="text-red-500">category is valid</p>} */}
          </div>
          <div className="flex flex-row justify-between">
            <div className="relative z-0 w-full mb-6 group">
              <label htmlFor="">Size</label>
              {Size.map((item, index) => (
                <CheckBox
                  key={index}
                  lable={item.display}
                  checked={size.includes(item.size)}
                  onChange={() => {
                    handleCheckSize(item);
                  }}
                />
              ))}
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <label htmlFor="">Color</label>
              {Color.map((item, index) => (
                <CheckBox
                key={index}
                lable={item.display}
                checked={color.includes(item.color)}
                onChange={() => {
                  handleCheckColor(item);
                }}
              />
              ))}
            </div>
          </div>
            <div className="relative z-0 w-full mb-6 group">
            <input
              name="description"
              value={formData.description}
              onChange={handleOnChangeInput}
              className="peer block min-h-[auto] w-full rounded border border-gray-300 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200"
              id="exampleFormControlInput2"
              placeholder="Product"
            />
            {/* {errors.title && <p className="text-red-500">category is valid</p>} */}
          </div>
          <div className="">
            {isFormUpdate ? (
              <Button
              onClick={handleUpdate}
                type="submit"
                className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Update
              </Button>
            ) : (
              <Button
              onClick={handleCreate}
                type="submit"
                className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Create
              </Button>
            )}

            <Button
              onClick={closeModal}
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 ml-5 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Close
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Products;
