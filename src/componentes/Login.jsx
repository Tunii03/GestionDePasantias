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
        
        // Validaciones
        if (tipo === 'empresa') {
            if (!/^\d{11}$/.test(cuit)) {
                setError('El CUIT debe tener 11 dígitos');
                return;
            }
        } else {
            if (!/^\d+$/.test(legajo)) {
                setError('El legajo debe ser numérico');
                return;
            }
        }

        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        try {
            // Aquí iría la lógica de autenticación con el backend
            navigate('/'); // Redirige a la página principal
        } catch (err) {
            setError('Error de autenticación');
        }
    };

    return (
        <div className="login-container">
            <h1>Login {tipo}</h1>
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
                        placeholder="Ingresa tu legajo"
                        value={legajo}
                        onChange={(e) => setLegajo(e.target.value)}
                        inputMode="numeric"
                        pattern="[0-9]*"
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