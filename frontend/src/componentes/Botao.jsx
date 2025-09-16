function Botao({ icone: Icone, cor = "#007bff", corIcone = "#fff", texto, onClick, title }) {
  return (
    <button 
      style={{ 
        backgroundColor: cor, 
        color: corIcone, 
        border: "none", 
        borderRadius: "8px", 
        padding: "8px 16px", 
        display: "inline-flex", 
        alignItems: "center", 
        gap: "8px", 
        cursor: "pointer", 
        fontWeight: 600  
      }}  
      title={title}
      onClick={onClick}
    >
      {Icone && <Icone />}
      {texto && <span>{texto}</span>}
    </button>
  );
}
 
export default Botao;