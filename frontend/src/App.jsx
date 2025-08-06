import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Analisador from './pages/Analisador';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Login from './pages/Login';
import Produtos from './pages/Produtos'; // 🚀 Correto
import Pedidos from './pages/Pedidos';  // 🚀 Correto

function PrivateRoute({ children }) {
  const usuario = localStorage.getItem('usuario');
  return usuario ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-fill">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/produtos" element={
              <PrivateRoute>
                <Produtos /> {/* ✅ Corrigido aqui */}
              </PrivateRoute>
            } />
            <Route path="/pedidos" element={
              <PrivateRoute>
                <Pedidos />
              </PrivateRoute>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}


