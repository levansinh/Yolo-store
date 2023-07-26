import { Link } from "react-router-dom";
function ListSearchItem({ list }) {
  return (
    <div className="px-[20px] w-[300px] mt-[15px] z-20 ">
      {list &&
        list.map((item) => (
          <Link
            to={`/catalog/${item.slug}`}
            className="flex justify-between items-center py-2 border-[#4267b2] border-solid border-b-[1px]"
          >
            <div className="flex flex-row items-start gap-x-4 gap-y-3">
              <img
                src={item.image}
                className="rounded-full w-10 h-10 "
                alt=""
              />
              <div className="flex flex-col text-md gap-y-2 px-[8px] ">
                <span className="text-sm"> {item.title}</span>
              </div>
            </div>
            <div className="flex flex-row items-center gap-x-5 text-md "></div>
          </Link>
        ))}
    </div>
  );
}

export default ListSearchItem;
