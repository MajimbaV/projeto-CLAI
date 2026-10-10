import Sidebar from "../sidebar/Sidebar";

function MainLayout({ children }) {
  return (
    <div>
      <Sidebar />
      <main>{children}</main>
    </div>
  );
}

export default MainLayout;
