import { useState } from 'react';
import axios from 'axios';

export default function PedidoForm({ onPedidoCriado }) {
  const [cliente, setCliente] = useState('');
  const [produtoId, setProdutoId] = useState('');
  const [quantidade, setQuantidade] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post('http://localhost:8080/pedidos', {
        cliente,
        produtoId: parseInt(produtoId),
        quantidade: parseInt(quantidade)
      });
      onPedidoCriado(resp.data);
      setCliente('');
      setProdutoId('');
      setQuantidade(1);
    } catch (err) {
      alert('Erro ao criar pedido');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Cliente"
        value={cliente}
        onChange={e => setCliente(e.target.value)}
        required
      />
      <input
        type="number"
        className="form-control mb-2"
        placeholder="ID do Produto"
        value={produtoId}
        onChange={e => setProdutoId(e.target.value)}
        required
      />
      <input
        type="number"
        className="form-control mb-2"
        placeholder="Quantidade"
        value={quantidade}
        onChange={e => setQuantidade(e.target.value)}
        min="1"
        required
      />
      <button type="submit" className="btn btn-success w-100">Criar Pedido</button>
    </form>
  );
}

