import { useEffect, useState } from "react";
import Modal from "react-modal";
import CheckBox from "../../components/Checkbox";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as categoryService from "../../service/categoryService";
import * as productService from "../../service/productService";
import { toast } from "react-toastify";
import Button from "../../components/Button";
function ModalProduct() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.login.currentUser);
    const accessToken = user.accessToken;
    const [modalIsOpen, setIsOpen] = useState(false);
    const [isFormUpdate, setIsFormUpdate] = useState(false);
    const [idToUpdate, setIdToUpdate] = useState();
    const [products, setProducts] = useState([]);
    const [category, setCategories] = useState([]);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
      } = useForm();
    
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
      function openModal(category) {
        setIsOpen(true);
        if (category) {
          setIsFormUpdate(true);
          setIdToUpdate(category._id);
        }
      }
      function afterOpenModal() {}
    
      function closeModal() {
        setIsOpen(false);
      }
    
      const onSubmit = async (data) => {
        const { category_name } = data;
        
        try {
          const res = productService.createProduct(
            { category_name: category_name },
            navigate,
            accessToken
          );
          console.log(category_name);
          if (res.status === 200) {
            closeModal();
            toast.success("tạo thành công");
          }
          reset();
          closeModal();
        } catch (error) {
          toast.error("tạo không thành công");
        }
      };
    return ( 
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
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="font-bold text-center text-2xl">
            {isFormUpdate ? "Create Product" : "Update Product"}
          </h1>
          <div className="relative z-0 w-full mb-6 group">
            <label
              htmlFor="countries"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Choose a Leader
            </label>
            <select
            defaultValue={'DEFAULT'}
              id="countries"
              {...register("category_name", { required: true })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="DEFAULT">Choose a Leader</option>
              {category.map((item) => (
                <option key={item._id} value={item.category_name}>
                  {item.category_name}
                </option>
              ))}
            </select>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
            
              {...register("title", { required: true })}
              className="peer block min-h-[auto] w-full rounded border border-gray-300 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200"
              id="exampleFormControlInput2"
              placeholder="Product"
            />
            {errors.title && <p className="text-red-500">category is valid</p>}
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
            
              {...register("price", { required: true })}
              className="peer block min-h-[auto] w-full rounded border border-gray-300 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200"
              id="exampleFormControlInput2"
              placeholder="Product"
            />
            {errors.price && <p className="text-red-500">category is valid</p>}
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
            
              {...register("image", { required: true })}
              className="peer block min-h-[auto] w-full rounded border border-gray-300 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200"
              id="exampleFormControlInput2"
              placeholder="Product"
            />
            {errors.image && <p className="text-red-500">category is valid</p>}
          </div>
          <div className="relative z-0 w-full mb-6 group">
           <label htmlFor="">Size</label>
<CheckBox lable="xs" checked/>
          </div>
         <div className="">
         {isFormUpdate ? (
            <Button
              type="submit"
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Create
            </Button>
          ) : (
            <Button
              type="submit"
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Update
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
     );
}

export default ModalProduct;