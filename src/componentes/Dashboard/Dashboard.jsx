import React from 'react';
import './Dashboard.css';

export default function Dashboard(){
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Panel de Gestión de Pasantías</h1>
        <nav className="dashboard-nav">
          <button className="nav-btn">Empresas</button>
          <button className="nav-btn">Estudiantes</button>
          <button className="nav-btn">Pasantías</button>
        </nav>
      </header>
      
      <div className="dashboard-content">
        {/* Espacio reservado para contenido futuro */}
        <p>Contenido se agregará aquí posteriormente</p>
      </div>
    </div>
  );
};
