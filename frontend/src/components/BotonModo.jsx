import { FaMoon, FaSun } from "react-icons/fa";
import "./BotonModo.css";

export const BotonModo = ({ cambiarTema, temaActual }) => {
  return (
    <div id="divModo" className={temaActual === "dark" ? "dark" : ""}>
      <button className="btnModo" onClick={cambiarTema}>
        {temaActual === "dark" ? (
          <FaSun className="iconoModo" />
        ) : (
          <FaMoon className="iconoModo" />
        )}
      </button>
    </div>
  );
};
