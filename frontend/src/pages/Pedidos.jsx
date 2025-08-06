import { useEffect, useState } from 'react';
import axios from 'axios';
import PedidoForm from '../components/PedidoForm';
import PedidoList from '../components/PedidoList';

export default function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [analise, setAnalise] = useState(null);
  const [loadingId, setLoadingId] = useState(null);

  const carregarPedidos = () => {
    axios.get('http://localhost:8080/pedidos/detalhes')
      .then(resp => setPedidos(resp.data))
      .catch(() => alert('Erro ao carregar pedidos'));
  };

  useEffect(() => {
    carregarPedidos();
  }, []);

  const handleNovoPedido = (novoPedido) => {
    carregarPedidos();
  };

  const analisarPedido = async (pedido) => {
    setLoadingId(pedido.id);
    setAnalise(null);
    try {
      const response = await axios.post('http://localhost:8080/ia/analisar', {
        cliente: pedido.cliente,
        produto: pedido.produto,
        quantidade: pedido.quantidade
      });
      setAnalise(response.data.analise);
    } catch (error) {
      setAnalise('Erro ao analisar o pedido. Tente novamente.');
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Pedidos</h2>
      <PedidoForm onPedidoCriado={handleNovoPedido} />
      <PedidoList
        pedidos={pedidos}
        analisarPedido={analisarPedido}
        loadingId={loadingId}
      />
      {analise && (
        <div className="alert alert-info mt-3" style={{ whiteSpace: 'pre-line' }}>
          <h4>Análise da IA</h4>
          <p>{analise}</p>
        </div>
      )}
    </div>
  );
}


