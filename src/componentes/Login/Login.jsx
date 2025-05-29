import React, { useState } from 'react';
import './Login.css';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../config/firebase";
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function Login({ tipo }) {
    const navigate = useNavigate(); // Agrega esta línea
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        // Validación básica
        if (legajo.length <= 3 || password.length <= 7) {
            setError("Por favor, completa todos los campos correctamente");
            return;
        }
        
        try {
            let userCredential;
            if (tipo === 'estudiante') {
                const email = `${legajo}@pasantias.com`;
                userCredential = await signInWithEmailAndPassword(auth, email, password);
            } else {
                userCredential = await signInWithEmailAndPassword(auth, legajo, password);
            }
            
            
            // Obtener el UID del usuario autenticado
            const userUid = userCredential.user.uid;
            
            // Guardar datos adicionales en Firestore
            // Reemplaza la parte de guardar en Firestore con:
            if (tipo === 'estudiante') {
              await setDoc(doc(db, 'estudiantes', userUid), {
                legajo: legajo,
                email: `${legajo}@pasantias.com`,
                fechaAcceso: new Date()
              });
            } else {
              // En la parte de guardar datos de empresa:
              await setDoc(doc(db, 'empresas', userUid), {
                email: legajo,
                nombre: '', // Agrega este campo
                direccion: '', // Agrega este campo
                telefono: '', // Agrega este campo // Agrega este campo
                fechaAcceso: new Date()
              });
            }
            navigate('/dashboard');
        } catch (error) {
            setError(error.message);
        }
    };
    
    return (
        <div className="login-container">
            <h1 className="login-title">Iniciar Sesión como {tipo === 'estudiante' ? 'Estudiante' : 'Empresa'}</h1>
            <form onSubmit={handleSubmit} className="login-form">
                {error && <div className="error-message animate__animated animate__headShake">{error}</div>}
                <div className="input-group">
                {tipo === 'estudiante' ? (
                    <div className="input-field">
                        Legajo:
                        <input 
                            type="text" 
                            value={legajo} 
                            onChange={handleLegajoChange} 
                            className="input" 
                            id="legajo"
                            name="legajo"
                            autoComplete="username"
                        />
                    </div>
                ) : (
                    <div className="input-field">
                        Email:
                        <input 
                            type="email" 
                            value={legajo} 
                            onChange={handleLegajoChange} 
                            className="input" 
                            id="email"
                            name="email"
                        />
                    </div>
                )}
                </div>
                <div className="input-group">
                <div className="password-field">
                
                    Contraseña:    
                    <input 
                        type={showPassword ? "text" : "password"} 
                        value={password} 
                        onChange={handlePasswordChange} 
                        className="input"
                        id="password"
                        name="password"
                        autoComplete="current-password"
                    />
            
                    <button 
                        type="button" 
                        onClick={toggleShowPassword} 
                        className="toggle-password"
                        aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    >
                        {showPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                    
                </div>
                </div>
                <button type="submit" className="btn">Ingresar</button>
            </form>
        </div>
    )
}