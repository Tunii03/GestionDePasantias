import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

export default function RegistrarEmpresa() {
    const [nombre, setNombre] = useState("");
    const [cuit, setCuit] = useState("");
    const [direccion, setDireccion] = useState("");
    const [telefono, setTelefono] = useState("");
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleNombreChange = (event) => {
        setNombre(event.target.value);
    }

    const handleCuitChange = (event) => {
        setCuit(event.target.value);
    }

    const handleDireccionChange = (event) => {
        setDireccion(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleTelefonoChange = (event) => {
        setTelefono(event.target.value);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if ([nombre, email, password, cuit, direccion, telefono].some(campo => !campo.trim())) {
            setError("Por favor complete todos los campos correctamente (no solo espacios en blanco)");
            return;
        }
        
        try {
            // 1. Crear usuario en Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            
            // Depuración: mostrar los valores a guardar
            console.log({
                nombre,
                email,
                cuit,
                direccion,
                telefono
            });
            // 2. Guardar TODOS los datos en Firestore
            await setDoc(doc(db, 'empresas', userCredential.user.uid), {
                nombre: nombre.trim(),
                email: email.trim().toLowerCase(),
                cuit: cuit.toString().trim(),
                direccion: direccion.trim(),
                telefono: telefono.toString().trim(),
                fechaRegistro: new Date()
            });
            
            setSuccess(true);
            setTimeout(() => navigate('/'), 2000); // Redirige después de 2 segundos
        } catch (error) {
            console.error("Error al registrar empresa:", error);
            setError(error.message);
            setSuccess(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4 animate-fade-in">
            <div className="w-full max-w-2xl">
                <div className="card">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-primary-500 mb-2">
                            Registrar Empresa
                        </h1>
                        <p className="text-gray-600 text-lg">
                            Completa el formulario para registrar tu empresa
                        </p>
                    </div>

                    {/* Formulario */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg animate-slide-up">
                                <p className="text-red-700 text-sm md:text-base">{error}</p>
                            </div>
                        )}

                        {success && (
                            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg animate-slide-up">
                                <p className="text-green-700 text-sm md:text-base">
                                    ✅ Empresa registrada correctamente. Redirigiendo...
                                </p>
                            </div>
                        )}

                        {/* Grid responsive para los campos */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Nombre de la empresa */}
                            <div className="space-y-2">
                                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                                    Nombre de la empresa *
                                </label>
                                <input 
                                    type="text" 
                                    value={nombre} 
                                    onChange={handleNombreChange} 
                                    className="input-field"
                                    id="nombre"
                                    placeholder="Ingresa el nombre de la empresa"
                                    required
                                />
                            </div>

                            {/* CUIT */}
                            <div className="space-y-2">
                                <label htmlFor="cuit" className="block text-sm font-medium text-gray-700">
                                    CUIT *
                                </label>
                                <input 
                                    type="text" 
                                    value={cuit} 
                                    onChange={handleCuitChange} 
                                    className="input-field"
                                    id="cuit"
                                    placeholder="XX-XXXXXXXX-X"
                                    required
                                />
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email *
                                </label>
                                <input 
                                    type="email" 
                                    value={email} 
                                    onChange={handleEmailChange} 
                                    className="input-field"
                                    id="email"
                                    placeholder="empresa@ejemplo.com"
                                    required
                                />
                            </div>

                            {/* Teléfono */}
                            <div className="space-y-2">
                                <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">
                                    Teléfono *
                                </label>
                                <input 
                                    type="tel" 
                                    value={telefono} 
                                    onChange={handleTelefonoChange} 
                                    className="input-field"
                                    id="telefono"
                                    placeholder="+54 11 1234-5678"
                                    required
                                />
                            </div>

                            {/* Contraseña */}
                            <div className="space-y-2">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Contraseña *
                                </label>
                                <input 
                                    type="password" 
                                    value={password} 
                                    onChange={handlePasswordChange} 
                                    className="input-field"
                                    id="password"
                                    placeholder="Mínimo 6 caracteres"
                                    required
                                />
                            </div>

                            {/* Dirección - ocupa todo el ancho en móviles */}
                            <div className="space-y-2 md:col-span-2">
                                <label htmlFor="direccion" className="block text-sm font-medium text-gray-700">
                                    Dirección *
                                </label>
                                <input 
                                    type="text" 
                                    value={direccion} 
                                    onChange={handleDireccionChange} 
                                    className="input-field"
                                    id="direccion"
                                    placeholder="Calle, número, ciudad, provincia"
                                    required
                                />
                            </div>
                        </div>

                        {/* Botón de envío */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-6">
                            <button 
                                type="submit" 
                                className="btn-primary flex-1 text-lg md:text-xl py-4"
                                disabled={success}
                            >
                                <span className="mr-2">🏢</span>
                                Registrar Empresa
                            </button>
                            
                            <button 
                                type="button" 
                                onClick={() => navigate('/')}
                                className="btn-secondary flex-1 text-lg md:text-xl py-4"
                            >
                                <span className="mr-2">↩️</span>
                                Volver
                            </button>
                        </div>
                    </form>

                    {/* Información adicional */}
                    <div className="mt-8 text-center text-gray-500 text-sm">
                        <p>* Campos obligatorios</p>
                    </div>
                </div>
            </div>
        </div>
    );
}