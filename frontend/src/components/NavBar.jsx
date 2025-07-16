import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseOutline } from "react-icons/io5";
import { BotonModo } from "./BotonModo";
import { useState, useEffect } from "react";

import "./NavBar.css";

export const NavBar = () => {
  const [mostrarMenu, setMostrarMenu] = useState(false);
  const [tema, setTema] = useState(localStorage.getItem("tema") || "light");

  useEffect(() => {
    localStorage.setItem("tema", tema);
    document.body.classList.toggle("dark-theme", tema === "dark");
  }, [tema]);

  const handleToggleMenu = () => {
    setMostrarMenu(!mostrarMenu);
  };

  const cambiarTema = () => {
    setTema(tema === "light" ? "dark" : "light");
  };

  return (
    <header className="navBar">
      <button
        className={`navToggle ${mostrarMenu && "open"}`}
        onClick={handleToggleMenu}
      >
        {mostrarMenu ? (
          <IoCloseOutline size={"2rem"} />
        ) : (
          <RxHamburgerMenu size={"2rem"} />
        )}
      </button>

      <nav
        className={`navItems ${mostrarMenu && "open"}`}
        onMouseLeave={() => setMostrarMenu(false)}
        id="navItems"
      >
        <ul className="menu-list">
          <li>
            <Link
              to={"/"}
              className="link"
              onClick={() => setMostrarMenu(false)}
            >
              Inicio
            </Link>
          </li>
          <li>
            <Link
              to={"./buscar"}
              className="link"
              onClick={() => setMostrarMenu(false)}
            >
              Buscar Tareas
            </Link>
          </li>

          <li>
            <Link
              to={"./calendario"}
              className="link"
              onClick={() => setMostrarMenu(false)}
            >
              Calendario
            </Link>
          </li>
        </ul>
      </nav>

      <div className="BotonModo">
        <BotonModo cambiarTema={cambiarTema} temaActual={tema} />
      </div>
    </header>
  );
};
