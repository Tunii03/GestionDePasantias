import React, { useState } from 'react';
import './DashboardEmpresa.css';
import { auth, db } from '../../config/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function DashboardEmpresa() {
  const [seccion, setSeccion] = useState('inicio');
  const [datosEmpresa, setDatosEmpresa] = useState(null);
  const [loadingDatos, setLoadingDatos] = useState(false);
  const [showDatosModal, setShowDatosModal] = useState(false);

  // Handlers para cambiar de sección
  const handlePublicarOferta = () => setSeccion('publicar');
  const handleVerOfertas = () => setSeccion('ofertas');
  const handleVerPostulantes = () => setSeccion('postulantes');
  const handleMisDatos = async () => {
    setShowDatosModal(true);
    setLoadingDatos(true);
    const user = auth.currentUser;
    if (user) {
      const docRef = doc(db, 'empresas', user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setDatosEmpresa(docSnap.data());
      } else {
        setDatosEmpresa(null);
      }
    }
    setLoadingDatos(false);
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Panel de Gestión de Pasantías (Empresa)</h1>
        <nav className="dashboard-nav">
          <button className="nav-btn" onClick={handlePublicarOferta}>
            Publicar Oferta
          </button>
          <button className="nav-btn" onClick={handleVerOfertas}>
            Mis Ofertas
          </button>
          <button className="nav-btn" onClick={handleVerPostulantes}>
            Postulantes
          </button>
          <button className="nav-btn" onClick={handleMisDatos}>
            Mis Datos
          </button>
        </nav>
      </header>

      {/* Secciones simuladas */}
      <div className="dashboard-content">
        {seccion === 'inicio' && <p>Bienvenido al panel de empresa. Selecciona una opción del menú.</p>}
        {seccion === 'publicar' && (
          <div>
            <h2>Publicar Nueva Oferta</h2>
            <p>Aquí irá el formulario para publicar una nueva oferta de pasantía.</p>
          </div>
        )}
        {seccion === 'ofertas' && (
          <div>
            <h2>Mis Ofertas</h2>
            <p>Aquí se mostrarán las ofertas publicadas por la empresa.</p>
          </div>
        )}
        {seccion === 'postulantes' && (
          <div>
            <h2>Postulantes</h2>
            <p>Aquí se mostrarán los estudiantes que se postularon a tus ofertas.</p>
          </div>
        )}
      </div>

      {/* Modal de Mis Datos */}
      {showDatosModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Mis Datos</h2>
            {loadingDatos ? (
              <div>Cargando datos...</div>
            ) : datosEmpresa ? (
              <>
                <div className="form-group">
                  <label>Nombre:</label>
                  <div>{datosEmpresa.nombre || <span style={{color: 'red'}}>No disponible</span>}</div>
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <div>{datosEmpresa.email || <span style={{color: 'red'}}>No disponible</span>}</div>
                </div>
                <div className="form-group">
                  <label>Cuit:</label>
                  <div>{datosEmpresa.cuit || <span style={{color: 'red'}}>No disponible</span>}</div>
                </div>
                <div className="form-group">
                  <label>Dirección:</label>
                  <div>{datosEmpresa.direccion || <span style={{color: 'red'}}>No disponible</span>}</div>
                </div>
                <div className="form-group">
                  <label>Teléfono:</label>
                  <div>{datosEmpresa.telefono || <span style={{color: 'red'}}>No disponible</span>}</div>
                </div>
              </>
            ) : (
              <div>No se encontraron datos de la empresa.</div>
            )}
            <div className="modal-actions">
              <button type="button" onClick={() => setShowDatosModal(false)}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 