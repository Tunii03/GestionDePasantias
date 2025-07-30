import React, { useState } from 'react';
import './RegistrarEstudiante.css';
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
    <div className="registro-estudiante-container">
      <h2>Registro de Estudiante</h2>
      <form onSubmit={handleSubmit} className="registro-estudiante-form">
        <div className="form-group">
          <label>Nombre Completo:</label>
          <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Legajo:</label>
          <input type="text" name="legajo" value={formData.legajo} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Contraseña:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Confirmar Contraseña:</label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
        </div>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">Estudiante registrado correctamente. Redirigiendo...</div>}
        <button type="submit" className="btn-primary">Registrarse</button>
      </form>
    </div>
  );
} 