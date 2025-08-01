import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../config/firebase";
import { doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function Login({ tipo }) {
    const navigate = useNavigate();
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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4 animate-fade-in">
            <div className="w-full max-w-md md:max-w-lg lg:max-w-xl">
                <div className="card">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-500 mb-2">
                            Iniciar Sesión
                        </h1>
                        <p className="text-gray-600 text-lg">
                            como {tipo === 'estudiante' ? 'Estudiante' : 'Empresa'}
                        </p>
                    </div>

                    {/* Formulario */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg animate-slide-up">
                                <p className="text-red-700 text-sm md:text-base">{error}</p>
                            </div>
                        )}

                        {/* Campo Email */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input 
                                type="email" 
                                value={email} 
                                onChange={handleEmailChange} 
                                className="input-field"
                                id="email"
                                name="email"
                                autoComplete="username"
                                placeholder="Ingresa tu email"
                                required
                            />
                        </div>

                        {/* Campo Contraseña */}
                        <div className="space-y-2">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Contraseña
                            </label>
                            <div className="relative">
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    value={password} 
                                    onChange={handlePasswordChange} 
                                    className="input-field pr-12"
                                    id="password"
                                    name="password"
                                    autoComplete="current-password"
                                    placeholder="Ingresa tu contraseña"
                                    required
                                />
                                <button 
                                    type="button" 
                                    onClick={toggleShowPassword} 
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                >
                                    {showPassword ? '👁️' : '👁️‍🗨️'}
                                </button>
                            </div>
                        </div>

                        {/* Botón de envío */}
                        <button 
                            type="submit" 
                            className="btn-primary w-full text-lg md:text-xl py-4 md:py-5"
                        >
                            <span className="mr-2">🔐</span>
                            Ingresar
                        </button>
                    </form>

                    {/* Información adicional */}
                    <div className="mt-8 text-center text-gray-500 text-sm">
                        <p>¿No tienes cuenta? Contacta con el administrador</p>
                    </div>
                </div>
            </div>
        </div>
    );
}