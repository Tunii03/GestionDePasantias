import React, { useState } from 'react';
import './Login.css';

export default function Login({ tipo }) {
    const [legajo, setLegajo] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const handleLegajoChange = (event) => {
        setLegajo(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (legajo.length <= 3 || password.length <= 8) {
            setError("Por favor, completa todos los campos correctamente");
            return;
        }
        setError("");
    }

    return (
        <div className="login-container">
            <h1 className="login-title">Iniciar Sesión como {tipo === 'estudiante' ? 'Estudiante' : 'Empresa'}</h1>
            <form onSubmit={handleSubmit} className="login-form">
                {error && <div className="error-message animate__animated animate__headShake">{error}</div>}
                <div className="input-group">
                {tipo === 'estudiante' ? (
                    <label htmlFor="legajo" className="input-label">
                        Legajo:
                        <input type="text" value={legajo} onChange={handleLegajoChange} className="input" id="legajo"/>
                    </label>
                ) : (
                    <label htmlFor="email" className="input-label">
                        Correo electrónico:
                        <input type="email" value={legajo} onChange={handleLegajoChange} className="input" id="email"/>
                    </label>
                )}
                </div>
                <div className="password-input-container">
                <label htmlFor="password" className="input-label">
                    Contraseña:    
                    <input type={showPassword ? "text" : "password"} value={password} onChange={handlePasswordChange} className="input"/>
                    <button type="button" onClick={toggleShowPassword} className="toggle-password">
                        {showPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                </label>
                </div>
                <button type="submit" className="btn">Ingresar</button>
            </form>
        </div>
    )
}