import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegistrarEmpresa.css';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";  // Ruta actualizada
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase";  // Ruta actualizada

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

    // En el return, agregar:
    {success && (
        <div className="success-message">
            Empresa registrada correctamente. Redirigiendo...
        </div>
    )}

    return (
        <div className="formulario">
            <h1>Registrar Empresa</h1>
            <form onSubmit={handleSubmit}>
                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">Empresa registrada correctamente</div>}
                <div className="input-group">
                <label>
                        Nombre de la empresa:
                        <input type="text" value={nombre} onChange={handleNombreChange} className='input'/>
                </label>
                <label>
                    Cuit:
                    <input type="text" value={cuit} onChange={handleCuitChange} className='input'/>
                </label>
                <label>
                    Direccion:
                    <input type="text" value={direccion} onChange={handleDireccionChange} className='input'/>
                </label>
                <label>
                    Telefono:
                    <input type="text" value={telefono} onChange={handleTelefonoChange} className='input'/>
                </label>
                <label>
                    Email:
                    <input type="text" value={email} onChange={handleEmailChange} className='input'/>
                </label>
                <label>
                    Contraseña:
                    <input type="password" value={password} onChange={handlePasswordChange} className='input'
  />
</label>
                <button type="submit" className="btn-submit">Registrar</button>
                </div>
            </form>
            
        </div>
    )
}