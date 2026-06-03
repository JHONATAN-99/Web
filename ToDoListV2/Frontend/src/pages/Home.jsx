import { Link } from "react-router-dom";
import "../styles/home.css";

function Home() {
  return (
    <div className="home">
      <h1></h1>

      <div className="cards">
        <Link to="/todo" className="card">
          <h2> To Do List</h2>

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
