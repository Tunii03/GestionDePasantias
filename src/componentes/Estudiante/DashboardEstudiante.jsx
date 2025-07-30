import React, { useState, useEffect } from 'react';
import './DashboardEstudiante.css';
import { auth, db } from '../../config/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function DashboardEstudiante() {
  const [cvFile, setCvFile] = useState(null);
  const [showCVForm, setShowCVForm] = useState(false);
  const [datosEstudiante, setDatosEstudiante] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDatos = async () => {
      setLoading(true);
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, 'estudiantes', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setDatosEstudiante(docSnap.data());
        }
      }
      setLoading(false);
    };
    fetchDatos();
  }, []);

  const handleFileChange = (e) => {
    setCvFile(e.target.files[0]);
  };

  const handleCVSubmit = (e) => {
    e.preventDefault();
    setShowCVForm(false);
    // Aquí iría la lógica para guardar el archivo
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Panel de Gestión de Pasantías (Estudiante)</h1>
        <nav className="dashboard-nav">
          <button className="nav-btn" onClick={() => setShowCVForm(true)}>
            Mis Datos
          </button>
          <button className="nav-btn">Mis Postulaciones</button>
        </nav>
      </header>

      {/* Sección Mis Datos */}
      {showCVForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Mis Datos</h2>
            {loading ? (
              <div>Cargando datos...</div>
            ) : datosEstudiante ? (
              <>
                <div className="form-group">
                  <label>Nombre:</label>
                  <div>{datosEstudiante.nombre}</div>
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <div>{datosEstudiante.email}</div>
                </div>
                <div className="form-group">
                  <label>Legajo:</label>
                  <div>{datosEstudiante.legajo}</div>
                </div>
                <div className="form-group">
                  <label>CV:</label>
                  {cvFile ? (
                    <div>
                      <span>CV subido: {cvFile.name}</span>
                      <button className="btn-primary" style={{marginLeft: '1rem'}} onClick={() => setShowCVForm(true)}>
                        Reemplazar CV
                      </button>
                    </div>
                  ) : (
                    <span>No hay CV subido</span>
                  )}
                </div>
                {/* Formulario para subir/reemplazar CV */}
                <form onSubmit={handleCVSubmit}>
                  <div className="form-group">
                    <input type="file" accept=".pdf" onChange={handleFileChange} />
                  </div>
                  <div className="modal-actions">
                    <button type="button" onClick={() => setShowCVForm(false)}>
                      Cerrar
                    </button>
                    <button type="submit" className="btn-primary">
                      Guardar CV
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div>No se encontraron datos del estudiante.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 