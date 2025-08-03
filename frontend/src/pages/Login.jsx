import { useState } from 'react';

export default function Login() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    alert(`Login feito: ${usuario}`);
  };

  return (
    <div className="mx-auto" style={{maxWidth: '400px'}}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Usuário"
          value={usuario}
          onChange={e => setUsuario(e.target.value)}
        />
        <input
          type="password"
          className="form-control mb-2"
          placeholder="Senha"
          value={senha}
          onChange={e => setSenha(e.target.value)}
        />
        <button className="btn btn-primary w-100">Entrar</button>
      </form>
    </div>
  );
}
