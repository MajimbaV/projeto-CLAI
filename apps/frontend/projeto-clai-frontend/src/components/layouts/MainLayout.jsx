import Sidebar from "../sidebar/Sidebar";
import "./MainLayout.css";
import BellImg from "../../assets/Bell.png";
import DividerImg from "../../assets/Divider.png";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="main-layout">
      <Sidebar />
      <div className="main-wrapper">
        <header className="main-header">
          <div className="breadcrumb">Início</div>
          <div className="header-right">
            <span className="logo-clai">CLAI</span>
            <img src={DividerImg} alt="Divisor" className="divider" />
            <img src={BellImg} alt="Notificação" />
            <div className="user-logo">C</div>
          </div>
        </header>
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
