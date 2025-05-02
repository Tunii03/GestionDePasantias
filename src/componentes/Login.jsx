import React, { useState } from 'react';

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
            <h1>Iniciar Sesión como {tipo === 'estudiante' ? 'Estudiante' : 'Empresa'}</h1>
            <form onSubmit={handleSubmit}>
                {error && <div className="error-message">{error}</div>}
                <input 
                    type="text" 
                    placeholder="Ingresa tu legajo"
                    value={legajo}
                    onChange={handleLegajoChange}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    className="input"
                />
                <div className="password-input-container">
                    <input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Contrasena"
                        value={password}
                        onChange={handlePasswordChange}
                        className="input"
                    />
                    <button 
                        type="button" 
                        onClick={toggleShowPassword}
                        className="toggle-password"
                    >
                        {showPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                </div>
                <button type="submit" className="btn">Ingresar</button>
            </form>
        </div>
    )
}