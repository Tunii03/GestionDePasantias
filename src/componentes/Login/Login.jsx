import React, { useState } from 'react';
import './Login.css';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../config/firebase";
import { doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function Login({ tipo }) {
    const navigate = useNavigate(); // Agrega esta línea
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
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
        if (email.length <= 3 || password.length <= 6) {
            setError("Por favor, completa todos los campos correctamente");
            return;
        }
        
        try {
            let userCredential;
            if (tipo === 'estudiante') {
                userCredential = await signInWithEmailAndPassword(auth, email, password);
            } else {
                userCredential = await signInWithEmailAndPassword(auth, email, password);
            }
            
            
            // Obtener el UID del usuario autenticado
            const userUid = userCredential.user.uid;
            
            // Guardar datos adicionales en Firestore
            // Reemplaza la parte de guardar en Firestore con:
            if (tipo === 'estudiante') {
              await updateDoc(doc(db, 'estudiantes', userUid), {
                email: email,
                fechaAcceso: new Date()
              });
              navigate('/dashboard-estudiante');
            } else {
              // En la parte de guardar datos de empresa:
              await updateDoc(doc(db, 'empresas', userUid), {
                email: email,
                fechaAcceso: new Date()
              });
              navigate('/dashboard-empresa');
            }
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
                        Email:
                        <input 
                            type="email" 
                            value={email} 
                            onChange={handleEmailChange} 
                            className="input" 
                            id="email"
                            name="email"
                            autoComplete="username"
                        />
                    </div>
                ) : (
                    <div className="input-field">
                        Email:
                        <input 
                            type="email" 
                            value={email} 
                            onChange={handleEmailChange} 
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