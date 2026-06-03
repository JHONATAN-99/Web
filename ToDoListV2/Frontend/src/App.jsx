import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import TodoPage from "./pages/TodoPage";
import DrivePage from "./pages/DrivePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/todo" element={<TodoPage />} />

      <Route path="/drive" element={<DrivePage />} />
    </Routes>
  );
}

export default App;
