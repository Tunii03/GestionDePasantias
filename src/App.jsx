import { BrowserRouter as Router, Routes, Route, useSearchParams } from 'react-router-dom';
import Home from './componentes/Home/Home';
import Login from './componentes/Login/Login';
import './App.css';
import RegistrarEmpresa from './componentes/RegistrarEmpresa/RegistrarEmpresa';
import RegistrarEstudiante from './componentes/Estudiante/RegistrarEstudiante';
import DashboardEstudiante from './componentes/Estudiante/DashboardEstudiante';
import DashboardEmpresa from './componentes/Empresa/DashboardEmpresa';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginWrapper />} />
        <Route path="/registrar-empresa" element={<RegistrarEmpresa />} />
        <Route path="/registrar-estudiante" element={<RegistrarEstudiante />} />
        <Route path="/dashboard-empresa" element={<DashboardEmpresa />} />
        <Route path="/dashboard-estudiante" element={<DashboardEstudiante />} />
      </Routes>
    </Router>
  )
}

function LoginWrapper() {
  const [searchParams] = useSearchParams();
  const tipo = searchParams.get('tipo') || 'estudiante';
  return <Login tipo={tipo} />;
}

export default App;
