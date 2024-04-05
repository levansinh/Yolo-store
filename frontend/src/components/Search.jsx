import HeadlessTippy from "@tippyjs/react/headless";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faSearch } from "@fortawesome/free-solid-svg-icons";
// import ToDoList from "../../components/TodoList";
import * as productService from "../service/productService";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useDebounce from "../hook/useDebounced";
import ListSearchItem from "../components/ListSearchItem";
function Search() {
  const [showResult, setShowResult] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const inputRef = useRef();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.login.currentUser);
  const accessToken = user?.accessToken;
  const debouncedValue = useDebounce(searchValue, 500);
  useEffect(() => {
    if (!debouncedValue.trim()) {
      setSearchResult([]);
      return;
    }
    (async () => {
      const res = await productService.getAllProduct(navigate, accessToken);
      setSearchResult(() => {
        return res.data.product.filter((product) =>
          product.title.includes(debouncedValue)
        );
      });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);
  const handleOnChangeInput = (e) => {
    console.log(e.target.value);
    setSearchValue(e.target.value);
  };

  const renderResult = () => {
    return (
      <div className="w-300px z-50 border-[#4267b2] bg-zinc-100">
        <ListSearchItem list={searchResult} />
      </div>
    );
  };

  const handleHideResult = () => {
    setShowResult(false);
  };

  const handleClear = () => {
    setSearchResult([]);
    setSearchValue("");
    inputRef.current.focus();
  };

  return (
    <HeadlessTippy
      visible={showResult && searchResult.length > 0}
      offset={[0, -2]}
      interactive
      placement="bottom-start"
      render={renderResult}
      onClickOutside={handleHideResult}
    >
      <div className="relative bg-white border-[#4267b2] border-solid border-[1px] flex gap-x-3 items-center w-[300px] rounded-md">
        {!searchValue && (
          <span className="absolute top-0 right-0 bottom-0 flex items-center justify-center px-[8px] cursor-pointer text-[#2564cf] hover:bg-[rgba(0,0,0,0.05)] transition-colors">
            <FontAwesomeIcon icon={faSearch} />
          </span>
        )}
        <input
          type="text"
          value={searchValue}
          ref={inputRef}
          spellCheck={false}
          placeholder="Tìm kiếm ..."
          className="text-black w-[250px] h-[40px] text-lg pl-[20px] texl-sm outline-0 bg-transparent"
          onChange={handleOnChangeInput}
          onFocus={() => setShowResult(true)}
        />
        {searchValue && (
          <span
            className="absolute top-0 bottom-0 right-0 text-lg flex items-center justify-center px-[8px] cursor-pointer text-[#2564cf] hover:bg-[rgba(0,0,0,0.05)] transition-colors"
            onClick={handleClear}
          >
            <FontAwesomeIcon icon={faCircleXmark} />
          </span>
        )}
      </div>
    </HeadlessTippy>
  );
}

export default Search;
