import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col justify-center items-center p-4 animate-fade-in">
            {/* Header */}
            <div className="text-center mb-8 md:mb-12">
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-primary-500 mb-4 leading-tight">
                    Bienvenido al Sistema de Pasantías
                </h1>
                <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
                    Gestiona tus pasantías de manera eficiente y profesional
                </p>
            </div>

            {/* Botones principales */}
            <div className="w-full max-w-md md:max-w-lg lg:max-w-xl space-y-4 mb-8">
                <Link 
                    to="/login?tipo=estudiante" 
                    className="btn-primary w-full flex items-center justify-center text-lg md:text-xl py-4 md:py-5"
                >
                    <span className="mr-3">👨‍🎓</span>
                    Iniciar Sesión como Estudiante
                </Link>
                
                <Link 
                    to="/login?tipo=empresa" 
                    className="btn-secondary w-full flex items-center justify-center text-lg md:text-xl py-4 md:py-5"
                >
                    <span className="mr-3">🏢</span>
                    Iniciar Sesión como Empresa
                </Link>
            </div>

            {/* Botones de registro */}
            <div className="w-full max-w-md md:max-w-lg lg:max-w-xl space-y-4">
                <Link 
                    to="/registrar-empresa" 
                    className="block w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold py-3 md:py-4 px-6 rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg text-center text-base md:text-lg"
                >
                    <span className="mr-2">📝</span>
                    Registrar Empresa
                </Link>
                
                <Link 
                    to="/registrar-estudiante" 
                    className="block w-full bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 text-white font-semibold py-3 md:py-4 px-6 rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg text-center text-base md:text-lg"
                >
                    <span className="mr-2">📚</span>
                    Registrar Estudiante
                </Link>
            </div>

            {/* Información adicional */}
            <div className="mt-12 md:mt-16 text-center text-gray-500 text-sm md:text-base">
                <p>¿Necesitas ayuda? Contacta con el administrador del sistema</p>
            </div>
        </div>
    );
}