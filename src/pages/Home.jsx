import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

export default function Home() {
    return (
        <div className="home-container">
            <h1>Bienvenido al Sistema de Pasantías</h1>
            <div className="button-group">
                <Link to="/login?tipo=estudiante" className="role-btn student-btn">
                    Iniciar Sesión como Estudiante
                </Link>
                <Link to="/login?tipo=empresa" className="role-btn company-btn">
                    Iniciar Sesión como Empresa
                </Link>
            </div>
        </div>
    )
}