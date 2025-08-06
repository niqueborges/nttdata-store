// src/pages/Home.jsx
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="text-center">
      <h1>Bem-vindo à NTTData Store</h1>
      <p>Gerencie produtos e pedidos com facilidade.</p>
      <Link to="/produtos" className="btn btn-primary m-2">
        Ver Produtos
      </Link>
      <Link to="/pedidos" className="btn btn-secondary m-2">
        Ver Pedidos
      </Link>
    </div>
  );
}


