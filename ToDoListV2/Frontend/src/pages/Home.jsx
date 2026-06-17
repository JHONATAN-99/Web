import { Link, useNavigate } from "react-router-dom";
import "../styles/home.css";

function Home() {
  const navigate = useNavigate();

  const usuario = JSON.parse(
    localStorage.getItem("usuario")
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");

    navigate("/login");
  };

  return (
    <div className="home">
      <div className="home-header">
        <div>
          <h1>
            Hola, {usuario?.nombre}
          </h1>

          <p className="subtitle">
            Bienvenido a tu espacio de trabajo
          </p>
        </div>

        <button
          className="logout-button"
          onClick={handleLogout}
        >
          Cerrar sesión
        </button>
      </div>

      <div className="cards">
        <Link
          to="/todo"
          className="card"
        >
          <h2>To Do List</h2>

          <p>
            Crea, organiza y administra
            tus tareas diarias.
          </p>
        </Link>

        <Link
          to="/drive"
          className="card"
        >
          <h2>Drive</h2>

          <p>
            Gestiona y almacena tus
            archivos de forma sencilla.
          </p>
        </Link>
      </div>
    </div>
  );
}

export default Home;