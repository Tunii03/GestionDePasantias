
import React from 'react';
import logoUTN from '../assets/logo utn.jpg';

export default function Header() {
    return (
        <header className="header-container">
            <div className="logo">
                <img src={logoUTN} alt="Logo UTN" style={{ height: '60px' }} />
                <p className="welcome-message">¡Hola de nuevo Estudiante!</p>
            </div>
        </header>
    )
}