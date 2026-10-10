import Sidebar from "../sidebar/Sidebar";
import "./MainLayout.css";
import BellImg from "../../assets/bell.png";
import DividerImg from "../../assets/Divider.png";

function MainLayout({ children }) {
  return (
    <div className="main-layout">
      <Sidebar />
      <div className="main-wrapper">
        <header className="main-header">
          <div className="breadcrumb">Início &gt; Alunos</div>
          <div className="header-right">
            <span className="logo-clai">CLAI</span>
            <image src={DividerImg} alt="Divisor" className="divider" />
            <img src={BellImg} alt="Notificação" />
            <div className="user-logo">C</div>
          </div>
        </header>
        <main className="main-content">{children}</main>
      </div>
    </div>
  );
}

export default MainLayout;
