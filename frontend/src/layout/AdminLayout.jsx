import Aside from "../components/Aside";


function AdminLayout({ children }) {
  return (
    <div>
      <div className="flex w-full min-h-screen text-gay-900 bg-gray-50">
        <Aside />
        <main className="flex-1 px-14">{children}</main>
      </div>
    </div>
  );
}

export default AdminLayout;
