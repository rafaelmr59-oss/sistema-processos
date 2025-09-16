import { useEffect, useState } from 'react';
import './ModalNovoProcesso.css';

function ModalNovoProcesso({ onFechar, onProcessoCadastrado, processo }) {
  const [numero, setNumero] = useState('');
  const [dataAbertura, setDataAbertura] = useState('');
  const [descricao, setDescricao] = useState('');
  const [cliente, setCliente] = useState('');
  const [advogado, setAdvogado] = useState('');
  const [uf, setUf] = useState('');

  useEffect(() => {
    if (processo) {
      setNumero(processo.numero || '');
      setDataAbertura(
        processo.dataAbertura 
          ? new Date(processo.dataAbertura).toISOString().split('T')[0] 
          : ''
      );
      setDescricao(processo.descricao || '');
      setCliente(processo.cliente || '');
      setAdvogado(processo.advogado || '');
      setUf(processo.uf || '');
    } else {
      setNumero('');
      setDataAbertura('');
      setDescricao('');
      setCliente('');
      setAdvogado('');
      setUf('');
    }
  }, [processo]);

  const salvar = async (e) => {
    e.preventDefault();
    if (!numero || !dataAbertura || !descricao || !cliente || !advogado || !uf) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      let res;
      if (processo) {
        res = await fetch(`http://localhost:3000/processos/${processo.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ numero, dataAbertura, descricao, cliente, advogado, uf })
        });
      } else {
        res = await fetch("http://localhost:3000/processos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ numero, dataAbertura, descricao, cliente, advogado, uf })
        });
      }

      const data = await res.json();
      if (res.ok) {
        if (processo) {
          alert("Processo atualizado com sucesso!");
          onProcessoCadastrado({ ...processo, numero, dataAbertura, descricao, cliente, advogado, uf });
        } else {
          alert(data.message || "Processo criado com sucesso!");
          onProcessoCadastrado({ id: data.id, numero, dataAbertura, descricao, cliente, advogado, uf, andamentos: 0 });
        }
        onFechar();
      } else {
        alert(data.error || "Erro ao salvar processo");
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar processo");
    }
  };

  return (
    <div className="sobreposicao-modal">
      <div className="conteudo-modal">
        <header className="cabecalho-modal">
          <h2>{processo ? "Editar Processo" : "Novo Processo"}</h2>
          <button className="botao-fechar" onClick={onFechar}>&times;</button>
        </header>

        <main>
          <form onSubmit={salvar} className="formulario-processo">
            <div className="grupo-formulario">
              <label>Número</label>
              <input type="text" value={numero} onChange={(e) => setNumero(e.target.value)} />
            </div>
            <div className="grupo-formulario">
              <label>Data de Abertura</label>
              <input type="date" value={dataAbertura} onChange={(e) => setDataAbertura(e.target.value)} />
            </div>
            <div className="grupo-formulario largura-completa">
              <label>Descrição</label>
              <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} />
            </div>
            <div className="grupo-formulario">
              <label>Cliente</label>
              <input type="text" value={cliente} onChange={(e) => setCliente(e.target.value)} />
            </div>
            <div className="grupo-formulario">
              <label>Advogado</label>
              <input type="text" value={advogado} onChange={(e) => setAdvogado(e.target.value)} />
            </div>
            <div className="grupo-formulario">
              <label>UF</label>
              <select value={uf} onChange={(e) => setUf(e.target.value)}>
                <option value="">Selecione</option>
                <option value="MG">MG</option>
                <option value="SP">SP</option>
                <option value="RJ">RJ</option>
                <option value="ES">ES</option>
              </select>
            </div>
            <button type="submit" className="botao-primario" style={{gridColumn: '1 / -1', marginTop: '16px'}}>
              {processo ? "Salvar Alterações" : "Cadastrar"}
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}

export default ModalNovoProcesso;