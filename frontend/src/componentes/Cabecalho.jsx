import Botao from "./Botao";
import { FaPlus } from "react-icons/fa";

function Cabecalho({ onNovo }) {
  return (
    <header className="cabecalho">
      <div className="titulo-cabecalho">
        <h1>Sistema de Cadastro de Processos</h1>
        <p>Gerencie processos jurídicos e seus andamentos</p>
      </div>
      <Botao 
        texto="Novo Processo" 
        icone={FaPlus} 
        cor="#000" 
        corIcone="white" 
        onClick={onNovo} 
      />
    </header>
  );
}

export default Cabecalho;