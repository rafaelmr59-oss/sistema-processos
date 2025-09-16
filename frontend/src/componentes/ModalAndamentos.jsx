import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./ModalAndamentos.css";

export default function ModalAndamentos({ processo, onFechar, onAtualizarProcesso }) {
  const [andamentos, setAndamentos] = useState([]);
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState("");
  const [editando, setEditando] = useState(null);

  useEffect(() => {
    if (!processo) return;
    fetch(`http://localhost:3000/processos/${processo.id}/andamentos`)
      .then(res => res.json())
      .then(data => setAndamentos(data))
      .catch(err => console.error("Erro ao buscar andamentos:", err));
  }, [processo]);

  const salvar = async (e) => {
    e.preventDefault();
    if (!descricao || !data) return;

    const payload = { descricao, data };

    try {
      const res = await fetch(
        editando
          ? `http://localhost:3000/andamentos/${editando.id}`
          : `http://localhost:3000/processos/${processo.id}/andamentos`,
        {
          method: editando ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error("Erro no servidor");

      const resposta = await res.json();

      const novoAndamento = editando
        ? { ...editando, descricao, data }
        : { 
            id: resposta.id || Date.now(),
            descricao,
            data
          };

      if (editando) {
        setAndamentos(prev => prev.map(a => (a.id === editando.id ? novoAndamento : a)));
      } else {
        setAndamentos(prev => [novoAndamento, ...prev]);
      }

      setDescricao("");
      setData("");
      setEditando(null);

      if (onAtualizarProcesso) {
        const procRes = await fetch(`http://localhost:3000/processos/${processo.id}`);
        const procAtualizado = await procRes.json();
        onAtualizarProcesso(procAtualizado);
      }
    } catch (err) {
      console.error("Erro ao salvar andamento:", err);
    }
  };

  const excluir = async (id) => {
    if (!window.confirm("Deseja excluir este andamento?")) return;
    try {
      const res = await fetch(`http://localhost:3000/andamentos/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erro ao excluir");

      setAndamentos(prev => prev.filter(a => a.id !== id));

      if (onAtualizarProcesso) {
        const procRes = await fetch(`http://localhost:3000/processos/${processo.id}`);
        const procAtualizado = await procRes.json();
        onAtualizarProcesso(procAtualizado);
      }
    } catch (err) {
      console.error("Erro ao excluir andamento:", err);
    }
  };

  const editar = (a) => {
    setEditando(a);
    setDescricao(a.descricao);
    setData(a.data ? a.data.split("T")[0] : "");
  };

  return (
    <div className="sobreposicao-modal">
      <div className="conteudo-modal">
        <div className="cabecalho-modal">
          <h2>Andamentos - Processo {processo?.numero}</h2>
          <button className="botao-fechar" onClick={onFechar}>×</button>
        </div>

        <div className="card-novo-andamento">
          <h3>{editando ? "Editar Andamento" : "Novo Andamento"}</h3>
          <form onSubmit={salvar} className="formulario-andamento">
            <div className="grupo-formulario">
              <label>Data</label>
              <input
                type="date"
                value={data}
                onChange={e => setData(e.target.value)}
                required
              />
            </div>
            <div className="grupo-formulario">
              <label>Descrição</label>
              <textarea
                value={descricao}
                onChange={e => setDescricao(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="botao-enviar">
              {editando ? "Salvar Alterações" : "Cadastrar"}
            </button>
          </form>
        </div>

        <div className="secao-historico">
          <h2>Histórico</h2>
          {andamentos.length === 0 && <p>Nenhum andamento registrado.</p>}

          <div className="lista-historico">
            {andamentos.map(a => (
              <div key={a.id} className="item-historico">
                <div className="detalhes-item">
                  <div className="data">{a.data ? new Date(a.data).toLocaleDateString() : ""}</div>
                  <p className="descricao">{a.descricao}</p>
                </div>
                <div className="acoes-item">
                  <button className="botao-icone" onClick={() => editar(a)}><FaEdit /></button>
                  <button className="botao-icone" onClick={() => excluir(a.id)}><FaTrash /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}