import { Link, useNavigate } from "react-router-dom";
import "../styles/home.css";

function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");

    navigate("/login");
  };

  return (
    <div className="home">
      <div className="home-header">
        <h1>Bienvenido</h1>

        <button
          className="logout-button"
          onClick={handleLogout}
        >
          Cerrar sesión
        </button>
      </div>

      <div className="cards">
        <Link to="/todo" className="card">
          <h2>To Do List</h2>
          <p>Crea tu Lista de Tareas</p>
        </Link>

        <Link to="/drive" className="card">
          <h2>Drive</h2>
          <p>Gestiona tus archivos</p>
        </Link>
      </div>
    </div>
  );
}

export default Home;