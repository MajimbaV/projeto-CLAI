/* eslint-disable no-unused-vars */
import IFPBlogo from "../../assets/IFPBlogo.png";
import React, { useState } from "react";
import "./Sidebar.css";
import DividerImg from "../../assets/Divider.png";

function Sidebar() {
  //mudar aqui o usuário para o nome do usuário logado, que será passado como props de integração com o backend
  const [coordenador] = useState("Coordenador");
  //depois integrar as rotas do front aqui
  function switchPageAlunos() {}

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src={IFPBlogo} alt="IFPB Logo" className="sidebar-logo"></img>
        <div className="sidebar-main-text">
          <h2 className="sidebar-title">
            CLAI - Coordenação Local de Acessibilidade e inclusão
          </h2>
          <h3 className="sidebar-subtitle">Centro de apoio estudantil</h3>
        </div>
      </div>
      <div className="sidebar-content">
        <div className="sidebar-content-title">Alunos</div>
        <ul>
          <li>
            <button className="sidebar-button" onClick={switchPageAlunos}>
              Alunos
            </button>
          </li>
        </ul>
      </div>
      <div className="sidebar-footer">
        <img src={DividerImg} alt="Divider" className="sidebar-divider"></img>
        <div className="userbox">
          <div className="user-logo">{coordenador[0]}</div>
          <h3 className="user-name">{coordenador}</h3>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
