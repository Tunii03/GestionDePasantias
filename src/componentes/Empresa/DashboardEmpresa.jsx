import React, { useState } from 'react';
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="container-responsive">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between py-6">
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-500">
                Panel de Gestión de Pasantías
              </h1>
              <p className="text-gray-600 text-sm md:text-base mt-1">
                Empresa
              </p>
            </div>
            
            {/* Navegación */}
            <nav className="flex flex-wrap gap-2 md:gap-3">
              <button 
                className={`text-sm md:text-base px-3 py-2 rounded-lg transition-all duration-200 ${
                  seccion === 'publicar' 
                    ? 'bg-primary-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={handlePublicarOferta}
              >
                <span className="mr-1">📝</span>
                Publicar Oferta
              </button>
              <button 
                className={`text-sm md:text-base px-3 py-2 rounded-lg transition-all duration-200 ${
                  seccion === 'ofertas' 
                    ? 'bg-primary-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={handleVerOfertas}
              >
                <span className="mr-1">📋</span>
                Mis Ofertas
              </button>
              <button 
                className={`text-sm md:text-base px-3 py-2 rounded-lg transition-all duration-200 ${
                  seccion === 'postulantes' 
                    ? 'bg-primary-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={handleVerPostulantes}
              >
                <span className="mr-1">👥</span>
                Postulantes
              </button>
              <button 
                className="btn-primary text-sm md:text-base px-3 py-2"
                onClick={handleMisDatos}
              >
                <span className="mr-1">👤</span>
                Mis Datos
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="container-responsive py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Panel lateral */}
          <div className="lg:col-span-1">
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Estadísticas
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-600">Ofertas Activas</span>
                  <span className="text-lg font-bold text-primary-500">0</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-600">Postulantes</span>
                  <span className="text-lg font-bold text-green-600">0</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-600">Pendientes</span>
                  <span className="text-lg font-bold text-yellow-600">0</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contenido principal */}
          <div className="lg:col-span-3">
            <div className="card">
              {seccion === 'inicio' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Bienvenido al Panel de Empresa
                  </h2>
                  <div className="space-y-6 text-gray-600">
                    <p>
                      Desde aquí podrás gestionar tus ofertas de pasantías, revisar postulantes y mantener tu información actualizada.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                      <div className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                        <h3 className="font-semibold text-gray-800 mb-3 text-lg">📝 Publicar Oferta</h3>
                        <p className="text-sm text-gray-600">
                          Crea una nueva oferta de pasantía para atraer talento joven
                        </p>
                      </div>
                      <div className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                        <h3 className="font-semibold text-gray-800 mb-3 text-lg">👥 Gestionar Postulantes</h3>
                        <p className="text-sm text-gray-600">
                          Revisa y gestiona las postulaciones recibidas
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {seccion === 'publicar' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Publicar Nueva Oferta
                  </h2>
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
                    <p className="text-yellow-800">
                      🚧 Esta funcionalidad estará disponible próximamente. Aquí irá el formulario para publicar una nueva oferta de pasantía.
                    </p>
                  </div>
                </div>
              )}

              {seccion === 'ofertas' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Mis Ofertas
                  </h2>
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
                    <p className="text-blue-800">
                      📋 Aquí se mostrarán las ofertas publicadas por la empresa.
                    </p>
                  </div>
                </div>
              )}

              {seccion === 'postulantes' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Postulantes
                  </h2>
                  <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-lg">
                    <p className="text-green-800">
                      👥 Aquí se mostrarán los estudiantes que se postularon a tus ofertas.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Modal de Mis Datos */}
      {showDatosModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Mis Datos</h2>
                <button 
                  onClick={() => setShowDatosModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <span className="text-2xl">×</span>
                </button>
              </div>

              {loadingDatos ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
                  <span className="ml-3 text-gray-600">Cargando datos...</span>
                </div>
              ) : datosEmpresa ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Nombre</label>
                    <div className="p-3 bg-gray-50 rounded-lg text-gray-800">
                      {datosEmpresa.nombre || <span className="text-red-500">No disponible</span>}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <div className="p-3 bg-gray-50 rounded-lg text-gray-800">
                      {datosEmpresa.email || <span className="text-red-500">No disponible</span>}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">CUIT</label>
                    <div className="p-3 bg-gray-50 rounded-lg text-gray-800">
                      {datosEmpresa.cuit || <span className="text-red-500">No disponible</span>}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                    <div className="p-3 bg-gray-50 rounded-lg text-gray-800">
                      {datosEmpresa.telefono || <span className="text-red-500">No disponible</span>}
                    </div>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Dirección</label>
                    <div className="p-3 bg-gray-50 rounded-lg text-gray-800">
                      {datosEmpresa.direccion || <span className="text-red-500">No disponible</span>}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-600">
                  No se encontraron datos de la empresa.
                </div>
              )}

              <div className="flex justify-end mt-6">
                <button 
                  type="button" 
                  onClick={() => setShowDatosModal(false)}
                  className="btn-secondary px-6 py-2"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 