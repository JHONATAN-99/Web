import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import TodoPage from "./pages/TodoPage";
import DrivePage from "./pages/DrivePage";
import Login from "./pages/Login";
import Register from "./pages/Register";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/todo"
        element={
          <ProtectedRoute>
            <TodoPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/drive"
        element={
          <ProtectedRoute>
            <DrivePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/register"
        element={<Register />}
      />
    </Routes>
  );
}

export default App;