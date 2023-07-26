import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { toast } from "react-toastify";
import Button from "../../components/Button";

import * as categoryService from "../../service/categoryService";
function Category() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.login.currentUser);
  const accessToken = user.accessToken;
  const [category, setCategories] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isFormUpdate, setIsFormUpdate] = useState(false);
  const [idToUpdate, setIdToUpdate] = useState();
  const [formData, setFormData] = useState({ category_name: "" });

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
  }, [modalIsOpen]);

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
      const { category_name } = category;
      setFormData({ category_name });
      setIsFormUpdate(true);
      setIdToUpdate(category._id);
    } else {
      setFormData({ category_name: "" });
    }
  }
  function afterOpenModal() {
   
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleCreate = (e) => {
    e.preventDefault();
    try {
      const res = categoryService.createCategory(
        formData,
        navigate,
        accessToken
      );
      if (res) {
        closeModal();
        
      }
      closeModal();
    } catch (error) {
      toast.error("Tạo không thành công");
    }
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    try {
      const res = categoryService.updateCategory(
        idToUpdate,
        formData,
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
  };
  const handleOnChangeInput = (e) => {
    setFormData({[e.target.name]: e.target.value });
  };
  const handleDelete = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Bạn có chắc chắn muốn xóa ??? ")) {
      const res = await categoryService.deleteCategory(
        id,
        navigate,
        accessToken
      );
      if (res?.status === 200) {
        const newCategories = category.filter(
          (category) => category._id !== id
        );
        setCategories(newCategories);
        toast.success("Xóa thành công");
      } else {
        toast.error("Something went wrong!");
      }
    }
  };
  return (
    <div className="">
      <div className="flex items-cemter py-7 px-10 justify-between">
        <div className="">
          <h1 className="text-2xl text-gray-800 font-semibold">Category</h1>
          <p className="text-sm font-medium text-gray-500 ">
            Create your category grow and upload here
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
          <span className="text-sm tracking-wide">Create Category</span>
        </Button>
      </div>
      <table className="w-full border-b border-gray-200">
        <thead>
          <tr className="text-sm font-medium text-gray-700 border-b border-gray-200">
            <td className="py-4 px-4 text-center">STT</td>
            <td className="py-4 px-4 text-center">Category Name</td>
            <td className="py-4 pr-10 pl-4 text-center"></td>
          </tr>
        </thead>
        <tbody>
          {category.map((item, index) => (
            <tr
              key={item._id}
              className="hover:bg-gray-100 transition-colors group"
            >
              <td className="font-medium text-center">{index + 1}</td>
              <td className="font-medium text-center">{item.category_name}</td>
              <td className="flex ">
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
        <form action="" className="w-1/2 m-auto bg-white px-10 py-5 mt-10">
          <h1 className="font-bold text-center text-2xl">
            {isFormUpdate ? "Cập nhật danh mục" : "Tạo danh mục"}
          </h1>
          <div className="relative z-0 w-full mb-6 group">
            <input
              name="category_name"
              value={formData.category_name}
              onChange={handleOnChangeInput}
              className="peer block min-h-[auto] w-full rounded border border-gray-300 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200"
              id="exampleFormControlInput2"
              placeholder="Category"
            />
          </div>
          {isFormUpdate ? (
            <button
              onClick={handleUpdate}
              type="submit"
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Update
            </button>
          ) : (
            <button
              onClick={handleCreate}
              type="submit"
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Create
            </button>
          )}

          <Button
            onClick={closeModal}
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 ml-5 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Close
          </Button>
        </form>
      </Modal>
    </div>
  );
}

export default Category;
