export default function PedidoList({ pedidos, analisarPedido, loadingId }) {
  if (!pedidos.length) {
    return <p>Nenhum pedido encontrado.</p>;
  }
  return (
    <ul className="list-group">
      {pedidos.map((p) => (
        <li key={p.id} className="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <strong>Cliente:</strong> {p.cliente} <br />
            <strong>Produto:</strong> {p.produto} <br />
            <strong>Quantidade:</strong> {p.quantidade}
          </div>
          <button
            className="btn btn-primary"
            onClick={() => analisarPedido(p)}
            disabled={loadingId === p.id}
          >
            {loadingId === p.id ? 'Analisando...' : 'Analisar com IA'}
          </button>
        </li>
      ))}
    </ul>
  );
}
