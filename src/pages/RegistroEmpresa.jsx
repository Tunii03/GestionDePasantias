import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';


export default function RegistroEmpresa() {
    const [nombre, setNombre] = useState("");
    const [cuit, setCuit] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const validarCUIT = (cuit) => {
        // Validar que tenga 11 dígitos numéricos
        return /^\d{11}$/.test(cuit);
    };

    const validarEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validarTelefono = (telefono) => {
        return /^\d+$/.test(telefono);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            
            // Mantener solo las llamadas fetch al backend:
            const response = await fetch('http://localhost:8000/registro-empresa', {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({nombre, cuit, email, telefono, password})
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail);
            }
            
            navigate('/'); // Cambiado de '/verificacion' a '/'
        } catch (err) {
            setError('Error al registrar: ' + err.message);
        }
    };

    return (
        <div className="login-container">
            <h1>Registro de Empresa</h1>
            <form onSubmit={handleSubmit}>
                {error && <div className="error-message">{error}</div>}
                
                <input
                    type="text"
                    placeholder="Nombre de la empresa"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="input"
                />
                
                <input
                    type="text"
                    placeholder="CUIT (11 dígitos)"
                    value={cuit}
                    onChange={(e) => setCuit(e.target.value)}
                    className="input"
                />
                
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input"
                />
                
                <input
                    type="tel"
                    placeholder="Número de teléfono"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    className="input"
                />
                
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input"
                />
                
                <button type="submit" className="btn">
                    Registrar Empresa
                </button>
            </form>
        </div>
    );
}