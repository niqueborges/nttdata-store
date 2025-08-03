import { useEffect, useState } from 'react';
import axios from 'axios';
import ProdutoCard from '../components/ProdutoCard';

export default function Products() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/produtos')
      .then(resp => setProdutos(resp.data))
      .catch(() => alert('Erro ao carregar produtos'));
  }, []);

  return (
    <div>
      <h2>Produtos</h2>
      <div className="row">
        {produtos.map(prod => (
          <div key={prod.id} className="col-md-4 mb-3">
            <ProdutoCard produto={prod} />
          </div>
        ))}
      </div>
    </div>
  );
}
