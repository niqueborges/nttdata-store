export default function ProdutoCard({ produto }) {
  return (
    <div className="card h-100">
      <div className="card-body">
        <h5 className="card-title">{produto.nome}</h5>
        <p className="card-text">{produto.descricao}</p>
        <p className="card-text"><strong>Preço:</strong> R$ {produto.preco}</p>
      </div>
    </div>
  );
}
