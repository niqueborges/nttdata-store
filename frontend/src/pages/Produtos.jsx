// src/pages/Produtos.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProdutoCard from '../components/ProdutoCard';

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/produtos')
      .then(resp => setProdutos(resp.data))
      .catch(() => alert('Erro ao carregar produtos'));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Produtos</h2>
      <div className="row">
        {produtos.map(produto => (
          <div key={produto.id} className="col-md-4 mb-4">
            <ProdutoCard produto={produto} />
          </div>
        ))}
      </div>
    </div>
  );
}

