import { Link } from "react-router-dom";
import "../styles/home.css";

function Home() {
  return (
    <div className="home">
      <h1></h1>

      <div className="cards">
        <Link to="/todo" className="card">
          <h2> To Do List</h2>

          <p>
            Crea tu Lista de Tareas
          </p>
        </Link>

        <div className="card disabled">
          <h2> Drive</h2>

          <p>...</p>
        </div>
      </div>
    </div>
  );
}

export default Home;