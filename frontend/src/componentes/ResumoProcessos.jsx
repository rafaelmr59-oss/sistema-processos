import { FaFileAlt } from "react-icons/fa";

function ResumoProcessos({ processos }) {
  const total = processos.length;
  const mg = processos.filter(p => p.uf === "MG").length;
  const outros = total - mg;

  return (
    <section className="cards-resumo">
      <div className="card-resumo">
        <div className="cabecalho-card">
          <span>Total de Processos</span>
          <FaFileAlt />
        </div>
        <div className="valor-card">{total}</div>
      </div>

      <div className="card-resumo">
        <div className="cabecalho-card">
          <span>Processos MG</span>
          <FaFileAlt />
        </div>
        <div className="valor-card">{mg}</div>
      </div>

      <div className="card-resumo">
        <div className="cabecalho-card">
          <span>Outros Estados</span>
          <FaFileAlt />
        </div>
        <div className="valor-card">{outros}</div>
      </div>
    </section>
  );
}

export default ResumoProcessos;