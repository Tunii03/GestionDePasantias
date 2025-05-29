import React, { useState } from 'react';
import './Dashboard.css';

export default function Dashboard() {
  const [showCVModal, setShowCVModal] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    experiencia: '',
    cvFile: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, cvFile: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para subir el CV
    console.log('Datos del formulario:', formData);
    setShowCVModal(false);
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Panel de Gestión de Pasantías</h1>
        <nav className="dashboard-nav">
          <button className="nav-btn" onClick={() => setShowCVModal(true)}>
            Subir CV
          </button>
          <button className="nav-btn">Mis Postulaciones</button>
          <button className="nav-btn">Mis Datos</button>
        </nav>
      </header>
      
    
    

      {showCVModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Agregar Curriculum Vitae</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nombre Completo:</label>
                <input 
                  type="text" 
                  name="nombre" 
                  value={formData.nombre} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label>Email:</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label>Teléfono:</label>
                <input 
                  type="tel" 
                  name="telefono" 
                  value={formData.telefono} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label>Experiencia:</label>
                <textarea 
                  name="experiencia" 
                  value={formData.experiencia} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label>Subir CV (PDF):</label>
                <input 
                  type="file" 
                  accept=".pdf" 
                  onChange={handleFileChange} 
                  required 
                />
              </div>
              
              <div className="modal-actions">
                <button type="button" onClick={() => setShowCVModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  Guardar CV
                </button>
              </div>
            </form>
          </div>
        </div>
        
      )
      
      }
      </div>
  );
}
