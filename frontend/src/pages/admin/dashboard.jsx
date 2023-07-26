import { Link } from "react-router-dom";
function Dashboard() {
  return (
    <div className="flex gap-[40px] items-end justify-center">
      <div className="max-lg:hidden">
        <img
          src="https://github.com/huydt7702/todo-app/blob/main/frontend/src/assets/images/welcome-left.png?raw=true"
          alt="Welcome left"
          className="w-full"
        />
      </div>
      <div className="flex flex-col justify-center items-center my-[80px]">
        <img
          src="https://github.com/huydt7702/todo-app/blob/main/frontend/src/assets/images/logov2.png?raw=true"
          alt="Logo"
          width={100}
        />
        <p className="mt-[20px] mb-[16px] text-center text-[18px]">
          To Do mang đến cho bạn sự tập trung, từ công việc cho đến giải trí.
        </p>
        <Link
          to={"/admin/category"}
          className="mt-[40px] py-[14px] px-[45px] bg-[#0078d4] hover:bg-opacity-90 text-white text-[16px] rounded-[2px] shadow-[0px_2px_4px_-0.7px_rgba(0,0,0,0.25)] font-semibold"
        >
          Bắt đầu
        </Link>
      </div>
      <div className="max-lg:hidden">
        <img
          src="https://github.com/huydt7702/todo-app/blob/main/frontend/src/assets/images/welcome-right.png?raw=true"
          alt="Welcome right"
          className="w-full"
        />
      </div>
    </div>
  );
}

export default Dashboard;
