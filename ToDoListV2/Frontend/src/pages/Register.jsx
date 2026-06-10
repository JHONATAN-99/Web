import { useState } from "react";
import { register } from "../services/authApi";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

function Register() {
    const [nombre, setNombre] =
        useState("");

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
            const data = await register(
                nombre,
                email,
                password
            );

            if (data.usuario) {
                navigate("/login");
            } else {
                setError(
                    data.message ||
                    "Error al registrarse"
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
                    Crear Cuenta
                </h1>

                <p className="auth-subtitle">
                    Regístrate para comenzar
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
                        type="text"
                        placeholder="Nombre completo"
                        value={nombre}
                        onChange={(e) =>
                            setNombre(
                                e.target.value
                            )
                        }
                        required
                    />

                    <input
                        className="auth-input"
                        type="email"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) =>
                            setEmail(
                                e.target.value
                            )
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
                        Registrarse
                    </button>
                </form>

                <p className="auth-link">
                    ¿Ya tienes cuenta?{" "}
                    <span
                        onClick={() =>
                            navigate("/login")
                        }
                        style={{
                            cursor: "pointer",
                            fontWeight: 600,
                        }}
                    >
                        Iniciar sesión
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Register;