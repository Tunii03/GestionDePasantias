import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({ tipo }) {
    const [cuit, setCuit] = useState('');
    const [legajo, setLegajo] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            if ((tipo === 'empresa' && !cuit) || (tipo === 'estudiante' && !legajo) || !password) {
                throw new Error('Todos los campos son obligatorios');
            }

            const response = await fetch(`http://localhost:8000/login-${tipo}`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    [tipo === 'empresa' ? 'cuit' : 'legajo']: tipo === 'empresa' ? cuit : legajo,
                    password: password
                })
            });

            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Error en el servidor');
            }

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Credenciales inválidas');
            }
            
            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="login-container">
            <h1>Iniciar Sesión como {tipo === 'empresa' ? 'Empresa' : 'Estudiante'}</h1>
            <form onSubmit={handleSubmit}>
                {error && <div className="error-message">{error}</div>}

                {tipo === 'empresa' ? (
                    <input
                        type="text"
                        placeholder="CUIT (11 dígitos)"
                        value={cuit}
                        onChange={(e) => setCuit(e.target.value)}
                        className="input"
                    />
                ) : (
                    <input 
                        type="text" 
                        placeholder="Legajo del estudiante"
                        value={legajo}
                        onChange={(e) => setLegajo(e.target.value)}
                        className="input"
                    />
                )}
                
                <div className="password-input-container">
                    <input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
    );
}