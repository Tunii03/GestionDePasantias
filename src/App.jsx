import { BrowserRouter as Router, Routes, Route, useSearchParams } from 'react-router-dom';
import Home from './componentes/Login/Home/Home';
import Login from './componentes/Login/Login/Login';
import './App.css';
import RegistrarEmpresa from './componentes/Login/RegistrarEmpresa/RegistrarEmpresa';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginWrapper />} />
        <Route path="/registrar-empresa" element={<RegistrarEmpresa />} />
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
