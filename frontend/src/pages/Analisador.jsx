import { useState } from 'react';
import axios from 'axios';

export default function Analisador() {
  const [textoPedido, setTextoPedido] = useState('');
  const [respostaGemini, setRespostaGemini] = useState('');

  const analisarPedido = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/ia/analisar', {
        analise: textoPedido,
      });

      setRespostaGemini(response.data.analise);
    } catch (error) {
      console.error('Erro ao analisar pedido:', error);
      setRespostaGemini('Erro ao processar a análise. Tente novamente.');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Analisador de Pedidos com IA</h2>
      <form onSubmit={analisarPedido}>
        <textarea
          className="form-control mb-3"
          rows="4"
          placeholder='Descreva o pedido (ex: Cliente: Monique Borges, Produto: Café Gourmet, Quantidade: 5)'
          value={textoPedido}
          onChange={(e) => setTextoPedido(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">Analisar</button>
      </form>

      {respostaGemini && (
        <div className="mt-4">
          <h5>Resultado da Análise:</h5>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{respostaGemini}</pre>
        </div>
      )}
    </div>
  );
}

