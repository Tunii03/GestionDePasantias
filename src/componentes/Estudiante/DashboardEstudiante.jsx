import React, { useState, useEffect } from 'react';
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
                Estudiante
              </p>
            </div>
            
            {/* Navegación */}
            <nav className="flex flex-wrap gap-3">
              <button 
                className="btn-primary text-sm md:text-base px-4 py-2"
                onClick={() => setShowCVForm(true)}
              >
                <span className="mr-2">👤</span>
                Mis Datos
              </button>
              <button className="btn-secondary text-sm md:text-base px-4 py-2">
                <span className="mr-2">📋</span>
                Mis Postulaciones
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="container-responsive py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Panel lateral */}
          <div className="lg:col-span-1">
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Información Rápida
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-600">Estado</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    Activo
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-600">Postulaciones</span>
                  <span className="text-lg font-bold text-primary-500">0</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contenido principal */}
          <div className="lg:col-span-2">
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Bienvenido al Sistema de Pasantías
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Desde aquí podrás gestionar tus pasantías, ver tus postulaciones y mantener tu información actualizada.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">📝 Actualizar CV</h3>
                    <p className="text-sm text-gray-600">
                      Mantén tu CV actualizado para aumentar tus oportunidades
                    </p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">🔍 Buscar Pasantías</h3>
                    <p className="text-sm text-gray-600">
                      Explora las oportunidades disponibles
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal Mis Datos */}
      {showCVForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Mis Datos</h2>
                <button 
                  onClick={() => setShowCVForm(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <span className="text-2xl">×</span>
                </button>
              </div>

              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
                  <span className="ml-3 text-gray-600">Cargando datos...</span>
                </div>
              ) : datosEstudiante ? (
                <div className="space-y-6">
                  {/* Información del estudiante */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Nombre</label>
                      <div className="p-3 bg-gray-50 rounded-lg text-gray-800">
                        {datosEstudiante.nombre}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <div className="p-3 bg-gray-50 rounded-lg text-gray-800">
                        {datosEstudiante.email}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Legajo</label>
                      <div className="p-3 bg-gray-50 rounded-lg text-gray-800">
                        {datosEstudiante.legajo}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">CV</label>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        {cvFile ? (
                          <div className="flex items-center justify-between">
                            <span className="text-gray-800">{cvFile.name}</span>
                            <button 
                              className="btn-primary text-sm px-3 py-1"
                              onClick={() => setShowCVForm(true)}
                            >
                              Reemplazar
                            </button>
                          </div>
                        ) : (
                          <span className="text-gray-500">No hay CV subido</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Formulario para subir CV */}
                  <form onSubmit={handleCVSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Subir CV (PDF)
                      </label>
                      <input 
                        type="file" 
                        accept=".pdf" 
                        onChange={handleFileChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                      <button 
                        type="button" 
                        onClick={() => setShowCVForm(false)}
                        className="btn-secondary flex-1"
                      >
                        Cerrar
                      </button>
                      <button 
                        type="submit" 
                        className="btn-primary flex-1"
                      >
                        Guardar CV
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-600">
                  No se encontraron datos del estudiante.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 