import { FaEye, FaTrash, FaEdit } from "react-icons/fa";
import Botao from "./Botao";

function ListaProcessos({ processos, onEditar, onExcluir, onAndamentos }) {
  return (
    <section className="lista-processos">
      <h2>Processos Cadastrados</h2>
      <table>
        <thead>
          <tr>
            <th>Número</th>
            <th>Cliente</th>
            <th>Advogado</th>
            <th>UF</th>
            <th>Data Abertura</th>
            <th>Andamentos</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {processos.map(proc => (
            <tr key={proc.id}>
              <td>{proc.numero}</td>
              <td>{proc.cliente}</td>
              <td>{proc.advogado}</td>
              <td><span className="tag-uf">{proc.uf}</span></td>
              <td>{new Date(proc.dataAbertura).toLocaleDateString()}</td>
              <td>
                <button 
                  className="link-andamentos"
                  onClick={() => onAndamentos(proc)}
                  style={{ background: 'none', border: 'none', padding: 0 }}
                >
                  {proc.andamentos}
                </button>
              </td>
              <td className="botoes-acao">
                <Botao 
                  title="Andamentos"
                  icone={FaEye} 
                  cor="#e9ecef" 
                  corIcone="#495057" 
                  onClick={() => onAndamentos(proc)} 
                />
                <Botao 
                  title="Editar Processo"
                  icone={FaEdit} 
                  cor="#e9ecef" 
                  corIcone="#495057"
                  onClick={() => onEditar(proc)} 
                />
                <Botao 
                  title="Excluir Processo"
                  icone={FaTrash} 
                  cor="#e9ecef" 
                  corIcone="#dc3545" 
                  onClick={() => onExcluir(proc.id)} 
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default ListaProcessos;