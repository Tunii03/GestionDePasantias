import React from 'react';

export default function TestAPI() {
  const testRegistro = async () => {
    const response = await fetch('http://localhost:8000/registro-empresa', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        nombre: "TechSolutions SA",
        cuit: "30789123456",
        email: "contacto@techsolutions.com",
        telefono: "1145678901",
        password: "TechPass2024"
      })
    });
    const data = await response.json();
    console.log(data);
  };

  return <button onClick={testRegistro}>Probar API</button>;
}