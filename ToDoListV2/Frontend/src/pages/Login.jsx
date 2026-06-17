import { useState } from "react";
import { login } from "../services/authApi";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

function Login() {
    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [showPassword, setShowPassword] =
        useState(false);

    const [error, setError] =
        useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        try {
            const data = await login(
                email,
                password
            );

            if (data.token) {
                localStorage.setItem(
                    "token",
                    data.token
                );

                localStorage.setItem(
                    "usuario",
                    JSON.stringify(data.usuario)
                );

                navigate("/");
            } else {
                setError(
                    data.message ||
                    "Credenciales inválidas"
                );
            }
        } catch {
            setError(
                "Error de conexión con el servidor"
            );
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1 className="auth-title">
                    Bienvenido
                </h1>

                <p className="auth-subtitle">
                    Inicia sesión para continuar
                </p>

                {error && (
                    <div className="auth-error">
                        {error}
                    </div>
                )}

                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                >
                    <input
                        className="auth-input"
                        type="email"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        required
                    />

                    <div className="password-container">
                        <input
                            className="auth-input"
                            type={
                                showPassword
                                    ? "text"
                                    : "password"
                            }
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                        />

                        <button
                            type="button"
                            className="password-toggle"
                            onClick={() =>
                                setShowPassword(
                                    !showPassword
                                )
                            }
                        >
                            {showPassword
                                ? "Ocultar"
                                : "Mostrar"}
                        </button>
                    </div>

                    <button
                        className="auth-button"
                        type="submit"
                    >
                        Ingresar
                    </button>
                </form>

                <p className="auth-link">
                    ¿No tienes cuenta?{" "}
                    <span
                        onClick={() =>
                            navigate("/register")
                        }
                        style={{
                            cursor: "pointer",
                            fontWeight: 600,
                        }}
                    >
                        Registrarse
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Login;