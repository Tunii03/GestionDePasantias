import { BrowserRouter as Router, Routes, Route, useSearchParams } from 'react-router-dom';
import Home from './pages/Home';
import Login from './componentes/login';
import Header from './componentes/Header';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginWrapper />} />
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
