import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegistrarEmpresa.css';

export default function RegistrarEmpresa() {
    const [nombre, setNombre] = useState("");
    const [cuit, setCuit] = useState("");
    const [direccion, setDireccion] = useState("");
    const [telefono, setTelefono] = useState("");
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

    const handleTelefonoChange = (event) => {
        setTelefono(event.target.value);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        
        // Validación de campos vacíos
        if (!nombre) {
            setError("Falta el campo Nombre por completar");
            return;
        }
        if (!cuit) {
            setError("Falta el campo CUIT por completar");
            return;
        }
        if (!direccion) {
            setError("Falta el campo Dirección por completar");
            return;
        }
        if (!telefono) {
            setError("Falta el campo Teléfono por completar");
            return;
        }
        if (!email) {
            setError("Falta el campo Email por completar");
            return;
        }

        // Validación de CUIT (11 dígitos)
        if (!/^\d{11}$/.test(cuit)) {
            setError("El CUIT debe tener exactamente 11 dígitos");
            return;
        }

        // Validación de email
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Por favor ingrese un correo electrónico válido");
            return;
        }

        // Validación de teléfono (solo números)
        if (!/^\d+$/.test(telefono)) {
            setError("El teléfono solo debe contener números");
            return;
        }

        setError("");
        setSuccess(true);
        
        // Simular envío exitoso y redirección
        setTimeout(() => {
            navigate('/');
        }, 2000);
    };

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
                    <input type="number" value={cuit} onChange={handleCuitChange} className='input'/>
                </label>
                <label>
                    Direccion:
                    <input type="text" value={direccion} onChange={handleDireccionChange} className='input'/>
                </label>
                <label>
                    Telefono:
                    <input type="number" value={telefono} onChange={handleTelefonoChange} className='input'/>
                </label>
                <label>
                    Email:
                    <input type="text" value={email} onChange={handleEmailChange} className='input'/>
                </label>
                <button type="submit" className="btn-submit">Registrar</button>
                </div>
            </form>
            
        </div>
    )
}