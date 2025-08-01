import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../config/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function RegistrarEstudiante() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    legajo: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    if (!formData.nombre || !formData.email || !formData.legajo || !formData.password) {
      setError('Por favor completa todos los campos');
      return;
    }
    try {
      // 1. Crear usuario en Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      // 2. Guardar datos en Firestore
      await setDoc(doc(db, 'estudiantes', userCredential.user.uid), {
        nombre: formData.nombre,
        email: formData.email,
        legajo: formData.legajo,
        rol: 'estudiante',
        fechaRegistro: new Date()
      });
      setSuccess(true);
      setTimeout(() => navigate('/login?tipo=estudiante'), 2000);
    } catch (err) {
      setError(err.message);
      setSuccess(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4 animate-fade-in">
      <div className="w-full max-w-md md:max-w-lg lg:max-w-xl">
        <div className="card">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-primary-500 mb-2">
              Registrar Estudiante
            </h1>
            <p className="text-gray-600 text-lg">
              Completa el formulario para crear tu cuenta
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg animate-slide-up">
                <p className="text-red-700 text-sm md:text-base">{error}</p>
              </div>
            )}

            {success && (
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg animate-slide-up">
                <p className="text-green-700 text-sm md:text-base">
                  ✅ Estudiante registrado correctamente. Redirigiendo...
                </p>
              </div>
            )}

            {/* Nombre Completo */}
            <div className="space-y-2">
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                Nombre Completo *
              </label>
              <input 
                type="text" 
                name="nombre" 
                value={formData.nombre} 
                onChange={handleChange} 
                className="input-field"
                id="nombre"
                placeholder="Ingresa tu nombre completo"
                required 
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email *
              </label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                className="input-field"
                id="email"
                placeholder="estudiante@ejemplo.com"
                required 
              />
            </div>

            {/* Legajo */}
            <div className="space-y-2">
              <label htmlFor="legajo" className="block text-sm font-medium text-gray-700">
                Legajo *
              </label>
              <input 
                type="text" 
                name="legajo" 
                value={formData.legajo} 
                onChange={handleChange} 
                className="input-field"
                id="legajo"
                placeholder="Número de legajo"
                required 
              />
            </div>

            {/* Contraseña */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña *
              </label>
              <input 
                type="password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                className="input-field"
                id="password"
                placeholder="Mínimo 6 caracteres"
                required 
              />
            </div>

            {/* Confirmar Contraseña */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirmar Contraseña *
              </label>
              <input 
                type="password" 
                name="confirmPassword" 
                value={formData.confirmPassword} 
                onChange={handleChange} 
                className="input-field"
                id="confirmPassword"
                placeholder="Repite tu contraseña"
                required 
              />
            </div>

            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button 
                type="submit" 
                className="btn-primary flex-1 text-lg md:text-xl py-4"
                disabled={success}
              >
                <span className="mr-2">👨‍🎓</span>
                Registrarse
              </button>
              
              <button 
                type="button" 
                onClick={() => navigate('/')}
                className="btn-secondary flex-1 text-lg md:text-xl py-4"
              >
                <span className="mr-2">↩️</span>
                Volver
              </button>
            </div>
          </form>

          {/* Información adicional */}
          <div className="mt-8 text-center text-gray-500 text-sm">
            <p>* Campos obligatorios</p>
          </div>
        </div>
      </div>
    </div>
  );
} 