import { useEffect, useState } from 'react';
import axios from 'axios';
import PedidoForm from '../components/PedidoForm';
import PedidoList from '../components/PedidoList';

export default function Pedidos() {
  const [pedidos, setPedidos] = useState([]);

  const carregarPedidos = () => {
    axios.get('http://localhost:8080/pedidos/detalhes')
      .then(resp => setPedidos(resp.data))
      .catch(() => alert('Erro ao carregar pedidos'));
  };

  useEffect(() => {
    carregarPedidos();
  }, []);

  return (
    <div>
      <h2>Pedidos</h2>
      <PedidoForm onPedidoCriado={carregarPedidos} />
      <PedidoList pedidos={pedidos} />
    </div>
  );
}
