export default function PedidoList({ pedidos }) {
  if (!pedidos.length) {
    return <p>Nenhum pedido encontrado.</p>;
  }
  return (
    <ul className="list-group">
      {pedidos.map((p, idx) => (
        <li key={idx} className="list-group-item">
          <strong>Cliente:</strong> {p.pedido?.cliente} <br />
          <strong>Produto:</strong> {p.produto?.nome || 'N/A'} <br />
          <strong>Quantidade:</strong> {p.pedido?.quantidade}
        </li>
      ))}
    </ul>
  );
}
